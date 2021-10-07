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
import Settings from "@/Settings";
import WeatherList from "@/components/WeatherList";

export default {
	data() {
		return {
			togglers: {
				showSettings: false
			},
			cities: ['Moscow', 'New York']
		}
	},
	methods: {
		updateCities(cities) {
			this.cities = cities;
		}
	},
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