<template>
  <div>
    <div class="controls" :class="controlsClass">
      <router-link to="/store" tag="button">
        <fa fa="arrow-left" />
      </router-link>
      <button @click="notify()" v-if="selected != undefined">
        <fa fa="bookmark" />
      </button>
      <button @click="notify()" v-else><fa fa="search" /></button>
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
      <Carousel
        :mainitems="mainitems"
        :selected="selected"
        @selected="selected = $event"
      />

      <transition name="fade" mode="out-in">
        <router-view
          v-if="selected != undefined"
          :selected="selected"
        ></router-view>
        <div class="more" v-else>
          <span class="options">{{ totalitems }} Options</span>
          <ol class="list">
            <li class="item" v-for="item in items" :key="item.name">
              <a :href="`https://www.google.com/search?q=${item.title}`">
                <div class="img">
                  <img :src="item.src" alt="" />
                </div>
                <h3>{{ item.title }}</h3>
                <span>{{ formatPrice(item.price) }}</span>
              </a>
            </li>
          </ol>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel.vue';
import mixinFuncs from '../store/modules/misc.js';
import config from '../assets/items.json';
export default {
  mixins: [mixinFuncs],
  data: () => ({
    selected: undefined,
    scrollY: 0,
    title: process.env.VUE_APP_TITLE,
    category: 'Shoes',
    subcategorysel: 'All',
    subcategory: config.subcategory,
    mainitems: config.mainitems,
    items: config.items,
  }),
  mounted() {
    window.onscroll = this.scrollDetect;
    if (this.$route.params.mainitem != undefined) {
      this.selected = this.$route.params.mainitem;
    }
  },
  methods: {
    scrollDetect() {
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
    selectedObject: function() {
      return config.mainitems.filter((item) =>
        item.title.includes(this.selected)
      )[0];
    },
    controlsClass: function() {
      return {
        background: this.scrollY,
        selection:
          this.selectedObject != undefined &&
          this.selectedObject.inverted == false &&
          this.scrollY == false,
      };
    },
  },
  components: {
    Carousel,
    // Details,
  },
  watch: {
    $route(to, from) {
      if (to.path.includes('/store') && from.path.includes('/store/main/')) {
        console.log('back on store');
        this.selected = undefined;
      }
    },
  },
};
</script>

<style scoped>
/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v7.0.29,
* Autoprefixer: v9.7.6
* Browsers: last 4 version
*/

.fade-enter-active {
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.fade-leave-active {
  -webkit-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  -webkit-transform: translateY(50px) !important;
  -ms-transform: translateY(50px) !important;
  transform: translateY(50px) !important;
  opacity: 0;
}
.item > a > span {
  -ms-grid-row: 3;
  grid-row: 3;
  -ms-grid-column: 3;
  grid-column: 3;
  font-family: 'avant garde';
  letter-spacing: 0.5em;
  grid-area: price;
  letter-spacing: 0.03em;
  color: var(--txt-medium);
}
.item > a > h3 {
  -ms-grid-row: 1;
  grid-row: 1;
  -ms-grid-column: 3;
  grid-column: 3;
  grid-area: title;
  -ms-grid-row-align: end;
  align-self: end;
  font-size: large;
  margin-right: 1em;
  line-height: 1.3;
}
.item > a > .img > img {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  min-width: 100%;
  /* possible apple fix for broken thumbnail height */
  -o-object-fit: scale-down;
  object-fit: scale-down;
  vertical-align: middle;
}
.item > a > .img {
  -ms-grid-row: 1;
  grid-row: 1;
  -ms-grid-row-span: 3;
  -ms-grid-column: 1;
  grid-column: 1;
  grid-area: img;
  width: 8em;
  padding-right: 1em;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.item > a {
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: auto 0.5em auto;
  grid-template-areas:
    'img title'
    'img price';
  -ms-grid-columns: auto 0.5em 1fr;
  grid-template-columns: auto 1fr;
  /* grid-auto-columns: auto 1fr; */
  grid-gap: 0.5em;
  gap: 0.5em;
  /* padding: 1em 0em; */
  width: 100%;
  border: 0;
  text-align: unset;
  padding: 0;
  background: 0;
  color: var(--txt-main);
  padding: 1em 0em;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.item {
  border-top: 2px solid var(--bg-scnd);
}
.options {
  color: var(--txt-medium);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: smaller;
  font-family: 'avant garde';
  letter-spacing: 0.14em;
}
.selsub {
  color: white !important;
  background: var(--accent) !important;
  font-weight: 500;
  border: 0 !important;
}
.subcategory {
  overflow-x: scroll;
  display: -ms-grid;
  display: grid;
  grid-auto-flow: column;
  white-space: nowrap;
  gap: 0.5em;
  margin: 0em -1em;
  padding: 1em;
}

.subcategory > button:focus {
  outline: none;
  -webkit-box-shadow: 0px 3px 9px 0pt rgb(32 39 52 / 0.4);
  box-shadow: 0px 3px 9px 0pt rgb(32 39 52 / 0.4);
}
.subcategory > button {
  height: 2.2em;
  border-radius: 100px;
  border: 1px solid #e4e3e5;
  padding: 0em 1.2em;
  background: var(--btn-main);
  color: hsl(0 0% 40% / 1);
  -webkit-transition: all 0.1s;
  -o-transition: all 0.1s;
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
.controls > button:focus {
  outline: none;
}
.controls > button {
  width: 3em;
  height: 3em;
  border: 0;
  color: var(--accent);
  background: 0;
  -webkit-transition: color 0.2s;
  -o-transition: color 0.2s;
  transition: color 0.2s;
}
.controls {
  -ms-grid-columns: 1fr auto;
  grid-template-columns: 1fr auto;
  /* grid-auto-columns: 1fr auto 1fr; */
  /* grid-auto-flow: column; */
  display: -ms-grid;
  display: grid;
  z-index: 250;
  position: fixed;
  width: 100vw;
  /* background: white; */
  height: 3em;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-transition: background 0.2s;
  -o-transition: background 0.2s;
  transition: background 0.2s;
}
.header {
  position: absolute;
  z-index: 100;
  padding: 1em;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100vw;
  margin-top: 3em;
}
.app {
  padding: 1em;
}
</style>
