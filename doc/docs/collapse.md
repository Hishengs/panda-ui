# Collapse 折叠面板

## 默认
```vue
<template>
  <panda-collapse v-model="collapsed" @change="onCollapse">
    <panda-collapse-panel :title="title" :content="intro" value="one"></panda-collapse-panel>
    <panda-collapse-panel :title="title" :content="intro" value='two'></panda-collapse-panel>
    <panda-collapse-panel :title="title" :content="intro" value='three'></panda-collapse-panel>
  </panda-collapse>
</template>
```

## 手风琴模式
```vue
<template>
  <panda-collapse accordion>
    <panda-collapse-panel :title="title" :content="intro"></panda-collapse-panel>
    <panda-collapse-panel :title="title" :content="intro"></panda-collapse-panel>
    <panda-collapse-panel :title="title" :content="intro"></panda-collapse-panel>
  </panda-collapse>
</template>
```

## 自定义
```vue
<template>
  <panda-collapse accordion>
    <panda-collapse-panel :title="title">{{ intro }}</panda-collapse-panel>
    <panda-collapse-panel :content="intro">
      <Button type="primary" slot="title">自定义标题区域</Button>
    </panda-collapse-panel>
    <panda-collapse-panel :title="title" :content="intro"></panda-collapse-panel>
  </panda-collapse>
</template>
```

<script>
  const intro = `
  《冰与火之歌》的故事发生在一个虚幻的中世纪世界，主要目光集中在西方的“日落王国”——维斯特洛大陆上，讲述那里的人在当时的政治背景下的遭遇和经历。故事通过不同人物的第三人称视点（POV写法）来进行叙述，每个视点的主观性（和不可靠性）都很强。《冰与火之歌》的故事主要围绕三条主线发展：
  第一条主线围绕着各方诸侯意图问鼎整个王国的权力中心——铁王座而进行“权力的游戏”王朝斗争的故事展开。已出版的五卷书主要描写在维斯特洛全境爆发的大内战——五王之战的前后经过以及各个主要家族间的明争暗斗。故事情节主要从史塔克家族和兰尼斯特家族（分别影射玫瑰战争中的约克家族和兰开斯特家族）双方众多成员的视点出发，此外再加上其余家族的一些人物的叙述。这条故事线是着笔最多的一条，也是整个小说系列的主体思想所在。
  第二条主线围绕着镇守七大王国北疆要塞绝境长城的守夜人在与塞外野人对抗并对南方政治置身事外的同时，试图抵御消隐八千年后卷土重来、意图借着长冬入侵杀光所有人类的异鬼的威胁。长城一线的故事主要出自于艾德·史塔克的私生子琼恩·雪诺和他的好友山姆威尔·塔利的视点。从第三卷开始，本来保持永久中立的守夜人也不由自主的受到了南方内战的波及影响，特别是五王之战中的一王——史坦尼斯·拜拉席恩率兵北上驰援长城之后。整个小说的魔幻色彩主要来源于此故事线。
  第三条主线则设定于维斯特洛东面的另一大陆——厄索斯，主要围绕着坦格利安家族仅存的成员丹妮莉丝·坦格利安在重新孵化出龙后，意图东山再起夺回维斯特洛政权的经历。这条故事线在小说系列的绝大部分篇幅中独立于其他两条主线。但是在小说后期，其他故事线中的角色也开始参入这条主线。
  `;

  export default {
    data () {
      return {
        title: '冰与火之歌',
        intro,
        collapsed: 'one'
      };
    },
    methods: {
      onCollapse (val) {
        console.log('>>> onCollapse', val);
      }
    }
  };
</script>