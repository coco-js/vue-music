<template>
	<div id="indexMain">
		<topbar></topbar>
		<div class="container">
			<nav class="tab" @click="tabSelected">
				<li class="selected">
					<span>推荐音乐</span>
				</li>
				<li>
					<span>热歌榜</span>
				</li>
				<li>
					<span>搜索</span>
				</li>
			</nav>
			<div class="content">
				<div class="item">
					<h2>推荐歌单</h2>
					<div class="list">
						<div class="panel" v-for="list in $store.state.recomSong">
							<router-link :to="{name: 'PlayList',query:{id:list.id}}">
								<div class="img">
									<img :src="list.picUrl" alt="">
									<span class="playcount">{{ playCount(list.playCount) }}</span>
								</div>
								<p class="text">
									{{ list.name }}
								</p>
							</router-link>
						</div>
					</div>
				</div>
				<div class="item">
					<h2>最新音乐</h2>
					<div class="list2">
						<div v-for='list in $store.state.newSong'>
							<router-link :to="{name:'Song',query:{id:list.id}}">
								{{ list.name }}&nbsp;&nbsp;<span class="des">{{ list.song.alias[0] }}</span>
								<p class="artists">
									<span v-for='name in list.song.album.artists'>{{ name.name }}</span>-
									<span>{{ list.name }}</span>
								</p>
								<span class="play" :style="playbg"></span>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<foot></foot>
	</div>
</template>

<script>
	import topbar from '../components/header'
	import foot from '../components/footer'

	export default {
		name: 'indexMain',
		data() {
			return {
				playbg: {
					backgroundImage: 'url('+require("../assets/img/index_icon_2x.png")+')',
					backgroundRepeat: 'no-repeat',
					backgroundSize: '166px 97px',
					backgroundPosition: '-24px 0'
				}
			}
		},
		mounted() {
			this.$store.dispatch('getNewSong');
			this.$store.dispatch('getRecomSong');
		},
		methods: {
			tabSelected(e) {
				let target = e.target;
				if(target.nodeName.toLowerCase()=="span"){
					let children = target.parentNode.parentNode.children;
					for(let i=0;i<children.length;i++){
						children[i].className="";
					}
					target.parentNode.className="selected";
				}
				if(target.nodeName.toLowerCase()=="li"){
					let children = target.parentNode.children;
					for(let i=0;i<children.length;i++){
						children[i].className="";
					}
					target.className="selected";
				}
			},
			playCount(num) {
				return parseInt(num/10000)+'万次';
			}
		},
		components: {
			topbar,
			foot
		}
	}
</script>

<style lang='scss' scoped>
	@import "../assets/css/main";
</style>
