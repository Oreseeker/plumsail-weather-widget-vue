<template>
	<div class="settings">
		<div class="header">
			<div class="title">Settings</div>
			<div class="btn close" @click="$emit('settings-closed')"></div>
		</div>
		<div class="main">
			<draggable
				:list="cities"
				handle=".dragger"
			>
				<div class="no-cities" v-show="!cities.length">Cities list is empty</div>
				<div class="cities" v-show="cities.length">
					<settings-city
						v-for="city in cities"
						:city="city"
						class="city"
						@city-deleted="removeCity"
					></settings-city>
				</div>
			</draggable>
		</div>
		<div class="footer">
			<div class="add-city-title">Add Location</div>
			<div class="add-city">
				<input
					type="text"
					class="city-input"
					@keydown.enter="addCity"
					v-model="inputCity"
					placeholder="Type location and press Enter..."
				>
				<div class="city-input-icon"></div>
			</div>
		</div>
	</div>
</template>

<script>
import SettingsCity from "@/components/settings/SettingsCity";
import Draggable from "vuedraggable";

export default {
	props: ['cities'],
	data() {
		return {
			inputCity: null
		}
	},
	methods: {
		addCity() {
			const cities = [ ...this.cities ];
			cities.push(this.inputCity);
			this.$emit('cities-updated', cities);
			this.inputCity = null;
		},
		removeCity(deletedCity) {
			const cities = [ ...this.cities ];
			const cityIndex = cities.findIndex(city => city === deletedCity);
			if (cityIndex === -1) return;
			cities.splice(cityIndex, 1);
			this.$emit('cities-updated', cities);
		}
	},
	name: "Settings",
	components: {
		SettingsCity,
		Draggable
	}
}
</script>

<style scoped>
	.settings {
		width: 100%;
		padding: 10px;
		height: max-content;
		background: white;
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
		background: url('../../assets/close.png') no-repeat center;
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
		margin: 0 0 25px 0;
	}

	.no-cities {
		font-size: 12px;
	}

	.city {
		margin: 0 0 10px 0;
	}

	.city:last-child {
		margin: 0;
	}

	.add-city-title {
		font-weight: bold;
		font-size: 14px;
		margin: 0 0 5px 0;
	}

	.add-city {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.city-input {
		outline: none;
		border: 2px solid #cdcdcd;
		width: 100%;
		background: white;
		padding: 5px;
		margin: 0 5px 0 0;
	}

	.city-input:focus {
		border: 2px solid #80cfe5;
	}

	.city-input-icon {
		background: url('../../assets/enter.png') no-repeat center;
		background-size: 100%;
		width: 15px;
		height: 15px
	}
</style>