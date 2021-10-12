<template>
	<div class="weather-widget">
		<settings
			v-show="togglers.showSettings"
			:cities="cities"
			@cities-updated="updateCities"
			@settings-closed="togglers.showSettings = false"
		></settings>
		<weather-list
			v-show="!togglers.showSettings"
			:cities="cities"
			@settings-opened="togglers.showSettings = true"
		></weather-list>
	</div>
</template>

<script>
import axios from "axios";
import Settings from "@/Settings";
import WeatherList from "@/components/WeatherList";
import textOperationsMixin from "@/mixins/text_operations_mixin";

export default {
	data() {
		return {
			togglers: {
				showSettings: false
			},
			cities: []
		}
	},
	methods: {
		updateCities(cities) {
			this.cities = cities;

		},
		loadConfig() {
			/* Функция возвращает массив городов, сохраненных в localStorage, если там имеются соответствующие данные.
			   В противном случае возвращается пустой массив. */
			const citiesString = localStorage.cities;
			if (!citiesString) return [];
			return JSON.parse(citiesString);
		}
	},
	watch: {
		cities(value) {
			const citiesString = JSON.stringify(value);
			localStorage.setItem('cities', citiesString);
		}	
	},
	async mounted() {
		const cities = this.loadConfig()
		if (!cities.length) {
			const options = {
				params: {
					fields: 'city'
				}
			};
			const res = await axios.get('http://ip-api.com/json/', options);
			console.log('res.data', res.data);
			const city = this.capitalizeFirstLetter(res.data.city);
			this.cities = [ city ];
			return;
		}
		this.cities = cities;
	},
	mixins: [ textOperationsMixin ],
	name: "WeatherWidget",
	components: {
		Settings,
		WeatherList
	}
}
</script>

<style scoped>
	.weather-widget {
		width: 260px;
		box-shadow: 0 0 10px 1px gray;
	}
</style>

<style>
	* {
		box-sizing: border-box;
		font-family: Trebuchet MS, sans-serif;
	}

	.btn {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}
</style>