import Icon from '../index';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

describe('Icon', () => {
  it('should be default view', () => {
    const wrapper = shallowMount(Icon, {
      props: {
        name: 'user',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('proerty type', () => {
    const wrapper = shallowMount(Icon, {
      props: {
        name: 'user',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('i').attributes('data-feather')).toBe('user');
  });

  it('proerty size', () => {
    const wrapper = shallowMount(Icon, {
      props: {
        name: 'user',
        size: '20',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(
      wrapper.find('i').attributes('style')?.includes('width: 20px;'),
    ).toBeTruthy();
  });

  it('proerty color', () => {
    const wrapper = shallowMount(Icon, {
      props: {
        name: 'user',
        color: '#000',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(
      wrapper.find('i').attributes('style')?.includes('color: rgb(0, 0, 0);'),
    ).toBeTruthy();
  });
});
