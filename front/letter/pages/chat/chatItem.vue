<template>
	<view class="outer">
		<view class="msg">
			<image src="../../static/chat/photo.png" v-bind:class="{img_user_1: userFlag, img_user_2: !userFlag}"></image>
			<view v-bind:class="{msg_user_1: userFlag, msg_user_2: !userFlag}">
				ffffffffffffffffffffffffffffffffffffffff
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userFlag: true,
			}
		},

		props: [
			'item'
		],

		/**
		 * Change the userFlag
		 * */

		mounted: function() {
			if (this.item.user == 'user_1') {
				this.userFlag = true;
			} else {
				this.userFlag = false;
			}
		},

	}
</script>

<style>
	image {
		width: 110rpx;
		height: 110rpx;
	}

	.msg {
		width: 100%;
	}

	.outer {
		width: 100%;
		min-height: 160rpx;
		display: relative;
		margin-top: 20rpx;
	}

	.img_user_1 {
		margin-left: 620rpx;
	}

	.img_user_2 {}

	.msg_user_1 {
		display: flex;
		flex-direction: column;
		background: #BFBFBF;
		min-height: 0rpx;
		margin-left: 150rpx;
		margin-top: -120rpx;
		border-radius: 40rpx;
		max-width: 450rpx;
		color: white;
		word-break: break-all;
		font-size: 1.5em;
	}

	.msg_user_2 {
		display: flex;
		flex-direction: column;
		min-height: 0rpx;
		margin-left: 150rpx;
		margin-top: -120rpx;
		border-radius: 40rpx;
		max-width: 450rpx;
		color: #BFBFBF;
		word-break: break-all;
		font-size: 1.5em;
	}
</style>
