---
title: Markdown
lang: zh-CN
---

<script setup>
import Markdown from '../../panda-ui/src/components/markdown'

defineOptions({
  components: {
    'panda-markdown': Markdown,
  }
});

const ol = `1. This is text
2. This is text`;
const ul = `- This is text
- This is text`;
const essay = `# What to expect
## Before You Book
### Getting Your Exchange Order
#### Pass Delivery
- Please note: The exchange voucher delivery time depends on the date of departureNo deliveries on weekends and public holidays
- No deliveries on weekends and public holidays
- To track the delivery status, you may check the tracking number sent to your e-mail (this will be sent the next business day after the order has been confirmed)

#### Pass Delivery
- No deliveries on weekends and public holidays
- No deliveries on weekends and public holidays

### Getting Your Exchange Order

There is no easier and more convenient way to discover the Land of the Rising Sun than by taking a ride on Japan's brilliantly expansive rail network. For your choice of 7, 14, or 21 days, explore Japan in the most convenient and economical way with a Japan rail pass that is valid for the majority of railways and local buses operated by JR.

Choose between an Ordinary pass, or if you're looking to travel in more comfort, opt for the Green Class pass that offers you first class comfort with reclining seats, a footrest, space to stretch out your legs, and a travel magazine to keep you occupied during your journeys. From Shinkansen, Limited Express, local trains, Monorail, JR buses, to the Miyajima Ferry, this Japan rail pass is definitely the easiest and fastest way to explore all of Japan! Get your 7, 14 or 21 day Japan rail pass at XXX and enjoy convenient delivery straight to you!

#### Delivery Time

Choose between an Ordinary pass, or if you're looking to travel in more comfort, opt for the Green Class pass that offers you first class comfort with reclining seats, a footrest, space to stretch out your legs, and a travel magazine to keep you occupied during your journeys. From Shinkansen, Limited Express, local trains, Monorail, JR buses, to the Miyajima Ferry, this Japan rail pass is definitely the easiest and fastest way to explore all of Japan! Get your 7, 14 or 21 day Japan rail pass at XXX and enjoy convenient delivery straight to you!

### Getting Your Exchange Order

- [Nationwide JR Route Map](./)
- [Nationwide JR Route Map](./)

![一些描述信息](https://res.klook.com/image/upload/c_fill,w_550,h_308/fl_lossy.progressive,q_85,f_auto////activities/lutws8ks7y0xycmhgddf.webp)

![一些描述信息](https://res.klook.com/image/upload/c_fill,w_550,h_308/fl_lossy.progressive,q_85,f_auto////activities/nxwhaa7ppt4xjxjolpbn.webp)

#### Pick Up / Meet Up Information

##### Hotel Pick Up Information

- To track the delivery status, you may check the tracking number sent to your e-mail (this will be sent the next business day after the order has been confirmed)
- Time: 9：00-12：00

###### This is Heading 6

- Meet up Time:

9：00-12：00

9：00-12：00`;
</script>

# Markdown

Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML（或者HTML）文本。

## 标题

<panda-markdown content="# This is Heading 1"></panda-markdown>
<panda-markdown content="## This is Heading 2"></panda-markdown>
<panda-markdown content="### This is Heading 3"></panda-markdown>
<panda-markdown content="#### This is Heading 4"></panda-markdown>
<panda-markdown content="##### This is Heading 5"></panda-markdown>
<panda-markdown content="###### This is Heading 6"></panda-markdown>

## 段落/正文

<panda-markdown content="I am happy to join with you today in what will go down in history as the greatest demonstration for freedom in the history of our nation."></panda-markdown>

<panda-markdown content="Five score years ago, a great American, in whose symbolic shadow we stand today, signed the Emancipation Proclamation. This momentous decree came as a great beacon light of hope to millions of Negro slaves who had been seared in the flames of withering injustice. It came as a joyous daybreak to end the long night of bad captivity."></panda-markdown>

## 链接

<panda-markdown content="[Google](https://www.google.com)"></panda-markdown>

## 有序列表

<panda-markdown :content="ol"></panda-markdown>

## 无序列表

<panda-markdown :content="ul"></panda-markdown>

## 完整文章示例

<panda-markdown :content="essay" style="width: 375px; border: 1px solid #eee; padding: 0"></panda-markdown>

## Markdown Props

| 参数    | 介绍            | 类型   | 可选值 | 默认值 |
| ------- | --------------- | ------ | ------ | ------ |
| content | markdown 的内容 | String | —      | —      |
