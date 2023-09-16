import { describe, it, expect, beforeEach } from 'vitest';
import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
import Alert from '../index';

describe('Alert Component', () => {
  /* it('should be regiesterd as a plugin', () => {
    const localVue = createLocalVue();
    localVue.use(Alert);
    const { components } = localVue.options;
    expect(typeof components[Alert.name]).toBe('function');
  }); */

  describe('Default Props', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
      wrapper = shallowMount(Alert);
    });

    it('should type be one of ["success", "info", "warning", "error"], default is undefined', () => {
      const type = wrapper.vm.$options.props.type;

      expect(type.type).toBe(String);
      expect(type.default).toEqual(undefined);
      expect(type.validator && type.validator('success')).toBeTruthy();
      expect(type.validator && type.validator('info')).toBeTruthy();
      expect(type.validator && type.validator('warning')).toBeTruthy();
      expect(type.validator && type.validator('error')).toBeTruthy();
      expect(type.validator && type.validator('foo')).toBeFalsy();
    });

    // it('should align be one of ["left", "center", "right"]', () => {
    //   const align = wrapper.vm.$options.props.align;

    //   expect(align.type).toBe(String);
    //   expect(align.validator && align.validator('left')).toBeTruthy();
    //   expect(align.validator && align.validator('center')).toBeTruthy();
    //   expect(align.validator && align.validator('right')).toBeTruthy();
    //   expect(align.validator && align.validator('foo')).toBeFalsy();
    // });

    it('should not render alert-Icon when showIcon is false by default', () => {
      expect(wrapper.find('.panda-alert-icon').exists()).toBeFalsy();
    });

    it('should not render title when title is empty string by default', () => {
      expect(wrapper.find('.panda-alert-title').exists()).toBeFalsy();
    });

    it('should not render close-Icon when closable is false by default', () => {
      expect(wrapper.find('.panda-alert-close-btn').exists()).toBeFalsy();
    });
  });

  describe('Custom Props', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
      wrapper = mount(Alert);
    });

    it('should render icon when showIcon is true', async () => {
      await wrapper.setProps({
        type: 'success',
        showIcon: true,
      });

      expect(wrapper.find('.panda-alert-icon').exists()).toBeTruthy();
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should not render icon when showIcon is false', async () => {
      await wrapper.setProps({
        showIcon: false,
      });

      expect(wrapper.find('.panda-alert-icon').exists()).toBeFalsy();
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render title <h6>foo</h6> when title is foo', async () => {
      await wrapper.setProps({
        title: 'foo',
      });

      expect(wrapper.find('.panda-alert-title h6').html()).toBe('<h6>foo</h6>');
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render close-Icon when closable is true', async () => {
      await wrapper.setProps({
        closable: true,
      });

      expect(wrapper.find('.panda-alert-close-btn').exists()).toBeTruthy();
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('Slot', () => {
    it('should render <p>foo</p> when default slot is <p>foo</p>', async () => {
      const wrapper = await mount(Alert, {
        slots: {
          default: '<p>foo</p>',
        },
      });

      expect(wrapper.find('.panda-alert-content p').html()).toBe('<p>foo</p>');
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render title <h2>foo</h2> when title-slot is <h2>foo</h2>', async () => {
      const wrapper = await mount(Alert, {
        slots: {
          title: '<h2>foo</h2>',
        },
      });

      expect(wrapper.find('.panda-alert-title h2').html()).toBe('<h2>foo</h2>');
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('Event', () => {
    it('should remove alert when close-Icon is clicked', async () => {
      const wrapper = mount(Alert, {
        props: {
          closable: true,
        },
      });

      expect(wrapper.find('.panda-alert').exists()).toBe(true);
      await wrapper.find('.panda-alert-close-btn').trigger('click');
      expect(wrapper.find('.panda-alert').exists()).toBe(false);
    });
  });
});
