<template>
  <div
    v-if="visible"
    class="overlay"
    :style="computedStyle"
  >
    <div class="overlay-content">
      <slot />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Overlay',

  components: {
  },
  
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    bgColor: {
      type: String,
      default: null
    },
    blur: {
      type: String,
      default: '2px'
    },
    fixed: {
      type: Boolean,
      required: false,
      default: true
    },
    opacity: {
      type: [Number, String],
      default: 0.85
    },
    zIndex: {
      type: [Number, String],
      default: 10
    },
    borderRadius: {
      type: [Number, String],
      default: '5px'
    }
  },

  setup (props) {
    const computedStyle = computed(() => {
      return {
          zIndex: props.zIndex,
          opacity: props.opacity,
          backgroundColor: props.bgColor || null,
          backdropFilter: props.blur ? `blur(${props.blur})` : null,
          position: props.fixed ? 'fixed' : 'absolute',
          borderRadius: props.borderRadius ? `${props.borderRadius}` : null
      }
    })

    return {
      computedStyle
    }
  }
}
</script>

<style scoped>
.overlay {
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
