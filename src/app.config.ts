export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/expense/index',
    'pages/index/index',
    'pages/vehicle/index',
    'pages/setting/index',
    'pages/report/index',
    'pages/expenseList/index'
  ],
  tabBar: {
    list: [
      {
        text: '首页',
        pagePath: 'pages/index/index'
      },
      {
        text: '列表',
        pagePath: 'pages/expenseList/index'
      },
      {
        text:'车辆',
        pagePath:'pages/vehicle/index'
      },
      {
        text: '设置',
        pagePath: 'pages/setting/index'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
