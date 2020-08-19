<template>
  <div id="app">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    title: process.env.VUE_APP_TITLE,
  }),
  components: {},
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
