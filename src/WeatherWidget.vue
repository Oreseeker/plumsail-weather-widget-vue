<template>
	<div class="weather-widget">
		<div class="sections">
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
				:list-of-cities-loaded="!togglers.showLoader"
			></weather-list>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import Settings from "@/components/settings/Settings";
import WeatherList from "@/components/weather_list/WeatherList";
import textOperationsMixin from "@/mixins/text_operations_mixin";

export default {
	data() {
		return {
			togglers: {
				showSettings: false,
				showLoader: true
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
	async created() {
		const cities = this.loadConfig();
		if (!cities.length) {
			const options = {
				params: {
					fields: 'city'
				}
			};
			const res = await axios.get('http://ip-api.com/json/', options);
			const city = this.capitalizeFirstLetter(res.data.city);
			this.cities = [ city ];
			this.$nextTick(() => this.togglers.showLoader = false);
			return;
		}
		this.cities = cities;
		this.$nextTick(() => this.togglers.showLoader = false);
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
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 40px;
		position: relative;
	}

	.sections {
		width: 100%;
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