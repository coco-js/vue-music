import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/view/main'
import Song from '@/view/song'
import PlayList from '@/view/playlist'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Main',
			component: Main
		},{
			path: '/song',
			name: 'Song',
			component: Song
		},{
			path: '/playlist',
			name: 'PlayList',
			component: PlayList
		}
	]
})
