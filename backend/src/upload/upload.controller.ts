import { 
  Controller, 
  Post, 
  UseGuards, 
  UseInterceptors, 
  UploadedFiles,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('imagens')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('imagens', 10)) // Máximo 10 imagens
  async uploadImagens(
    @UploadedFiles() files: Express.Multer.File[],
    @Request() req: any,
  ) {
    console.log('[Upload] Recebida requisição de upload');
    console.log('[Upload] Número de arquivos:', files?.length || 0);
    
    if (!files || files.length === 0) {
      console.log('[Upload] Erro: Nenhuma imagem enviada');
      throw new BadRequestException('Nenhuma imagem enviada');
    }

    if (files.length > 10) {
      console.log('[Upload] Erro: Muitos arquivos:', files.length);
      throw new BadRequestException('Máximo de 10 imagens permitidas');
    }

    // Validar tipo e tamanho dos arquivos
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      console.log('[Upload] Validando arquivo:', file.originalname, file.mimetype, file.size);
      
      if (!allowedMimeTypes.includes(file.mimetype)) {
        console.log('[Upload] Erro: Tipo inválido:', file.mimetype);
        throw new BadRequestException(
          `Arquivo ${file.originalname} tem tipo inválido. Apenas JPG, PNG e WEBP são permitidos.`
        );
      }

      if (file.size > maxSize) {
        console.log('[Upload] Erro: Arquivo muito grande:', file.size);
        throw new BadRequestException(
          `Arquivo ${file.originalname} é muito grande. Máximo 5MB.`
        );
      }
    }

    try {
      console.log('[Upload] Iniciando upload para Supabase...');
      const urls = await this.uploadService.uploadMultipleImages(
        files,
        req.user.userId,
      );

      console.log('[Upload] Upload concluído com sucesso. URLs:', urls);
      return {
        message: 'Imagens enviadas com sucesso',
        urls,
      };
    } catch (error) {
      console.error('[Upload] Erro ao fazer upload:', error);
      throw new BadRequestException('Erro ao fazer upload das imagens: ' + error.message);
    }
  }
}
