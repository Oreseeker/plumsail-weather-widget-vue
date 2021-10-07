<template>
	<div class="weather-list">
		<div class="header">
			<div class="open-settings" @click="$emit('settings-opened')"></div>
		</div>
		<city-weather v-for="city in cities" :city="city" class="city-weather"></city-weather>
	</div>
</template>

<script>
import CityWeather from "@/CityWeather";

export default {
	props: ['cities'],
	name: "WeatherList",
	components: {
		CityWeather
	}
}
</script>

<style scoped>
	.weather-list {
		padding: 10px;
	}

	.header {
		display: flex;
		justify-content: flex-end;
	}

	.open-settings {
		background: url('../assets/gear.png') no-repeat center;
		background-size: 100%;
		width: 15px;
		height: 15px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}

	.city-weather {
		margin: 0 0 60px 0;
	}

	.city-weather:last-child {
		margin: 0;
	}
</style>