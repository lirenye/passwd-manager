<style lang='less' scoped>
.card {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -60%);
  margin: 12px auto;

  width: 90%;
  height: 80%;
  padding: 21px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 35px 80px 20px rgba(1, 34, 251, 0.15);

  overflow: scroll;
}
.types-button{
  margin: 10px 0;
}

.accout-platform{
  text-align: left;
  font-size: 16px;

  span{
    font-weight: 700;
    color: rgb(51, 138, 220);
  }
}

.info{

  p{
    text-align: left;

    span{
      font-weight: 600;
      color: rgb(51, 138, 220);
    }
  }
}
</style>

<template>
  <div>
    <!-- 类型选择弹窗 -->
    <van-action-sheet @select="selectHandle" v-model="actionSheetStatus" :actions="queryTypes" cancel-text="取消" :description="actionSheetDesc" close-on-click-action />
    <!-- 搜索栏 -->
    <van-row>
      <van-col :span="18">
        <van-search @input="inputHandle" v-model="queryInfo.value" placeholder="请输入搜索关键词" />
      </van-col>
      <van-col :span="6">
        <van-button class="types-button" plain type="info" size="small" @click="actionSheetStatus = true">{{queryTypes[btnIndex].name}}</van-button>
      </van-col>
    </van-row>

    <!-- show zone -->
    <div class="card">
      <van-collapse v-if="accountInfo.length" v-model="activeNames" accordion>
        <van-swipe-cell v-for="(account, index) in accountInfo" :key="account._id" >
          <template #left>
            <van-button square type="primary" text="选择" />
          </template>
          <!-- <van-cell :border="false" title="单元格" value="内容" /> -->
          <van-collapse-item :name="index">
            <template #title>
              <div class="accout-platform">平台名称：<span>{{account.platform}}</span></div>
            </template>
            <div class="info">
              <p>用户名：<span>{{account.username}}</span></p>
              <p>密码：<span>{{account.password}}</span></p>
              <p>电子邮箱：<span>{{account.email}}</span></p>
              <p>电话号码：<span>{{account.mobile}}</span></p>
              <p>备注信息：<span>{{account.remark}}</span></p>
            </div>
          </van-collapse-item>
          <template #right>
            <van-button square type="danger" text="删除" @click="deleteAccount(account, index)" />
            <van-button square type="info" text="修改" @click="modifyAccount(index)" />
          </template>
        </van-swipe-cell>
      </van-collapse>
      <van-empty v-else description="没有信息" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

interface IQeuryInfo {
  type: string;
  value: string;
}
interface Accounts {
  _id: string;
  author: string;
  platform: string;
  username: string;
  password: string;
  email: string;
  mobile: string;
  remark: string;
  _v?: 0
}
@Component
export default class Query extends Vue {
  // account infos
  accountInfo:Array<Accounts> = [];
  queryInfo:IQeuryInfo = {type: 'platform', value: ''};
  // type select button title 
  btnIndex = 0;
  // action sheet control status
  actionSheetStatus = false;
  // action sheet title description
  actionSheetDesc = '选择搜索类型';
  // query info types
  color = '#1E90FF';

  // account data
  accounts = []
  activeNames = '0'

  queryTypes = [
    { name: '平台名称', obj: 'platform', color: this.color },
    { name: '电话号码', obj: 'mobile', color: this.color },
    { name: '邮箱地址', obj: 'email', color: this.color }
  ];

  // action sheet select event handle
  selectHandle(action: any, index: number){
    this.queryInfo.type = action.obj;
    this.btnIndex = index;
  };

  // 防抖处理
  clearData = 0;
  // query input change event handle
  inputHandle(){
    if(this.clearData) clearTimeout(this.clearData);
    // clear last time account infos
    this.accountInfo = [];

    this.clearData = setTimeout(async ()=>{
      if(!this.queryInfo.value.length) return;
      const { data: res } = await this.$axios.get('/account/info', { params: this.queryInfo });
      if (res.meta.stauts === 201) return this.$notify({ type: 'warning', message: res.meta.msg, duration: 1200 });
      this.accountInfo = res.data || [];
      this.clearData = 0;
    }, 600);
    
  };

  // delete account info
  deleteAccount(account:Accounts, index: number){
    this.$dialog.confirm({
      title: '确定删除账户信息',
      message: account.platform
    }).then(async ()=>{
      // validation
      if(account._id !== this.accountInfo[index]._id) return this.$notify({type: 'warning', message: '删除失败', duration: 1200});

      const {data: res} = await this.$axios.get('/account/delete', {params: {_id: account._id}});
      if (res.meta.status !== 200) return this.$notify({ type: 'warning', message: res.meta.msg, duration: 1200 });

      this.accountInfo.splice(index, 1);
      this.$notify({type: 'primary', message: res.meta.msg, duration: 1000});
    });
  };

  // modify account info
  modifyAccount(index:number){
    const account: Accounts = this.accountInfo[index];
    this.goModify = true;
    this.$router.push({path: '/modify', query: {
      _id: account._id,
      platform: account.platform,
      username: account.username,
      password: account.password,
      email: account.email,
      mobile: account.mobile,
      remark: account.remark
    }});
  };

  // is go modify
  goModify = false;
  // deactivated
  deactivated(){
    if(this.goModify) return;
    this.accountInfo = [];
    this.queryInfo.value = '';
  };
  activated(){
    this.goModify = false;
    // if modified account info and status is success, requred reload account info
    if(this.queryInfo.value.length){
      this.$axios.get('/account/info', { params: this.queryInfo })
      .then(({ data: res }) => {
        this.accountInfo = res.data
      });
    }
  }
}
</script>
