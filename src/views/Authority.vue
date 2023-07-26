<template>
  <div>
      <el-tree
              ref="treeRef"
              :data="list"
              show-checkbox
              node-key="roleId"
              check-strictly="true"
              :default-checked-keys="authority"
              :props="{
                  children:'roleList',
                  label:'name'
              }"
      />
      <el-button @click="changeAuthority" type="primary">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs} from "vue";
import {useRoute} from "vue-router";
import {InitData} from "../type/authority";
import {getAuthority} from "../request/api";

export default defineComponent({
    setup() {
        const route = useRoute();
        console.log(route.query);
        const params:any = route.query;
        const data = reactive(new InitData(params.id, params.authority))
        onMounted(()=> {
            getAuthority().then(res=> {
                // console.log(res);
                data.list=res.data;
                console.log(data.list)
            })
        })
        // const treeRef = ref();
        const changeAuthority = ()=>{
            console.log(data.treeRef.getCheckedKeys().sort(function (a:number,b:number){
                return a-b;
            }));
            //传给后台，后台进行修改
            // data.authority = data.treeRef.getCheckedKeys().sort(function (a:number,b:number){
            //     return a-b;
            // })
        }
        return {...toRefs(data), changeAuthority};
    }
})
</script>

<style scoped>

</style>