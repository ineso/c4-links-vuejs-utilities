<template>
  <button
    type="button"
    :class="buttonClass"
    :disabled="disabled"
  >
    <span
      v-if="icon"
      :class="icon"
    />
    {{ label }}
  </button>
</template>

<script scoped>
import { computed } from 'vue'

export default {
  name: 'Button',

  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    shadow: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  setup (props) {
    const buttonClass = computed(() => {
      return {
          'button': !props.disabled,
          'button-disabled': props.disabled,
          'button-shadow': props.shadow
      }
    })

    return {
      buttonClass
    }
  }
}
</script>

<style>
.button {
  background-color: rgb(59, 130, 246);
  font-weight: bold;
  color: white;
  padding: 10px;
  margin: 12px 0px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid rgb(59, 130, 246);
  border-radius: 10px;
}

.button-disabled {
  background-color: rgb(59, 130, 246);
  font-weight: bold;
  color: white;
  padding: 10px;
  margin: 12px 0px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid rgb(59, 130, 246);
  border-radius: 10px;
  cursor: default;
  opacity: 0.80;
}

.button-shadow {
  box-shadow: 4px 4px 4px #999;
}

.button:hover {
  background-color: rgb(100, 159, 255);
}

.button:active {
  background-color: rgb(30, 113, 247);
  box-shadow: 0 0;
  transform: translate(2px, 2px);
}

</style>
