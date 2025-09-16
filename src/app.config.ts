export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index'
  ],
  tabBar:{
    list:[
      {
        text:'登录',
        pagePath:'pages/login/index',
      },
      {
        text:'首页',
        pagePath:'pages/index/index'
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
