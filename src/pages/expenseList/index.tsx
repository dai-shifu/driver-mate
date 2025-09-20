import { getExpenseList } from "@/utils/api.weapp";
import { View, Text, Label } from "@tarojs/components"
import { useLoad } from "@tarojs/taro";
import { useState } from "react";

// 标题：消费记录

// [筛选栏] 车辆选择 | 类型选择 | 时间范围选择
// [搜索框] （备注/金额模糊搜索）

// [消费记录列表]
//   - 09/15 | 加油 ¥300 | 粤A12345
//   - 09/14 | 停车 ¥20
//   - 09/13 | 洗车 ¥35

// 点击记录 → 详情页（显示完整信息 + 删除/编辑）

interface IExpense {
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
            <Text >消费列表页</Text>
            <View>
                {expenseList.map(item => {
                    return (
                        <View key={item.id}>
                            <Text>消费类型:{item.category_id}</Text>
                            <Text>金额:{item.amount}</Text>
                            <Text>车辆:{item.vehicle_id}</Text>
                            <Text>时间:{item.occurred_at}</Text>
                            <Text>备注:{item.remark}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}


export default ExpenseList;