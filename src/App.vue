<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
	html,body{
	  min-height:100vh;
	  background:#fcfcfd;
	  font-size:14px;
	}
	a {text-decoration:none;}
	.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
	.clearfix{*+height:1%;}
</style>
