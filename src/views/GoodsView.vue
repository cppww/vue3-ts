<template>
  <div>
      <div class="select-box">
          <el-form :inline="true" :model="selectData" class="demo-form-inline">
              <el-form-item label="标题">
                  <el-input v-model="selectData.title" placeholder="请输入关键字" />
              </el-form-item>
              <el-form-item label="详情">
                  <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
      </div>
      <el-table :data="dataList" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="180" />
          <el-table-column prop="title" label="标题" width="180" />
          <el-table-column prop="introduce" label="详情" />
      </el-table>
      <el-pagination @current-change="currentChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize" />
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, computed, watch, onMounted} from "vue";
import { getGoodList } from "../request/api";
import {InitData, ListInt} from "../type/goods";

export default defineComponent({
    setup(){
        const data = reactive(new InitData());

        onMounted(() => {
            getGoods();
        })
        const getGoods = () => {
            getGoodList().then(res => {
                // console.log(res);
                data.list = res.data;
                data.selectData.count = res.data.length;
                total_list = data.list;
                total_count = data.selectData.count;
            });
        }
        var total_list: { userId: number; id: number; title: string; introduce: string; }[];
        var total_count: number;
        const dataList=computed(() => {
                return data.list.slice(
                    (data.selectData.page-1) * data.selectData.pagesize,
                    data.selectData.page * data.selectData.pagesize)
            })

        const currentChange=(page:number) => {
            data.selectData.page=page;
        }
        const sizeChange=(pagesize:number) => {
            data.selectData.pagesize=pagesize;
        }
        const onSubmit=() => {
            data.selectData.count = total_count;
            data.list = total_list;
            // console.log(total_list);
            let arr = data.list;
            if(data.selectData.title || data.selectData.introduce){
                if(data.selectData.title){
                    arr=arr.filter((value) =>{
                        return value.title.indexOf(data.selectData.title) !== -1
                    })
                }
                if(data.selectData.introduce){
                    arr=arr.filter((value) =>{
                        return value.introduce.indexOf(data.selectData.introduce) !== -1
                    })
                }

            }
            data.selectData.count = arr.length;
            data.list = arr;
        }
        // watch([()=>data.selectData.title, ()=>data.selectData.introduce], () => {
        //     if(data.selectData.title == "" && data.selectData.introduce == ""){
        //         getGoodList().then(res => {
        //             console.log(res);
        //             data.list = res.data;
        //             data.selectData.count = res.data.length;
        //         });
        //     }
        // })
        return {...toRefs(data), currentChange, sizeChange, dataList, onSubmit};
    }
})
</script>

<style scoped>

</style>