import axios from "axios";
//创建实例
const service_l = axios.create({
    baseURL:'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout:5000,
    headers:{
        "Content-Type":"application/json;charset=uft-8"
    }
})
//请求拦截
service_l.interceptors.request.use((config)=> {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')){
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
})

//响应拦截
service_l.interceptors.response.use((res)=>{
    const code:number=res.data.data.code
    if (code != 200){
        console.log('账号密码输入错啦❌！')
        alert('账号密码输入错啦❌！')
        return Promise.reject(res.data)
    }
    return res.data
},(err)=>{
    console.log(err);
})
export default service_l