<template>
  <div>
    <div class="flex">
      <div class="flex-grow pt-0">
        <div class="w-full h-full">
          <div
            :style="`height: calc(100vh - ${65 + summaryFiltersDimensions.height}px);`"
            class="relative"
          >
            <router-view
              v-show="showInPageHeader"
              name="inpage-header"
            />
            <router-view name="main-content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useUI from '../../../features/useUI'

export default {
  name: 'PageLayout',

  setup () {
    const { showInPageHeader, summaryFiltersDimensions } = useUI()
    
    return {
      showInPageHeader,
      summaryFiltersDimensions
    }
  }
}
</script>
