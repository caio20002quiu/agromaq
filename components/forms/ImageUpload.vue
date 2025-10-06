<template>
  <div class="space-y-4">
    <!-- Input de Upload (escondido) -->
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/jpeg,image/jpg,image/png,image/webp"
      @change="onFileSelect"
      class="hidden"
    />

    <!-- Grid de Imagens -->
    <div v-if="images.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative aspect-square rounded-lg border-2 overflow-hidden group"
        :class="index === 0 ? 'border-green-500' : 'border-gray-200'"
      >
        <!-- Badge Principal -->
        <div
          v-if="index === 0"
          class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10"
        >
          PRINCIPAL
        </div>

        <!-- Preview da Imagem -->
        <img
          :src="image.preview"
          :alt="`Imagem ${index + 1}`"
          class="w-full h-full object-cover"
        />

        <!-- Overlay com Ações -->
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          
          <!-- Botão Tornar Principal -->
          <button
            v-if="index !== 0"
            type="button"
            @click="setPrincipal(index)"
            class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
            title="Tornar principal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>

          <!-- Botão Remover -->
          <button
            type="button"
            @click="removeImage(index)"
            class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            title="Remover"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <!-- Loading Overlay -->
        <div
          v-if="image.uploading"
          class="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"
        >
          <div class="text-center text-white">
            <svg class="animate-spin h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-xs">Enviando...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Área de Drag & Drop / Upload -->
    <div
      v-if="images.length < 10"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="openFileDialog"
      :class="[
        'w-full border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-2',
        isDragging
          ? 'border-green-500 bg-green-50 scale-105'
          : 'border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-600 hover:text-green-600'
      ]"
    >
      <!-- Ícone animado -->
      <div :class="isDragging ? 'scale-110' : ''" class="transition-transform">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!isDragging"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>
      
      <span class="font-medium text-center">
        {{ isDragging 
          ? 'Solte as imagens aqui' 
          : images.length === 0 
            ? 'Clique ou arraste fotos aqui' 
            : 'Adicionar Mais Fotos'
        }}
      </span>
      <span class="text-sm text-gray-500 text-center">
        {{ images.length }}/10 fotos • JPG, PNG ou WEBP • Máx 5MB cada
      </span>
    </div>

    <!-- Mensagem de Limite -->
    <div v-else class="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p class="text-sm text-yellow-800">
        Limite de 10 fotos atingido. Remova uma foto para adicionar outra.
      </p>
    </div>

    <!-- Mensagem de Erro -->
    <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
      {{ errorMessage }}
    </div>

    <!-- Checkbox para ativar Cropper -->
    <div class="flex items-center gap-2">
      <input
        id="enableCropper"
        v-model="cropperEnabled"
        type="checkbox"
        class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
      />
      <label for="enableCropper" class="text-sm text-gray-700 cursor-pointer">
        Ativar editor de imagens (recortar, rotacionar, ajustar)
      </label>
    </div>

    <!-- Image Cropper Modal -->
    <ClientOnly>
      <ImageCropper
        v-if="cropperImageSrc"
        v-model:isOpen="showCropper"
        :imageSrc="cropperImageSrc"
        @crop="onCropComplete"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import ImageCropper from './ImageCropper.vue'

interface ImageData {
  file?: File
  preview: string
  url?: string
  uploading: boolean
}

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const images = ref<ImageData[]>([])
const errorMessage = ref('')
const isDragging = ref(false)
const cropperEnabled = ref(false)
const showCropper = ref(false)
const cropperImageSrc = ref('')
const pendingFiles = ref<File[]>([])

// Inicializar com URLs existentes (para edição)
watch(() => props.modelValue, (urls) => {
  if (urls && urls.length > 0 && images.value.length === 0) {
    images.value = urls.map(url => ({
      preview: url,
      url: url,
      uploading: false
    }))
  }
}, { immediate: true })

function openFileDialog() {
  errorMessage.value = ''
  fileInput.value?.click()
}

// Handler para drag & drop
function onDrop(event: DragEvent) {
  isDragging.value = false
  
  const files = Array.from(event.dataTransfer?.files || [])
  if (files.length === 0) return

  processFiles(files)
}

