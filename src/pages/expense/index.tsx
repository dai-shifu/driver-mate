import { View, Text, Form, Button, Picker } from "@tarojs/components"

// 标题：新增消费

// [选择车辆] 下拉框
// [消费类型] Picker（油费/停车/维修/过路费/保险/其他）
// [金额] 输入框（¥）
// [里程] 输入框（公里，可选）
// [时间] 日期选择器（默认今天）
// [备注] 多行输入
// [票据上传] 上传按钮（支持拍照/选图）

// [保存按钮] （提交后 Toast 成功提示）

const objectArray = [
    {
        label: '油费',
        value: 'oil',
    },
    {
        label: '停车',
        value: 'stop',
    },
    {
        label: '维修',
        value: 'repair',
    },
    {
        label: '过路费',
        value: 'over',
    },
    {
        label: '保险',
        value: 'insurance',
    },
    {
        label: '其他',
        value: 'other',
    },
]

const Expense = () => {

    const onSubmit = ()=>{

    }


    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            minHeight: '100vh',
            gap: 20,
        }}
        >
            <Text >添加消费</Text>

            <View >
                <Form onSubmit={onSubmit} >
                    <View>
                        <Picker mode='selector'  range={objectArray} rangeKey='label'>
                        <View>消费类型:{}</View>
                        </Picker>
                    </View>

                    <Button >保存</Button>
                </Form>
            </View>
        </View>
    )
}

export default Expense;