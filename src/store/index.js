import Vue from 'vue';
import VueX from 'vuex';
import main from './modules/main';

Vue.use(VueX);

export default new VueX.Store({
  modules: {
    main,
  },
});
