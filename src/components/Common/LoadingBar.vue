<template>
  <div class="loading-bar">
    <span
      v-show="progress>0"
      :class="`${animate?'animate':''}`"
      :style="`width: ${progress}%`"
    />
  </div>
</template>

<script>
export default {
  name: 'LoadingBar',

  props: {
    progress: {
      type: Number,
      required: false,
      default: 0
    },
    animate: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>

.loading-bar {
  height: 20px;
  width: 100%; 
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  -ms-border-radius: 25px;
  border-radius: 20px;
  box-sizing: content-box; 
  background-color: grey;
  background-repeat: repeat;
  -webkit-box-shadow: inset 0 -10px 5px rgba(255, 255, 255, .25);
  -moz-box-shadow: inset 0 -10px 5px rgba(255, 255, 255, .25);
  -ms-box-shadow: inset 0 -10px 5px rgba(255, 255, 255, .25);
  box-shadow: inset 0 -10px 5px rgba(255, 255, 255, .25);
}

.loading-bar span {
  display: inline-block;
  background-repeat: repeat;
  height: 100%;
  border: 1px solid #0a5091;
  border-bottom-color: #0a5091;
  background-color: #d3d3d3;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  border-radius: 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  background-image: -webkit-linear-gradient(-45deg,
    #0a5091 25%, transparent 25%, transparent 50%,
    #0a5091 50%, #0a5091 75%, transparent 75%,
    transparent
  );
  background-image: -moz-linear-gradient(-45deg,
    #0a5091 25%, transparent 25%, transparent 50%,
    #0a5091 50%, #0a5091 75%, transparent 75%,
    transparent
  );
  background-image: -ms-linear-gradient(-45deg,
    #0a5091 25%, transparent 25%, transparent 50%, 
    #0a5091 50%, #0a5091 75%, transparent 75%,
    transparent
  );
  background-image: linear-gradient(-45deg,
    #0a5091 25%, transparent 25%, transparent 50%,
    #0a5091 50%, #0a5091 75%, transparent 75%,
    transparent
  );
  -webkit-background-size: 50px 50px;
  -moz-background-size: 50px 50px;
  -ms-background-size: 50px 50px;
  background-size: 50px 50px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  border-radius: 20px;
  overflow: hidden ;
  -webkit-box-shadow: inset 0 10px 5px rgba(255, 255, 255, .25);
  -moz-box-shadow: inset 0 10px 5px rgba(255, 255, 255, .25);
  -ms-box-shadow: inset 0 10px 5px rgba(255, 255, 255, .25);
  box-shadow: inset 0 10px 5px rgba(255, 255, 255, .25);
}

.animate {
  -webkit-animation: move 2s linear infinite;
  -moz-animation: move 2s linear infinite;
  -ms-animation: move 2s linear infinite;
  animation: move 2s linear infinite;
}

.loading-bar > span:after {
  display: none;
}

@-webkit-keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

@-moz-keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

@-ms-keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

@keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}
</style>
