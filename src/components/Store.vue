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
      <Carousel :mainitems="mainitems" :selected="selected" />

      <transition name="fade" mode="out-in">
        <router-view
          v-if="selected != undefined"
          :selected="selected"
        ></router-view>
        <Options :items="items" v-else />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Carousel from '../components/Carousel.vue';
import Options from '../components/Options.vue';
import mixinFuncs from '../store/modules/misc.js';
export default {
  mixins: [mixinFuncs],
  data: () => ({
    scrollY: 0,
    category: 'Shoes',
    subcategorysel: 'All',
  }),
  mounted() {
    window.onscroll = this.scrollDetect;
    if (this.$route.params.mainitem != undefined) {
      this.set_selected_by_id(this.$route.params.mainitem);
    }
  },
  methods: {
    ...mapMutations(['set_selected', 'set_selected_by_id']),
    scrollDetect() {
      var doc = document.documentElement;
      var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      this.scrollY = top > 50 ? true : false;
    },
  },
  computed: {
    ...mapGetters(['subcategory', 'mainitems', 'items', 'selected']),
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
    Options,
  },
  watch: {
    $route(to, from) {
      if (to.path.includes('/store') && from.path.includes('/store/main/')) {
        this.set_selected(undefined);
      } else if (
        from.path.includes('/store') &&
        to.path.includes('/store/main/')
      ) {
        this.set_selected_by_id(this.$route.params.mainitem);
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
