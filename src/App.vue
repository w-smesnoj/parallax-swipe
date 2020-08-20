<template>
  <div id="app">
    <div class="controls" :class="controlsClass">
      <button><fa fa="arrow-left" /></button>
      <button v-if="store"><fa fa="heart" /></button>
      <button v-else><fa fa="search" /></button>
    </div>
    <div class="header">
      <h2>{{ category }}</h2>
      <div class="subcategory">
        <button
          v-for="sub in subcategory"
          :key="sub.name"
          :class="{ selsub: subcategorysel == sub.name }"
          @click="subcategorysel = sub.name"
        >
          {{ sub.name }}
        </button>
      </div>
    </div>
    <div class="app">
      <Carousel :items="mainitems" @selected="selected = $event" />
      <Details :selected="sel" class="y" />
      <div class="more">
        <span class="options">{{ totalitems }} Options</span>
        <ol class="list">
          <li class="item" v-for="item in items" :key="item.name">
            <div class="img">
              <img :src="item.src" alt="" />
            </div>
            <h3>{{ item.title }}</h3>
            <span>{{ formatPrice(item.price) }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from './components/Carousel.vue';
import Details from './components/Details.vue';
import mixinFuncs from './store/modules/misc.js';

export default {
  mixins: [mixinFuncs],
  name: 'App',
  data: () => ({
    selected: -1,
    scrollY: 0,
    title: process.env.VUE_APP_TITLE,
    store: false,
    category: 'Shoes',
    sel: {
      title: 'KD13 EP',
      price: 12995,
      description:
        'Qui sint eos eum voluptatibus provident autem. Sunt ut rerum quo sint sapiente. Dolorem ipsam recusandae maiores dolorem nam laboriosam.',
      images: [
        {
          type: '1',
          src: 'https://i.imgur.com/OgQ9vN6.png',
        },
        {
          type: '2',
          src: 'https://i.imgur.com/OgQ9vN6.png',
        },
        {
          type: '3',
          src: 'https://i.imgur.com/OgQ9vN6.png',
        },
      ],
      soldout: ['UK 11', 'UK 13'],
    },
    subcategorysel: 'All',
    subcategory: [
      {
        name: 'All',
      },
      {
        name: 'Air Max',
      },
      {
        name: 'Presto',
      },
      {
        name: 'Huarache',
      },
      {
        name: 'Moon',
      },
    ],
    mainitems: [
      {
        title: 'Alpha Savage',
        price: 8895,
        src: 'https://i.imgur.com/OgQ9vN6.png',
        color: '#e34c4e',
        inverted: false,
      },
      {
        title: 'Air Max 97',
        price: 11897,
        src: 'https://i.imgur.com/OgQ9vN6.png',
        color: '#fdb963',
        inverted: true,
      },
      {
        title: 'KD13 EP',
        price: 12995,
        src: 'https://i.imgur.com/OgQ9vN6.png',
        color: '#2F60CC',
        inverted: false,
      },
      {
        title: 'Arrons Nine',
        price: 11995,
        src: 'https://i.imgur.com/OgQ9vN6.png',
        color: '#5B9C9A',
        inverted: false,
      },
    ],
    items: [
      {
        title: 'Undercover React Presto',
        price: 12797,
        src:
          'https://www.stadiumgoods.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cwidth%3D720/media/catalog/product/B/V/BV6113-600_1_1.png',
      },
      {
        title: 'Air Zoom Pegasus 37',
        price: 9995,
        src:
          'https://www.stadiumgoods.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cwidth%3D720/media/catalog/product/B/V/BV6113-600_1_1.png',
      },
      {
        title: 'Undercover React Presto',
        price: 12797,
        src:
          'https://www.stadiumgoods.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cwidth%3D720/media/catalog/product/B/V/BV6113-600_1_1.png',
      },
      {
        title: 'Air Zoom Pegasus 37',
        price: 9995,
        src:
          'https://www.stadiumgoods.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cwidth%3D720/media/catalog/product/B/V/BV6113-600_1_1.png',
      },
      {
        title: 'Undercover React Presto',
        price: 12797,
        src:
          'https://www.stadiumgoods.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cwidth%3D720/media/catalog/product/B/V/BV6113-600_1_1.png',
      },
      {
        title: 'Air Zoom Pegasus 37',
        price: 9995,
        src:
          'https://www.stadiumgoods.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cwidth%3D720/media/catalog/product/B/V/BV6113-600_1_1.png',
      },
      {
        title: 'Undercover React Presto',
        price: 12797,
        src:
          'https://www.stadiumgoods.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cwidth%3D720/media/catalog/product/B/V/BV6113-600_1_1.png',
      },
      {
        title: 'Air Zoom Pegasus 37',
        price: 9995,
        src:
          'https://www.stadiumgoods.com/cdn-cgi/image/fit%3Dcontain%2Cformat%3Dauto%2Cwidth%3D720/media/catalog/product/B/V/BV6113-600_1_1.png',
      },
    ],
  }),
  mounted() {
    window.onscroll = this.lel;
  },
  methods: {
    lel() {
      var doc = document.documentElement;
      var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      this.scrollY = top > 50 ? true : false;
    },
  },
  computed: {
    totalitems: function() {
      return 243;
      // return this.items.length;
    },
    leftTop: function() {
      return window.scrollY > 15 ? true : false;
    },
    controlsClass: function() {
      return {
        background: this.scrollY,
        selection:
          this.selected != undefined &&
          this.selected.inverted == false &&
          this.scrollY == false,
      };
    },
  },
  components: {
    Carousel,
    Details,
  },
};
</script>

<style>
.item > span {
  grid-area: price;
  letter-spacing: 0.02em;
  color: var(--txt-medium);
}
.item > h3 {
  grid-area: title;
  align-self: end;
  font-size: large;
}
.item > .img > img {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  margin-top: -0.4em;
}
.item > .img {
  grid-area: img;
  width: 140px;
  height: 80px;
  margin-right: 0.6em;
}
.item {
  display: grid;
  grid-template-areas:
    'img title'
    'img price';
  grid-auto-columns: auto 1fr;
  gap: 0.5em;
  padding: 1em 0em;
  border-top: 2px solid var(--bg-scnd);
}
.options {
  color: var(--txt-medium);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: smaller;
}
.selsub {
  color: white !important;
  background: var(--accent) !important;
  font-weight: 500;
  border: 0 !important;
}
.subcategory {
  overflow-x: scroll;
  display: grid;
  grid-auto-flow: column;
  white-space: nowrap;
  gap: 0.5em;
  margin: 0em -1em;
  padding: 1em;
}

.subcategory > button:focus {
  outline: none;
  box-shadow: 0px 3px 9px 0pt rgb(32 39 52 / 0.4);
}
.subcategory > button {
  height: 2.2em;
  border-radius: 100px;
  border: 1px solid #e4e3e5;
  padding: 0em 1.2em;
  background: var(--btn-main);
  color: hsl(0 0% 40% / 1);
  transition: all 0.1s;
}

.background {
  background: white;
  border-bottom: 2px solid var(--bg-scnd);
  /* box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; */
}

.selection > button {
  color: white !important;
}
.controls > button {
  width: 3em;
  height: 3em;
  border: 0;
  color: var(--accent);
  background: 0;
  transition: color 0.2s;
}
.controls {
  grid-template-columns: 1fr auto;
  /* grid-auto-columns: 1fr auto 1fr; */
  /* grid-auto-flow: column; */
  display: grid;
  z-index: 250;
  position: fixed;
  width: 100vw;
  /* background: white; */
  height: 3em;
  align-content: center;
  transition: background 0.2s;
}
.header {
  position: absolute;
  z-index: 100;
  padding: 1em;
  box-sizing: border-box;
  width: 100vw;
  margin-top: 3em;
}
.app {
  padding: 1em;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.y {
  display: none !important;
}
body {
  --bg-main: #ffffff;
  --bg-scnd: #f7f5f7;
  --txt-main: #202734;
  --txt-medium: gray;
  --btn-main: #f5f4f6;
  /* --txt-medium-dark: ; */
  /* --txt-box-bg: ; */
  --accent: #202734;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
ol {
  list-style-type: none;
  padding: 0;
}
img {
  border-style: none;
  max-width: 6em;
}
</style>
