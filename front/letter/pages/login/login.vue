<template>
	<view>
		<view id="top">

		</view>
		<view class="login">
			Login
		</view>
		<form class="form" v-on:submit="formSubmit">
			<view class="name">
				<input placeholder="name" v-model="name" name="name" />
				<view class="tips" v-show="checkName">please enter name</view>
			</view>
			<view class="password">
				<input placeholder="password" type="password" v-model="password" name="password" />
				<view class="tips" v-show="checkPwd">please enter password</view>
				<view class="tips" v-if="loginFlag">password or name error</view>
			</view>
			<button v-bind:disabled="checkButton" form-type="submit">login</button>
			<view class="signup" v-on:click="toSignUp">
				<image src="../../static/login/sign-up.png"></image>sign-up
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				password: '',
				loginFlag: false
			}
		},
		methods: {

			/**
			 * redirect to signup.vue
			 * */

			toSignUp: function() {
				uni.navigateTo({
					url: '../signup/signup',
				})
			},

			/**
			 * Form submit
			 * */

			formSubmit: function(e) {
				var formDate = e.detail.value;
				uni.request({
					url: 'http://127.0.0.1:3000/login',
					method: 'POST',
					data: {
						loginMsg: formDate
					},

					success: (res) => {
						console.log(res.data);
						if(res.data="Login Error"){
							this.loginFlag = true;
						}
					}
				});
			}
		},
		computed: {

			/**
			 * Checks if name is ''
			 * */

			checkName: function() {
				if (this.name == '') {
					return true;
				}
				return false;
			},

			/**
			 * Checks if password is ''
			 * */

			checkPwd: function() {
				if (this.password == '') {
					return true;
				}
				return false;
			},

			/**
			 * button -> disabled
			 * */

			checkButton: function() {
				if (this.name == '' || this.password == '') {
					return true;
				}
				return false;
			}
		}
	}
</script>

<style>
	@import url("../../static/common/css/common.css");

	.login {
		text-align: center;
		margin-top: 160rpx;
		font-size: 2em;
	}



	button {
		margin-top: 80rpx;
		width: 90%;
	}

	.name {
		height: 190rpx;
		margin-bottom: 90rpx;
		margin-top: 50rpx;
	}

	.form {
		width: 90%;
		display: flex;
		margin: 60rpx auto;
		flex-direction: column;
		margin-top: 60rpx;
		justify-content: center;
		align-items: center;
	}

	.password {
		margin-bottom: 30px;
	}

	.form image {
		display: inline-flex;
		width: 40rpx;
		height: 40rpx;
	}

	button {
		margin-top: 120rpx;
		width: 100%;
	}


	.signup {

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #8F8F94;
		margin-top: 40rpx;
		padding-bottom: 8rpx;
	}

	.signup image {
		margin-right: 10rpx;
		margin-top: 10rpx;
		align-self: baseline;
	}

	.tips {
		font-size: 0.85em;
		color: red;
	}
</style>
