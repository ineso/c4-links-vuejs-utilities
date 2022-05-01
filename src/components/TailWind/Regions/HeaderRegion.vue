<template>
  <nav class="relative z-20 shadow bg-blue-carrefour">
    <div class="max-w-full px-2 mx-auto sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex items-center justify-start flex-1 sm:items-stretch">
          <div class="flex-shrink-0">
            <div class="flex items-center">
              <router-link
                :to="{name: 'Welcome'}"
                @click="onClickLogo"
              >
                <CarrefourLogo
                  class="h-6"
                />
              </router-link>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center flex-1 sm:items-stretch">
          <div class="flex-shrink-0">
            <div class="flex items-center">
              <span class="px-3 text-sm text-white align-middle">
                {{ title }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex">
          <router-view name="header-prepend" />
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static
                   sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <div class="relative ml-3">
              <div class="flex items-center">
                <img
                  v-if="logo"
                  :src="logo"
                  class="h-8 mr-2 text-gray-300"
                  :style="logoStyle === 'white' ? 'filter: brightness(0) invert(1);' : ''"
                >
                <div
                  v-else
                  class="flex flex-shrink-0 w-10 h-10 text-sm transition duration-150
                         ease-in-out border-2 border-transparent rounded-full
                         focus:outline-none focus:border-white"
                >
                  <div class="w-8 h-8 bg-gray-100 bg-opacity-25 rounded-full">
                    <img
                      src="../../../assets/icons/icon-avatar.svg"
                      svg-inline
                      class="w-8 h-8 text-gray-300 rounded-full fill-current"
                      fill="currentColor"
                    >
                  </div>
                </div>
                <div class="ml-2">
                  <div
                    v-if="username"
                    class="text-sm leading-4 text-white bold"
                  >
                    {{ username }}
                  </div>
                  <div
                    v-if="company"
                    class="text-xs leading-4 text-white capitalize"
                  >
                    {{ company }}
                  </div>
                </div>
                <button
                  type="button"
                  class="py-2 pl-2 outline-none hover:opacity-75"
                  data-cy="btn_logout"
                  @click="logoutConfirm"
                >
                  <img
                    src="../../../assets/icons/icon-logout.svg"
                    svg-inline
                    class="w-6 ml-2 text-white outline-none fill-current"
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getCurrentInstance } from 'vue'
import useUser from '../../../features/useUser'

export default {
  name: 'HeaderRegion',

  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    logo: {
      type: String,
      required: false,
      default: null
    },
    logoStyle: {
      type: String,
      required: false,
      default: 'white'
    },
    username: {
      type: String,
      required: false,
      default: ''
    },
    company: {
      type: String,
      required: false,
      default: ''
    },
  },

  emits: [
    'click'
  ],

  setup () {
    const instance = getCurrentInstance()
    const { logout } = useUser()

    const logoutConfirm = () => {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to logout?')) {
        logout()
      }
    }

    const onClickLogo = ()  => {
      instance.emit('click', null)
    }

    return {
      logoutConfirm,
      onClickLogo,
    }
  }
}
</script>
