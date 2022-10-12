<style lang='less' scoped>
.van-button{
  margin: 10px 0;
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
        <van-button plain type="info" size="small" @click="actionSheetStatus = true">{{queryTypes[btnIndex].name}}</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Query extends Vue {
  queryInfo = {type: 'platfrom', value: ''};
  // type select button title 
  btnIndex = 0;
  // action sheet control status
  actionSheetStatus = false;
  // action sheet title description
  actionSheetDesc = '选择搜索类型';
  // query info types
  color = '#1E90FF'
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

    this.clearData = setTimeout(()=>{
      console.log(this.queryInfo);
      this.clearData = 0;
    }, 600);
    
  }
}
</script>
