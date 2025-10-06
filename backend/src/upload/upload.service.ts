import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  private supabase;
  private watermarkBuffer: Buffer;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    // Carregar marca d'água SVG e converter para PNG
    this.loadWatermark();
  }

  private async loadWatermark() {
    try {
      const watermarkPath = path.join(__dirname, 'watermark.png');
      
      // Carregar marca d'água PNG
      this.watermarkBuffer = fs.readFileSync(watermarkPath);
      
      console.log('[UploadService] ✅ Marca d\'água carregada com sucesso');
    } catch (error) {
      console.error('[UploadService] ❌ Erro ao carregar marca d\'água:', error);
      console.warn('[UploadService] ⚠️  Continuando sem marca d\'água');
      // Continuar sem marca d'água se houver erro
      this.watermarkBuffer = null;
    }
  }

  async uploadImage(file: Express.Multer.File, userId: number): Promise<string> {
    try {
      // Primeiro, redimensionar e otimizar a imagem
      let imageProcessor = sharp(file.buffer)
        .resize(1200, 900, {
          fit: 'inside',
          withoutEnlargement: true
        });

      // Adicionar marca d'água se disponível e habilitada
      const watermarkEnabled = process.env.WATERMARK_ENABLED === 'true';
      
      if (this.watermarkBuffer && watermarkEnabled) {
        const metadata = await imageProcessor.metadata();
        const imageWidth = metadata.width;
        const imageHeight = metadata.height;

        // Configurações da marca d'água
        const watermarkWidth = 200;
        const watermarkHeight = 60;
        const margin = parseInt(process.env.WATERMARK_MARGIN || '20');
        const opacity = parseFloat(process.env.WATERMARK_OPACITY || '0.8');

        // Posicionar marca d'água no canto inferior direito
        const left = imageWidth - watermarkWidth - margin;
        const top = imageHeight - watermarkHeight - margin;

        // Aplicar opacidade à marca d'água
        const watermarkWithOpacity = await sharp(this.watermarkBuffer)
          .composite([
            {
              input: Buffer.from([255, 255, 255, Math.round(opacity * 255)]),
              raw: {
                width: 1,
                height: 1,
                channels: 4
              },
              tile: true,
              blend: 'dest-in'
            }
          ])
          .toBuffer();

        imageProcessor = imageProcessor.composite([
          {
            input: watermarkWithOpacity,
            top: Math.max(0, top),
            left: Math.max(0, left),
            blend: 'over'
          }
        ]);

        console.log(`[UploadService] ✨ Marca d'água aplicada (opacidade: ${opacity}, margem: ${margin}px)`);
      }

      // Finalizar processamento com compressão
      const processedImage = await imageProcessor
        .jpeg({ 
          quality: 75,           // Reduzido de 85 para 75 (ótimo balanço qualidade/tamanho)
          progressive: true,     // JPEG progressivo (carrega mais rápido)
          mozjpeg: true          // Usa mozjpeg para melhor compressão
        })
        .toBuffer();
      
      const originalSize = file.size;
      const compressedSize = processedImage.length;
      const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);
      
      console.log(`[UploadService] Compressão: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressedSize / 1024 / 1024).toFixed(2)}MB (${reduction}% redução)`);

      // Gerar nome único
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const fileName = `${userId}/${timestamp}-${randomString}.jpg`;

      // Upload para Supabase Storage
      const { data, error } = await this.supabase.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET)
        .upload(fileName, processedImage, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (error) {
        throw new Error(`Erro no upload: ${error.message}`);
      }

      console.log('[UploadService] Upload realizado. Path:', data.path);

      // Retornar URL pública
      const { data: publicData } = this.supabase.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(fileName);

      console.log('[UploadService] URL gerada:', publicData.publicUrl);
      
      return publicData.publicUrl;
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  }

  async uploadMultipleImages(files: Express.Multer.File[], userId: number): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, userId));
    return Promise.all(uploadPromises);
  }

  async deleteImage(url: string): Promise<void> {
    try {
      // Extrair path do arquivo da URL
      const urlParts = url.split('/');
      const fileName = urlParts.slice(-2).join('/'); // userId/timestamp-random.jpg

      const { error } = await this.supabase.storage
        .from(process.env.SUPABASE_STORAGE_BUCKET)
        .remove([fileName]);

      if (error) {
        console.error('Erro ao deletar imagem:', error);
      }
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
    }
  }

  async deleteMultipleImages(urls: string[]): Promise<void> {
    const deletePromises = urls.map(url => this.deleteImage(url));
    await Promise.all(deletePromises);
  }
}
