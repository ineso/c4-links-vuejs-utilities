<template>
  <div
    v-if="visible"
    :class="`lds-${type}`"
  >
    <div
      v-for="n in nbItems"
      :key="n"
      :style="computedStyle"
    />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Spinner',

  props: {
    visible: {
      type: Boolean,
      required: false,
      default: true
    },
    type: {
      type: String,
      required: false,
      default: 'ring'
    },
    color: {
      type: String,
      required: false,
      default: '#fff'
    },
    opacity: {
      type: [Number, String],
      default: 1.0
    }
  },

  setup (props) {
    const computedStyle = computed(() => {
      const style = {
          opacity: props.opacity,
          borderColor: props.type === 'ring' ? 
            props.color + ' transparent transparent transparent' : null,
          background: props.type === 'ring' ? null: props.color
      }

      return style
    })

    const nbItems = computed(() => {
      switch(props.type) {
        case 'ring':
          return 4
        case 'roller':
          return 8
        case 'facebook':
          return 3
        case 'spinner':
          return 12
        default:
          return 0
      }
    })
    return {
      computedStyle,
      nbItems
    }
  }
}
</script>

<style scoped>

/* ring */
.lds-ring {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 80px;
  height: 80px;
  margin: 10px;
  border: 10px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* roller */

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
  background: #fff;
}

.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: inherit;
  margin: -4px 0 0 -4px;
}

.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}

.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}

.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}

.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}

.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}

.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}

.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}

.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}

.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}

.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}

.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}

.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}

.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}

.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}

.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}

@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* facebook */

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}

.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}

.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}

@keyframes lds-facebook {
  0% {
    top: 2px;
    height: 70px;
  }
  
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}

/* spinner */

.lds-spinner {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
}

.lds-spinner div {
  transform-origin: 50px 50px;
  animation: lds-spinner 1.2s linear infinite;
  background: #fff;
}

.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 0px;
  left: 45px;
  width: 6px;
  height: 25px;
  border-radius: 20%;
  background: inherit;
}

.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}

.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}

.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}

.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}

.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}

.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}

.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}

.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}

.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}

.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}

.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}

.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
}

</style>
