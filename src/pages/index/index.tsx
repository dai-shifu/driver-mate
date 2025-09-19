import { View, Text, Button } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro"

// [顶部] 标题：我的用车账本

// [卡片] 本月支出总额：¥ 2350
//         分类占比（饼图：油费 60%，过路费 20%，停车 10%，其他 10%）

// [列表] 最近消费：
//   - 09/15 | 加油 ¥300 | 粤A12345
//   - 09/14 | 停车 ¥20  | 粤A12345
//   - 09/13 | 洗车 ¥35  | 粤A12345

// [底部按钮栏]
//   [添加消费] [列表] [报表] [车辆] [设置]


const Home = () => {
    useLoad(() => {
        console.log('Demo page loaded.');
    });

    const onClick = () => {
        Taro.navigateTo({
            url: '/pages/expense/index'
        })
    }

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            minHeight: '100vh',
            padding: 10,
        }}
        >
            <View style={{ flex: 1, border: '1px solid red' }}>

            </View>

            <View style={{}}>
                <Button
                  type='primary'
                  size='default'
                  onClick={onClick}
                >
                    添加消费
                </Button>
            </View>
        </View>
    )
}

export default Home;