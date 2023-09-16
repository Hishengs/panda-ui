// @ts-nocheck

// mixin for form components
export default {
  inject: {
    $form: {
      default: null,
    },
    $formItem: {
      default: null,
    },
  },
  computed: {
    disabledInForm() {
      // @ts-ignore
      return !!(this.$form || {}).disabled || !!(this.$formItem || {}).disabled;
    },
    sizeInForm() {
      // @ts-ignore
      return (
        (this.$form && this.$form.size) ||
        (this.$formItem && this.$formItem.size)
      );
    },
  },
  methods: {
    notifyForm(event, ...args) {
      // @ts-ignore
      if (this.$form) {
        // @ts-ignore
        this.$form.$emit(event, ...args);
      }
    },
    notifyFormItem(event, ...args) {
      // @ts-ignore
      if (this.$formItem) {
        // @ts-ignore
        this.$formItem.$emit(event, ...args);
      }
    },
  },
};
