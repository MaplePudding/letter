<template>
	<view>
		<view id="top"></view>
		<image src="../../static/signup/back.png" v-on:click="back"></image>
		<view id="signup">Sign Up</view>
		<form class="form" v-on:submit="formSubmit">
			<view class="name">
				<input placeholder="name" v-model="name" v-on:input="clearExists"/>
				<view class="tips" v-if="checkName">Username can not be empty</view>
				<view class="tips" v-if="exists">Username already exists</view>
			</view>
			<view class="email">
				<input placeholder="email" v-model="email" />
				<view class="tips" v-if="checkEmail">Email can not be empty</view>
				<view class="tips" v-if="vertifyEmail">Email format error</view>
			</view>
			<view class="password">
				<input type="password" placeholder="password" v-model="password" />
				<view class="tips" v-if="checkPwd">password can not be empty</view>
			</view>
			<button v-bind:disabled="checkButton || flag" form-type="submit">Sign up</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				password: '',
				email: '',
				flag: true,
				exists: false
			}
		},
		methods: {

			/**
			 * Return to the login.vue
			 * */

			back: function() {
				uni.navigateBack({

				})
			},

			/**
			 * Send registration information to the server
			 * */

			formSubmit: function() {
				uni.request({
					url: 'http://127.0.0.1:3000/signup',
					data: {
						name: this.name,
						email: this.email,
						password: this.password
					},
					method: 'POST',
					success: (res) => {
						if (res.data == 'exists') {
							this.exists = true;
						} else {
							uni.reLaunch({
								url: '../login/login?name=' + this.name + '&password=' + this.password
							})
						}
					}
				})
			},
			
			/**
			 * 
			 * */
			 
			 clearExists: function(){
				 this.exists = false;
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
				if (this.name == '' || this.password == '' || this.email == '') {
					return true;
				}
				return false;
			},

			/**
			 * Checks if password is ''
			 * */

			checkEmail: function() {
				if (this.email == '') {
					return true;
				}
				return false;
			},

			/**
			 * Vertify email
			 * */

			vertifyEmail: function() {
				var regex = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/g;
				return this.flag = !this.email.match(regex);
			}
		}
	}
</script>

<style>
	@import url("../../static/common/css/common.css");

	image {
		width: 50rpx;
		height: 50rpx;
		margin-top: 20rpx;
		margin-left: 10rpx;
	}

	#signup {
		margin-top: 90rpx;
		font-size: 2em;
		text-align: center;
	}

	.form {
		display: flex;
		width: 90%;
		margin: 40rpx auto;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.name {
		height: 170rpx;
	}

	.password {
		height: 170rpx;
	}

	.email {
		height: 170rpx;
		margin-bottom: 80rpx;
		margin-top: 50rpx;
	}

	button {
		width: 90%;
	}

	.tips {
		font-size: 0.85em;
		color: red;
	}
</style>
