<template>
	<view>
		<view id="top">
		</view>
		<view class="search">
			<image src="../../static/search/back.png" class="back" v-on:click="back"></image>
			<input type="text" v-model="searchData" />
			<image src="../../static/search/search.png" v-on:click="search"></image>
		</view>
		<scroll-view>
			<view class="searchItem" v-for="item in resData">
				<image src="../../static/logo.png"></image>
				<view>
					{{item.name}}
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
				searchData: '',
				resData: '',
				userName: '',
				arrOfFriends: '',
				searchList: ''
			}
		},

		/**
		 * Get username and friendList
		 * */

		onLoad(obj) {
			this.userName = obj.name;
			this.arrOfFriends = JSON.parse(obj.arr)["arr"];
		},

		methods: {

			/**
			 * Search user
			 * */

			search: function() {
				uni.request({
					url: 'http://127.0.0.1:3000/search',
					data: {
						text: this.searchData,
						name: this.userName,
						friendList: {
							friendList: this.arrOfFriends
						}
					},
					method: 'GET',
					header: {
						'custom-header': 'searchData',
					},
					success: (res) => {
						this.resData = res.data;
					}
				})
			},



			/**
			 * Back to index page
			 * */

			back: function() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style>
	@import url("../../static/common/css/common.css");

	.search {
		height: 110rpx;
		background-color: #BFBFBF;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.search input {
		background: white;
		width: 600rpx;
		border-radius: 50rpx;
		color: #BFBFBF;
	}

	.search image {
		width: 90rpx;
		height: 90rpx;
		margin-left: 30rpx;
	}

	.searchItem image {
		width: 120rpx;
		height: 120rpx;
		margin: 10rpx;
		border-radius: 50%;
	}

	.searchItem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.searchItem view {
		margin-left: 40rpx;
		font-size: 1.4em;
		color: #BFBFBF;
	}

	.searchItem button {
		margin-left: 90rpx;
		width: 160rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		background: #BFBFBF;
		color: white;
		border-radius: 40rpx;
		outline: none;
	}
</style>
