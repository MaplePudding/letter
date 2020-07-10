<template>
	<view>
		<view id="top"></view>
		<view class="topBar">
			<image src="../../static/chat/back.png" class="back" v-on:click="back"></image>
			<view>
				UserName
			</view>
			<image src="../../static/chat/menu.png" class="menu" v-on:click="showMenu"></image>
			<view class="delete" v-if="flag" v-on:click="del">Delete</view>
		</view>
		<scroll-view>
			<chat-item v-for="item in message" v-bind:key="item.key" v-bind:item="item" v-bind:name="userName"></chat-item>
		</scroll-view>
		<view class="input">
			<input type="text" />
			<button v-on:click="send">send</button>
		</view>
	</view>
</template>

<script>
	import chatItem from './chatItem.vue'
	export default {
		data() {
			return {
				name: '',
				flag: false,
				message: [{
						msg: 'hello',
						user: 'user_1'
					},
					{
						msg: 'world',
						user: 'user_2'
					}
				],
				userFLag: true,
				userName: ''
			}
		},

		onLoad(obj) {
			var temp = JSON.parse(obj.content)["content"];
			this.message = temp;
			this.userName = obj.name;
		},

		methods: {

			/**
			 * Back to index page
			 * */

			back: function() {
				uni.navigateBack({

				})
			},

			/**
			 * Show delete menu
			 * */

			showMenu: function() {
				this.flag = !this.flag;
			},

			/**
			 * Delete friend
			 * */

			del: function() {

			},

			/**
			 * Send message
			 * */

			send: function() {

			}
		},

		components: {
			chatItem,
		}
	}
</script>

<style>
	.topBar {
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 4rpx solid #bfbfbf;
		color: #BFBFBF
	}

	.back {
		width: 80rpx;
		height: 80rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.menu {
		width: 90rpx;
		height: 100rpx;
		margin-top: 6rpx;
	}

	.input {
		width: 100%;
		height: 120rpx;
		background: #BFBFBF;
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.input input {
		width: 70%;
		background: white;
		height: 70%;
		border-radius: 40rpx;
		color: #BFBFBF;
		margin-left: 30rpx;
	}

	.input button {
		height: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 40rpx;
		color: #BFBFBF
	}

	.delete {
		position: absolute;
		right: 10rpx;
		top: 116rpx;
		width: 150rpx;
		height: 60rpx;
		text-align: center;
		background: #BFBFBF;
		color: white;
		z-index: 5;
	}

	scroll-view {
		height: 900rpx
	}

	scroll-view image {
		width: 130rpx;
		height: 130rpx;
	}

	.msg {
		width: 100%;
	}
</style>
