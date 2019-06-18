//index.js
import initCalendar, { setTodoLabels } from '../../component/calendar/main.js';
import dayjs from '../../utils/dayjs.min.js';
import { numTransformWeek } from '../../utils/util.js';
Page({
  data: {
    dialogvisible: false,
    currentDay: '',
    options: {
      showclose: true,
      showfooter: true,
      closeonclickmodal: true,
      fullscreen: false
    },
    title: 'dialog title',
    opacity: '0.4',
    width: '85',
    position: 'center',
    positions: [
      {
        title: '居中',
        value: 'center'
      },
      {
        title: '顶部',
        value: 'top'
      },
      {
        title: '底部',
        value: 'bottom'
      }
    ],
    positionIndex: 0
  },

  onLoad: function() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang: 'zh_CN',
            success: function(res) {
              wx.cloud
                .callFunction({
                  name: 'userHandler',
                  data: {
                    name: 'addUser',
                    userInfo: res.userInfo
                  }
                })
                .then(res => {
                  if (res.result.code === 0) {
                    console.log('用户信息', res.result.data);
                  }
                });
            }
          });
        } else {
          // 未授权跳转到授权页面
          wx.reLaunch({
            url: '/pages/getUserInfo/index'
          });
        }
      }
    });
  },

  onShow: function() {
    const Calendar = initCalendar({
      multi: false, // 多选
      // noDefault: true, // 初始化后选中当天日期
      defaultDay: dayjs().format('YYYY-MM-DD'),
      afterTapDay: this.afterTapDay
    });
    setTimeout(() => {
      setTodoLabels({
        // 待办点标记设置
        pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
        dotColor: '#40', // 待办点标记颜色
        // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
        circle: true, // 待办
        days: [
          {
            year: 2019,
            month: 6,
            day: 12,
            todoText: '待办'
          },
          {
            year: 2019,
            month: 6,
            day: 15
          }
        ]
      });
    }, 1000);
  },

  afterTapDay(currentSelect) {
    console.log(currentSelect);
    this.setData({
      dialogvisible: true,
      currentDay: `${currentSelect.year}-${currentSelect.month}-${
        currentSelect.day
      } ${numTransformWeek(currentSelect.week)}`
    });
  },

  dialogOpen() {
    // console.log('dialog-open');
  },
  dialogClose() {
    // console.log('dialog-close');
  },
  confirmHandler() {
    // console.log(123);
  }
});
