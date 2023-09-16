---
title: DatePicker 日期选择器
lang: zh-CN
---

<script>
import { ref, reactive } from 'vue';
import Icon from '../../panda-ui/src/components/icon';
import { Row, Col } from '../../panda-ui/src/components/grid';
import DatePicker from '../../panda-ui/src/components/date-picker';

export default {
  components: {
    'panda-date-picker': DatePicker,
    'panda-icon': Icon,
    'panda-row': Row,
    'panda-col': Col
  },
  data () {
    return {
      date: undefined,
      date1: new Date('2019/10/24'),
      value1: 340,
      date7: null,
      holidays: {
        '01-01': '元旦',
        '02-14': '情人节',
        '03-08': '妇女节',
        '03-12': '植树节',
        '04-01': '愚人节',
        '05-01': '劳动节',
        '05-04': '青年节',
        // '05-10': '母亲节',
        '05-12': '护士节',
        '06-01': '儿童节',
        // '06-21': '父亲节',
        '07-01': '建党节',
        '08-01': '建军节',
        '09-10': '教师节',
        '10-01': '国庆节',
        '12-24': '平安夜',
        '12-25': '圣诞节',
      },
    };
  },
  mounted () {
    console.log('>>> date1', this.date1);
    // setTimeout(() => {
    //   this.date = new Date();
    //   console.log('>>> date', this.date);
    //   setTimeout(() => {
    //     this.date = new Date('2020/05/18');
    //     console.log('>>> date', this.date);
    //   }, 5000);
    // }, 5000);
    // setTimeout(() => {
    //   this.date7 = null;
    // }, 10000);
  },
  methods: {
    getHoliday (date) {
      if (!date) return '';
      const d = date.toISOString();
      const start = d.indexOf('-') + 1;
      const end = d.indexOf('T');
      const key = d.substring(start, end);
      // console.log('>>> getHoliday', key);
      return this.holidays[key];
    },
    disabledDates (date) {
      return date.getDate() % 2 === 0
    },
    onChange (val) {
      console.log('>>> onChange', val);
    },
    onSelect (val) {
      console.log('>>> onSelect', val);
    },
  }
}
</script>

# DatePicker 日期选择器

日历选择器是允许用户在应用中选择一个日期或日期范围的组件；

通常是在界面中提供一个文本框或按钮入口，触发后弹出临时面板，用户仅通过单击面板中的日期来输入日期，选择完毕后，日期将以特定格式呈现于文本框或按钮中。

## 单日历

<!-- <div>
  <panda-date-picker :date.sync="date" @change="onChange"></panda-date-picker>
</div> -->

## 后置插槽

> 通过 `date-append` 后置插槽可实现在日期后显示价格、节日等辅助信息

### 价格

<div>
  <panda-date-picker type="date-range" @change="onChange" :min-range-gap="0">
    <template #date-append="{ date, disabled, selected }">
      15.346
    </template>
  </panda-date-picker>
</div>

### 节日

<div>
  <panda-date-picker type="date-range" @change="onChange" :min-range-gap="0">
    <template #date-append="{ date, disabled, selected }">
      <span style="color: #ff5722;">{{ getHoliday(date) }}</span>
    </template>
  </panda-date-picker>
</div>

## 底部提示

<panda-row>
  <panda-col :span="12">
    <panda-date-picker tip="All dates are in local time" @change="onChange"></panda-date-picker>
  </panda-col>
  <panda-col :span="12">
    <panda-date-picker @change="onChange">
      <template #tip>
        <div style="display: flex; align-items: flex-start;">
          <panda-icon name="shopping-cart" style="flex-shrink: 0;"></panda-icon>
          <div>这是自定义的底部提示，这是自定义的底部提示，这是自定义的底部提示，这是自定义的底部提示</div>
        </div>
      </template>
    </panda-date-picker>
  </panda-col>
</panda-row>

<!-- ## day slot

