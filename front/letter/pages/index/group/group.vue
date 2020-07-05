<template>
	<view>
		<view id="top">
		</view>
		<view class="topBar">
			<image src="../../../static/index/photo.png" class="photo"></image>
			<image src="../../../static/index/search.png" class="search" v-on:click="search"></image>
			<image src="../../../static/index/logout.png" class="logout" v-on:click="logout"></image>
		</view>
		<scroll-view>
			<view class="item" v-on:click="toChatPage">
				<image src="../../../static/logo.png"></image>
				<view class="content">
					<view class="itemName">group</view>
					<view class="itemMsg">helloworld</view>
				</view>
				<view class="date">2019-11-1</view>
			</view>
		</scroll-view>
		<view class="toolBar">
			<image src="../../../static/index/friends.png" class="friends" v-on:click="switchToFriends"></image>
				<image src="../../../static/index/group.png" class="group" v-on:click="switchToGroup"></image>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

			/**
			 * Logout
			 * */

			logout: function() {

			},

			/**
			 * Search users
			 * */

			search: function() {

			},

			/**
			 * Switch to friends page
			 * */

			switchToFriends: function() {
				uni.navigateTo({
					url: '../index'
				})
			},

			/**
			 * Switch to friends page
			 * */

			switchToGroup: function() {

			},

			/**
			 * Navigate to chat page
			 * */

			toChatPage: function() {
				uni.navigateTo({
					url: '../../chat/chat'
				})
			}
		}
	}
</script>

<style>
	@import url("../../../static/common/css/common.css");

	.photo {
		width: 100rpx;
		height: 100rpx;
	}

	.logout {
		width: 80rpx;
		height: 80rpx;
		margin-top: 16rpx;
		margin-right: 10rpx;
	}

	.topBar {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 4rpx solid #bfbfbf;
	}

	.search {
		width: 90rpx;
		height: 90rpx;
		margin-top: 14rpx;
		margin-left: 400rpx;
	}

	.toolBar {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		border-top: 2rpx solid #8F8F94;
		width: 100%;
	}

	.friends {
		width: 130rpx;
		height: 130rpx;
	}

	.group {
		width: 95rpx;
		height: 95rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		margin-left: 16rpx;
		width: 320rpx;
		overflow: hidden;
	}

	.itemName {
		font-size: 1.2em;
	}

	.itemMsg {
		width: 180rpx;
		font-size: 0.8em;
		color: #8F8F94
	}

	.date {
		font-size: 0.9em;
		color: #BFBFBF;
		margin-left: 20rpx;
	}
</style>
