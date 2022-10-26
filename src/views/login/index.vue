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

  .van-code{
    padding: 6px 12px;
  }
}
</style>

<template>
  <div class="login-container">
    <div class="form-card">
      <van-form ref="loginForm" validate-trigger="onChange" :disabled="isLogin">
        <van-field v-model="userInfo.username" clearable name="username" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' },{validator: userRules.user, message: '用户名长度4 ~ 8'}]" />
        <van-field v-model="userInfo.password" clearable type="password" name="password" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' },{validator: userRules.pass, message: '密码长度6 ~ 10'}]" />
        
        <!-- 验证码区域 -->
        <van-row>
          <van-col span="18" offset="6">
            <van-field class="van-code" v-model="userInfo.code" center placeholder="请输入验证码"
            :rules="[{ pattern: /^\d{6}$/, message: '验证码6位数' }]">
              <template #button>
                <van-button size="small" type="primary" native-type="button" :disabled="!codeData.btnStatus" @click.native.stop="sendCode">
                  <span v-if="codeData.btnStatus">发送验证码</span>
                  <span v-else>{{codeData.countDownTime}}s</span>
                </van-button>
              </template>
            </van-field>
          </van-col>
        </van-row>
        <div style="margin: 20px;">
          <van-button round block type="info" native-type="button" @click="goLogin" :disabled="isLogin">
            <van-loading v-if="isLogin" color="#eee" size="24px">登录中...</van-loading>
            <p v-else>登录</p>
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator';

interface UserInfo {
  username: string,
  password: string,
  code: string
}

@Component
export default class Login extends Vue {
  // user info data
  userInfo:UserInfo = {
    username: '',
    password: '',
    code: ''
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

  // form DOM
  @Ref() readonly loginForm!: HTMLFormElement;

  // 提交登录信息
  async goLogin(){
    // 验证表单信息
    try {
      await this.loginForm.validate();
    } catch (error) {
      return;
    }
    
    this.isLogin = true;
    
    const {data: res} = await this.$axios.post('/login', this.userInfo);
    
    this.isLogin = false;
    if (res.meta.status !== 200) return this.$notify({ type: 'warning', message: res.meta.msg });
    
    // login ok
    sessionStorage.setItem('token', res.data.token);
    this.$notify({ type: 'success', message: res.meta.msg, duration:1000 });
    clearInterval(this.codeData.clearTime);
    window.localStorage.removeItem('LastTime')
    this.$router.push('/');
  };

  // 发送验证码
  beforeMount(){
    const nowTime = new Date().getTime();
    const lastTime = Number(window.localStorage.getItem('LastTime'));
    if(lastTime && lastTime >= nowTime) {
      const timeLeft = new Date(lastTime - nowTime).getSeconds();
      this.startCountDown(timeLeft);
    };
  }
  codeData = {
    countDownTime: 60,
    btnStatus: true,
    clearTime: 0
  }
  startCountDown(setTime?: number | undefined){
    if(setTime) {
      this.codeData.countDownTime = setTime;
      // window.localStorage.removeItem('LastTime');
    };
    // 存储时间戳
    const date = new Date()
    const lastTime = (date.getTime() + 60000).toString();
    window.localStorage.setItem('LastTime',lastTime );
    // 开始倒计时
    this.codeData.btnStatus = false;
    this.codeData.clearTime =
      setInterval(() => {
        if (!(this.codeData.countDownTime - 1)) {
          this.codeData.btnStatus = true;
          this.codeData.countDownTime = 60;
          window.localStorage.removeItem('LastTime');
          return clearInterval(this.codeData.clearTime);
        }
        this.codeData.countDownTime -= 1
      }, 1000);
  };
  async sendCode(){
    // 检验用户名和密码
    try {
      await this.loginForm.validate('username');
      await this.loginForm.validate('password');
    } catch (error) {
      return;
    }
    const {data: res} = await this.$axios.post('/code', this.userInfo);
    this.startCountDown();
    if(res.meta.status !== 200) return this.$notify({type: 'warning', message: res.meta.msg, duration: 1200});
    else return this.$notify({type: 'success', message: res.meta.msg, duration: 1000});
  }
}
</script>
