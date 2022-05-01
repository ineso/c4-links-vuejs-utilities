<template>
  <div
    class="loader"
    :style="computedStyle"
  >
    <div />
    <div />
    <div />
    <div>
      {{ loadingText }}
    </div>
    <div />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Loader',

  props: {
    fixed: {
      type: Boolean,
      required: false,
      default: false
    },
    loadingText: {
      type: String,
      required: false,
      default: 'Loading…'
    }
  },

  setup (props) {
    const computedStyle = computed(() => {
      let style = {
          position: props.fixed ? 'fixed' :'absolute',
      }
      if (props.fixed) {
        style = {
          ...style,
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }

      return style
    })

    return {
      computedStyle
    }
  }
}
</script>

<style scoped>

.loader div:nth-child(1) {
  position: absolute;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0;
  top: 50%;
  left: 50%;
  width: 3rem;
  height: 3rem;
  margin-top: -1.5rem;
  margin-left: -1.5rem;
  transform: rotateX(70deg) rotateY(0deg) rotateZ(45deg) translateZ(30px);
  -webkit-animation: loadingTranslateIn 1.5s ease-in infinite 500ms;
  animation: loadingTranslateIn 1.5s ease-in infinite 500ms;
}

.loader div:nth-child(2) {
  position: absolute;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0;
  top: 50%;
  left: 50%;
  width: 3rem;
  height: 3rem;
  margin-top: -1.5rem;
  margin-left: -1.5rem;
  transform: rotateX(70deg) rotateY(0deg) rotateZ(45deg) translateZ(60px);
  -webkit-animation: loadingTranslateIn 1.5s ease-in infinite 700ms;
  animation: loadingTranslateIn 1.5s ease-in infinite 700ms;
}

.loader div:nth-child(3) {
  position: absolute;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0;
  top: 50%;
  left: 50%;
  width: 3rem;
  height: 3rem;
  margin-top: -1.5rem;
  margin-left: -1.5rem;
  transform: rotateX(70deg) rotateY(0deg) rotateZ(45deg) translateZ(90px);
  -webkit-animation: loadingTranslateIn 1.5s ease-in infinite 800ms;
  animation: loadingTranslateIn 1.5s ease-in infinite 800ms;
}

.loader div:nth-child(4) {
  position: absolute; 
  width: 100%;
  text-transform: uppercase;
  color: rgba(113, 128, 150, 1);
  text-align: center;
  top: 50%;
  margin-top: 1.5rem;
  font-weight: 500;
}

.loader div:nth-child(5) {
  position: absolute;
  background-color: rgba(0, 0, 0, 1);
  opacity: 0;
  top: 50%;
  left: 50%;
  width: 4rem;
  height: 4rem;
  margin-top: -2rem;
  margin-left: -2rem;
  transform: rotateX(60deg) rotateY(0deg) rotateZ(45deg) scale(0);
  -webkit-animation: loadingScaleIn 3s linear infinite 500ms;
  animation: loadingScaleIn 3s linear infinite 500ms;
}

@-webkit-keyframes loadingTranslateIn {
  30% {
    transform: rotateX(60deg) rotateY(0deg) rotateZ(45deg) translateZ(20px) scale(0.95);
    opacity: 0.25;
  }

  100% {
    transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) translateZ(0px) scale(0.85);;
    opacity: 0;
  }
}

@keyframes loadingTranslateIn {
  30% {
    transform: rotateX(60deg) rotateY(0deg) rotateZ(45deg) translateZ(20px) scale(0.95);
    opacity: 0.25;
  }

  100% {
    transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) translateZ(0px) scale(0.85);;
    opacity: 0;
  }
}

@-webkit-keyframes loadingScaleIn {
  80% {
    transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) scale(1.25);
    opacity: 0.1;
  }

  100% {
    transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) scale(1);
    opacity: 0;
  }
}

@keyframes loadingScaleIn {
  80% {
    transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) scale(1.25);
    opacity: 0.1;
  }

  100% {
    transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) scale(1);
    opacity: 0;
  }
}
</style>
