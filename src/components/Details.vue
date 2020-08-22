<template>
  <div class="details">
    <div class="main">
      <h2>{{ selectedObject.title }}</h2>
      <h3>{{ formatPrice(selectedObject.price) }}</h3>
    </div>
    <span class="description">{{ selectedObject.description }}</span>
    <ol class="gallery">
      <li
        v-for="(img, index) in selectedObject.images"
        :key="img.type"
        :class="{ selgallery: selgallery == index }"
      >
        <button @click="selgallery = index">
          <img :src="img.src" />
        </button>
      </li>
    </ol>
    <h3>Select size</h3>
    <ol class="size">
      <li
        v-for="(size, index) in shoesizes"
        :key="size"
        :class="{ selsize: selsize == index }"
      >
        <button
          @click="selsize = index"
          :disabled="selectedObject.soldout.includes(size)"
        >
          {{ size }}
        </button>
      </li>
    </ol>
    <button class="button add" @click="notify()">Add to Bag</button>
  </div>
</template>

<script>
import mixinFuncs from './../store/modules/misc.js';
import config from '../assets/items.json';

export default {
  mixins: [mixinFuncs],
  created() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  data: () => ({
    shoesizesraw: process.env.VUE_APP_SHOE_SIZES,
    selgallery: 0,
    selsize: undefined,
  }),
  methods: {
    onDeviceReady() {
      document.addEventListener('backbutton', this.onBackKeyDown, false);
    },
    onBackKeyDown() {
      alert('back');
    },
  },
  computed: {
    shoesizes: function() {
      return this.shoesizesraw.split(', ');
    },
    selectedObject: function() {
      return config.mainitems.filter((item) =>
        item.title.includes(this.selected)
      )[0];
    },
  },
  props: {
    selected: String,
  },
};
</script>

<style scoped>
button:disabled {
  background: var(--bg-scnd) !important;
}
.button {
  width: 100%;
  padding: 1em;
  border-radius: 0.7em;
  color: white;
  font-weight: 500;
  font-size: large;
  background: var(--accent);
}
.selsize {
  border: 0.15em solid var(--accent) !important;
  font-weight: bold;
}
.size > li:focus-within {
  box-shadow: 0px 3px 9px 0pt rgb(32 39 52 / 0.4);
}
.size > li > button:focus {
  outline: 0;
}
.size > li > button {
  padding: 0.6em;
  border: 0;
  width: 100%;
  background: white;
  font-family: 'avant garde';
  letter-spacing: 0.055em;
  color: #131922;
  font-size: 01em;
  font-weight: inherit;
}
.size > li {
  border-radius: 0.7em;
  overflow: hidden;
  text-align: center;
  color: var(--accent);
  border: 0.15em solid #2027340f;
}
.size {
  display: grid;
  gap: 1em;
  grid-template-columns: auto auto auto auto;
  grid-auto-flow: row;
  align-items: center;
  margin-bottom: 1.5em;
}

.selgallery {
  border: 0.15em solid var(--accent) !important;
}
.gallery > li > button,
.gallery > li > button > img {
  width: 100%;
  /* flex-shrink: 0;
  min-width: 100%;
  min-height: 100%; */
}
.gallery > li > button {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 5em;
  height: 5em;
  padding: 0.25em;
  background: var(--bg-scnd);
  border: 0;
}

.gallery > li:focus-within {
  box-shadow: 0px 3px 9px 0pt rgb(32 39 52 / 0.4);
}
.gallery > li > button:focus {
  outline: 0;
  /* border: 2px solid gray; */
  box-shadow: 0px 4px 7px 0pt rgb(32 39 52 / 15%);
}
.gallery > li {
  border-radius: 1em;
  overflow: auto;
  border: 0.15em solid transparent;
}
.gallery {
  display: grid;
  gap: 1em;
  grid-auto-columns: auto auto auto;
  grid-template-columns: auto auto auto;
  width: max-content;
  grid-auto-flow: row;
  align-items: center;
  margin-bottom: 2em;
}
main > h3 {
  font-family: 'avant garde';
  letter-spacing: 0.02em;
}
.main > h2,
.main > h3 {
  color: var(--accent);
}
.main {
  display: grid;
  grid-template-columns: 1fr auto;
  margin-bottom: 1em;
}
span.description {
  color: var(--txt-medium);
  line-height: 1.6em;
  padding: 0.5em 0em;
  display: block;
}
.details {
  position: absolute;
  box-sizing: border-box;
  background: white;
  margin: 0em -1em;
  width: 100%;
  padding: 1em;
  transform: translatey(-13em);
  z-index: 200;
}
</style>
