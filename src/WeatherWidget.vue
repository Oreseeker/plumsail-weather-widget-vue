<template>
	<div class="weather-widget">
		<div class="settings">
			<div class="header">
				<div class="title">Settings</div>
				<div class="btn close"></div>
			</div>
			<div class="main">
				<settings-city
					v-for="city in cities"
					:city="city"
					class="city"
					@city-deleted="removeCity"
				></settings-city>
			</div>
			<div class="footer">
				<div class="city-input-title">Add Location</div>
				<input
					type="text"
					class="city-input"
					@keydown.enter="addCity"
					v-model="inputCity"
				>
			</div>
		</div>
	</div>
</template>

<script>
import SettingsCity from "@/SettingsCity";

export default {
	data() {
		return {
			cities: ['Moscow', 'New York'],
			inputCity: null
		}
	},
	methods: {
		addCity() {
			this.cities.push(this.inputCity);
			this.inputCity = null;
		},
		removeCity(deletedCity) {
			console.log('deletedCity', deletedCity);
			const cityIndex = this.cities.findIndex(city => city === deletedCity);
			if (cityIndex === -1) return;
			this.cities.splice(cityIndex, 1);
		}
	},
	name: "WeatherWidget",
	components: {
		SettingsCity
	}
}
</script>

<style scoped>
	.weather-widget {
		background: #e7efed;
		width: 350px;
		padding: 10px;
		font-family: Avenir, sans-serif;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 0 15px 0;
	}

	.title {
		font-weight: bold;
		font-size: 14px;
	}

	.close {
		background: url('./assets/close.png') no-repeat center;
		background-size: 100%;
		width: 12px;
		height: 12px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}

	.main {
		margin: 0 0 10px 0;
	}

	.city {
		margin: 0 0 10px 0;
	}

	.city:last-child {
		margin: 0;
	}

	.city-input-title {
		font-weight: bold;
		font-size: 14px;
		margin: 0 0 5px 0;
	}

	.city-input {
		outline: none;
		border: 2px solid #cdcdcd;
		width: 100%;
		background: #e7efed;
		padding: 5px;
	}

	.city-input:focus {
		border: 2px solid #88e8ff;
	}
</style>

<style>
	* {
		box-sizing: border-box;
	}

	.btn {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}
</style>