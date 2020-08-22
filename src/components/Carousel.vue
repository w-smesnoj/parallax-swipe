<template>
  <div class="group" id="group" :class="{ noscroll: selectedObject != -1 }">
    <div class="el" v-for="(x, index) in mainitems" :key="index"></div>
    <div class="elms">
      <div
        class="box"
        v-for="(item, index) in mainitems"
        :key="index"
        :class="{
          active: selectedObject == item,
          hidden: selectedObject != undefined && selectedObject != item,
        }"
        @click="select(item)"
      >
        <div class="shoe">
          <img :src="item.src" alt="" />
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
import mixinFuncs from './../store/modules/misc.js';
import config from '../assets/items.json';

export default {
  mixins: [mixinFuncs],
  props: {
    mainitems: Array,
    selected: String,
  },
  computed: {
    selectedObject: function() {
      return config.mainitems.filter((item) =>
        item.title.includes(this.selected)
      )[0];
    },
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
    this.vw = window.innerWidth;
    this.boxWidth = (window.innerWidth / 100) * 65 + 50;
    document.getElementById('group').onscroll = this.checkScrollSpeed;
    let allElms = document.getElementsByClassName('elms')[0];
    let totalLength = this.boxWidth * allElms.childElementCount - 25;
    allElms.style.transform = ` translateX(${totalLength * -1}px)`;

    if (this.$route.params.mainitem != undefined) {
      let selected = this.$route.params.mainitem;
      let x = config.mainitems.filter((item) =>
        item.title.includes(selected)
      )[0];
      document.querySelector('#group').scrollTo(x.index * this.boxWidth, 0);
    }
  },
  methods: {
    clear() {
      this.lastPos = null;
      document.body.removeAttribute('style');
    },
    checkScrollSpeed() {
      this.newPos = document.getElementById('group').scrollLeft;

      if (this.lastPos != null) {
        var delta = this.newPos - this.lastPos;
        delta = delta * 4;
        // min/max values
        if (delta > 45) delta = 45;
        else if (delta < -45) delta = -45;
        if (delta < 10 && delta > -10) delta = 0;
        if (this.newPos == 0) delta = 0;

        let elms = document.getElementsByClassName('box');
        elms.forEach((elm) => {
          elm.style.transform = ` perspective(1500px) rotateY(${delta}deg)`;
        });
      }
      this.lastPos = this.newPos;

      this.timer = setTimeout(this.clear, 100);
      this.timer && clearTimeout(this.timer);
    },

    select(item) {
      this.$emit('selected', item.title);
    },
    move(ind) {
      console.log('moved');
      document.getElementById('group').scrollTo({
        left: ind * this.boxWidth,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style scoped>
.active > .shoe {
  transform: translate(2em, -5em) rotate(0deg);
}
.shoe {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  width: inherit;
  z-index: 10;
  transform: translate(2em, 5em) rotate(-35deg);
  transition: transform 0.4s ease;
  width: 16em;
  max-width: 16em;
  pointer-events: none;
  z-index: 200;
  /* filter: drop-shadow(-16px 14px 15px #00000096); */
  /* box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); */
}
.shoe > img {
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
  font-family: 'avant garde';
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
  display: grid;
  grid-auto-rows: auto auto 1fr;
  height: fit-content;
  pointer-events: none;
  width: inherit;
  gap: 1em;
}
.el {
  margin-right: 3em;
  width: 65vw;
  background: transparent;
  scroll-snap-align: start;
}
.elms {
  display: grid;
  grid-auto-flow: column;
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
  scroll-snap-type: y mandatory;
}
/* .active > .hold > .info {
  opacity: 0;
  pointer-events: 0;
} */
.active > .hold > .info {
  display: none;
}
.active > .hold {
  border-radius: 100%;
  transform: perspective(810px) translate(7em, -19.5em) scale(2.3, 1.8) !important;
  z-index: 150 !important;
}

.hidden {
  opacity: 0 !important;
  transform: translateX(50px);
}

.active {
  z-index: 150;
  background: transparent !important;
}

button.hold:focus {
  outline: none;
}

.hold {
  display: flex !important;
  box-sizing: content-box;
  align-items: flex-start;
}

.hold,
.box {
  margin-right: 50px;
  width: 65vw;
  height: 18em;
  grid-auto-flow: column;
  border-radius: 1em;
  transition: border-radius 0.3s, transform 0.3s, width 0.3s, height 0.3s,
    opacity 0.3s;
  opacity: 1;
  border: 0;
  display: inline-block;
  text-align: unset;
  padding: 0;
}

.move-right {
  animation: tilt-right 0.65s;
}
.move-left {
  animation: tilt-left 0.65s;
}
.group {
  transition: transform 0.35s ease;
  overflow-y: hidden;
  overflow-x: scroll;
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
}
</style>
