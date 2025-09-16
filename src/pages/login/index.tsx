import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro"
import { useState } from "react";

const Login = () => {
    const [user,setUser] = useState();

    useLoad(() => {
        console.log('PageLoad');
        Taro.login({
            async success ( result) {
                if(result.code){
                    console.log('resultcode===>',result.code);
                    const resp = await Taro.request({
                        url:'https://islm.xyz/api/login',
                        data:{
                            code:result.code,
                        }
                    })
                    if(resp.statusCode===200){
                        Taro.setStorageSync('token',resp.data.token);
                        Taro.setStorageSync('user',resp.data.user);
                        setUser(resp.data.user);
                    }
                }else{
                    console.log('登录失败');
                }
            },
        })
    })

    return (
        <View className='login' >
            <Text >登录页面</Text>
            <Text >{JSON.stringify(user)}</Text>
        </View>
    )
}

export default Login;