<div>
  <panda-date-picker
    tip="All dates are in local time"
    @change="onChange"
    hightlight-today
  >
    <template #day="{ date, disabled, now, selected }">
      <span :class="{
        'my-day': true,
        'my-day-selected': selected,
      }">
        {{ date.getDate() }}
      </span>
    </template>
  </panda-date-picker>
</div>

<style lang="scss">
  .my-day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #333;
    &:hover, &-selected {
      cursor: pointer;
      color: #fff;
      background-color: #409eff;
    }
  }
</style>

 -->

## 单日历区间选择

默认区间选择至少间隔一天（86400s），可以通过 `min-range-gap` 设置最小间隔

<div>
  <panda-date-picker
    tip="All dates are in local time"
    type="date-range"
    :min-range-gap="0"
    @change="onChange"
  ></panda-date-picker>
</div>

## 切换视图

通过开启视图切换可实现较大跨度年月份选择

<div>
  <panda-date-picker
    tip="All dates are in local time"
    type="date"
    :min-date="new Date('1900-01-01')"
    view-switchable
  ></panda-date-picker>
</div>

### 区间选择

<div>
  <panda-date-picker
    tip="All dates are in local time"
    type="date-range"
    view-switchable
  ></panda-date-picker>
</div>


## 双日历

一般用于 PC 端

<div>
  <panda-date-picker
    tip="All dates are in local time"
    double-panel
    @change="onChange"
  ></panda-date-picker>
</div>

## 双日历区间选择

<div>
  <panda-date-picker
    tip="All dates are in local time"
    type="date-range"
    double-panel
    @change="onChange"
    @select="onSelect"
  ></panda-date-picker>
</div>

## 日期禁用

单面板

<div>
  <panda-date-picker
    tip="All dates are in local time"
    @change="onChange"
    :should-disable-date="disabledDates"
  ></panda-date-picker>
</div>

双面板

<div>
  <panda-date-picker
    tip="All dates are in local time"
    double-panel
    @change="onChange"
    :should-disable-date="disabledDates"
  ></panda-date-picker>
</div>

## 售罄

单面板

<div>
  <panda-date-picker
    tip="Sold Out"
    @change="onChange"
    :is-sold-out="disabledDates"
  ></panda-date-picker>
</div>

双面板

<div>
  <panda-date-picker
    tip="Sold Out"
    double-panel
    @change="onChange"
    :is-sold-out="disabledDates"
  ></panda-date-picker>
</div>

## 最小、最大可选时间
单面板
<div>
  <panda-date-picker
    tip="All dates are in local time"
    @change="onChange"
    :min-date="new Date('2021-12-20')"
    :max-date="new Date('2023-12-20')"
  ></panda-date-picker>
</div>
双面板
<div>
  <panda-date-picker
    tip="All dates are in local time"
    double-panel
    @change="onChange"
    :min-date="new Date('2021-12-20')"
    :max-date="new Date('2023-12-20')"
  ></panda-date-picker>
</div>

## 每周第一天

> 通过 `first-day-of-week` 可以调整每周第一天是星期几，从 0 开始是周日，以此类推

单面板
<div>
  <panda-date-picker
    tip="All dates are in local time"
    @change="onChange"
    :first-day-of-week="1"
  ></panda-date-picker>
</div>
双面板
<div>
  <panda-date-picker
    tip="All dates are in local time"
    double-panel
    @change="onChange"
    :first-day-of-week="1"
  ></panda-date-picker>
</div>

## 设置默认视图日期

> 当无日期绑定时，默认以当天作为当前视图日期，也可以通过 `default-view-date` 自行设置

> 优先级：绑定日期 > `default-view-date` > 当天 `new Date()`

<div>
  <panda-date-picker
    :date.sync="date7"
    :default-view-date="new Date('2020-05-20')"
    @change="onChange"
  >
  </panda-date-picker>
</div>

## 自适应

