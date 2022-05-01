<template>
  <div
    :class="className"
    :style="{'background-color': backgroundColor, 'color': color}"
  >
    <span
      v-if="iconVisible"
      class="alerticon"
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
    <details :style="{flex: '1 1 auto'}">
      <summary>{{ summary }}</summary>
      <p>{{ details }}</p>
    </details>
    <span
      v-if="closable"
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
  name: 'Alert',
  
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
    closable: {
      type: Boolean,
      required: false,
      default: true
    },
    backgroundColor: {
      type: String,
      required: false,
      default: '#ff8888'
    },
    color: {
      type: String,
      required: false,
      default: '#EEE'
    },
    iconVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    iconName: {
      type: String,
      required: false,
      default: 'icon-danger'
    },
    iconColor: {
      type: String,
      required: false,
      default: '#EEE'
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

  setup() {
    const instance = getCurrentInstance()
    const className = ref('alert show')

    const onClose = () => {
      className.value = 'alert hide'
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
.alert {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 2px;
}

.alerticon {
  align-self: center;
  margin-right: 12px;
  fill: currentColor;
}

.closebtn {
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
  -webkit-animation: fadein 1s;
  animation: fadein 1s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.hide {
  -webkit-animation: fadeout 1s;
  animation: fadeout 1s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

@-webkit-keyframes fadein {
  from {
    top: -100px;
  }
  to {
    top: 0;
  }
}

@keyframes fadein {
  from {
    top: -100px;
  }
  to {
    top: 0;
  }
}

@-webkit-keyframes fadeout {
  from {
    top: 0;
  }
  to {
    top: -100px;
  }
}

@keyframes fadeout {
  from {
    top: 0;
  }
  to {
    top: -100px;
  }
}
</style>
