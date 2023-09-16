---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: '<span class="highlight-green">Panda</span> UI'
  # text: 'UI Framework for Vue'
  tagline: Component Framework for Vue, Made with ❤️
  # image:
  #   src: https://images.unsplash.com/photo-1636455815329-f51a506109d2
  #   alt: Panda
  actions:
    - theme: brand
      text: Get Started
      link: /guide/get-started
    - theme: alt
      text: See Components
      link: /components/alert

features:
  - title: Simple
    details: As simple as we can, with no mental burden
  - title: Minimalist
    details: Everything is just right
  - title: Powerful
    details: Useful features out of box
---

<template>
</template>

<style>
  :root {
    /* --vp-home-hero-name-color: #ff5722;
    --vp-c-brand-1: #ff5722;
    --vp-c-brand-2: #ff5722;
    --vp-c-brand-3: #ff5722;
    --vp-c-brand-soft: #fff2e8; */
    --vp-home-hero-name-color: #323232;
    --vp-c-brand-1: #323232;
    --vp-c-brand-2: #323232;
    --vp-c-brand-3: #323232;
    --vp-c-brand-soft: #eee;
    /* text color */
    /* --vp-c-text-1: #fff;
    --vp-c-text-2: #eee; */
  }
</style>

<style lang="scss">
  .VPNav .title {
    font-size: 20px;
  }
  html .is-home {
    /* background: url(https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80); */
    background: url(https://images.unsplash.com/photo-1487621167305-5d248087c724?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=60);
  }
  html.dark .is-home {
    /* background: url(https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=60); */
    /* background: url(https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=60); */
    background: url(https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2117&q=80);
    .main {
      .name .clip {
        -webkit-text-fill-color: #fff;
      }
    }
    .VPFeature {
      h2, p {
        color: #323232;
      }
      background: rgba(255, 255, 255, 0.88);
      &:hover {
        background: rgba(255, 255, 255, 1);
      }
    }
  }
  .is-home {
    background-size: cover;
    background-repeat: repeat;
    .highlight-green {
      -webkit-text-fill-color: #0a8c5f;
      color: #0a8c5f;
    }
    .main {
      max-width: 100%;
      text-align: center;
      margin-top: 80px;
    }
    .main {
      .tagline {
        /* color: #ddd; */
      }
      .name {
        font-size: 72px;
        margin-bottom: 40px;
      }
    }
    .main .name, .main .tagline, .main .text {
      max-width: 100%;
    }
    .main .actions {
      justify-content: center;
    }
    .VPFeature {
      background: rgba(255, 255, 255, 0.35);
      border-radius: 5px;
      border: none;
      &:hover {
        background: rgba(255, 255, 255, 0.7);
      }
    }
  }
</style>
