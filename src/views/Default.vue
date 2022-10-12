<style lang='less' scoped>
div{
  position: relative;
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 80%;
    height: 60%;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0 35px 80px 20px rgba(1, 34, 251, 0.15);
  }
}
</style>

<template>
  <div>
    <div class="card">
      <MenuItem @onClick="handleClick" v-for="v in menu" :key="v.path" :title="v.title" :path="v.path"></MenuItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import MenuItem from '../components/MenuItem.vue';

@Component({
  components: {
    MenuItem
  }
})
export default class Default extends Vue {
  // menu data
  menu = [
    { path: '/query', title: '查询账户信息' },
    { path: '/add', title: '添加账号信息' },
    { path: '/user', title: '个人中心' }
  ];

  // click handle
  handleClick(path: string){
    this.$router.push(path);
  }
}
</script>
