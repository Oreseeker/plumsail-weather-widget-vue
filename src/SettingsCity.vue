<template>
	<div class="settings-city">
		<div class="dragger-title">
			<div class="dragger"></div>
			<div class="title">{{ city }}</div>
		</div>
		<div class="btn delete" @click="$emit('city-deleted', city)"></div>
	</div>
</template>

<script>
export default {
	props: ['city'],
	name: "SettingsCity"
}
</script>

<style scoped>
	.settings-city {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		background-color: #d6d6d6;
		padding: 10px;
	}

	.dragger-title {
		display: flex;
	}

	.title {
		font-size: 14px;
		font-weight: bold;
		color: #454545;
		flex-grow: 1;
	}

	.dragger {
		background: url('./assets/dragger.png') no-repeat center;
		background-size: 100%;
		width: 15px;
		height: 15px;
		margin: 0 10px 0 0;
		cursor: grab;
	}

	.delete {
		background: url('./assets/delete.png') no-repeat center;
		background-size: 100%;
		width: 15px;
		height: 15px;
	}
</style>