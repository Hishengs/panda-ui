function broadcast(
  this: any,
  componentName: string,
  eventName: string,
  params?: any,
) {
  this.$children.forEach((child: any) => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.call(child, componentName, eventName, params);
    }
  });
}

export default {
  methods: {
    dispatch(this: any, componentName: string, eventName: string, params: any) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName: string, eventName: string, params: any) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
