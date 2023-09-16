---
title: Button 按钮
lang: zh-CN
---

<script setup>
import Button from '../../panda-ui/src/components/button'
import Icon from '../../panda-ui/src/components/icon';

defineOptions({
  components: {
    'panda-button': Button,
    'panda-icon': Icon
  }
});
</script>

# Button 按钮

按钮用于开始一个即时操作。按钮标记了一个（或封装一组）操作命令，响应用户点击行为，触发响应的业务逻辑。

<!-- <ks-qrcode>扫描此二维码在移动端预览</ks-qrcode> -->

## Primary 主按钮

<div class="button-demo-wrapper">
  <panda-button type="primary" reverse>Primary 查看凭证</panda-button>
  <panda-button type="primary" disabled>disabled 已售罄</panda-button>
</div>

## Secondary 次级按钮

<div class="button-demo-wrapper">
  <panda-button type="secondary">Secondary 留下评价</panda-button>
  <panda-button type="secondary" disabled>disabled 已售罄</panda-button>
</div>

## Text 文字按钮

<div class="button-demo-wrapper">
  <panda-button type="text">Text</panda-button>
  <panda-button type="text" disabled>disabled</panda-button>
</div>

## Outlined 按钮

<div class="button-demo-wrapper">
  <panda-button type="outlined">outlined</panda-button>
  <panda-button type="outlined" disabled>disabled</panda-button>
</div>

## White Outlined 按钮

<div class="button-demo-wrapper">
  <div class="white-outlined-wrapper">
    <panda-button type="white-outlined">white-outlined</panda-button>
    <panda-button type="white-outlined" disabled>disabled</panda-button>
  </div>
</div>

## Round 胶囊按钮

<div class="button-demo-wrapper">
  <div>
    <panda-button type="primary" size="large" round>Round</panda-button>
    <panda-button type="primary" round>Round</panda-button>
    <panda-button type="primary" size="small" round>Round</panda-button>
    <panda-button type="primary" size="mini" round>Round</panda-button>
  </div>

  <div>
    <panda-button type="secondary" size="large" round>Round</panda-button>
    <panda-button type="secondary" round>Round</panda-button>
    <panda-button type="secondary" size="small" round>Round</panda-button>
    <panda-button type="secondary" size="mini" round>Round</panda-button>
  </div>

  <div>
    <panda-button type="outlined" size="large" round>Round</panda-button>
    <panda-button type="outlined" round>Round</panda-button>
    <panda-button type="outlined" size="small" round>Round</panda-button>
    <panda-button type="outlined" size="mini" round>Round</panda-button>
  </div>

  <div>
    <panda-button type="text" size="large" round>Round</panda-button>
    <panda-button type="text" round>Round</panda-button>
    <panda-button type="text" size="small" round>Round</panda-button>
    <panda-button type="text" size="mini" round>Round</panda-button>
  </div>

  <div class="white-outlined-wrapper">
    <panda-button type="white-outlined" size="large" round>Round</panda-button>
    <panda-button type="white-outlined" round>Round</panda-button>
    <panda-button type="white-outlined" size="small" round>Round</panda-button>
    <panda-button type="white-outlined" size="mini" round>Round</panda-button>
  </div>
</div>

## Block 块状按钮

<div class="button-demo-wrapper block">
  <panda-button type="primary" block>Block</panda-button>
  <panda-button type="secondary" block>Block</panda-button>
  <panda-button type="outlined" block>Block</panda-button>
  <panda-button type="text" block>Block</panda-button>
  <div class="white-outlined-wrapper">
    <panda-button type="white-outlined" block>Block</panda-button>
  </div>
</div>

## 图标

当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon 组件。

如果想控制 Icon 具体的位置，只能直接使用 Icon 组件，而非 icon 属性。

<div class="button-demo-wrapper">
  <panda-button type="primary" icon="anchor"></panda-button>
  <panda-button type="secondary" icon="x"> xClose</panda-button>
  <panda-button type="text"><panda-icon name="aperture"></panda-icon></panda-button>
  <div class="white-outlined-wrapper">
    <panda-button type="white-outlined" icon="camera"> Take Photo</panda-button>
  </div>
</div>

## 不同的大小

按钮可以被设置不同的尺寸，`mini`、 `small`、`normal`、`large`。

