<template>
	<div class="header">
		<div class="topbar">
			<div class="logo">
				<h1>网易云音乐</h1>
			</div>
			<div class="down">
				<span class="d-btn">下载APP</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'topbar'
	}
</script>

<style scoped lang="scss">
	$red: #d43c33;
	.header {
		height:64px;
		.topbar {
			position:fixed;
			top:0;
			left:0;
			right:0;
			z-index:100;

			display:flex;
			align-items: center;
			justify-content: space-between;
			height:64px;
			padding:0 10px;
			background: $red;
			color:#fff;
			.logo {
				font-size:18px;
			}
			.down {
				width:80px;
				height:30px;
				box-sizing:border-box;
				border:1px solid #e3e3e3;
				border-radius:30px;
				font-size:14px;
				.d-btn {
					line-height:30px;
					padding:0 10px;
				}
			}
		}
	}
</style>