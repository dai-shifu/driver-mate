import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'

// 默认主题
import '@nutui/nutui-react-taro/dist/style.css'
// 默认主题暗黑模式
// import '@nutui/nutui-react-taro/dist/style.css'
// JMAPP 主题
// import '@nutui/nutui-react-taro/dist/style-jmapp.css'
// JRKF 主题
// import '@nutui/nutui-react-taro/dist/style-jrkf.css'

import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}
  


export default App
