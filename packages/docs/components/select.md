---
title: Select 下拉选择
lang: zh-CN
---

<script setup>
import { ref } from 'vue'
import { Select, Option, OptionGroup } from '../../panda-ui/src/components/select'
import { Row, Col } from '../../panda-ui/src/components/grid'
import Icon from '../../panda-ui/src/components/icon';

defineOptions({
  components: {
    'panda-select': Select,
    'panda-option': Option,
    'panda-option-group': OptionGroup,
    'panda-row': Row,
    'panda-col': Col,
    'panda-icon': Icon
  }
});

const options = ref([
  'Yours Explorer, This is a description-1',
  'Yours Explorer, This is a description-2',
  'Yours Explorer, This is a description-3',
  'Yours Explorer, This is a description-4',
  'Yours Explorer, This is a description-5',
  // 'Yours Explorer, This is a description-6',
  // 'Yours Explorer, This is a description-7',
  // 'Yours Explorer, This is a description-8',
  // 'Yours Explorer, This is a description-9',
  // 'Yours Explorer, This is a description-10',
  // 'Yours Explorer, This is a description-11',
  // 'Yours Explorer, This is a description-12',
  'Yours Explorer, This is a description, Yours Explorer, This is a description',
]);
const options2 = ref(['Apple', 'Facebook', 'Amazon', 'Microsoft', 'Google', 'A very very long option']);
const options3 = ref(['apple', 'banana', 'Cat', 'daddy']);
const groups = ref([
  {
    label: '分组一',
    options,
  },
  {
    label: '分组二',
    options: options2,
  },
]);
const val1 = ref('');
const val2 = ref([]);
const onChange = (val)  => {
  console.log('>>> onChange', val);
}
</script>

# Select 下拉选择

## 基础

<panda-select v-model="val1" placeholder="Please Select" @change="onChange">
<panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

## 类型

<p>outlined （默认）</p>
<panda-select style-type="outlined" placeholder="Please Select">
  <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<p style="margin-top: 20px;">lined</p>
<panda-select style-type="lined" placeholder="Please Select">
  <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<p style="margin-top: 20px;">filled</p>
<panda-select style-type="filled" placeholder="Please Select">
  <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

## 禁用

<panda-select placeholder="Please Select" disabled>
  <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<p></p>

<panda-select style-type="lined" placeholder="Please Select" disabled>
  <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<p></p>

<panda-select style-type="filled" placeholder="Please Select" disabled>
  <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

## 禁用项

<panda-select placeholder="Please Select">
  <panda-option v-for="(option, i) in options" :disabled="i===2" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<!-- ## 错误提示



<panda-select placeholder="Please Select" error-message="some error message">
  <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<p></p>

<panda-select style-type="lined" placeholder="Please Select"  error-message="some error message">
  <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<p></p>

<panda-select style-type="filled" placeholder="Please Select"  error-message="some error message">
  <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

 -->

## 多选

<panda-select v-model="val2" placeholder="Please Select" multiple @change="onChange">
<panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<p>已选项样式：plain</p>

<panda-select placeholder="Please Select" multiple selection-style="plain" hide-view-all>
  <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<p></p>

<panda-select style-type="lined" placeholder="Please Select" multiple>
  <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<p></p>

<panda-select style-type="filled" placeholder="Please Select" multiple>
  <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
</panda-select>

<!-- <panda-row>
  <panda-col :span="6">
    <p>默认</p>
  </panda-col>
  <panda-col :span="6">
    <p>可筛选</p>
  </panda-col>
</panda-row> -->

## 可清空

<panda-row :gutter="12">
  <panda-col :span="12">
    <p>单选</p>
    <panda-select placeholder="Please Select" clearable>
      <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
  <panda-col :span="12">
    <p>多选</p>
    <panda-select placeholder="Please Select" clearable multiple>
      <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
</panda-row>

## 可筛选

> 按照 Option 的 value 或者 label 进行关键字匹配搜索

<panda-row :gutter="12">
  <panda-col :span="12">
    <p>单选</p>
    <panda-select placeholder="Please Select" filterable>
      <panda-option v-for="(option, i) in options3" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
  <panda-col :span="12">
    <p>多选</p>
    <panda-select placeholder="Please Select" multiple filterable>
      <panda-option v-for="(option, i) in options3" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
</panda-row>

<p></p>

<panda-row :gutter="12">
  <panda-col :span="12">
    <p>单选</p>
    <panda-select style-type="lined" placeholder="Please Select" filterable>
      <panda-option v-for="(option, i) in options3" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
  <panda-col :span="12">
    <p>多选</p>
    <panda-select style-type="lined" placeholder="Please Select" multiple filterable>
      <panda-option v-for="(option, i) in options3" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
</panda-row>

<p></p>

<panda-row :gutter="12">
  <panda-col :span="12">
    <p>单选</p>
    <panda-select style-type="filled" placeholder="Please Select" filterable>
      <panda-option v-for="(option, i) in options3" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
  <panda-col :span="12">
    <p>多选</p>
    <panda-select style-type="filled" placeholder="Please Select" multiple filterable>
      <panda-option v-for="(option, i) in options3" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
</panda-row>

## 分组

<panda-select placeholder="Please Select">
  <panda-option-group v-for="(group, i) in groups" :key="i" :value="i" :label="group.label">
    <panda-option
      v-for="(option, j) in group.options"
      :key="i+'-'+j"
      :value="i+'-'+j"
      :label="option"
    >
    </panda-option>
  </panda-option-group>
</panda-select>

## 自定义模板

