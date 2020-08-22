export default {
  methods: {
    formatPrice(num) {
      return `₹ ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    },
    notify() {
      alert('This element is not developed yet.');
    },
  },
};
