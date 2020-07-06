<template>
	<view>
		<view id="top">
		</view>
		<view class="search">
			<image src="../../static/search/back.png" class="back" v-on:click="back"></image>
			<input type="text"/>
			<image src="../../static/search/search.png" v-on:click="search"></image>
		</view>
		<scroll-view>
			<view class="searchItem">
				<image src="../../static/logo.png"></image>
				<view>
					userName
				</view>
				<button>Add</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
			/**
			 * Search user
			 * */
			 
			search: function(){
				
			},
			
			/**
			 * Back to index page
			 * */
			 
			 back: function(){
				 uni.navigateBack({
				 	
				 })
			 }
		}
	}
</script>

<style>
	@import url("../../static/common/css/common.css");
	
	.search{
		height: 110rpx;
		background-color: #BFBFBF;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.search input{
		background: white;
		width: 600rpx;
		border-radius: 50rpx;
		color: #BFBFBF;
	}
	
	.search image{
		width: 90rpx;
		height: 90rpx;
		margin-left: 30rpx;
	}
	
	.searchItem image{
		width: 140rpx;
		height: 140rpx;
		margin: 10rpx;
		border-radius: 50%;
	}
	
	.searchItem{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.searchItem view{
		margin-left: 40rpx;
		font-size: 1.4em;
		color: #BFBFBF;
	}
	
	.searchItem button{
		margin-left: 60rpx;
		width: 200rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background: #BFBFBF;
		color: white;
		border-radius: 40rpx;
		outline: none;
	}
	
	
</style>
