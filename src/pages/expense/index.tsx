import { Cell, SafeArea, Button, Picker, Form, Input, InputNumber, TextArea, DatePicker } from "@nutui/nutui-react-taro"
import { ArrowRight } from '@nutui/icons-react-taro'
import { View, } from "@tarojs/components"
import { useEffect, useState } from "react"
import { addExpense, getVehicleList } from "@/utils/api.weapp"
import Taro, { useLoad } from "@tarojs/taro"
import { pickerOptions } from "@/constant"

// 标题：新增消费

// [选择车辆] 下拉框
// [消费类型] Picker（油费/停车/维修/过路费/保险/其他）
// [金额] 输入框（¥）
// [里程] 输入框（公里，可选）
// [时间] 日期选择器（默认今天）
// [备注] 多行输入
// [票据上传] 上传按钮（支持拍照/选图）

// [保存按钮] （提交后 Toast 成功提示）

const Expense = () => {

    const [form] = Form.useForm();

    useLoad(async () => {
        const list = await getVehicleList(1, 1);
        form.setFieldValue('vehicle_id', list[0].id);
        form.setFieldValue('vehicle_plate', list[0].plate);
    })



    const onSubmit = async (values: Record<string, any>) => {
        const { category_id } = values;
        const resp = await addExpense({ ...values, category_id: category_id[0] });

        if (resp) {
            Taro.showToast({
                title: '添加成功'
            })

            Taro.navigateBack();
        }
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
                <Form.Item label='车辆' name='vehicle_id' style={{ display: 'none' }}>
                    <Input ></Input>
                </Form.Item>
                <Form.Item label='车牌号' name='vehicle_plate' disabled>
                    <Input  ></Input>
                </Form.Item>
                <Form.Item
                  label='费用类型'
                  name='category_id'
                  trigger='onConfirm'
                  getValueFromEvent={(...args) => args[1]}
                  onClick={(event, ref: any) => ref.open()}
                  rules={[{ required: true, message: '请选择费用类型' }]}
                >
                    <Picker options={[pickerOptions]} >
                        {(value: any) => {
                            return (
                                <Cell
                                  style={{
                                        padding: 0,
                                        '--nutui-cell-divider-border-bottom': '0',
                                    }}
                                  className='nutui-cell--clickable'
                                  title={
                                        value.length
                                            ? pickerOptions.filter((po) => po.value === value[0])[0]
                                                ?.label
                                            : 'Please select'
                                    }
                                  extra={<ArrowRight />}
                                  align='center'
                                />
                            )
                        }}

                    </Picker>
                </Form.Item>

                <Form.Item label='消费金额' name='amount' rules={[{ required: true, message: '请输入消费金额' }]}>
                    <InputNumber min={0} digits={2} ></InputNumber>
                </Form.Item>
                <Form.Item
                  label='消费时间'
                  name='occurred_at'
                  trigger='onConfirm'
                  getValueFromEvent={(...args) => {
                        return new Date(args[1].join('/'))
                    }}
                  onClick={(event, ref: any) => {
                        ref.open()
                    }}
                  initialValue={new Date()}
                  rules={[{ required: true, message: '请选择消费时间' }]}
                >
                    <DatePicker>
                        {(value: any) => {
                            return (
                                <Cell
                                  style={{
                                        padding: 0,
                                        '--nutui-cell-divider-border-bottom': '0',
                                    }}
                                  className='nutui-cell--clickable'
                                  title={
                                        value
                                            ? new Date(value).toLocaleDateString()
                                            : 'Please select'
                                    }
                                  extra={<ArrowRight />}
                                  align='center'
                                />
                            )
                        }}
                    </DatePicker>

                </Form.Item>

                <Form.Item label='备注' name='remark' >
                    <TextArea rows={3} />
                </Form.Item>

            </Form>
            <SafeArea position='bottom' />
        </View>
    )
}

export default Expense;