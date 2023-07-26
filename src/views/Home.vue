<template>
    <div class="common-layout">
        <el-container>
            <el-header height="80px" >
                <el-row :gutter="20">
                    <el-col :span="4"><img src="../../public/vite.svg" class="logo"/> </el-col>
                    <el-col :span="16"><h2>后台管理系统</h2></el-col>
                    <el-col :span="4" class="col-btn"><el-button @click="deltoken">退出登录</el-button></el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                        active-text-color="#ffd04b"
                        background-color="#545c64"
                        class="el-menu-vertical-demo"
                        :default-active="active"
                        text-color="#fff"
                        router
                    >
                        <!-- router开启路由模式，通过el-menu-item index进行跳转 -->
                        <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
                            <span>{{ item.meta.title }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <!--设置路由出口-->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>


</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
    name: "Home",
    setup(){
        const router = useRouter();
        const route = useRoute();
        // console.log(router.getRoutes());
        const list = router.getRoutes().filter(v => v.meta.isShow);
        // console.log(list);
        const deltoken = () =>{
            localStorage.removeItem('token');
            router.push('/login');
        }
        return {list, active:route.path, deltoken};

    }
})
</script>

<style lang="scss" scoped>
.el-header{
    height: 80px;
    background-color: #666;
    .col-btn{
        height: 80px;
        line-height: 80px;
    }
    .logo{
        height: 80px;
    }
    h2, .quit-login{
        text-align: center;
        line-height: 80px;
        height: 80px;
        color: white;
    }
}
.el-aside{
    .el-menu{
        height: calc(100vh - 80px);
    }
}
</style>