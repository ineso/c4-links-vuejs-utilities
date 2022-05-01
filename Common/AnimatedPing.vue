<template>
  <div v-if="visible">
    <span :style="computedStyle1">
      <span
        :style="computedStyle2"
        class="inline-flex animate-ping"
      />
      <span
        :style="computedStyle3"
        class="inline-flex"
      />
    </span>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'AnimatedPing',
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: false
    },
    size: {
      type: String,
      default: '0.5rem',
      required: false
    },
    color: {
      type: String,
      default: '#8B979E',
      required: false
    },
  },

  setup (props) {
    const computedStyle1 = computed(() => {
      return {
          position: 'relative',
          top: '0px',
          display: 'flex',
          width: props.size,
          height: props.size,
          marginLeft: '0.25rem'
      }
    })

    const computedStyle2 = computed(() => {
      return {
          position: 'absolute',
          width: props.size,
          height: props.size,
          opacity: '0.50',
          borderRadius: '9999px',
          backgroundColor: props.color
      }
    })

    const computedStyle3 = computed(() => {
      return {
          position: 'relative',
          width: '100%',
          opacity: '0.75',
          borderRadius: '9999px',
          backgroundColor: props.color
      }
    })

    return {
      computedStyle1,
      computedStyle2,
      computedStyle3
    }
  }
}
</script>

<style scoped>
.inline-flex {
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
