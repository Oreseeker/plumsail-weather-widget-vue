<template>
	<div class="weather-widget">
		<div class="selected-location-info">
			<div class="header">
				<div class="title">{{ locality }}, {{ country }}</div>
			</div>
			<div class="main">
				<div class="weather-brief">
					<img :src="imgURL" class="weather-image">
					<div class="temperature">
						<div class="value">{{ roundedTemperatureCelsius }}</div>
						<div class="units">
							<div class="grade">o</div>
							C
						</div>
					</div>
				</div>
				<div class="weather-detailed">
					Feels like {{ feelsLikeTemperatureCelsius }}
					<div class="units">
						<div class="grade">o</div>
						C.
					</div>
					{{ cloudsState }}.
				</div>
				<div class="wind-pressure">
					<div class="wind">
						<div class="icon wind-icon"></div>
						<div class="value wind-value">{{ windSpeed }}m/s {{ windDirection }}</div>
					</div>
					<div class="pressure">
						<div class="icon pressure-icon"></div>
						<div class="value pressure-value">{{ pressure }}hPa</div>
					</div>
				</div>
				<div class="humidity-visibility">
					<div class="humidity">Humidity: {{ humidity }}%</div>
					<div class="visibility">Visibility: {{ visibility }}km</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import textOperationsMixin from "@/mixins/text_operations_mixin";

export default {
	props: ['city'],
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
			const feelsLikeTemperatureCelsius = this.kelvinToCelsius(feelsLikeTemperatureKelvin);
			return Math.round(feelsLikeTemperatureCelsius);
		},
		cloudsState() {
			if (!this.weather) return '';
			const cloudsState = this.weather.weather[0].description;
			return this.capitalizeFirstLetter(cloudsState);
		},
		pressure() {
			return this.weather ? this.weather.main.pressure : null;
		},
		windSpeed() {
			return this.weather ? this.weather.wind.speed : null;
		},
		windDirection() {
			if (!this.weather) return '';
			const windDirectionValue = this.weather.wind.deg;
			const map = [
				[ [ 0, 11.25 ], 'N' ],
				[ [ 11.25, 33.75 ], 'NNE' ],
				[ [ 33.75, 56.25 ], 'NE'  ],
				[ [ 56.25, 78.75 ], 'N' ],
				[ [ 56.25, 78.75 ], 'ENE' ],
				[ [ 78.75, 101.25 ], 'E' ],
				[ [ 101.25, 123.75 ], 'ESE' ],
				[ [ 123.75, 146.25 ], 'SE' ],
				[ [ 146.25, 168.75 ], 'SSE' ],
				[ [ 168.75, 191.25 ], 'S' ],
				[ [ 191.25, 213.75 ], 'SSW' ],
				[ [ 213.75, 236.25 ], 'SW' ],
				[ [ 236.25, 258.75 ], 'WSW' ],
				[ [ 258.75, 281.25 ], 'W' ],
				[ [ 281.25, 303.75 ], 'WNW' ],
				[ [ 303.75, 326.25 ], 'NW' ],
				[ [ 326.25, 326.25 ], 'NNW' ],
				[ [ 326.25, 360.00 ], 'N' ]
			];
			const [ direction ] = map.filter(item => {
				const range = item[0];
				const lowerEdge = range[0];
				const upperEdge = range[1];
				const isInRange = windDirectionValue >= lowerEdge && windDirectionValue < upperEdge;
				return isInRange;
			}).map(item => item[1]);
			return direction;
		},
		humidity() {
			if (!this.weather) return '';
			return this.weather.main.humidity;
		},
		visibility() {
			if (!this.weather) return null;
			const visibilityMeters = this.weather.visibility;
			const visibilityKilometers = visibilityMeters / 1000;

			/* Округление видимости в километрах осуществляется вниз с точностью до десятой доли */
			return Math.floor(visibilityKilometers * 10) / 10;
		}
	},
	methods: {
		getWeather({ city, latitude, longitude }) {
			const url = 'https://api.openweathermap.org/data/2.5/weather';
			const config = {
				params: {
					appid: this.APIKey
				}
			};
			if (city) {
				config.params.q = city;
			} else {
				config.params.lat = latitude;
				config.params.lon = longitude;
			}
			return axios.get(url, config);
		},
		kelvinToCelsius(temperatureInKelvin) {
			return temperatureInKelvin - 273.15;
		}
	},
	watch: {
		city: {
			async handler(value) {
				if (!value) return;
				const res = await this.getWeather({ city: value });
				this.weather = res.data;
				console.log('this.weather', this.weather)
			},
			immediate: true
		}
	},
	mixins: [ textOperationsMixin ],
	name: 'CityWeather'
}
</script>

<style scoped>
	.weather-widget {
		width: 100%;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: bold;
	}

	.main {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
		color: #414141;
	}

	.weather-brief {
		display: flex;
		align-items: center;
		align-self: center;
		color: black;
	}

	.weather-image {
		height: 80px;
		width: 80px;
	}

	.temperature {
		font-weight: bold;
		display: flex;
		align-items: center;
		font-size: 30px;
	}

	.value {
		margin: 0 5px 0 0;
	}

	.units {
		display: flex;
	}

	.grade {
		font-size: 0.5em;
	}

	.weather-detailed {
		display: flex;
		flex-wrap: wrap;
	}

	.weather-detailed .grade,
	.weather-detailed .units {
		display: inline-flex;
	}

	.wind-pressure {
		display: flex;
		justify-content: space-between;
	}

	.wind, .pressure {
		display: flex;
		column-gap: 5px;
	}

	.icon {
		width: 18px;
		height: 18px;
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center;
	}

	.wind-icon {
		background-image: url('./assets/wind-rose.png');
	}

	.pressure-icon {
		background-image: url('./assets/barometer.png');
	}

	.humidity-visibility {
		display: flex;
		justify-content: space-between;
	}
</style>
