<style lang='less' scoped>
@itemBack: rgb(51, 138, 220);
@itemColor: #eee;

div{
  width: 100%;
  height: 38px;
  background: @itemBack;
  border-radius: 8px;
  line-height: 38px;
  margin-bottom: 16px;
  box-shadow: 0 1px 6px -3px #000;
  a{
    color: @itemColor;
  }
}

div:active{
  opacity: 0.6;
}
</style>

<template>
  <div @click="$emit('onClick', path);">
    <a href="javascript:void(0);">{{title}}</a>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MenuItem extends Vue {
  @Prop({required: true}) readonly title!: string;
  @Prop({required: true}) readonly path!: string;
}
</script>
