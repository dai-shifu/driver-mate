import { login } from "@/utils/api.weapp";
import { View, Text, Button } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro"
import { useState } from "react";
import './index.scss';

const Login = () => {


    useLoad(() => {
    })

    return (
        <View className='login' >
            <Text style={{ marginTop: 60 }}>油费呢</Text>

            <Button
              type='primary'
              onClick={login}
              size='default'
              style={{
                    position: 'absolute',
                    bottom: 120,
                }}
            >
                授权登录
            </Button>

            <View style={{
                position: 'absolute',
                bottom: 60,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                gap:20
            }}
            >
                <Text >隐私协议</Text>
                <Text >用户协议</Text>
            </View>
        </View>
    )
}

export default Login;