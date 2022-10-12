<style lang="less" scoped>
@itemBack: rgb(51, 138, 220);
@itemColor: #eee;
.nut-sidenavbaritem{
  width: calc(100% - 20px);
  margin: 8px auto 0 auto;
  background: @itemBack;
  border-radius: 6px;

  &::v-deep a{
    background: @itemBack;
    color: @itemColor;
  }
}

// 解决元素塌陷问题
.router-view{
  height: calc(100vh - 46px);
  overflow: hidden;
}
</style>

<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      :title="NavBarTitle"
      right-text="退出"
      :left-arrow="isBack"

      @click-right="outLogin"
      @click-left="back"
    />

    <!-- 路由出口 -->
    <router-view class="router-view"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  // menu data
  menu = [
    { path: '/add', title: '添加账号信息'},
    { path: '/user', title: '个人中心'}
  ];

  // 后退按钮状态控制
  get isBack(){
    return (this.$route.path !== '/')
  }

  // 导航栏标题
  get NavBarTitle(){
    return this.$route.meta!.title;
  }
  
  sideNavBar = false;
  width = '60%';
  height = '100%';

  // menu item click handle
  handleClick(path: string){
    this.sideNavBar = false;
    // this.$router.push(path)
    console.log(`go to ${path}`);
  }

  // out login handle
  outLogin(){
    sessionStorage.removeItem('token');
    this.$router.replace('/login');
  };

  // 返回上个页面
  back(){
    this.$router.go(-1);
  }
}
</script>