<div>
  <!-- <panda-slider v-model="value1" :min="320" :max="1024"></panda-slider> -->
  <div class="mobile-container">
    <panda-date-picker
      :width="value1"
      tip="All dates are in local time"
      @change="onChange"
      :vertical-scroll="true"
      type="date-range"
    ></panda-date-picker>
  </div>
</div>

## 阴影

通过 `shadow` 开启阴影样式

<div>
  <panda-date-picker @change="onChange" shadow></panda-date-picker>
</div>

## DatePicker Props

| 参数                | 介绍                                 | 类型                                  | 可选值           | 默认值            |
| ------------------- | ------------------------------------ | ------------------------------------- | ---------------- | ----------------- |
| type                | 日期选择器类型                       | String                                | date, date-range | date              |
| date                | 选择日期，支持 `.sync` 修饰符        | Date                                  | —                | —                 |
| default-view-date   | 默认视图日期                         | Date                                  | —                | new Date()        |
| first-day-of-week   | 哪一天作为一个星期的开始             | Number                                | 0-6              | 0（周日）         |
| min-date            | 最小可选择日期                       | Date                                  | —                | default-view-date |
| max-date            | 最大可选择日期                       | Date                                  | —                | —                 |
| should-disable-date | 判断日期是否不可用的函数             | Function                              | —                | —                 |
| is-sold-out         | 判断日期是否售罄的函数               | Function                              | —                | —                 |
| hightlight-today    | 是否高亮今天                         | Boolean                               | —                | false             |
| double-panel        | 显示双日历面板                       | Boolean                               | —                | false             |
| tip                 | 底部提示语                           | String                                | —                | —                 |
| min-range-gap       | 最小区间选择间隔(s)                  | Number                                | —                | 86400(一天)       |
| vertical-scroll     | 垂直滚动模式（一般用于移动端）       | Boolean                               | —                | false             |
| width               | 日期选择器宽度，可设置为 auto 自适应 | Number, String                        | —                | 340               |
| view-switchable     | 是否可切换视图                       | Boolean                               | —                | false             |
| shadow              | 开启阴影样式                         | Boolean                               | —                | false             |
| is-selectable       | 用于判断日期是否可选中               | Function(date, selectedDate): boolean | —                | —                 |

<!-- | is-selectable | 是否可被选中 | Function(date, selectedDate) | — | — | -->

<!-- | type | 选择的类型 | String | date/year/month | date |
| color | 日期选择器颜色 | String | — | — |
| date-time-format | 日期格式化对象，用于改变不同的语言环境显示 | Object | — | — |
| view-switchable | 控制视图是否可切换 | Boolean | - | false |
| range | 是否开启范围选择，结合 type 进行日期/月份/年的范围选择 | Boolean | — | false | -->

## DatePicker Events

| 名称   | 介绍                     | 回调参数 |
| ------ | ------------------------ | -------- |
| change | 当选择日期改变时触发事件 | (date)   |
| select | 选择日期时触发           | (date)   |

## DatePicker Scoped Slots

| 名称        | 介绍               | 参数                         |
| ----------- | ------------------ | ---------------------------- |
| day         | 每个日期显示内容   | \{ date, selected, disabled \} |
| date-append | 每个日期后置插槽   | \{ date, selected, disabled \} |
| tip         | 日期选择器底部提示 | —                            |

## DatePicker API

| 方法                    | 介绍                                   | 参数说明 |
| ----------------------- | -------------------------------------- | -------- |
| setViewDate(date: Date) | 设置当前视图日期                       | —        |
| scrollToCurrentMonth()  | 垂直模式下，滚动到当前已选日期所在月份 | —        |

<style lang="scss" scoped>
.demo-block {
  background-color: #eee;
}
.demo-date-picker {
  margin: 8px;
}
.mobile-container {
  height: 800px;
  width: 340px;
  /* background-color: rgba(255, 87, 34, 0.2); */
}
.my-day {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #333;
  &:hover, &-selected {
    cursor: pointer;
    color: #fff;
    background-color: #409eff;
  }
}
</style>
