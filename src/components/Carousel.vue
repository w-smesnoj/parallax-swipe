<template>
  <div class="group" id="group">
    <div class="el" v-for="(x, index) in items" :key="index"></div>
    <div class="elms">
      <div
        class="box"
        v-for="(x, index) in items"
        :key="index"
        :class="{ active: selected == index }"
      >
        <div class="shoe">
          <img src="https://i.imgur.com/C84ICNv.png" alt="" />
        </div>
        <div
          class="hold"
          :style="`background: ${x.color}`"
          @click="select(index)"
        >
          <div class="info" :class="{ inverted: x.inverted }">
            <h2>{{ x.title }}</h2>
            <span>{{ formatPrice(x.price) }}</span>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinFuncs from './../store/modules/misc.js';

export default {
  mixins: [mixinFuncs],
  props: {
    items: Array,
  },
  data: () => ({
    lastPos: null,
    timer: 0,
    newPos: 0,

    title: process.env.VUE_APP_TITLE,
    toggle: false,
    selected: -1,
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

    // this.move('right');
    // this.move('left');
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

    select(ind) {
      if (this.selected == ind) {
        this.selected = -1;
        this.$emit('selected', this.items[this.selected]);
        return;
      }
      this.selected = ind;
      this.$emit('selected', this.items[this.selected]);
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
  transform: translate(3em, -3em) rotate(0deg);
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
  transition: transform 0.3s;
  width: 16em;
  max-width: 16em;
  pointer-events: none;
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
  font-weight: 300;
}
/* .info > h2 {
  margin-bottom: 0.4em;
} */
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
.active > .hold {
  border-radius: 100%;
  height: 550px !important;
  width: 550px !important;
  transform: perspective(810px) translate3d(-40px, -420px, 0px) !important;
  z-index: 150 !important;
}

.active {
  background: transparent !important;
  z-index: 150;
}

.hold,
.box {
  margin-right: 50px;
  width: 65vw;
  height: 18em;
  display: grid;
  grid-auto-flow: column;
  display: inline-block;
  border-radius: 1em;
  transition: border-radius 0.3s, transform 0.3s, width 0.3s, height 0.3s,
    margin-right 0.3s;
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
