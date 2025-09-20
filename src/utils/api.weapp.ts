import Taro from "@tarojs/taro";

/**
 * 登录接口
 */
export const login = async () => {
    const res = await Taro.login();
    const { code } = res;

    const resp = await Taro.request({
        url: 'https://ilsm.xyz/api/login',
        method: 'POST',
        data: {
            code: code
        }
    });

    if (resp.statusCode === 200) {
        Taro.setStorageSync('token', resp.data.token);
        Taro.setStorageSync('user', resp.data.user);

        // 登录成功后，跳转到首页
        Taro.switchTab({
            url: '/pages/index/index',
        })

        return resp.data;
    } else {
        throw new Error('登录失败' + JSON.stringify(resp));
    }

}


export const getExpenseList = async (page?: number, pageSize?: number) => {
    const token = Taro.getStorageSync('token');
    const user = Taro.getStorageSync('user');

    const resp = await Taro.request({
        url: 'https://ilsm.xyz/api/expense/list',
        method:'POST',
        data: {
            user_id: user.id,
            page: page || 1,
            page_size: pageSize || 10,
        },
        header: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })

    if (resp.statusCode === 200) {
        return resp.data;
    }
    throw new Error('获取列表失败' + JSON.stringify(resp));
}