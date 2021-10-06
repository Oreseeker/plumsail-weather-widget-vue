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
				></settings-city>
			</div>
			<div class="footer">
				<input type="text" class="city-input">
			</div>
		</div>
	</div>
</template>

<script>
import SettingsCity from "@/SettingsCity";

export default {
	data() {
		return {
			cities: ['Moscow', 'New York']
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

	.city-input {
		outline: none;
		width: 100%;
	}

	.city-input:focus {
		outline: 1px solid #91e6ff;
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