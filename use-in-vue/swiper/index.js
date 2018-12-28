//引入swiper的css
import '../../node_modules/vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css';

export function useVueAwesomeSwiper(Vue) {
  const { swiper, swiperSlide } = require('vue-awesome-swiper');
  Vue.component('swiper', swiper);
  Vue.component('swiper-slide', swiperSlide);
}