<panda-select placeholder="Please Select">
  <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option">
    <panda-icon type="icon_social_add_to_wishlist"></panda-icon> {{ option }}
  </panda-option>
</panda-select>

<!-- 此部分可用，设计暂不需要，文档先对外隐藏 -->

## 前缀

<panda-row :gutter="12">
  <panda-col :span="12">
    <p>单选</p>
    <panda-select placeholder="Please Select">
      <!-- <span slot="prefix">选择学校</span> -->
      <panda-icon slot="prefix" type="icon_shopping_shopping_cart"></panda-icon>
      <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
  <panda-col :span="12">
    <p>多选</p>
    <panda-select placeholder="Please Select" multiple>
      <panda-icon slot="prefix" type="icon_shopping_shopping_cart"></panda-icon>
      <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
</panda-row>

<p></p>

<panda-row :gutter="12">
  <panda-col :span="12">
    <p>单选</p>
    <panda-select style-type="lined" placeholder="Please Select">
      <panda-icon slot="prefix" type="icon_shopping_shopping_cart"></panda-icon>
      <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
  <panda-col :span="12">
    <p>多选</p>
    <panda-select style-type="lined" placeholder="Please Select" multiple>
      <panda-icon slot="prefix" type="icon_shopping_shopping_cart"></panda-icon>
      <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
</panda-row>

<p></p>

<panda-row :gutter="12">
  <panda-col :span="12">
    <p>单选</p>
    <panda-select style-type="filled" placeholder="Please Select">
      <panda-icon slot="prefix" type="icon_shopping_shopping_cart"></panda-icon>
      <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
  <panda-col :span="12">
    <p>多选</p>
    <panda-select style-type="filled" placeholder="Please Select" multiple>
      <panda-icon slot="prefix" type="icon_shopping_shopping_cart"></panda-icon>
      <panda-option v-for="(option, i) in options" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
</panda-row>

## 大小

<panda-row :gutter="12">
  <panda-col :span="12">
    <h4>单选</h4>
    <br>
    <p>small</p>
    <panda-select placeholder="Please Select" size="small">
      <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
    <p style="margin-top: 20px;">normal</p>
    <panda-select placeholder="Please Select">
      <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
    <p style="margin-top: 20px;">large</p>
    <panda-select placeholder="Please Select" size="large">
      <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
  <panda-col :span="12">
    <h4>多选</h4>
    <br>
    <p>small</p>
    <panda-select placeholder="Please Select" size="small" multiple>
      <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
    <p style="margin-top: 20px;">normal</p>
    <panda-select placeholder="Please Select" multiple>
      <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
    <p style="margin-top: 20px;">large</p>
    <panda-select placeholder="Please Select" size="large" multiple>
      <panda-option v-for="(option, i) in options2" :key="i" :value="i" :label="option"></panda-option>
    </panda-select>
  </panda-col>
</panda-row>

## Select Props

| 参数            | 介绍                              | 类型                  | 可选值                  | 默认值   |
| --------------- | --------------------------------- | --------------------- | ----------------------- | -------- |
| value           | 通过 v-model 绑定选中值           | String, Number, Array | —                       | —        |
| style-type      | 样式类型                          | String                | outlined, lined, filled | outlined |
| disabled        | 是否禁用                          | Boolean               | —                       | false    |
| multiple        | 是否多选                          | Boolean               | —                       | false    |
| size            | 尺寸                              | String                | small, large            | —        |
| clearable       | 是否可清空                        | Boolean               | —                       | false    |
| placeholder     | 占位符                            | String                | —                       | —        |
| filterable      | 是否可筛选                        | Boolean               | —                       | false    |
| max-height      | 最大下拉高度                      | Number                | —                       | 500      |
| name            | 原生 input name                   | String                | —                       | —        |
| autocomplete    | select input 的 autocomplete 属性 | String                | —                       | off      |
| selection-style | 多选模式下，已选项的样式          | String                | tag, plain              | tag      |
| placement       | 弹出位置                          | String                | top, bottom             | bottom   |
| hide-view-all   | 隐藏显示全部按钮                  | Boolean               | —                       | false    |

<!-- | error-message | 错误提示信息 | String | — | — | -->

## Select Events

| 参数   | 介绍                 | 回调参数       |
| ------ | -------------------- | -------------- |
| change | 选中值发生变化时触发 | (value) 选中值 |
| clear  | 清空选中时触发       | —              |

## Select Slots

| 参数    | 介绍 | 类型 | 可选值 | 默认值 |
| ------- | ---- | ---- | ------ | ------ |
| default | 默认 | Slot | —      | -      |
| prefix  | 前缀 | Slot | —      | -      |

## Select API

| 方法    | 介绍         | 参数说明 |
| ------- | ------------ | -------- |
| open()  | 打开下拉面板 | -        |
| close() | 关闭下拉面板 | -        |

## OptionGroup Props

| 参数     | 介绍                 | 类型    | 可选值 | 默认值 |
| -------- | -------------------- | ------- | ------ | ------ |
| label    | 组显示标签           | String  | —      | —      |
| disabled | 是否禁用该组所有选项 | Boolean | —      | false  |

## Option Props

| 参数     | 介绍         | 类型           | 可选值 | 默认值 |
| -------- | ------------ | -------------- | ------ | ------ |
| value    | 可选项的值   | String, Number | —      | —      |
| label    | 可选项的标签 | String         | —      | —      |
| disabled | 是否禁用     | Boolean        | —      | false  |

<style lang="scss" scoped>
  p {
    margin: 20px 0;
  }
</style>

<style lang="scss" scoped>
  .panda-select {
    min-width: 120px;
    max-width: 320px;
  }
</style>
