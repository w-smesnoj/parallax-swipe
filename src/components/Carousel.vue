<template>
  <div class="group" id="group" :class="{ nosc: selected != undefined }">
    <div class="el" v-for="(x, index) in mainitems" :key="index"></div>
    <div class="elms">
      <div
        class="box"
        v-for="(item, index) in mainitems"
        :key="index"
        :class="{
          active: selected == item,
          hidden: selected != undefined && selected != item,
        }"
      >
        <!-- @click="set_selected_by_id(item.title)" -->
        <div class="shoe">
          <picture>
            <source
              type="image/webp"
              :srcset="`/images/shoes/webp/${item.src}.webp`"
            />
            <source
              type="image/png"
              :srcset="`/images/shoes/tinypng/${item.src}.png`"
            />
            <img :src="`/images/shoes/tinypng/${item.src}.png`" alt="" />
          </picture>
        </div>
        <router-link
          :to="`/store/main/${item.title}`"
          class="hold"
          :style="`background: ${item.color}`"
        >
          <div class="info" :class="{ inverted: item.inverted }">
            <h2>{{ item.title }}</h2>
            <span>{{ formatPrice(item.price) }}</span>
            <div></div>
          </div>
          <!-- </button> -->
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import mixinFuncs from './../store/modules/misc.js';

export default {
  mixins: [mixinFuncs],
  props: {
    mainitems: Array,
    selected: Object,
  },
  data: () => ({
    lastPos: null,
    timer: 0,
    newPos: 0,

    title: process.env.VUE_APP_TITLE,
    toggle: false,
    list: [
      {
        color: '#e34c4e',
      },
      {
        color: '#fdb963',
      },
      {
        color: '#2F60CC',
      },
      {
        color: '#5B9C9A',
      },
      {
        color: 'pink',
      },
    ],
    vw: 0,
    boxWidth: 0,
    stage: 0,
  }),
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    document.getElementById('group').onscroll = this.checkScrollSpeed;
  },
  watch: {
    selected: function(newVal, oldVal) {
      if (oldVal == undefined) {
        document.querySelector('#group').scrollTo({
          top: 0,
          left: this.selected.index * this.boxWidth,
          behavior: 'smooth',
        });
      }
    },
  },
  methods: {
    ...mapMutations(['set_selected_by_id']),
    handleResize() {
      this.vw = window.innerWidth;
      this.boxWidth = (window.innerWidth / 100) * 65 + 50;
      let allElms = document.getElementsByClassName('elms')[0];
      let totalLength = this.boxWidth * allElms.childElementCount - 25;
      allElms.style.transform = ` translateX(${totalLength * -1}px)`;
    },
    checkScrollSpeed() {
      this.newPos = document.getElementById('group').scrollLeft;

      if (this.lastPos != null) {
        var delta = this.newPos - this.lastPos;
        delta = delta * 4;
        // min/max values
        if (delta > 25) delta = 25;
        else if (delta < -25) delta = -25;
        if (delta < 10 && delta > -10) delta = 0;
        if (this.newPos == 0) delta = 0;

        let elmsString = `perspective(1500px) rotateY(${delta}deg)`;
        let elms = document.getElementsByClassName('hold');
        elms.forEach((elm) => {
          elm.style.webkitTransform = elmsString;
          elm.style.mozTransform = elmsString;
          elm.style.msTransform = elmsString;
          elm.style.oTransform = elmsString;
          elm.style.transform = elmsString;
        });
        let shoes = document.getElementsByClassName('shoe');

        let shoeString = `perspective(2000px) rotateY(${delta}deg) translate3D(40px, -30px, 2.5em) rotate(-35deg)`;
        shoes.forEach((elm) => {
          elm.style.webkitTransform = shoeString;
          elm.style.mozTransform = shoeString;
          elm.style.msTransform = shoeString;
          elm.style.oTransform = shoeString;
          elm.style.transform = shoeString;
        });
      }
      this.lastPos = this.newPos;
    },
  },
};
</script>

<style scoped>
.active > .shoe {
  -webkit-transform: translate3D(13vw, -180px, 4em) rotateY(0deg) scale(1.2) !important;
  transform: translate3D(13vw, -180px, 4em) rotateY(0deg) scale(1.2) !important;
}
.shoe {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  width: inherit;
  z-index: 10;
  -webkit-transform: perspective(2000px) translate3D(40px, -30px, 2.5em)
    rotate(-35deg);
  transform: perspective(2000px) translate3D(40px, -30px, 2.5em) rotate(-35deg);
  bottom: 0;
  right: 0;
  -webkit-transition: -webkit-transform 0.4s ease;
  transition: -webkit-transform 0.4s ease;
  -o-transition: transform 0.4s ease;
  transition: transform 0.4s ease;
  transition: transform 0.4s ease, -webkit-transform 0.4s ease;
  width: 65vw;
  max-width: 300px;
  pointer-events: none;
  z-index: 200;
  /* filter: drop-shadow(-16px 14px 15px #00000096); */
  /* box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); */
}