<div class="button-demo-wrapper">
  <div>
    <panda-button size="mini" icon="cloud-drizzle">mini</panda-button>
    <panda-button size="small" icon="cloud-lightning">small</panda-button>
    <panda-button icon="cloud-snow">normal</panda-button>
    <panda-button size="large" icon="cloud">large</panda-button>
  </div>
  <div>
    <panda-button size="mini">mini</panda-button>
    <panda-button size="small">small</panda-button>
    <panda-button>normal</panda-button>
    <panda-button size="large">large</panda-button>
  </div>
  <div>
    <panda-button type="secondary" size="mini">mini</panda-button>
    <panda-button type="secondary" size="small">small</panda-button>
    <panda-button type="secondary">normal</panda-button>
    <panda-button type="secondary" size="large">large</panda-button>
  </div>
  <div>
    <panda-button type="outlined" size="mini">mini</panda-button>
    <panda-button type="outlined" size="small">small</panda-button>
    <panda-button type="outlined">normal</panda-button>
    <panda-button type="outlined" size="large">large</panda-button>
  </div>
  <div>
    <panda-button type="text" size="mini">mini</panda-button>
    <panda-button type="text" size="small">small</panda-button>
    <panda-button type="text">normal</panda-button>
    <panda-button type="text" size="large">large</panda-button>
  </div>
  <div class="white-outlined-wrapper">
     <panda-button type="white-outlined" size="mini">mini</panda-button>
     <panda-button type="white-outlined" size="small">small</panda-button>
     <panda-button type="white-outlined">normal</panda-button>
     <panda-button type="white-outlined" size="large">large</panda-button>
   </div>
</div>

## Loading 加载中

<div class="button-demo-wrapper">
  <div>
    <panda-button size="mini" loading>Loading</panda-button>
    <panda-button size="small" loading>Loading</panda-button>
    <panda-button loading>Loading</panda-button>
    <panda-button size="large" loading>Loading</panda-button>
  </div>
  <div>
    <panda-button size="mini" loading></panda-button>
    <panda-button size="small" loading></panda-button>
    <panda-button loading></panda-button>
    <panda-button size="large" loading></panda-button>
  </div>
  <div>
    <panda-button type="secondary" size="mini" loading>Loading</panda-button>
    <panda-button type="secondary" size="small" loading>Loading</panda-button>
    <panda-button type="secondary" loading>Loading</panda-button>
    <panda-button type="secondary" size="large" loading>Loading</panda-button>
  </div>
  <div>
    <panda-button type="outlined" size="mini" loading>Loading</panda-button>
    <panda-button type="outlined" size="small" loading>Loading</panda-button>
    <panda-button type="outlined" loading>Loading</panda-button>
    <panda-button type="outlined" size="large" loading>Loading</panda-button>
  </div>
  <div>
    <panda-button type="text" size="mini" loading>Loading</panda-button>
    <panda-button type="text" size="small" loading>Loading</panda-button>
    <panda-button type="text" loading>Loading</panda-button>
    <panda-button type="text" size="large" loading>Loading</panda-button>
  </div>
  <div class="white-outlined-wrapper">
    <panda-button type="white-outlined" size="mini" loading>Loading</panda-button>
    <panda-button type="white-outlined" size="small" loading>Loading</panda-button>
    <panda-button type="white-outlined" loading>Loading</panda-button>
    <panda-button type="white-outlined" size="large" loading>Loading</panda-button>
  </div>
</div>

## 超出显示设置

> 支持 ellipsis, clip 等，仅在有最大宽度限制下生效

<div class="button-demo-wrapper">
  <panda-button type="primary" style="max-width: 200px;" text-overflow="ellipsis">If the button copy exceeds</panda-button>
</div>

## Button props

| 参数      | 介绍          | 类型    | 可选值                                             | 默认值  |
| --------- | ------------- | ------- | -------------------------------------------------- | ------- |
| type      | 按钮类型      | String  | primary, secondary, text, outlined, white-outlined | primary |
| size      | 按钮大小      | String  | mini, small, normal, large                         | normal  |
| round     | 胶囊按钮      | Boolean | —                                                  | false   |
| block     | 块状按钮      | Boolean | —                                                  | false   |
| disabled  | 禁用按钮      | Boolean | —                                                  | false   |
| icon      | 显示图标      | String  | -                                                  | -       |
| loading   | 是否加载中    | Boolean | —                                                  | false   |
| html-type | html 按钮类型 | String  | -                                                  | button  |

## Button events

| 事件  | 介绍     | 定义            |
| ----- | -------- | --------------- |
| click | 按钮点击 | (event) => void |

<style lang="scss" scoped>
.white-outlined-wrapper {
  background: #212121;
  padding: 20px 0;
}
.button-demo-wrapper {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  .panda-button {
    margin: 8px;
  }
  > div {
    margin-bottom: 15px;
  }
  &.block .panda-button {
    margin: 10px 0;
  }
}
</style>
