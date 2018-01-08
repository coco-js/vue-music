<template>
	<div id="playlist">
		<div class="head">
			<div class="top-goback">
				<i @click="goBack"><img src="../assets/img/goback_1.png" width="16" alt=""></i>
			</div>
			<div class="bg-area" :style='"background:url("+playlist.coverImgUrl+");background-size:cover;background-position:center"'></div>
			<div class="model"></div>

			<div class="panel">
				<div class="left">
					<img :src='playlist.coverImgUrl' width="145" height="145" alt="">
				</div>
				<div class="right">
					<p>{{playlist.name}}</p>
					<p class="nickname">
						<span><img :src='avatarImg' class="avatar" width="30" height="30" alt=""></span>&nbsp;
						<span>{{ nickname }}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="description">
			<div class="tag">
				标签：<span v-for="tag in playlist.tags">{{tag}}</span>
			</div>
		</div>
		<div class="list2">
			<div v-for='list in playlist.tracks'>
				<router-link :to="{name:'Song',query:{id:list.id}}">
					{{ list.name }}&nbsp;&nbsp;<span class="des">{{ list.alia[0] }}</span>
					<p class="artists">
						<span v-for='name in list.ar'>{{ name.name }}</span>-
						<span>{{ list.al.name }}</span>
					</p>
					<span class="play" :style="playbg"></span>
				</router-link>
			</div>
		</div>
		<div class="loading" v-if='loading'>
			<vue-loading type="spin" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>   
		</div>
	</div>
</template>

<script>
	import vueLoading from 'vue-loading-template'
	export default {
		name: 'playlist',
		data() {
			return {
				gid:this.$route.query.id,
				playlist: [],
				nickname:'',
				avatarImg: '',
				playbg: {
					backgroundImage: 'url('+require("../assets/img/index_icon_2x.png")+')',
					backgroundRepeat: 'no-repeat',
					backgroundSize: '166px 97px',
					backgroundPosition: '-24px 0'
				},
				loading: true
			}
		},
		mounted() {
			let that = this;
			this.$http.get('http://localhost:3000/playlist/detail?id='+this.gid).then(res=>{
				this.playlist = res.data.playlist;
				this.nickname = res.data.playlist.creator.nickname;
				this.avatarImg = res.data.playlist.creator.avatarUrl;
				setTimeout(()=>{
					that.loading = false;
				},500)
			})
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		},
		components: {
			vueLoading
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		position:relative;
		height:225px;
		.top-goback {
			position:absolute;
			top:0;
			left:0;
			right:0;
			padding:10px 0 0 10px;
			background:linear-gradient(180deg,rgba(0,0,0,.5),transparent);

			z-index:100;

		}
		.bg-area {
			position:absolute;
			top:0;
			left:0;
			right:0;
			bottom:0;
			filter:blur(15px);
		}
		.model {
			position:absolute;
			top:0;
			left:0;
			right:0;
			bottom:0;
			background:rgba(0,0,0,.5);
		}
		.panel {
			position:absolute;
			top:0;
			left:0;
			right:0;
			bottom:0;

			padding:50px 10px 30px 15px;
			box-sizing:border-box;
			display:flex;
			.left{
				width:145px;
				margin-right:20px;
				box-sizing:border-box;
			}
			.right {
				width:200px;
				color:#fff;
				font-size:16px;
				line-height:1.5;
				.nickname {
					display:flex;
					align-items:center;
					padding-top:10px;
					font-size:14px;
					color:#c3c3c3;
					.avatar {
						border-radius:50%;
					}
				}
				
			}
		}

	}
	.description {
		padding:15px;
		.tag {
			span {
				font-size:12px;
				padding:4px;
				border:1px solid #e3e3e3;
				border-radius:10px;
				color:#555;
				margin-right:3px;
			}
		}
	}
	.list2 {
		a {
			position:relative;
			display:block;
			padding:6px 0px 6px 10px;
			color:#333;
			font-size:16px;
			border-bottom:1px solid #f3f3f3;
			.des {
				display:inline-block;
				width:50%;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
				color:#888;
				font-size:12px;
			}
			.play {
				position:absolute;
				top: calc(50% - 11px);
				right:10px;

				display:inline-block;
				width:22px;
				height:22px;
			}
			.artists {
				span {
					font-size:12px;
					color:#888;
					&::after {
						content: ' / ';
					}
				}
				span:last-child,span:nth-last-child(2) {
					&::after {
						content: '';
					}
				}
			}
		}
	}
	.loading {
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		
		display:flex;
		align-items:center;
		background:#fff;
		z-index:999;
	}
</style>