<template>
  <div class="w-16">
    <img
      v-if="icon === 'icon-globe'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-globe.svg"
      alt="icon-globe"
    />
    <img
      v-else-if="icon === 'icon-marketshare'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-marketshare.svg"
      alt="icon-marketshare"
    />
    <img
      v-else-if="icon === 'icon-channel'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-channel.svg"
      alt="icon-channel"
    />
    <img
      v-else-if="icon === 'icon-shopper'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-shopper.svg"
      alt="icon-shopper"
    />
    <img
      v-else-if="icon === 'icon-promo'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-promo.svg"
      alt="icon-promo"
    />
    <img
      v-else-if="icon === 'icon-dashboard-default'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-dashboard-default.svg"
      alt="icon-dashboard-default"
    />
    <img
      v-else-if="icon === 'icon-organigram'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-organigram.svg"
      alt="icon-organigram"
    />
    <img
      v-else-if="icon === 'icon-explore'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-explore.svg"
      alt="icon-explore"
    />
    <img
      v-else-if="icon === 'icon-glossary'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-glossary.svg"
      alt="icon-glossary"
    />
    <img
      v-else-if="icon === 'icon-support'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-support.svg"
      alt="icon-support"
    />
    <img
      v-else-if="icon === 'icon-folders'"
      svg-inline
      class="w-8 h-auto mx-auto outline-none fill-current"
      src="../../assets/icons/icon-folders.svg"
      alt="icon-folders"
    />
  </div>
</template>

<script>
export default {
  name: 'MenuIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
