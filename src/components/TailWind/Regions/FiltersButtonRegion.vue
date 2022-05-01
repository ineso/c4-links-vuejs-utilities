<template>
  <div class="block sm:ml-6">
    <div class="flex custom-nav">
      <a
        href="javascript:void(0)"
        class="flex items-center px-3 mt-2 text-sm font-medium leading-5 text-white transition
               duration-150 ease-in-out focus:outline-none focus:text-white"
        data-cy="btn_sidebar_filters"
        @click="showSidebar = !showSidebar"
      >
        <img
          src="../../../assets/icons/icon-gear.svg"
          svg-inline
          class="w-5 h-5 mr-2 text-white fill-current"
        >
        <span>{{ showSidebar ? 'Hide' : 'Change' }} filters</span>
      </a>
    </div>
  </div>
</template>

<script>
import useUI from '../../../features/useUI'

export default {
  name: 'FiltersButtonRegion',

  setup () {
    const { showSidebar } = useUI()

    return {
      showSidebar
    }
  }
}
</script>