// Processar arquivos (usado tanto para click quanto drag & drop)
async function processFiles(files: File[]) {
  errorMessage.value = ''

  // Validar limite
  if (images.value.length + files.length > 10) {
    errorMessage.value = `Você pode adicionar no máximo ${10 - images.value.length} foto(s) a mais`
    return
  }

  // Validar tipo e tamanho
  const validFiles = files.filter(file => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      errorMessage.value = `Arquivo ${file.name} não é uma imagem válida (JPG, PNG ou WEBP)`
      return false
    }

    if (file.size > maxSize) {
      errorMessage.value = `Arquivo ${file.name} é muito grande (máximo 5MB)`
      return false
    }

    return true
  })

  if (validFiles.length === 0) return

  // Se cropper está ativado, processar uma imagem por vez
  if (cropperEnabled.value && validFiles.length > 0) {
    pendingFiles.value = validFiles
    await openCropperForNextFile()
  } else {
    // Adicionar imagens diretamente sem cropper
    for (const file of validFiles) {
      const preview = URL.createObjectURL(file)
      const imageData: ImageData = {
        file,
        preview,
        uploading: true
      }
      
      images.value.push(imageData)
    }

    // Upload para o backend
    await uploadImages(validFiles)
  }
}

// Abrir cropper para o próximo arquivo pendente
async function openCropperForNextFile() {
  if (pendingFiles.value.length === 0) return

  const file = pendingFiles.value[0]
  if (file) {
    cropperImageSrc.value = URL.createObjectURL(file)
    showCropper.value = true
  }
}

// Callback quando imagem é recortada
async function onCropComplete(croppedFile: File) {
  // Remover o arquivo atual da fila
  pendingFiles.value.shift()

  // Adicionar preview da imagem recortada
  const preview = URL.createObjectURL(croppedFile)
  const imageData: ImageData = {
    file: croppedFile,
    preview,
    uploading: true
  }
  
  images.value.push(imageData)

  // Upload imediatamente
  await uploadImages([croppedFile])

  // Se ainda há arquivos pendentes, abrir cropper para o próximo
  if (pendingFiles.value.length > 0) {
    await openCropperForNextFile()
  }
}

async function onFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  if (files.length === 0) return

  await processFiles(files)
  
  // Limpar input
  target.value = ''
}

async function uploadImages(files: File[]) {
  try {
    console.log('[ImageUpload] Iniciando upload de', files.length, 'arquivo(s)')
    
    const formData = new FormData()
    files.forEach(file => {
      formData.append('imagens', file)
      console.log('[ImageUpload] Adicionado arquivo:', file.name, file.type, file.size)
    })

    console.log('[ImageUpload] Chamando API...')
    const { uploadImagens } = useApi()
    const response: any = await uploadImagens(formData)
    
    console.log('[ImageUpload] Resposta da API:', response)
    
    if (response.urls && Array.isArray(response.urls)) {
      console.log('[ImageUpload] URLs recebidas:', response.urls)
      
      // Atualizar URLs das imagens que acabaram de ser enviadas
      let urlIndex = 0
      for (let i = images.value.length - files.length; i < images.value.length; i++) {
        const img = images.value[i]
        if (img) {
          img.url = response.urls[urlIndex]
          img.uploading = false
          urlIndex++
        }
      }

      // Emitir URLs para o parent component
      emitUrls()
      console.log('[ImageUpload] Upload concluído com sucesso')
    }
  } catch (error: any) {
    console.error('[ImageUpload] Erro no upload:', error)
    console.error('[ImageUpload] Detalhes do erro:', {
      message: error.message,
      data: error.data,
      status: error.status,
      statusCode: error.statusCode
    })
    
    errorMessage.value = error.data?.message || error.message || 'Erro ao enviar imagens. Tente novamente.'
    
    // Remover imagens que falharam
    images.value = images.value.filter(img => !img.uploading)
  }
}

function removeImage(index: number) {
  // Revogar URL do preview se for um blob local
  const image = images.value[index]
  if (image && image.preview.startsWith('blob:')) {
    URL.revokeObjectURL(image.preview)
  }
  
  images.value.splice(index, 1)
  emitUrls()
}

function setPrincipal(index: number) {
  // Move a imagem para primeira posição
  const image = images.value.splice(index, 1)[0]
  if (image) {
    images.value.unshift(image)
    emitUrls()
  }
}

function emitUrls() {
  const urls = images.value
    .filter(img => img.url) // Apenas imagens com URL (já enviadas)
    .map(img => img.url!)
  
  emit('update:modelValue', urls)
}

// Limpar URLs de preview ao desmontar
onUnmounted(() => {
  images.value.forEach(img => {
    if (img.preview.startsWith('blob:')) {
      URL.revokeObjectURL(img.preview)
    }
  })
})
</script>
