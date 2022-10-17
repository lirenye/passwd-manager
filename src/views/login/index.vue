<style lang='less' scoped>
.login-container{
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(120deg, #000066, #552e97, #9560ca, #d796ff);

  .form-card{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 80%;
    height: 40%;
    padding: 10px;
    box-sizing: border-box;
  }

  .van-cell{
    border-radius: 6px;
    margin-bottom: 10px;
  }
}
</style>

<template>
  <div class="login-container">
    <div class="form-card">
      <van-form ref="loginForm" @submit="onSubmit" validate-trigger="onChange" :disabled="isLogin">
        <van-field v-model="userInfo.username" clearable name="username" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' },{validator: userRules.user, message: '用户名长度4 ~ 8'}]" />
        <van-field v-model="userInfo.password" clearable type="password" name="password" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' },{validator: userRules.pass, message: '密码长度6 ~ 10'}]" />
        <div style="margin: 20px;">
          <van-button round block type="info" native-type="submit" :disabled="isLogin">
            <van-loading v-if="isLogin" color="#eee" size="24px">登录中...</van-loading>
            <p v-else>登录</p>
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

interface UserInfo {
  username: string,
  password: string
}

@Component
export default class Login extends Vue {
  // user info data
  userInfo:UserInfo = {
    username: '',
    password: ''
  }
  userRules = {
    user(val:string){
      return (val.length >= 4 && val.length <= 8)
    },
    pass(val:string){
      return (val.length >= 6 && val.length <= 10)
    }
  }

  // login status
  isLogin = false;

  // 提交登录信息
  async onSubmit(values:UserInfo){
    this.isLogin = true;
    
    const {data: res} = await this.$axios.post('/login', values);
    
    this.isLogin = false;
    if (res.meta.status !== 200) return this.$notify({ type: 'warning', message: res.meta.msg });
    
    // login ok
    sessionStorage.setItem('token', res.data.token);
    this.$notify({ type: 'success', message: res.meta.msg, duration:1000 });
    this.$router.push('/');
  }
}
</script>
