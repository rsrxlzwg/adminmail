<template>
  <div>
     <el-form
        :model="groupForm"
        label-position="left"
        ref="ruleForm"  
        label-width="120px" >
        <!-- <el-form-item 
          prop="menuName"
          label='菜单名称' >
          <el-input
                v-model="groupForm.menuName"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item> -->

        <el-form-item 
          prop="name"
          label='按钮名称' >
          <el-input
                v-model="groupForm.name"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>

        </el-form-item>
          <el-form-item 
          prop="code"
          label='按钮编码' >
          <el-input
                v-model="groupForm.code"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>

         <el-form-item 
          prop="path"
          label='按钮链接' >
          <el-input
                v-model="groupForm.path"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>

        <el-form-item 
          prop="description"
          label='按钮描述' >
            <el-input
                v-model="groupForm.description"
                size="mini"
                type="textarea"
                placeholder= "请输入"/>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  export default {
    components:{
      Treeselect
    },
    props: ['groupForm'],
    data(){
      return {
          options: [{
              id: '10001',
              label: '通用组件',
              children: [ {
                id: '10002',
                label: '协议类型',
              }, {
                id: '10003',
                label: '报文解析器',
              } ],
          }],
      }
     
    },
    methods: {
        getSaveForm() {
          return this.groupForm;
        }
      }
  }
</script>

<style lang="scss" scoped>

</style>