<template>
  <Teleport to="body">
    <Transition name="cropper-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        @click.self="cancel"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b">
            <h3 class="text-xl font-bold text-gray-900">Ajustar Imagem</h3>
            <button
              @click="cancel"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Cropper Area -->
          <div class="flex-1 overflow-auto p-6">
            <ClientOnly>
              <Cropper
                ref="cropperRef"
                class="cropper"
                :src="imageSrc"
                :stencil-props="{
                  aspectRatio: currentAspectRatio
                }"
                @change="onChange"
              />
            </ClientOnly>
          </div>

          <!-- Controls -->
          <div class="px-6 py-4 border-t bg-gray-50">
            <!-- Aspect Ratio Buttons -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Proporção
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="ratio in aspectRatios"
                  :key="ratio.label"
                  @click="setAspectRatio(ratio.value)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    currentAspectRatio === ratio.value
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-green-500'
                  ]"
                >
                  {{ ratio.label }}
                </button>
              </div>
            </div>

            <!-- Rotation Controls -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Rotação
              </label>
              <div class="flex gap-2">
                <button
                  @click="rotate(-90)"
                  class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-green-500 text-sm font-medium"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                  </svg>
                  -90°
                </button>
                <button
                  @click="rotate(90)"
                  class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-green-500 text-sm font-medium"
                >
                  90°
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"/>
                  </svg>
                </button>
                <button
                  @click="flip(true, false)"
                  class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-green-500 text-sm font-medium"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                  Espelhar H
                </button>
                <button
                  @click="flip(false, true)"
                  class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-green-500 text-sm font-medium"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                  Espelhar V
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-3">
              <button
                @click="cancel"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancelar
              </button>
              <button
                @click="cropAndSave"
                class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

interface Props {
  imageSrc: string
}

const props = defineProps<Props>()

const isOpen = defineModel<boolean>('isOpen', { default: false })
const emit = defineEmits<{
  crop: [file: File]
}>()

const cropperRef = ref<any>(null)
const currentAspectRatio = ref<number | undefined>(undefined)

const aspectRatios = [
  { label: 'Livre', value: undefined },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:2', value: 3 / 2 },
]

function onChange(data: any) {
  // Pode ser usado para mostrar preview em tempo real se necessário
}

function setAspectRatio(ratio: number | undefined) {
  currentAspectRatio.value = ratio
}

function rotate(angle: number) {
  if (cropperRef.value) {
    cropperRef.value.rotate(angle)
  }
}

function flip(horizontal: boolean, vertical: boolean) {
  if (cropperRef.value) {
    if (horizontal) {
      cropperRef.value.flip(true, false)
    }
    if (vertical) {
      cropperRef.value.flip(false, true)
    }
  }
}

async function cropAndSave() {
  if (!cropperRef.value) return

  const { canvas } = cropperRef.value.getResult()
  
  if (!canvas) return

  // Converter canvas para Blob
  canvas.toBlob(async (blob: Blob | null) => {
    if (!blob) return

    // Criar File a partir do Blob
    const fileName = `cropped-${Date.now()}.jpg`
    const file = new File([blob], fileName, { type: 'image/jpeg' })

    emit('crop', file)
    isOpen.value = false
  }, 'image/jpeg', 0.9)
}

function cancel() {
  isOpen.value = false
}

watch(isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.cropper-fade-enter-active,
.cropper-fade-leave-active {
  transition: opacity 0.3s ease;
}

.cropper-fade-enter-from,
.cropper-fade-leave-to {
  opacity: 0;
}

.cropper {
  max-height: 500px;
  width: 100%;
  background: #f3f4f6;
}
</style>
