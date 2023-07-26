<template>
  <div>
      <div class="select-box">
          <el-form :inline="true" :model="selectData" class="demo-form-inline">
              <el-form-item label="姓名">
                  <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="角色">
                  <el-select v-model="selectData.role" class="m-2" placeholder="请选择" size="large">
                      <el-option label="全部" :value="0"/>
                      <el-option
                              v-for="item in roleList"
                              :key="item.roleId"
                              :label="item.roleName"
                              :value="item.roleId"
                      />
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
      </div>
      <el-table :data="list" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="180" />
          <el-table-column prop="nickName" label="姓名" width="180" />
          <el-table-column prop="role" label="角色">
              <template #default="scope">
                  <el-button
                          v-for="item in scope.row.role"
                          :key="item.role"
                          link
                          size="small"
                  >
                      {{ item.roleName }}
                  </el-button>
              </template>
          </el-table-column>
          <el-table-column prop="role" label="操作">
              <template #default="scope">
                  <el-button
                      link
                      type="primary"
                      size="small"
                      @click="changeUser(scope.row)"
                  >
                      编辑
                  </el-button>
              </template>
          </el-table-column>
      </el-table>
  </div>
    <el-dialog v-model="isShow" title="编辑信息">
        <el-form :model="active">
            <el-form-item label="姓名" label-width="50px">
                <el-input v-model="active.nickName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="角色" label-width="50px">
                <el-select multiple v-model="active.role" placeholder="请选择角色">
                    <el-option
                        v-for="item in roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="updateUser">
          更改
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from "vue";
import { getUserList, getRoleList} from "../request/api";
import { InitData, ListInt } from "../type/user";

export default defineComponent({
    setup(){
        const data = reactive(new InitData());
        onMounted(() => {
            getUser();
            getRole();
        })
        const getUser = () => {
            getUserList().then((res) =>{
                console.log(res);
                data.list = res.data;
                total_list = data.list;
            });
        };
        var total_list: { id: number; nickName: string; role: { role: number; roleName: string; }; userName: string; }[];
        const getRole = () => {
            getRoleList().then((res) => {
                console.log(res);
                data.roleList = res.data
            })
        };
        const onSubmit = () => {
            // console.log(data.selectData.nickName);
            console.log(data.selectData.role);
            data.list = total_list;
            // console.log(total_list);
            let arr = data.list;
            if(data.selectData.nickName || data.selectData.role){
                if(data.selectData.nickName){
                    arr=arr.filter((value) =>{
                        return value.nickName.indexOf(data.selectData.nickName) !== -1
                    })
                }
                if(data.selectData.role){
                    arr=arr.filter((value) =>{
                        //@ts-ignore
                        return value.role.find((item) => item.role===data.selectData.role);
                    })
                }

            }
            data.list = arr;
        };
        const changeUser = (row:ListInt)=>{
            console.log(row);
            data.active={
                id:row.id,
                nickName:row.nickName,
                userName:row.userName,
                //@ts-ignore
                role:row.role.map((value) => value.role || value.roleId)
            }
            data.isShow = true;
        };
        const updateUser = () => {
            // console.log(data.active);
            let obj:any = data.list.find((value)=>value.id===data.active.id);
            obj.nickName = data.active.nickName;
            obj.role=data.roleList.filter((value)=>data.active.role.indexOf(value.roleId)!==-1);
            console.log(obj.role);
            data.list.forEach((item, i)=>{
                if(item.id == obj.id){
                    data.list[i] = obj;
                }
            });
            data.isShow=false;
        }
        return {...toRefs(data), onSubmit, changeUser,updateUser}
    }
})
</script>

<style scoped>

</style>