<template>
  <div class="default-layout-wrapper">
    <div
      id="app"
      class="relative w-full font-primary"
      :class="{'show-sidebar': showSidebar}"
    >
      <div
        v-if="showSidebar"
        class="fixed inset-0 z-10 bg-black bg-opacity-0 custom-overlay"
        @click="clickOverlay"
      />
      <router-view name="header" />
      <router-view name="filters" />
      <div
        class="relative w-full transition-all duration-300 transform translate-x-0 site-canvas"
        :class="{'-translate-x-96': showSidebar }"
        :style="{ height: 'calc(100vh - 65px)' }"
      >
        <router-view
          v-if="enable"
          name="menu"
        />
        <div :class="{ 'pl-16':enable }">
          <div class="transition-all duration-300 transform">
            <div class="h-full pt-0 mb-0">
              <div
                v-show="showInPageHeader"
                id="filters-summary"
                ref="filters"
              />
              <router-view name="main-content" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-teleport" />
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import useUI from '../../../features/useUI'

export default {
  name: 'DefaultLayout',

  props: {
    enable: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  setup () {
    const { showSidebar, showInPageHeader, observe, summaryFiltersDimensions } = useUI()
    const filters = ref(null)
    let observer = null

    onMounted(() => {
      observer = observe(filters.value, summaryFiltersDimensions)
    })

    onUnmounted(() => {
      if (observer) {
        observer.unobserve()
      }
    })

    const clickOverlay = () => {
      showSidebar.value = false
    }

    return {
      summaryFiltersDimensions,
      filters,
      clickOverlay,
      showSidebar,
      showInPageHeader
    }
  }
}
</script>
