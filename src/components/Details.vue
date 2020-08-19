<template>
  <div class="details">
    <div>
      <div class="main">
        <h3>{{ selected.title }}</h3>
        <h4>{{ selected.price }}</h4>
      </div>
      <span class="description">{{ selected.description }}</span>
      <ol class="gallery" v-for="img in selected.images" :key="img.type">
        <li><img :src="img.src" /></li>
      </ol>
      <h5>Select size</h5>
      <ol v-for="size in shoesizes" :key="size">
        <li>{{ size }}</li>
      </ol>
      <button>Add to Bag</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    shoesizesraw: process.env.VUE_APP_SHOE_SIZES,
  }),
  computed: {
    shoesizes: function() {
      return this.shoesizesraw.split(', ');
    },
  },
  props: {
    selected: Object,
  },
};
</script>

<style scoped>

</style>
