<style lang='less' scoped>
div{
  position: relative;

  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);

    width: 80%;
    height: 80%;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0 35px 80px 20px rgba(1, 34, 251, 0.15);

    overflow: scroll;
  }
}
</style>

<template>
  <div>
    <div class="card">
      <van-form @submit="onSubmit" ref="addForm" validate-trigger="onChange">
        <van-field v-model="account.platform" @blur="clearErrorMessage" :maxlength="maxlength.platform" clearable name="platform" label="平台名称" placeholder="平台名称"
          :rules="[{ required: true, message: '请填写平台名称' }]" />
        <van-field v-model="account.username" @blur="clearErrorMessage" :maxlength="maxlength.username" clearable name="username" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="account.password" @blur="clearErrorMessage" :maxlength="maxlength.password" clearable name="password" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="account.email" @blur="clearErrorMessage" :maxlength="maxlength.email" clearable name="email" label="邮箱地址" placeholder="邮箱地址"
          :rules="[]" />
        <van-field v-model="account.mobile" @blur="clearErrorMessage" :maxlength="maxlength.mobile" clearable name="mobile" label="电话号码" placeholder="电话号码"
          :rules="[{required: false},{pattern: /\d{11}/, message: '必须11个数字'}]" />
        <van-field v-model="account.remark" @blur="clearErrorMessage" :maxlength="maxlength.remark" clearable name="remark" rows="2" autosize label="备注信息" type="textarea" placeholder="请输入备注信息"
          show-word-limit />
        <div style="margin: 18px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator';
@Component
export default class Add extends Vue {
  // account info
  account = {
    platform: '',
    username: '',
    password: '',
    email: '',
    mobile: '',
    remark: ''
  };

  // max length rules
  maxlength = {
    platform: 10,
    username: 16,
    password: 20,
    email: 20,
    mobile: 11,
    remark: 30
  }

  // field value to empty clear error message
  @Ref() readonly addForm!: HTMLFormElement;
  clearErrorMessage(evet: any){
    if (!evet.target._value) return this.addForm.resetValidation(evet.target.name);
  }

  // go commit account info
  onSubmit(){
    this.$axios.get('/account/test')
    .then(res=>{
      console.log(res);
      
    })
  }
}
</script>
