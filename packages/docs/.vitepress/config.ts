import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Panda UI',
  description: 'Documents for PandaUI',
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/guide/get-started' },
      { text: 'Components', link: '/components/alert' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Get Started', link: '/guide/get-started' }],
      },
      {
        text: 'Components',
        items: [
          { text: 'Alert', link: '/components/alert' },
          { text: 'Announcement', link: '/components/announcement' },
          { text: 'Badge', link: '/components/badge' },
          { text: 'BottomSheet', link: '/components/bottom-sheet' },
          { text: 'Button', link: '/components/button' },
          { text: 'Breadcrumb', link: '/components/breadcrumb' },
          { text: 'Carousel', link: '/components/carousel' },
          { text: 'CardSwiper', link: '/components/card-swiper' },
          { text: 'Collapse', link: '/components/collapse' },
          { text: 'Counter', link: '/components/counter' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Divider', link: '/components/divider' },
          { text: 'Drawer', link: '/components/drawer' },
          { text: 'Dropdown', link: '/components/dropdown' },
          { text: 'DatePicker', link: '/components/date-picker-common' },
          { text: 'Form', link: '/components/form' },
          { text: 'Icon', link: '/components/icon' },
          { text: 'InfiniteScroll', link: '/components/infinite-scroll' },
          { text: 'Input', link: '/components/input' },
          { text: 'Link', link: '/components/link' },
          { text: 'Loading', link: '/components/loading' },
          { text: 'Markdown', link: '/components/markdown' },
          { text: 'Message', link: '/components/message' },
          { text: 'Modal', link: '/components/modal' },
          { text: 'Notification', link: '/components/notification' },
          { text: 'Pagination', link: '/components/pagination' },
          { text: 'Poptip', link: '/components/poptip' },
          { text: 'Progress', link: '/components/progress' },
          { text: 'Radio', link: '/components/radio' },
          { text: 'Section Title', link: '/components/section-title' },
          { text: 'Select', link: '/components/select' },
          { text: 'Skeleton', link: '/components/skeleton' },
          { text: 'Slider', link: '/components/slider' },
          { text: 'Steps', link: '/components/steps' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Table', link: '/components/table' },
          { text: 'Tabs', link: '/components/tabs' },
          { text: 'TagSelect', link: '/components/tag-select' },
          { text: 'Tag', link: '/components/tag' },
          { text: 'Toast', link: '/components/toast' },
          { text: 'Tree', link: '/components/tree' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hishengs/panda-ui' },
    ],

    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2023-present Hisheng'
    // }
  },
});
