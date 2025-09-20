import { login } from "@/utils/api.weapp";
import { View, Text, } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro"
import { Button, SafeArea } from '@nutui/nutui-react-taro'


import './index.scss';

const Login = () => {


    useLoad(async () => {
        const res = await Taro.login();
        const { code } = res;
        console.log('code==>', code)
    })

    return (
        <View className='login' >
            <Text style={{ marginTop: 60 }}>油费呢</Text>

            <Button
              type='primary'
              onClick={login}
              size='normal'
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
                gap: 20
            }}
            >
                <Text >隐私协议</Text>
                <Text >用户协议</Text>
            </View>
            <SafeArea position='bottom' />
        </View>
    )
}

export default Login;