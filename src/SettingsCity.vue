<template>
	<div class="settings-city">
		<div class="dragger-title">
			<div class="dragger"></div>
			<div class="title">{{ city }}</div>
		</div>
		<div class="btn delete"></div>
	</div>
</template>

<script>
export default {
	props: ['city'],
	name: "City"
}
</script>

<style scoped>
	.settings-city {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		background-color: #d6d6d6;
		padding: 10px 5px;
	}

	.dragger-title {
		display: flex;
	}

	.title {
		font-size: 14px;
		font-weight: bold;
		color: gray;
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