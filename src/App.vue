<template>
  <div id="app">
    <div class="controls">
      <button><fa fa="arrow-left" /></button>
      <button><fa fa="search" /></button>
      <button><fa fa="heart" /></button>
    </div>
    <h3>{{ category }}</h3>
    <div class="subcategory">
      <button v-for="sub in subcategory" :key="sub.name">{{ sub.name }}</button>
    </div>
    <Carousel :items="mainitems" />
    <Details :selected="sel" />
    <div class="more">
      <ol class="list">
        <li class="item" v-for="item in items" :key="item.name">
          <img :src="item.src" alt="" />
          <h4>{{ item.title }}</h4>
          <span>{{ item.price }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import Carousel from './components/Carousel.vue';
import Details from './components/Details.vue';

export default {
  name: 'App',
  data: () => ({
    title: process.env.VUE_APP_TITLE,
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
      },
      {
        title: 'Air Max 97',
        price: 11897,
        src: 'https://i.imgur.com/OgQ9vN6.png',
        color: '#fdb963',
      },
      {
        title: 'KD13 EP',
        price: 12995,
        src: 'https://i.imgur.com/OgQ9vN6.png',
        color: '#2F60CC',
      },
      {
        title: 'Arrons Nine',
        price: 11995,
        src: 'https://i.imgur.com/OgQ9vN6.png',
        color: '#5B9C9A',
      },
    ],
    items: [
      {
        title: 'Undercover React Presto',
        price: 12797,
        src: 'https://i.imgur.com/OgQ9vN6.png',
      },
      {
        title: 'Air Zoom Pegasus 37',
        price: 9995,
        src: 'https://i.imgur.com/OgQ9vN6.png',
      },
    ],
  }),

  components: {
    Carousel,
    Details,
  },
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
