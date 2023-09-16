---
title: Grid 栅格
lang: zh-CN
---

<script setup>
import { Row, Col } from '../../panda-ui/src/components/grid'

defineOptions({
  components: {
    'panda-row': Row,
    'panda-col': Col
  }
});
</script>

# Grid 栅格

栅格系统以规则的网格阵列来指导和规范网页中的版面布局以及信息分布
我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够有节奏地排布起来

## 基础等分布局

<panda-row>
  <panda-col :span="24"><div class="demo-col col-bg">col-24</div></panda-col>
</panda-row>
<panda-row>
  <panda-col :span="12"><div class="demo-col col-bg">col-12</div></panda-col>
  <panda-col :span="12"><div class="demo-col col-bg-light">col-12</div></panda-col>
</panda-row>
<panda-row>
  <panda-col :span="8"><div class="demo-col col-bg">col-8</div></panda-col>
  <panda-col :span="8"><div class="demo-col col-bg-light">col-8</div></panda-col>
  <panda-col :span="8"><div class="demo-col col-bg">col-8</div></panda-col>
</panda-row>
<panda-row>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg-light">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg-light">col-6</div></panda-col>
</panda-row>
<panda-row>
  <panda-col :span="4"><div class="demo-col col-bg">col-4</div></panda-col>
  <panda-col :span="4"><div class="demo-col col-bg-light">col-4</div></panda-col>
  <panda-col :span="4"><div class="demo-col col-bg">col-4</div></panda-col>
  <panda-col :span="4"><div class="demo-col col-bg-light">col-4</div></panda-col>
  <panda-col :span="4"><div class="demo-col col-bg">col-4</div></panda-col>
  <panda-col :span="4"><div class="demo-col col-bg-light">col-4</div></panda-col>
</panda-row>
<panda-row>
  <panda-col :span="3"><div class="demo-col col-bg">col-3</div></panda-col>
  <panda-col :span="3"><div class="demo-col col-bg-light">col-3</div></panda-col>
  <panda-col :span="3"><div class="demo-col col-bg">col-3</div></panda-col>
  <panda-col :span="3"><div class="demo-col col-bg-light">col-3</div></panda-col>
  <panda-col :span="3"><div class="demo-col col-bg">col-3</div></panda-col>
  <panda-col :span="3"><div class="demo-col col-bg-light">col-3</div></panda-col>
  <panda-col :span="3"><div class="demo-col col-bg">col-3</div></panda-col>
  <panda-col :span="3"><div class="demo-col col-bg-light">col-3</div></panda-col>
</panda-row>
<panda-row>
  <panda-col :span="2"><div class="demo-col col-bg">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg-light">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg-light">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg-light">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg-light">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg-light">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg-light">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg">col-2</div></panda-col>
  <panda-col :span="2"><div class="demo-col col-bg-light">col-2</div></panda-col>
</panda-row>

## 任意组合布局

<panda-row>
  <panda-col :span="12"><div class="demo-col col-bg">col-12</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg-light">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
</panda-row>
<panda-row>
  <panda-col :span="12"><div class="demo-col col-bg">col-12</div></panda-col>
  <panda-col :span="8"><div class="demo-col col-bg-light">col-8</div></panda-col>
  <panda-col :span="4"><div class="demo-col col-bg">col-4</div></panda-col>
</panda-row>
<panda-row>
  <panda-col :span="2"><div class="demo-col col-bg">col-2</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg-light">col-6</div></panda-col>
  <panda-col :span="8"><div class="demo-col col-bg">col-8</div></panda-col>
  <panda-col :span="3"><div class="demo-col col-bg-light">col-3</div></panda-col>
  <panda-col :span="5"><div class="demo-col col-bg">col-5</div></panda-col>
</panda-row>

## 间隔

> 可设置间隔：0, 4, 8, 12, 16, 20

<panda-counter v-model="gutter" :min="0" :max="20" :step="4" style="margin-bottom: 10px;"></panda-counter>

<panda-row :gutter="gutter">
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
</panda-row>

## 对齐

> 通过设置 `type="flex"` 可开启 `justify-content`, `align-items` 进行 x, y 对齐

X 轴

<panda-row type="flex">
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg-light">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
</panda-row>
<panda-row type="flex" justify-content="center">
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg-light">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
</panda-row>
<panda-row type="flex" justify-content="flex-end">
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg-light">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
</panda-row>

<br/>

Y 轴

<panda-row type="flex">
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col demo-col-larger col-bg-light">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
</panda-row>
<panda-row type="flex" justify-content="center" align-items="center">
  <panda-col :span="6"><div class="demo-col demo-col-larger col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg-light">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col demo-col-larger col-bg">col-6</div></panda-col>
</panda-row>
<panda-row type="flex" justify-content="flex-end" align-items="flex-end">
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col demo-col-larger col-bg-light">col-6</div></panda-col>
  <panda-col :span="6"><div class="demo-col col-bg">col-6</div></panda-col>
</panda-row>

## Row Props

| 参数            | 介绍                        | 类型   | 可选值              | 默认值 |
| --------------- | --------------------------- | ------ | ------------------- | ------ |
| type            | 类型                        | String | flex                | —      |
| gutter          | 间隔                        | Number | 0, 4, 8, 12, 16, 20 | 20     |
| justify-content | 主轴对齐，flex 布局下有效   | String | —                   | —      |
| align-items     | 交叉轴对齐，flex 布局下有效 | String | —                   | —      |

## Col Props

| 参数 | 介绍     | 类型   | 可选值 | 默认值 |
| ---- | -------- | ------ | ------ | ------ |
| span | 占据列数 | Number | —      | —      |

<script>
  export default {
    data () {
      return {
        gutter: 20,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .demo-col {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 4px;
    min-height: 36px;
    &-larger {
      min-height: 56px;
    }
  }
  .col-bg {
    background-color: #ff5722;
    opacity: 0.6;
  }
  .col-bg-light {
    background-color: #ff5722;
    opacity: 0.3;
  }
  .panda-row {
    margin-bottom: 20px;
  }
</style>
