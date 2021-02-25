<template>
  <div>
     <el-form
        :model="groupRuleForm"
        label-position="left"
        ref="ruleForm"  
        label-width="120px" >
        <!-- <el-form-item 
          prop="menuName"
          label='菜单名称' >
          <el-input
                v-model="groupRuleForm.menuName"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item> -->
        <el-form-item 
          prop="name"
          label='数据规则名称' >
          <el-input
                v-model="groupRuleForm.name"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>
      
         <el-form-item 
          prop="rule"
          label='规则' >
           <el-input
                v-model="groupRuleForm.rule"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>

          <el-form-item 
          prop="path"
          label='路径' >
           <el-input
                v-model="groupRuleForm.path"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>
         
         <el-form-item 
          prop="path"
          label='描述' >
           <el-input
                v-model="groupRuleForm.desc"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>
      
      
      
         <el-form-item 
          prop="teamName"
          label='规则值' >        
          <el-input
                v-model="groupRuleForm.teamName"
                size="mini"
                placeholder= "请输入"/>
        </el-form-item>
        <el-form-item 
          prop="teamName"
          label='自定义sql' >
            <el-input
                v-model="groupRuleForm.sql"
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
import {submitDataRuleInfo} from '@/api/sysManagement/menu'
  export default {
    components:{
      Treeselect
    },
    props: ['groupRuleForm'],
    data(){
      return {
          options: [ {
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
          return this.groupRuleForm;
        }
      }
  }
</script>

<style lang="scss" scoped>

</style>