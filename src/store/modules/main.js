import config from '@/assets/items.json';

const state = {
  subcategory: config.subcategory,
  mainitems: config.mainitems,
  items: config.items,
  selected: undefined,
};
const getters = {
  subcategory: (state) => state.subcategory,
  mainitems: (state) => state.mainitems,
  items: (state) => state.items,
  selected: (state) => state.selected,
};
const actions = {};

const mutations = {
  set_selected(state, object) {
    state.selected = object;
  },
  set_selected_by_id(state, id) {
    state.selected = state.mainitems.filter((item) =>
      item.title.includes(id)
    )[0];
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
