<template>
	<div class="weather-widget">
		<div class="selected-location-info">
			<div class="header">
				<div class="title">{{ locality }}, {{ country }}</div>
				<div class="settings"></div>
			</div>
			<div class="main">
				<div class="weather-brief">
					<img :src="imgURL" class="weather-image">
					<div class="temperature">{{ roundedTemperatureCelsius }} &#8451;</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			APIKey: 'edce8b7ea7a84fd4615c745fc28f8eaa',
			weather: null
		}
	},
	computed: {
		locality() {
			return this.weather ? this.weather.name : null;
		},
		country() {
			return this.weather ? this.weather.sys.country : null;
		},
		imgURL() {
			if (!this.weather) return "";
			const iconTitle = this.weather.weather[0].icon;
			return `https://openweathermap.org/img/w/${ iconTitle }.png`;
		},
		temperatureKelvin() {
			return this.weather ? this.weather.main.temp : null;
		},
		temperatureCelsius() {
			if (!this.temperatureKelvin) return null;
			return this.kelvinToCelsius(this.temperatureKelvin);
		},
		roundedTemperatureCelsius() {
			return this.temperatureCelsius ? Math.round(this.temperatureCelsius) : null;
		},
		feelsLikeTemperatureCelsius() {
			if (!this.weather) return null;
			const feelsLikeTemperatureKelvin = this.weather.main.feels_like;
			return this.kelvinToCelsius(feelsLikeTemperatureKelvin);
		}
	},
	methods: {
		getWeather(city) {
			const url = 'https://api.openweathermap.org/data/2.5/weather';
			const config = {
				params: {
					q: city,
					appid: this.APIKey
				}
			};
			return axios.get(url, config);
		},
		kelvinToCelsius(temperatureInKelvin) {
			return temperatureInCelsius - 273.15;
		}
	},
	async mounted() {
		const res = await this.getWeather('Moscow');
		this.weather = res.data;
		console.log('this.weather', this.weather);
	},
	name: 'App',
	components: {
	}
}
</script>

<style>
	.weather-widget {
		border: 1px solid gray;
		width: 300px;
		font-family: Avenir, sans-serif;
	}

	.selected-location-info .header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		font-weight: bold;
	}

	.settings {
		background: url('./assets/gear.png') no-repeat center;
		background-size: 100%;
		width: 15px;
		height: 15px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}

	.main {
		display: flex;
		flex-direction: column;
	}

	.weather-brief {
		display: flex;
		align-items: center;
		align-self: center;
	}

	.weather-image {
		height: 80px;
		width: 80px;
	}
</style>
