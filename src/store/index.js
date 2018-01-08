import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var api = 'http://localhost:3000';

export default new Vuex.Store({
	state: {
		count: 0,
		recomSong: [],			//推荐歌曲json
		newSong: [],			//最新歌曲json
		playList: [],			//歌单
		musicInfo: {
			name:'',
			cover:'',
			musicUrl:'',
			lyrics: ''
		}
	},
	mutations: {
		newSong(state,data) {
			state.newSong = data;
		},
		recomSong(state,data) {
			state.recomSong = data;
		},
		musicInfo(state,data) {
			if(data.name) {
				state.musicInfo.name = data.name;
			}
			if(data.url) {
				state.musicInfo.musicUrl = data.url;
			}
			if(data.cover){
				state.musicInfo.cover = data.cover;
			}
			if(data.lyric){
				state.musicInfo.lyrics = data.lyric;
			}
		}
	},
	actions: {
		//获取最新歌曲API
		getNewSong({commit,state}) {
			axios.get(`${api}/personalized/newsong`).then(res=>{
				commit('newSong',res.data.result)
			})
		},
		//获取推荐歌曲API
		getRecomSong({commit,state}) {
			axios.get(`${api}/personalized`).then(res=>{
				const data = res.data.result;
				let arr = [];
				for(let i=0;i<6;i++){
					arr.push(data[i]);
				}
				commit('recomSong',arr)
			})
		},
		//播放音乐页面
		getPlayMusicInfo({commit,state},mid) {
			//音乐url
			axios.get(`${api}/music/url`,{params:{
				id: mid
			}}).then(res=>{
				commit('musicInfo',{url:res.data.data[0].url});
			})
			//音乐详情
			axios.get(`${api}/song/detail`,{params:{
				ids: mid
			}}).then(res=>{
				let data = res.data.songs[0];
				let coverImg = data.al.picUrl;
				commit('musicInfo',{cover:coverImg})
				commit('musicInfo',{name:data.name})
			})
			//歌词
			axios.get(`${api}/lyric`,{params:{
				id: mid
			}}).then(res=>{
				let data = res.data.lrc.lyric;
				commit('musicInfo',{lyric:data})
			})
		}
	}
})