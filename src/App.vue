<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 
@font-face {
  font-family: 'Avenir';
  src: local('Avenir'),
    url(assets/fonts/Avenir/Avenir-Heavy.ttf) format('truetype');
  font-weight: 600;
}
@font-face {
  font-family: 'Avant Garde';
  src: local('Avant Garde'),
    url(assets/fonts/AvantGarde/avantgarde.ttf) format('truetype');
  font-weight: 300;
}
@font-face {
  font-family: 'Avant Garde';
  src: local('Avant Garde'),
    url(assets/fonts/AvantGarde/avantgardebold.ttf) format('truetype');
  font-weight: bold;
}
*/

body {
  --bg-main: #ffffff;
  --bg-scnd: #f7f5f7;
  --txt-main: #202734;
  --txt-medium: #5d697e;
  --btn-main: #f5f4f6;
  /* --txt-medium-dark: ; */
  /* --txt-box-bg: ; */
  --accent: #202734;
  scroll-snap-type: x mandatory;
}
html {
  scroll-snap-type: x mandatory;
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
a {
  color: inherit;
  text-decoration: inherit;
}
a:focus {
  outline: none;
}
</style>
