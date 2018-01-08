<template>
	<footer id="foot" :style="footbg">
		<div class="down">打开APP，发现更多好音乐 ></div>
	</footer>
</template>

<script>
	export default {
		name: 'foot',
		data() {
			return {
				footbg: {
					backgroundImage: 'url('+require("../assets/img/recommand_bg_2x.png")+')'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#foot {
		display:flex;
		align-items:center;
		height:150px;
		.down{
			width:80%;
			height:50px;
			margin:0 auto;
			border:1px solid #d33a31;
			border-radius:50px;
			text-align:center;
			line-height:50px;
			font-size:16px;
			color:#d33a31;
		}
	}
</style>