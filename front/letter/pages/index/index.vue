<template>
	<view>
		<view id="top">
		</view>
		<view id="logoutView" v-if="logoutFlag">
			<view class="logoutText">
				Log out?
			</view>
			<view class="logoutButtons">
				<button v-on:click="logout">Yes</button>
				<button v-on:click="cancel">No</button>
			</view>
		</view>
		<view class="topBar">
			<image src="../../static/index/photo.png" class="photo"></image>
			<image src="../../static/index/search.png" class="search" v-on:click="search"></image>
			<image src="../../static/index/logout.png" class="logout" v-on:click="showLogoutPage"></image>
		</view>
		<scroll-view>
			<view class="item" v-on:click="toChatPage(item.content, item.name); updateNum(item.name)" v-for="item in arrOfFriends">
				<image src="../../static/logo.png"></image>
				<view class="content">
					<view class="itemName">{{item.name}}</view>
					<view class="itemMsg">{{item.content[item.content.length - 1].msg}}</view>
				</view>
				<view class="date">2019-11-1</view>
			</view>
			<view class="countContainer">
				<view class="countItem" v-for="(value, key, index) in numbers">
					<view class="count">{{value}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="toolBar">
			<image src="../../static/index/friends.png" class="friends" v-on:click="switchToFriends"></image>
			<image src="../../static/index/group.png" class="group" v-on:click="switchToGroup"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				arrOfFriends: '',
				userName: '',
				logoutFlag: false,
				numbers: ''
			}
		},

		/**
		 * Reacquire the data rendering page
		 * */

		onShow() {
			this.refreshData();
		},

		onLoad(obj) {

			/**
			 * Get parameters
			 * */
			this.arrOfFriends = JSON.parse(obj.arr)["target"];
			this.userName = obj.name;
			this.onSocketMsg();
			this.numbers = this.getNumbers(this.arrOfFriends);
		},

		onReady() {
			this.connectWs();
			this.socketOpen();
		},

		methods: {

			/**
			 * Show logout page
			 * */

			showLogoutPage: function() {
				this.logoutFlag = true;
			},

			/**
			 * Log out
			 * */

			logout: function() {
				uni.reLaunch({
					url: '../login/login'
				})
			},

			/**
			 * Cancel logout
			 * */

			cancel: function() {
				this.logoutFlag = false;
			},



			/**
			 * Navigate to search page
			 * */

			search: function() {

				/**
				 * Get all friends and pass to search page
				 * */

				var arr = [];
				for (var el = 0; el < this.arrOfFriends.length; ++el) {
					arr.push(this.arrOfFriends[el]["name"]);
				}

				uni.navigateTo({
					url: '../search/search?name=' + this.userName + '&arr=' + JSON.stringify({
						arr: arr
					}) + '&friendList=' + JSON.stringify(this.arrOfFriends)
				})
			},

			/**
			 * Switch to friends page
			 * */

			switchToFriends: function() {

			},

			/**
			 * Switch to friends page
			 * */

			switchToGroup: function() {
				uni.navigateTo({
					url: './group/group'
				})
			},

			/**
			 * Navigate to chat page
			 * */

			toChatPage: function(content, friendName) {
				var temp = {
					content: content
				}
				var str = JSON.stringify(temp);
				uni.navigateTo({
					url: '../chat/chat?content=' + str + '&name=' + this.userName + '&friendName=' + friendName
				})
			},

			/**
			 * Establish websocket communication
			 * */

			connectWs: function() {
				uni.connectSocket({
					url: 'ws://127.0.0.1:4000/soc?name=' + this.userName,
				})
			},

			/**
			 * Monitor websocket opening time
			 * */

			socketOpen: function() {
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接已打开！');
				})
				uni.onSocketError(function(res) {
					console.log(res)
				});
			},

			/**
			 * Listen for WebSocket to receive message events from the server
			 * */

			onSocketMsg: function() {
				uni.onSocketMessage((res) => {
					var messageObj = JSON.parse(res.data);
					var friend = messageObj.user;
					for (var i = 0; i < this.arrOfFriends.length; ++i) {
						console.log(this.arrOfFriends[i].content);
						if (this.arrOfFriends[i].name == friend) {
							this.arrOfFriends[i].content.push(messageObj);
						}
					}
					this.getNumbers();
				});
			},

			/**
			 * Refresh data
			 * */

			refreshData: function() {

			},

			/**
			 * Update the number of unread messages
			 * */

			updateNum: function(name) {
				for (var i in this.arrOfFriends) {
					if (this.arrOfFriends[i].name == name) {
						for (var x in this.arrOfFriends[i].content) {
							this.arrOfFriends[i].content[x].flag = true;
						}
					}
				}

				uni.request({
					url: 'http://127.0.0.1:3000/updateNum',
					data: {
						userName: this.userName,
						arrOfFriends: JSON.stringify(this.arrOfFriends),
					},
					success: (res) => {
						console.log(res.data);
						this.arrOfFriends = res.data
					}
				})
			},

			/**
			 * Get a list of unread messages
			 * */

			getNumbers: function() {
				var numObj = {};
				var num = 0;
				for (var i in this.arrOfFriends) {
					for (var x in this.arrOfFriends[i].content) {
						if (this.arrOfFriends[i].content[x].flag == false) {
							++num;
						}
						console.log(this.arrOfFriends[i].content[x]);
					}
					numObj[this.arrOfFriends[i].name] = num;
					num = 0;
				}
				return numObj;
			}
		}
	}
</script>

<style>
	@import url("../../static/common/css/common.css");

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
		width: 240rpx;
		font-size: 0.8em;
		color: #8F8F94
	}

	.date {
		font-size: 0.9em;
		color: #BFBFBF;
		margin-left: 20rpx;
	}

	#logoutView {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100vh;
		opacity: 0.5;
		background: white;
		z-index: 10;
	}

	#logoutView .logoutText {
		color: black;
		font-size: 1.5em;
		margin-top: 280rpx;
		;
	}

	#logoutView .logoutButtons {
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-top: 100rpx;
	}

	#logoutView .logoutButtons button {
		width: 200rpx;
	}
	
	.countContainer{
		position: absolute;
		left: 100rpx;
		top: 10rpx;
		background: transparent;
		z-index: 20;
	}
	
	.countContainer .countItem{
		margin-top: 80rpx;
	}
	
	.countContainer .countItem .count{
		color: white;
		background: red;
		height: 40rpx;
		width: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 50%;
	}
</style>
