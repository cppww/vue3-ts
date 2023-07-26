<template>
<div class="login-box">登录页面
    <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
    >
        <h2>后台管理系统</h2>

        <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input
                    v-model="ruleForm.password"
                    type="password"
                    autocomplete="off"
            />
        </el-form-item>
<!--        <el-form-item label="Age" prop="age">-->
<!--            <el-input v-model.number="ruleForm.age" />-->
<!--        </el-form-item>-->
        <el-form-item>
            <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)"
            >登录</el-button
            >
            <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</div>
    <div>{{ruleForm.username}}</div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref} from 'vue'
import {LoginData} from "../type/login";
import type { FormInstance } from 'element-plus'
import {login} from "../request/api";
import { useRouter } from "vue-router";

export default defineComponent({
    setup(){
        const data = reactive(new LoginData());
        const rules = {
            username: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 10, message: '账号长度3-10', trigger: 'blur' },
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 10, message: '密码长度3-10', trigger: 'blur' },
            ]
        };
        //登录
        const ruleFormRef = ref<FormInstance>();
        const router = useRouter()
        //重置
        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            //验证表单内容
            //valid-boolean
            formEl.validate((valid) => {
                if (valid) {
                    // console.log('submit!')
                    login(data.ruleForm).then((res) =>{
                        console.log(res)
                        //保存token
                        localStorage.setItem('token',res.data.token)
                        //跳转页面
                        router.push('/')
                    })
                } else {
                    alert('输入格式错误噢！😣')
                    console.log('error submit!')
                    return false
                }
            })
            // console.log(formEl);
        }

        const resetForm = () =>{
            data.ruleForm.username='';
            data.ruleForm.password='';
        }
        return {...toRefs(data), rules, resetForm, ruleFormRef, submitForm }
    }
})
</script>

<style lang="scss" scoped>

  .login-box{

      width: 100%;
      height: 100%;
      background: url("../assets/imgs/loginbackground.jpeg");
      background-size: cover;
      //overflow: hidden;
      .demo-ruleForm{
          width: 500px;
          margin: 200px auto;
          background-color: white;
          padding: 30px;
          border-radius: 40px;
      }
      .loginBtn{
          width: 40%;
      }
      .h2{
          margin-bottom: 10px;
      }

  }
</style>