.shoe > picture,
.shoe > picture > img {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
}

.inverted > div {
  background: black !important;
}
.inverted > span,
.inverted > h2 {
  color: black !important;
}
.info > div {
  height: 100%;
  background: white;
  width: 2px;
  opacity: 0.3;
}

.info > span {
  font-size: 1.2em;
  font-family: 'avant garde', Roboto, Arial;
  letter-spacing: 0.06em;
}
/* .info > h2 {
  margin-bottom: 0.4em;
} */
.info > h2 {
  font-family: Avenir;
  font-weight: 600;
}
.info {
  color: white;
  position: absolute;
  padding: 2em 1em;
  display: -ms-grid;
  display: grid;
  grid-auto-rows: auto auto 1fr;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  pointer-events: none;
  /* width: inherit; */
  gap: 1em;
  opacity: 1;
  transition: opacity 0.4s;
}
.el {
  margin-right: 3em;
  width: 65vw;
  background: transparent;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
.elms {
  display: -ms-grid;
  display: grid;
  grid-auto-flow: column;
  -webkit-transform: translateX(-1175px);
  -ms-transform: translateX(-1175px);
  transform: translateX(-1175px);
  padding-right: 10em;
  z-index: 150;
}

.buttons {
  text-align: center;
}
.buttons > button {
  padding: 1em;
  margin-top: 1em;
}

.container {
  width: 100vw;
  overflow: scroll;
  -ms-scroll-snap-type: y mandatory;
  scroll-snap-type: y mandatory;
}
/* .active > .hold > .info {
  opacity: 0;
  pointer-events: 0;
} */
.active > .hold > .info {
  opacity: 0;
}
.active > .hold {
  border-radius: 100%;
  -webkit-transform: perspective(810px) translate(7em, -19.5em) scale(2.3, 1.8) !important;
  transform: perspective(810px) translate(7em, -19.5em) scale(2.3, 1.8) !important;
  z-index: 150 !important;
}

.hidden {
  opacity: 0 !important;
  /* -webkit-transform: translateX(50px);
  -ms-transform: translateX(50px);
  transform: translateX(50px); */
}

.active {
  z-index: 150;
  background: transparent !important;
}

button.hold:focus {
  outline: none;
}

.hold {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.hold,
.box {
  margin-right: 50px;
  width: 65vw;
  height: 18em;
  grid-auto-flow: column;
  border-radius: 1em;
  -webkit-transition: border-radius 0.3s, width 0.3s, height 0.3s, opacity 0.3s,
    -webkit-transform 0.3s;
  transition: border-radius 0.3s, width 0.3s, height 0.3s, opacity 0.3s,
    -webkit-transform 0.3s;
  -o-transition: border-radius 0.3s, transform 0.3s, width 0.3s, height 0.3s,
    opacity 0.3s;
  transition: border-radius 0.3s, transform 0.3s, width 0.3s, height 0.3s,
    opacity 0.3s;
  transition: border-radius 0.3s, transform 0.3s, width 0.3s, height 0.3s,
    opacity 0.3s, -webkit-transform 0.3s;
  opacity: 1;
  border: 0;
  display: inline-block;
  text-align: unset;
  padding: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}

.move-right {
  -webkit-animation: tilt-right 0.65s;
  animation: tilt-right 0.65s;
}
.move-left {
  -webkit-animation: tilt-left 0.65s;
  animation: tilt-left 0.65s;
}
.group {
  -webkit-transition: -webkit-transform 0.35s ease;
  transition: -webkit-transform 0.35s ease;
  -o-transition: transform 0.35s ease;
  transition: transform 0.35s ease;
  transition: transform 0.35s ease, -webkit-transform 0.35s ease;
  overflow-y: hidden;
  overflow-x: scroll;
  display: -ms-grid;
  display: grid;
  grid-auto-flow: column;
  height: 18em;
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  padding: 2em 0em;
  z-index: 10;
  /* border: 2px solid red; */
  margin: 0em -1em;
  /* transform: translateY(-158px); */
  padding-top: 174px;
  margin-top: -1em;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
.nosc {
  -ms-touch-action: none;
  touch-action: none;
}
</style>
