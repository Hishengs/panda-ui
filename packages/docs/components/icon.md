---
title: Icon 图标
lang: zh-CN
---

# Icon 图标

<div class="search">
  <!-- <panda-input placeholder="搜索图标" v-model="searchKey" clearable></panda-input> -->
</div>
<span class="container" v-for="(name, i) in icons" :key="i" @click="copyIcon(name)">
  <Icon :name="name" size="24"></Icon>
  <label class="name">{{ name }}</label>
</span>

<script setup>
import { ref, computed } from 'vue';
import Icon from '../../panda-ui/src/components/icon';
import { icons as _icons } from '../icon-tags';

const searchKey = ref('');
const iconList = ref(_icons);

const icons = computed(() => {
  return searchKey.value.trim() ? iconList.value.filter(name => {
    return name.includes(searchKey.value.trim());
  }) : iconList.value;
})

const copyIcon = (name) => {
  // window.copy(`<panda-icon name="${name}"></panda-icon>`);
  // alert('已复制');
}
</script>

<style lang= "scss" scoped>
  .search {
    margin-bottom: 20px;
  }
  .container {
    display: inline-block;
    margin: 12px 16px;
    padding: 35px 0;
    width: 130px;
    text-align: center;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    &:hover {
      cursor: pointer;
      opcity: 0.8;
      /* background-color: #f5f5f5; */
    }
    label {
      display: block;
      margin-top: 8px;
    }
  }
</style>

## Icon Props

| 参数  | 介绍       | 类型           | 可选值 | 默认值 |
| ----- | ---------- | -------------- | ------ | ------ |
| name  | 图标名称   | String         | —      | —      |
| size  | 图标大小   | String, Number | —      | —      |
| color | 图标的颜色 | String         | —      | —      |
