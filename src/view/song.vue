<template>
	<div id="song">
		<div class="bg-area" :style='"background:url("+$store.state.musicInfo.cover+") no-repeat;background-size:cover;background-position:auto center;"'></div>
		<div class="modal"></div>
		<div class="top-goback">
			<i @click="goBack"><img src="../assets/img/goback_1.png" width="16" alt=""></i>
			<span>{{ $store.state.musicInfo.name }}</span>
		</div>
		<div class="cover">
			<img :src='$store.state.musicInfo.cover' alt="">
		</div>
		<div class="lrc">
			<ul>
				<li>{{prevLy}}</li>
				<li class="current">{{lyric}}</li>
				<li>{{nextLy}}</li>
			</ul>
		</div>
		<div class="play" @click="play">
			<div><img :src='btn.src' width="80" height="80" alt=""></div>
		</div>
		<div v-if='$store.state.musicInfo.musicUrl'>
			<audio id="ado" v-on:timeupdate='timeupdate' class="audio" autoplay="autoplay" controls="controls" style="display:none" :src='$store.state.musicInfo.musicUrl'></audio>
		</div>
	</div>
</template>

<script>
	function parseLyric(lrc) {
		let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
		let time;
		let t,m,s;
		let lyrArr = lrc.split('\n');
		let newArr = [];
		for(var i=0;i<lyrArr.length;i++){
			time = lyrArr[i].match(timeReg);
			if(time){
				for(var j=0;j<time.length;j++){

					t = time[j].replace(/\[|]/g,'');
					m = Number(t.split(':')[0]);
					s = Number(t.split(':')[1]);
					t = (m*60)+s;
					if(lyrArr[i].replace(timeReg,'')){
						newArr.push({
							t:Number(t),
							l:lyrArr[i].replace(timeReg,'')
						})
					}

				}
			}
		}
		return newArr;
	}
	
	export default {
		name: 'song',
		data() {
			return {
				id: this.$route.query.id,
				lyric: '',
				prevLy: '',
				nextLy: '',
				btn: {
					state: true,
					src: require('../assets/img/stop_btn.png')
				}
			}
		},
		mounted() {
			let that = this;
			this.$store.dispatch('getPlayMusicInfo',this.id);
			// this.bg.backgroundImage = 'url("'+this.$store.state.musicInfo.cover+'")';
			this.$nextTick();
		},
		methods: {
			play() {
				if(this.btn.state==true){
					this.btn.src = require('../assets/img/play_btn.png');
					this.btn.state = false;
					document.querySelector('#ado').pause();
				}else{
					this.btn.src = require('../assets/img/stop_btn.png');
					this.btn.state = true;
					document.querySelector('#ado').play();
				}
				
			},
			timeupdate(e) {
				let cur = e.target.currentTime;
				let ly = this.$store.state.musicInfo.lyrics;
				const arr = parseLyric(ly);
				for(let i=0;i<arr.length;i++){
					if(cur>=arr[i].t){
						this.lyric = arr[i].l;
						if(i>0){
							this.prevLy = arr[i-1].l;
						}
						if(i<arr.length){
							this.nextLy = arr[i+1].l;
						}
					}
				}
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	#song {
		position:relative;
		width:100%;
		height:100vh;
		.bg-area {
			position:absolute;
			top:0;
			left:0;
			right:0;
			bottom:0;
			filter:blur(15px);
		}
		.modal {
			position:absolute;
			top:0;
			left:0;
			right:0;
			bottom:0;
			background:rgba(0,0,0,.5);
		}
		.top-goback {
			position:absolute;
			top:0;
			left:0;
			right:0;
			padding:10px;
			background:linear-gradient(180deg,rgba(0,0,0,.5),transparent);
			color:#fff;
			font-size:18px;
			display:flex;

			i {
				display:inline-block;
			}
			span{
				line-height:1.5;
				margin:0 auto;
			}

		}
		.cover {
			position:absolute;
			top:20%;
			left:calc(50% - 110px);


			width:220px;
			height:220px;
		}
		.lrc {
			position:absolute;
			top:calc(20% + 250px);
			width:100%;
			height:30px;

			text-align:center;
			color:#e3e3e3;
			li {
				padding:5px;
			}
			.current {
				font-size:18px;
				color:#fff;
				font-weight:bold;
			}
		}
		.play {
			position:absolute;
			top:calc(20% + 250px + 120px);
			left:calc(50% - 40px);
			width:80px;
			text-align:center;
		}
	}
	.audio {
		width:0;
		height:0;
	}
</style>