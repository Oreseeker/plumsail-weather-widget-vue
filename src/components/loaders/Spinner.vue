<template>
	<div class="spinner"></div>
</template>

<script>
export default {
	name: "Spinner"
}
</script>

<style scoped>
	@keyframes spinner {
		to {transform: rotate(360deg);}
	}

	.spinner {
		content: '';
		box-sizing: border-box;
		width: 20px;
		height: 20px;
		margin-top: -15px;
		margin-left: -15px;
		border-radius: 50%;
		border: 5px solid #ccc;
		border-top-color: #2b354c;
		animation: spinner .6s linear infinite;
	}
</style>