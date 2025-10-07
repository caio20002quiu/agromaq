<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        @click="close"
        @keydown.esc="close"
        @keydown.left="prev"
        @keydown.right="next"
        tabindex="0"
      >
        <!-- Botão Fechar -->
        <button
          @click.stop="close"
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Fechar"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Contador de Imagens -->
        <div class="absolute top-4 left-4 text-white text-sm font-medium z-10">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>

        <!-- Imagem Principal -->
        <div class="relative w-full h-full flex items-center justify-center px-20" @click.stop>
          <img
            :src="currentImage"
            :alt="`Imagem ${currentIndex + 1}`"
            class="max-w-full max-h-full object-contain cursor-zoom-in"
            @click="toggleZoom"
            :class="{ 'cursor-zoom-out scale-150': isZoomed }"
          />
        </div>

        <!-- Botão Anterior -->
        <button
          v-if="images.length > 1"
          @click.stop="prev"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
          aria-label="Imagem anterior"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Botão Próxima -->
        <button
          v-if="images.length > 1"
          @click.stop="next"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
          aria-label="Próxima imagem"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Miniaturas na parte inferior -->
        <div
          v-if="images.length > 1"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-screen-lg px-4"
          @click.stop
        >
          <button
            v-for="(img, index) in images"
            :key="index"
            @click="currentIndex = index"
            :class="[
              'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
              currentIndex === index ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'
            ]"
          >
            <img :src="img" :alt="`Miniatura ${index + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  images: string[]
  initialIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialIndex: 0
})

const isOpen = defineModel<boolean>('isOpen', { default: false })
const currentIndex = ref(props.initialIndex)
const isZoomed = ref(false)

const currentImage = computed(() => props.images[currentIndex.value] || '')

watch(() => props.initialIndex, (newIndex) => {
  currentIndex.value = newIndex
})

watch(isOpen, (open) => {
  if (open) {
    currentIndex.value = props.initialIndex
    isZoomed.value = false
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    isZoomed.value = false
  }
})

function close() {
  isOpen.value = false
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.images.length - 1
  }
  isZoomed.value = false
}

function next() {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  isZoomed.value = false
}

function toggleZoom() {
  isZoomed.value = !isZoomed.value
}

// Suporte a gestos de toque
let touchStartX = 0
let touchEndX = 0

function handleTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0].screenX
}

function handleTouchEnd(e: TouchEvent) {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

function handleSwipe() {
  const swipeThreshold = 50
  if (touchStartX - touchEndX > swipeThreshold) {
    next()
  }
  if (touchEndX - touchStartX > swipeThreshold) {
    prev()
  }
}

onMounted(() => {
  document.addEventListener('touchstart', handleTouchStart)
  document.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  document.removeEventListener('touchstart', handleTouchStart)
  document.removeEventListener('touchend', handleTouchEnd)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

img {
  transition: transform 0.3s ease;
}
</style>
