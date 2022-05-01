<template>
  <div class="fullscreen-layout-wrapper">
    <main>
      <div>
        <router-view name="main-content" />
      </div>
    </main>
    <footer>
      <router-view name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FullscreenLayout'
}
</script>
