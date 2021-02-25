<template>
  <div>
    <el-card>
      <el-form ref="formData" :model="formData" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="流程名称">
              <el-input v-model="formData.name" size="small" placeholder="" style="width:68%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流程类型">
              <el-select v-model="formData.flowType" size="small" style="width:68%">
                <el-option label="C端流程" :value="1" />
                <el-option label="P端流程" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="流程描述">
          <el-input v-model="formData.description" size="small" placeholder="" type="textarea" style="width:30%" />
        </el-form-item>
        <el-divider style="margin:30px 0" />
        <el-row :gutter="20" style="display: flex;align-items: center;">
          <el-col :span="10">
            <el-form-item label="基础服务流程配置">
              <el-table
                :data="fileData.content"
                style="width: 100%"
                @selection-change="checkAll"
              >
                <el-table-column
                  type="selection"
                />
                <el-table-column
                  prop="abstractName"
                  label="服务名称"
                />
                <el-table-column
                  prop="description"
                  label="服务描述"
                />
              </el-table>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <div @click="handelSelect">
              <el-button
                type="primary"
                :disabled="nowSelectData.length?false:true"
                icon="el-icon-arrow-right"
                circle
              />
            </div>
            <div @click="handleRemoveSelect">
              <el-button
                type="primary"
                :disabled="nowSelectRightData.length?false:true"
                icon="el-icon-arrow-left"
                circle
                style="margin-left: 0;margin-top: 10px;"
              />
            </div>

          </el-col>
          <el-col :span="11">
            <el-table
              :data="newsList"
              style="width: 100%"
              @selection-change="checkRightAll"
            >
              <el-table-column
                type="selection"
              />
              <el-table-column
                prop="name"
                label="服务名称"
              />
              <el-table-column
                prop="desc"
                label="服务描述"
              />
              <el-table-column
                label="排序"
              >
                <template slot-scope="scope">
                  <el-button size="mini" type="text" :disabled="scope.$index===0" @click.stop="sortUp(scope.$index, scope.row)">上移↑ </el-button>
                  <el-button size="mini" type="text" :disabled="scope.$index===(newsList.length - 1)" @click.stop="sortDown(scope.$index, scope.row)">下移↓</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

      </el-form>

      <div style="width:150px;margin:30px auto">
        <el-button type="primary" size="mini" @click="$router.push('adaptationProcess')">确 定</el-button>
        <el-button size="mini" @click="$router.push('adaptationProcess')">取 消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'
import {getInfo ,selectAll} from '@/api/commonComponents/adaptationProcess'

export default {

  props:{
    formData:{
      type:Object,
      default: () => {
        return {}
      }
    }
  },

  mounted() {
    // this.getList()
    this.data()
  },

  getList() {
    selectAll().then(res => {
      if (res.code === 200) {
        this.tableModel.tableData = res.data.data
        this.tableModel.pagination.total = res.data.totalCount
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    })
  },

  data(){
    return {
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [], // 右边选中列表数据
      newsList:[
      ],
      fileData:{
        name:'',
        type:'',
        desc:'',
        content:[
          {
            name:'addMsgHeadService',
            desc:'添加报文头',
          },
           {
            name:'AuthorityControlService',
            desc:'权限服务',
          },
        ],
    },
    }

  },
  methods: {
    checkAll(val) {
      this.nowSelectData = val
    },
    checkRightAll(val) {
      this.nowSelectRightData = val
    },
    // 选中
    handelSelect() {
      // this.fileData.content
      this.newsList = this.handleConcatArr(this.newsList, this.nowSelectData)
      this.handleRemoveTabList(this.nowSelectData, this.fileData.content)
      this.nowSelectData = []
    },
    // 取消
    handleRemoveSelect() {
      this.fileData.content = this.handleConcatArr(this.fileData.content, this.nowSelectRightData)
      this.handleRemoveTabList(this.nowSelectRightData, this.newsList)
      this.nowSelectRightData = []
    },
    handleConcatArr(selectArr, nowSelectData) {
      let arr = []
      arr = arr.concat(selectArr, nowSelectData)
      return arr
    },
    // handleRemoveTabList(isNeedArr, originalArr) {
    //   if (isNeedArr.length && originalArr.length) {
    //     for (let i = 0; i < isNeedArr.length; i++) {
    //       for (let k = 0; k < originalArr.length; k++) {
    //         if (isNeedArr[i]['name'] === originalArr[k]['name']) {
    //           originalArr.splice(k, 1)
    //         }
    //       }
    //     }
    //   }
    // },

    sortUp(index, row) {
      if (index === 0) {
        this.$message({
          message: '已经是列表中第一条数据！',
          type: 'warning'
        })
      } else {
        const temp = this.newsList[index - 1]
        this.$set(this.newsList, index - 1, this.newsList[index])
        this.$set(this.newsList, index, temp)
      }
    },
    // 下移按钮
    sortDown(index, row) {
      if (index === (this.newsList.length - 1)) {
        this.$message({
          message: '已经是列表中最后一条数据！',
          type: 'warning'
        })
      } else {
        const i = this.newsList[index + 1]
        this.$set(this.newsList, index + 1, this.newsList[index])
        this.$set(this.newsList, index, i)
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    tableDel(i) {
      this.fileData.content.splice(i, 1)
    },
    addTable() {
      this.fileData.content.push({
        workload: '',
        versions: ''
      })
    }

  }
}

</script>

<style lang="scss" scoped>
/deep/ .el-radio{
  margin-bottom: 30px;
}

</style>
