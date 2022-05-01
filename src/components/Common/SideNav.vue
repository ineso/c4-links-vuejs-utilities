<template>
  <div
    :class="`sidenav ${overlay?'overlay':''}`"
    :style="computedStyle"
  >
    <div class="close-sidenav-btn">
      <a
        v-if="closable"
        href="javascript:void(0)"
        @click="hide"
      >
        &times;
      </a>
    </div>
    <slot />
  </div>
</template>

<script>
import { getCurrentInstance, computed } from 'vue'

export default {
  name: 'SideNav',

  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    closable: {
      type: Boolean,
      required: false,
      default: true
    },
    overlay: {
      type: Boolean,
      required: false,
      default: false
    },
    width: {
      type: String,
      required: false,
      default: '200px'
    },
    minWidth: {
      type: String,
      required: false,
      default: '0'
    },
    maxWidth: {
      type: String,
      required: false,
      default: 'auto'
    },
  },
  
  emits: ['update:visible'],

  setup(props) {
    const instance = getCurrentInstance()

    const hide = () => {
      instance.emit('update:visible', false)
    }

    const computedStyle = computed(() => {
      return {
        width: props.visible ? props.width : '200px',
        minWidth: props.visible ? props.minWidth : '0',
        maxWidth: props.visible ? props.maxWidth : '0',
      }
    })

    return {
      hide,
      computedStyle
    }
  }

}
</script>

<style scoped>
.sidenav {
  width: 0;
  overflow-x: hidden;
  transition: 0.6s;
  padding-top: 15px;
}

.overlay {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  margin-top: 0px;
  height: 100%;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  color: #818181;
  transition: color 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.close-sidenav-btn {
  font-weight: bold;
  line-height: 20px;
  cursor: pointer;
  float: none;
  text-align: right;
}

.sidenav .close-sidenav-btn {
  font-size: 36px;
}
</style>
