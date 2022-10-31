<style lang='less' scoped>
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  height: 80%;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 35px 80px 20px rgba(1, 34, 251, 0.15);

  overflow: scroll;
}
</style>

<template>
  <div>
    <div class="card">
      <van-form validate-trigger="onChange" ref="userModify">
        <van-field v-model="password" type="text" name="password" placeholder="修改密码" clearable @blur="clearErr"
          :rules="[{ pattern: /^(\d|\w){6,10}$/, message: '密码6~10个字符'}]" >
          <template #button>
            <van-button @click="goModifyPassword" :disabled="buttonStatus" type="warning" native-type="button" size="small">修改密码</van-button>
           </template>
        </van-field>
        <van-field style="margin-top: 20px;" v-model="email" type="text" name="email" placeholder="修改邮箱" clearable
         :rules="[{ pattern: /^([0-9]|[a-z]|[A-Z])*@([a-z]|[0-9])+.com$/, message: '不是电子邮箱' }]"
         @blur="clearErr"
         maxlength="30">
          <template #button>
            <van-button :disabled="buttonStatus" @click="goModifyEmail" type="info" native-type="button" size="small">修改邮箱</van-button>
          </template>
        </van-field>
      </van-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator';
@Component
export default class User extends Vue {
  password = '';
  email = '';
  buttonStatus = false

  // 获取form
  @Ref() readonly userModify!: HTMLFormElement;
  // 清除警告信息
  clearErr(event: any){
    if (!(event.target.value === '')) return;
    this.userModify.resetValidation(event.target.name);
  };

  // 修改密码
  async goModifyPassword(event: any){
    // 数据验证
    try {
      await this.userModify.validate('password');
    } catch (error) {
      return;
    }
    // 发送请求
    this.buttonStatus = true;
    const {data: res} = await this.$axios.post('/user/modifypassword',{password: this.password});
    if(res.meta.status !== 200) return this.$notify({type: 'warning', message: '修改失败', duration: 1200});
    this.$notify({type: 'success', message: res.meta.msg, duration: 1000});
    this.buttonStatus = false;
  };

  // 修改电子邮箱
  async goModifyEmail(){
    // 验证电子邮箱信息
    try {
      await this.userModify.validate('email');
    } catch (error) {
      return;
    };
    // 发送请求
    this.buttonStatus = true;
    const {data: res} = await this.$axios.post('/user/modifyemail', {email: this.email});
    if(res.meta.status !== 200) return this.$notify({type: 'warning', message: '修改邮箱失败', duration: 1200});
    this.$notify({type: 'success', message: res.meta.msg, duration: 1000});
    this.buttonStatus = false;
  }
}
</script>
