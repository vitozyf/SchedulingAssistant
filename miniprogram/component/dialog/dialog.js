// component/dialog.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    closeOnClickOverlay: {
      // 点击蒙层是否关闭弹窗
      type: Boolean,
      value: true
    },
    className: {
      // 自定义类名
      type: String,
      value: ''
    },
    confirmButtonText: {
      // 确认按钮的文案
      type: String,
      value: '确定'
    },
    cancelButtonText: {
      // 取消按钮的文案
      type: String,
      value: '取消'
    },
    showConfirmButton: {
      // 是否展示确认按钮
      type: Boolean,
      value: true
    },
    showCancelButton: {
      // 是否展示取消按钮
      type: Boolean,
      value: true
    },
    asyncClose: {
      // 是否异步关闭
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    titleAlign: {
      // 标题对齐方式
      type: String,
      value: 'left'
    }
  },

  observers: {
    visible: function(val) {
      this.triggerEvent(val ? 'open' : 'close');
    }
  },

  data: {},

  methods: {
    closeHandler() {
      if (this.properties.closeOnClickOverlay) {
        this.setData({
          visible: false
        });
      }
    },
    dialogTap() {
      return null;
    },
    confirmButtonHandler() {
      this.triggerEvent('confirmHandler');
      if (!this.properties.asyncClose) {
        this.setData({
          visible: false
        });
      }
    },
    cancelButtonHandler() {
      this.setData({
        visible: false
      });
    }
  }
});
