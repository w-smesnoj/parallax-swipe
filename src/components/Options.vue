<template>
  <div>
    <span class="options">{{ totalitems }} Options</span>
    <ol>
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
</template>

<script>
import mixinFuncs from '../store/modules/misc.js';

export default {
  mixins: [mixinFuncs],
  computed: {
    totalitems: function() {
      return 243;
      // return this.items.length;
    },
  },
  props: {
    items: Array,
  },
};
</script>

<style scoped>
.options {
  color: var(--txt-medium);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: smaller;
  font-family: 'avant garde', Roboto, Arial;
  letter-spacing: 0.14em;
}
.item > a > span {
  -ms-grid-row: 3;
  grid-row: 3;
  -ms-grid-column: 3;
  grid-column: 3;
  font-family: 'avant garde', Roboto, Arial;
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
</style>
