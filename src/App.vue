<template>
  <div>
    <Overlay
      :visible="showOverlay"
      bg-color="rgba(0, 0, 0, 0.2)"
    >
      <Spinner
        type="spinner"
        opacity="2.0"
        color="rgba(255, 0, 0, 1.0)"
      />
    </Overlay>
    <div>
      <Alert
        v-if="showError"
        summary="An error occurred."
        details="Please try again later"
        @close="onCloseAlert"
      />
    </div>
    <div>
      <AnimatedPing 
        :style="{'margin': '5px'}"
        :visible="true"
        size="12px"
        color="blue"
      />
    </div>
    <div :style="{'background-color': '#235695', 'color': 'white'}">
      <CarrefourLogo
        :full="false"
        :style="{'height': '50px', 'margin': '5px'}"
      />
      <CarrefourLogo
        :full="true"
        :style="{'height': '50px', 'margin': '5px'}"
      />
    </div>
    <div :style="{'padding': '5px'}">
      <LoadingBar
        :style="{'height': '25px'}"
        progress="50"
        :animate="true"
      />
    </div>
    <div>
      <MenuIcon 
        icon="icon-globe"
      />
    </div>
    <div>
      <Button
        label="Start"
        class="px-4 mx-2"
        :shadow="true"
        @click="console.log('start')"
      />
      <Button
        label="Disabled"
        class="px-4 mx-2"
        :shadow="true"
        :disabled="true"
        @click="console.log('start')"
      />
    </div>
    <div>
      <Spinner
        class="px-5 mx-3"
        type="spinner"
        opacity="1.0"
        color="rgba(64, 64, 64, 1.0)"
      />
      <Spinner
        class="px-5 mx-3"
        type="ring"
        opacity="1.0"
        color="rgba(64, 64, 64, 1.0)"
      />
      <Spinner
        class="px-5 mx-3"
        type="roller"
        opacity="1.0"
        color="rgba(64, 64, 64, 1.0)"
      />
      <Spinner
        class="px-5 mx-3"
        type="facebook"
        opacity="1.0"
        color="rgba(64, 64, 64, 1.0)"
      />
    </div>
    <div>
      <DateRangeForm
        v-if="showDateRange"
        v-model:dateRangeStart="startDate"
        v-model:dateRangeEnd="endDate"
        v-model:period="period"
        :showPeriod="true"
        @apply="applyCustom"
      />
    </div>
    <div>
      <Loader
        :style="{'margin': '100px'}"
        :fixed="true"
      />
    </div>
    <div>
      <Toast
        summary="IMPORTANT NOTICE:"
        iconName="icon-info"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. 
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
        :iconVisible="true"
        iconSize="48px"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Overlay from "./components/Common/Overlay.vue"
import Spinner from "./components/Common/Spinner.vue"
import Alert from "./components/Common/Alert.vue"
import AnimatedPing from "./components/Common/AnimatedPing.vue"
import Button from "./components/Common/Button.vue"
import CarrefourLogo from "./components/Icons/CarrefourLogo.vue"
import LoadingBar from "./components/Common/LoadingBar.vue"
import Loader from "./components/Common/Loader.vue"
import Toast from "./components/Common/Toast.vue"
import MenuIcon from "./components/TailWind/MenuIcon.vue"
import DateRangeForm from "./components/TailWind/DateRangeForm.vue"

export default {
  name: 'App',

  components: {
    Overlay,
    Spinner,
    Alert,
    AnimatedPing,
    Button,
    CarrefourLogo,
    LoadingBar,
    Loader,
    Toast,
    MenuIcon,
    DateRangeForm
  },

  setup () {
    const showError = ref(true)
    const showOverlay = ref(true)
    const showDateRange = ref(true)
    const startDate = ref(new Date())
    const endDate = ref(new Date())
    const period = ref('Current')

    const onCloseAlert = () => {
      showError.value = false
    }

    setTimeout(() => { showOverlay.value = false }, 3000)

    const applyCustom = () => {
      showDateRange.value =false
    }

    return {
      showError,
      showOverlay,
      showDateRange,
      onCloseAlert,
      applyCustom,
      startDate,
      endDate,
      period
    }
  }
}
</script>

