<template>
	<view>
		<view id="top">

		</view>
		<view class="login">
			Login
		</view>
		<view class="form">
			<view class="name">
				<input placeholder="name" v-model="name"/>
				<view class="tips" v-show="checkName">please enter name</view>
			</view>
			<view class="password">
				<input placeholder="password" type="password" v-model="password"/>
				<view class="tips" v-show="checkPwd">please enter password</view>
				<view class="tips" v-if="false">password or name error</view>
			</view>
			<button v-bind:disabled="checkButton">login</button>
			<view class="signup" v-on:click="toSignUp">
				<image src="../../static/login/sign-up.png"></image>sign-up
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				password: ''
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
			}
		},
		computed:{
			
			/**
			 * Checks if name is ''
			 * */
			 
			checkName: function(){
				if(this.name == ''){
					return true;
				}
				return false;
			},
			
			/**
			 * Checks if password is ''
			 * */
			 
			checkPwd: function(){
				if(this.password == ''){
					return true;
				}
				return false;
			},
			
			/**
			 * button -> disabled
			 * */
			
			checkButton: function(){
				if(this.name == '' || this.password == ''){
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
		margin-top: 80px;
		font-size: 2em;
	}



	button {
		margin-top: 40px;
	}
	
	.name{
		height: 95px;
	}

	.form {
		width: 90%;
		display: flex;
		flex-direction: column;
		margin-top: 30px;
		justify-content: center;
		align-items: center;
	}
	
	.password{
		height: 60px;
	}

	.form image {
		display: inline-flex;
		width: 20px;
		height: 20px;
	}


	.signup {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 15px;
		color: #8F8F94;
		padding-bottom: 4px;
		border-bottom: 1px solid #8F8F94;
	}

	.signup image {
		margin-right: 5px;
		align-self: baseline;
	}
</style>
