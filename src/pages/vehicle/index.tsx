import { addVehicle, getVehicleList } from "@/utils/api.weapp";
import { Form, SafeArea, Button, Input, Cell, Divider } from "@nutui/nutui-react-taro";
import { View, } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState } from "react";

// 标题：车辆管理

// [列表]
//   - 粤A12345 | 丰田卡罗拉
//   - 粤B88888 | 大众途观

// [新增按钮] （浮动圆形按钮）

// 点击车辆 → 编辑页（修改车牌、车型、备注）


const Vehicle = () => {
    const [form] = Form.useForm();

    const [vehicleList, setVehicleList] = useState([]);

    const onSubmit = async (values: Record<string, any>) => {
        const resp = await addVehicle(values);
        if (resp) {
            Taro.showToast({
                title: '添加成功',
                icon: 'success',
            })
            // 刷新列表
            const res = await getVehicleList(1, 1);
            if (res) {
                setVehicleList(res);
            }
        }
    }

    useDidShow(async () => {
        const resp = await getVehicleList(1, 1);
        if (resp) {
            setVehicleList(resp);
        }
    })

    return (
        <View>
            <Cell.Group title='车辆列表'>
                {
                    vehicleList?.map(item => {
                        return (
                            <Cell key={item?.id} title={item?.plate} />
                        )
                    })
                }
            </Cell.Group>

            <Divider >添加车辆</Divider>
            <Form
              form={form}
              style={{ width: '100%' }}
              divider
              labelPosition='left'
              onFinish={onSubmit}
              onReset={() => form.resetFields()}
              footer={
                    <>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                        >

                            <Button nativeType='submit' type='primary' >提交</Button>
                            <Button nativeType='reset' style={{ marginLeft: 20 }}>重置</Button>
                        </View>
                    </>
                }

            >

                <Form.Item label='车牌' name='plate' >
                    <Input ></Input>
                </Form.Item>

                <Form.Item label='车型' name='model' >
                    <Input ></Input>
                </Form.Item>

            </Form>
            <SafeArea position='bottom'></SafeArea>
        </View>
    )
}

export default Vehicle;