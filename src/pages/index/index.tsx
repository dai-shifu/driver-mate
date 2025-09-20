import { Cell, SafeArea, Tabbar, Button, NoticeBar } from "@nutui/nutui-react-taro";
import { View, Text } from "@tarojs/components";
import Taro, { useDidShow, useLoad } from "@tarojs/taro"
import { IExpense } from "../expenseList";
import { useState } from "react";
import { getExpenseList } from "@/utils/api.weapp";
import dayjs from "dayjs";
import { pickerOptions } from "@/constant";

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
    const [expenseList, setExpenseList] = useState<IExpense[]>([]);

    useDidShow(async () => {
        const resp = await getExpenseList(1, 3);
        setExpenseList(resp);
        console.log('Demo page loaded.');
    });

    const onClick = () => {
        Taro.navigateTo({
            url: '/pages/expense/index'
        })
    }

    return (
        <View
          style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                minHeight: '100vh',
                gap: 20,

                width: '100%',
            }}
        >
            <NoticeBar >请先添加车辆</NoticeBar>
            
            <Cell >
                <View>本月支持总额</View>
            </Cell>

            {/* <Cell >
                这里是统计
            </Cell> */}

            <Cell.Group
              title='最近消费'
              style={{ width: '100%' }}
            >
                {expenseList?.map(item => {
                    const { occurred_at, category_id, amount, vehicle_id } = item;
                    const date = dayjs(occurred_at).format('MM月DD日');
                    const category = pickerOptions.find(item => item.value == category_id)?.label;
                    return (
                        <Cell key={item.id} title={`${date} | ${category} | ￥${amount}`} >

                        </Cell>
                    )
                })}
            </Cell.Group>


            <View style={{ height: 'auto' }}>
                <Button
                  type='primary'
                  size='normal'
                  onClick={onClick}
                >
                    添加消费
                </Button>
            </View>
            <SafeArea position='bottom' />
        </View>
    )
}

export default Home;