---
title: Alert 警告
lang: zh-CN
---

<script setup>
import Alert from '../../panda-ui/src/components/alert';

defineOptions({
  components: {
    'panda-alert': Alert
  }
});
</script>

# Alert 警告

<br>

## Type 类型

<panda-alert type="info">这是一条信息提示</panda-alert>
<panda-alert type="success">这是一条成功提示</panda-alert>
<panda-alert type="warning">这是一条警告提示</panda-alert>
<panda-alert type="danger">这是一条危险提示</panda-alert>

## Closable 可关闭的

<panda-alert type="info" closable>
  庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上；属予作文以记之。
</panda-alert>
<panda-alert type="success" closable>
  庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上；属予作文以记之。
</panda-alert>

## Title 带标题

<panda-alert type="info" title="岳阳楼记">
  庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上；属予作文以记之。
</panda-alert>

<panda-alert type="success" title="岳阳楼记" closable>
  予观夫巴陵胜状，在洞庭一湖，衔远山，吞长江，浩浩汤汤，横无际涯，朝晖夕阴，气象万千，此则岳阳楼之大观也；前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？
</panda-alert>

<panda-alert type="warning" title="岳阳楼记">
  若夫霪雨霏霏，连月不开，阴风怒号，浊浪排空，日星隐曜，山岳潜形；商旅不行，樯倾楫摧；薄暮冥冥，虎啸猿啼；登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣！
</panda-alert>

## Props

| 参数      | 介绍                | 类型    | 可选值 | 默认值   |
| --------- | ------------------- | ------- | ------ | -------- |
| value     | 可通过 v-model 绑定 | Number  | —      | 0        |
| size      | 尺寸                | String  | small  | -        |
| disabled  | 是否禁用            | Boolean | —      | false    |
| min       | 最小值              | Number  | —      | 0        |
| max       | 最大值              | Number  | —      | Infinity |
| step      | 步进                | Number  | —      | —        |
| precision | 精度                | Number  | —      | —        |
| autofocus | 是否自动聚焦        | Boolean | —      | false    |

## Events

| 名称   | 介绍                        | 参数           |
| ------ | --------------------------- | -------------- |
| change | 值改变时触发                | (value)        |
| focus  | 在组件 Input 获得焦点时触发 | (event: Event) |
| blur   | 在组件 Input 失去焦点时触发 | (event: Event) |

<style lang="scss" scoped>
  .panda-alert {
    margin-bottom: 10px;
  }
</style>
