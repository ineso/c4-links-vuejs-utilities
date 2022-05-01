const path = require('path')

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        'c4-links-vuejs-utilities/alert': path.resolve(__dirname, 'src/components/Common/Alert.vue'),
        'c4-links-vuejs-utilities/animatedping': path.resolve(__dirname, 'src/components/Common/AnimatedPing.vue'),
        'c4-links-vuejs-utilities/button': path.resolve(__dirname, 'src/components/Common/Button.vue'),
        'c4-links-vuejs-utilities/loader': path.resolve(__dirname, 'src/components/Common/Loader.vue'),
        'c4-links-vuejs-utilities/loadingbar': path.resolve(__dirname, 'src/components/Common/LoadingBar.vue'),
        'c4-links-vuejs-utilities/overlay': path.resolve(__dirname, 'src/components/Common/Overlay.vue'),
        'c4-links-vuejs-utilities/sidenav': path.resolve(__dirname, 'src/components/Common/SideNav.vue'),
        'c4-links-vuejs-utilities/spinner': path.resolve(__dirname, 'src/components/Common/Spinner.vue'),
        'c4-links-vuejs-utilities/toast': path.resolve(__dirname, 'src/components/Common/Toast.vue'),
        'c4-links-vuejs-utilities/carrefourlogo': path.resolve(__dirname, 'src/components/Icons/CarrefourLogo.vue'),
        'c4-links-vuejs-utilities/icon-danger': path.resolve(__dirname, 'src/components/Icons/Danger.vue'),
        'c4-links-vuejs-utilities/icon-help': path.resolve(__dirname, 'src/components/Icons/Help.vue'),
        'c4-links-vuejs-utilities/icon-info': path.resolve(__dirname, 'src/components/Icons/Info.vue'),
      },
    },
    output: {
      libraryExport: 'default'
    }
  },
  css: {
    extract: false
  }
}