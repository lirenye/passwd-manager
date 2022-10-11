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
</style>

<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="bars" size="26" @click="sideNavBar = true" />
      </template>
    </van-nav-bar>

    <!-- 侧边菜单栏 -->
    <nut-popup position="right" v-model="sideNavBar" :style="{ width, height }">
      <nut-sidenavbar :show="sideNavBar">
        <nut-sidenavbaritem v-for="(v) in menu" @click="handleClick(v.path)" :title="v.title" :key="v.path"></nut-sidenavbaritem>
      </nut-sidenavbar>
    </nut-popup>

    <!-- 路由出口 -->
    <router-view style="height: calc(100vh - 46px)"></router-view>
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
  
  sideNavBar = false;
  width = '60%';
  height = '100%';

  // menu item click handle
  handleClick(path: string){
    this.sideNavBar = false;
    // this.$router.push(path)
    console.log(`go to ${path}`);
  }
}
</script>
