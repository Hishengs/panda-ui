---
title: BottomSheet 底部浮层
lang: zh-CN
---

<script setup>
import Button from '../../panda-ui/src/components/button'
import BottomSheet from '../../panda-ui/src/components/bottom-sheet'

defineOptions({
  components: {
    'panda-button': Button,
    'panda-bottom-sheet': BottomSheet,
  }
});
</script>

# BottomSheet 底部浮层

通常称为「浮层」或「浮窗」，可用于给予信息提示，也用于展示更多的拓展信息

> 此组件一般在 mobile web 下使用

## 默认

<panda-button @click="visible1=true">显示浮层</panda-button>

<panda-bottom-sheet :visible.sync="visible1" title="测试专用标题">
  <div class="demo-content"></div>
</panda-bottom-sheet>

## 显示关闭按钮

<panda-button @click="visible2=true">显示浮层</panda-button>

<panda-bottom-sheet show-close :visible.sync="visible2" title="测试专用标题" :mask-closable="false">
  <div class="demo-content"></div>
</panda-bottom-sheet>

## 自定义头部左右显示

<panda-button @click="visible3=true">显示浮层</panda-button>

<panda-bottom-sheet :visible.sync="visible3" title="测试专用标题">
  <panda-icon slot="header-left" type="icon_navigation_chevron_left_xs" size="24"></panda-icon>
  <panda-button slot="header-right" type="outlined" size="mini" @click="visible3=false">done</panda-button>
  <div class="demo-content"></div>
</panda-bottom-sheet>

## 底部操作区

<panda-button @click="visible4=true">显示浮层</panda-button>

<panda-bottom-sheet :visible.sync="visible4" title="测试专用标题">
  <panda-button slot="footer" block @click="visible4=false">确认</panda-button>
  <div class="demo-content"></div>
</panda-bottom-sheet>

<!-- ## 嵌套



<panda-button @click="visible5=true">显示浮层</panda-button>

<panda-bottom-sheet :visible.sync="visible5" title="测试专用标题-1">
  <div class="demo-content">1</div>
  <panda-button slot="footer" block @click="visible6=true">显示另一个</panda-button>
  <panda-bottom-sheet :visible.sync="visible6" title="测试专用标题-2" transfer>
    <div class="demo-content">2</div>
  </panda-bottom-sheet>
</panda-bottom-sheet>


 -->

## BottomSheet Props

| 参数                 | 介绍                        | 类型    | 可选值 | 默认值 |
| -------------------- | --------------------------- | ------- | ------ | ------ |
| visible              | 是否可见，可通过 .sync 绑定 | Boolean | —      | false  |
| title                | 标题                        | String  | —      | —      |
| show-close           | 显示关闭按钮                | Boolean | —      | false  |
| mask-closable        | 点击遮罩是否可关闭          | Boolean | —      | true   |
| can-pull-close       | 是否允许下拉关闭            | Boolean | —      | true   |
| transfer `(>1.16.6)` | 将 BottomSheet 放置在 body  | Boolean | —      | false  |

## BottomSheet Slots

| 参数         | 介绍     | 类型 | 可选值 | 默认值 |
| ------------ | -------- | ---- | ------ | ------ |
| default      | 默认     | Slot | —      | -      |
| header-left  | 头部左侧 | Slot | —      | -      |
| header-right | 头部右侧 | Slot | —      | -      |
| footer       | 底部     | Slot | —      | -      |

## BottomSheet Events

| 事件  | 介绍       | 参数              |
| ----- | ---------- | ----------------- |
| close | 关闭时触发 | (from: CloseFrom) |

ts
type CloseFrom =
| 'close-btn'
| 'visible'
| 'mask'
| 'pull'

<script>
  export default {
    data () {
      return {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,
        visible5: false,
        visible6: false,
      };
    }
  };
</script>

<style lang="scss" scoped>
  .demo-content {
    background-color: rgba(255, 87, 34, 0.1);
    height: 1200px;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    color: white;
    font-size: 20px;
  }
</style>
