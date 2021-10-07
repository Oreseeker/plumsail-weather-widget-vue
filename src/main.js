import Vue from 'vue'
import WeatherWidget from './WeatherWidget.vue'
import wrap from "@vue/web-component-wrapper";

// const weatherWidgetCE = wrap(Vue, WeatherWidget);
//
// customElements.define('weather-widget', weatherWidgetCE);

new Vue({
	render: h => h(WeatherWidget),
}).$mount('#app')