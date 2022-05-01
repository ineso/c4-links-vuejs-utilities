<template>
  <div
    :class="className"
    :style="{'background-color': backgroundColor,
             'margin-left': marginLeft,'margin-bottom': marginBottom,
             'color': color, 'width': toastWidth, 'border-color': `solid ${color}`}"
  >
    <span
      v-if="iconVisible"
      class="toasticon"
      :style="{'color': iconColor}"
    >
      <InfoIcon
        v-if="iconName === 'icon-info'"
        :style="{width: iconSize, height: 'auto', fill: 'currentColor'}"
      />
      <HelpIcon
        v-if="iconName === 'icon-help'"
        :style="{width: iconSize, height: 'auto', fill: 'currentColor'}"
      />
      <DangerIcon
        v-if="iconName === 'icon-danger'"
        :style="{width: iconSize, height: 'auto', fill: 'currentColor'}"
      />
    </span>
    <div :style="{flex: '1 1 auto'}">
      <span class="font-bold">{{ summary }}</span>
      <div>{{ details }}</div>
    </div>
    <span
      class="closebtn"
      @click="onClose"
    >
      &times;
    </span>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import InfoIcon from '../Icons/Info.vue'
import HelpIcon from '../Icons/Help.vue'
import DangerIcon from '../Icons/Danger.vue'

export default {
  name: 'Toast',
  
  components: {
    InfoIcon,
    HelpIcon,
    DangerIcon
  },

  props: {
    summary: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: false,
      default: ''
    },
    backgroundColor: {
      type: String,
      required: false,
      default: '#EEE'
    },
    color: {
      type: String,
      required: false,
      default: '#333'
    },
    marginLeft: {
      type: String,
      required: false,
      default: '25%'
    },
    marginRight: {
      type: String,
      required: false,
      default: '25%'
    },
    marginBottom: {
      type: String,
      required: false,
      default: '3%'
    },
    toastWidth:{
      type: String,
      required: false,
      default: '50%'
    },
    iconVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    iconName: {
      type: String,
      required: false,
      default: 'icon-info'
    },
    iconColor: {
      type: String,
      required: false,
      default: '#333'
    },
    iconSize: {
      type: String,
      required: false,
      default: '32px'
    }
  },

  emits: [
    'close'
  ],

  setup(props) {
    const instance = getCurrentInstance()
    const className = ref('toast show')

    const onClose = () => {
      className.value = 'toast hide'
      instance.emit('close', {})
    }

    return {
      className,
      onClose
    }
  }
}
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  align-items: flex-start;
  min-width: 300px;
  border: solid;
  border-width: 0 5px 0 5px;
  text-align: center;
  border-radius: 5px;
  padding: 12px;
  position: fixed;
  z-index: 10;
}

.toasticon {
  align-self: center;
  margin-right: 12px;
  fill: currentColor;
}

.closebtn {
  color: #333;
  margin-left: 12px;
  font-weight: bold;
  font-size: 25px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: #999;
}

.show {
  -webkit-animation: fadein 0.5s;
  animation: fadein 0.5s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.hide {
  -webkit-animation: fadeout 0.5s;
  animation: fadeout 0.5s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

@-webkit-keyframes fadein {
  from { 
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
  to {
    left: 0;
    right: 0;
    bottom: 30px;
    opacity: 0.85;
  }
}

@keyframes fadein {
  from {
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
  to {
    left: 0;
    right: 0;
    bottom: 30px;
    opacity: 0.85;
  }
}

@-webkit-keyframes fadeout {
  from {
    left: 0;
    right: 0;
    bottom: 30px;
    opacity: 0.85;
  }
  to {
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    left: 0;
    right: 0;
    bottom: 30px;
    opacity: 0.85;
  }
  to {
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
}

</style>
