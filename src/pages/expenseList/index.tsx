import { pickerOptions } from "@/constant";
import { getExpenseList } from "@/utils/api.weapp";
import { Cell } from "@nutui/nutui-react-taro";
import { View, Text, Label } from "@tarojs/components"
import { useLoad } from "@tarojs/taro";
import dayjs from "dayjs";
import { useState } from "react";

// 标题：消费记录

// [筛选栏] 车辆选择 | 类型选择 | 时间范围选择
// [搜索框] （备注/金额模糊搜索）

// [消费记录列表]
//   - 09/15 | 加油 ¥300 | 粤A12345
//   - 09/14 | 停车 ¥20
//   - 09/13 | 洗车 ¥35

// 点击记录 → 详情页（显示完整信息 + 删除/编辑）

export interface IExpense {
    "id": number //  1,
    "user_id": number // 1,
    "vehicle_id": number // 2,
    "category_id": number,// 3,
    "amount": number // 4,
    "occurred_at": number // 5,
    "remark": string,// "测试",
    "receipt_url": string,// "",
    "created_at": string, // "2025-09-20 08:22:43"
}

const ExpenseList = () => {

    const [expenseList, setExpenseList] = useState<IExpense[]>([]);

    useLoad(async () => {
        const list = await getExpenseList();
        setExpenseList(list);
    })

    return (
        <View>
            <Cell.Group
              title='消费列表'
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
        </View>
    )
}


export default ExpenseList;