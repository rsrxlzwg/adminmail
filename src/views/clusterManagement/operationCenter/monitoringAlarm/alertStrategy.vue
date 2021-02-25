<template>
  <div>
    <el-card  > 
      <div slot="header" class=" flex-inline-between">
        <div>
           <h2>告警策略</h2>
          <span class="desc">告警策略用来控制告警的种类和触发条件</span>
        </div>
         <el-button
          type="primary"
          @click="addData()">创建策略</el-button>
      </div>
       <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="IsEnabled"
            label="启动"
            width="120">
             <template slot-scope="scope">
                <el-checkbox :v-model="scope.row.IsEnabled" @change="handleSelectionChange"></el-checkbox>
             </template>
          </el-table-column>
          <el-table-column
            prop="Name"
            label="名称"
            width="120">
          </el-table-column>
           <!-- <el-table-column
            label="目标类型"
            width="120">
            <template slot-scope="scope">{{ scope.row.type }}</template>
          </el-table-column> -->
          <el-table-column
            prop="Description"
            label="描述"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="TargetType" label="目标类型" width="120" />
          <el-table-column prop="RuleName" label="规则名称" width="120" />
          <el-table-column prop="NotifyTime" label="通知时间" width="120" />
          <el-table-column prop="NotifyEmail" label="通知邮箱" width="120" />
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="delData(scope.$index)" type="text" size="small">删除</el-button>
              <el-button @click="editData(scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
        </el-table>

   
    </el-card>
     <!-- 新增和编辑规则 -->
            <el-dialog class="deepdialog" title="告警策略" :visible.sync="visible" width="60%">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <el-steps :active="ruleActive" simple>
                    <el-step title="基本信息" icon="el-icon-info" />
                    <el-step title="监控规则" icon="el-icon-finished" />
                    <el-step title="通知规则" icon="el-icon-monitor" />
                  </el-steps>
                </div>
                <!-- 基本信息 -->
                <el-form v-if="ruleActive === 1" :model="form">
                  <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.Name" autocomplete="off" size="small" />
                  </el-form-item>
                   <el-form-item label="别名" :label-width="formLabelWidth">
                    <el-input v-model="form.otherName" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="form.Description" autocomplete="off" />
                  </el-form-item>
                  <!-- <el-form-item label="筛选镜像" :label-width="formLabelWidth">
                    <el-table
                      size="mini"
                      :data="ruleTableData"
                      style="width: 99%"
                      border>
                      <el-table-column
                        prop="id"
                        label="镜像空间"
                      >
                        <template scope="scope">
                          <el-select v-model="scope.row.id" placeholder="请选择">
                            <el-option
                              v-for="item in roomOptions"
                              :key="item"
                              :label="item"
                              :value="item"
                            />
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="镜像名称"
                      >
                        <template scope="scope">
                          <el-input v-model="scope.row.name" />
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="num"
                        label="版本号"
                      >
                        <template scope="scope">
                          <el-input v-model="scope.row.num" />
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-button type="text" icon="el-icon-circle-plus" @click="ruleAdd">添加</el-button>
                  </el-form-item> -->
                </el-form>
                <!-- 目标 -->
                <div v-if="ruleActive === 2">
                  <!-- 列表上部分 -->
                  <div class="flex-inline-between">
                    <el-form  :model="form">
                     <el-form-item label="规则名称" :label-width="formLabelWidth">
                        <el-input v-model="form.RuleName" autocomplete="off" />
                      </el-form-item>
                       <el-form-item label="规则" :label-width="formLabelWidth">
                         <el-row :gutter="10">
                           <el-col :span="4">
                              <el-select v-model="form.cpu" placeholder="请选择" size="small">
                                <el-option label="cpu利用率" value="cpu"/>
                                 <el-option label="内存利用率" value="store"/>
                                  <el-option label="磁盘使用率" value="disk"/>
                              </el-select>
                           </el-col>
                           <el-col :span="4">
                               <el-select v-model="form.cycle" placeholder="请选择" size="small">
                                <el-option label="1分钟/周期" value="1"/>
                                 <el-option label="3分钟/周期" value="3"/>
                                  <el-option label="5分钟/周期" value="5"/>
                              </el-select>
                           </el-col>
                           <el-col :span="5" style="margin-top:2px">
                              <!-- <el-select v-model="form.continuous" placeholder="请选择" size="small">
                                <el-option label="连续1次"  value="1"/>
                                <el-option label="连续3次"  value="3"/>
                                <el-option label="连续5次"  value="5"/>
                              </el-select> -->
                              <el-input v-model="form.continuous" autocomplete="off" size="small">
                                 <template slot="append">次</template> 
                              </el-input>
                           </el-col>
                           <el-col :span="2">
                              <el-select v-model="form.compare" placeholder="请选择" size="small">
                                <el-option label=">" value=">"/>
                                <el-option label="<" value="<"/>
                                <el-option label="=" value="="/>
                              </el-select>
                           </el-col>
                           <el-col :span="3" style="margin-top:2px">
                             <el-input v-model="form.num" autocomplete="off" size="small">
                                <template slot="append">%</template> 
                              </el-input>
                           </el-col>
                           <el-col :span="4">
                                <el-select v-model="form.level" placeholder="请选择" size="small">
                                  <el-option  label="危险告警" value="warn"/>
                                  <el-option  label="严重告警" value="bad"/>
                                  <el-option  label="一般告警" value="normal"/>

                                </el-select>
                           </el-col>
                         </el-row>
                      </el-form-item>
                    </el-form>
                  </div>
                
                
                </div>
                <!-- 触发模式 -->
                <el-form
                  v-if="ruleActive === 3"
                  ref="form"
                  label-width="140px"
                  label-position="left"
                >
                  <el-form-item label="触发模式">
                     <el-select v-model="form.model" placeholder="请选择" size="small">
                                  <el-option  label="任意时间" value="any"/>
                                  <el-option  label="自定义时间" value="rule"/>
                      </el-select>
                    
                  </el-form-item>
                  <el-form-item label="触发模式" v-show="form.model=='rule' ">
                    <el-time-picker
                      is-range
                      v-model="form.NotifyTime"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围">
                    </el-time-picker>
                  </el-form-item>
                  <el-divider />
                  <el-form-item label="邮箱">
                      <el-input v-model="form.NotifyEmail" autocomplete="off" size="small" />
                    <!-- <el-checkbox v-model="form.email">邮箱</el-checkbox> -->
                  </el-form-item>
                </el-form>
              </el-card>
              <!-- 底部操作按钮 -->
              <div slot="footer" class="dialog-footer">
                <el-row :gutter="20">
                  <el-col :span="4">
                    <el-button
                      type="info"
                      plain
                      @click="ruleActive = 1;ruleFormVisible = false; "
                    >取消</el-button>
                  </el-col>
                  <el-col
                    :span="8"
                    :offset="12"
                  >
                    <el-button
                      type="info"
                      plain
                      :disabled="backDisabled"
                      @click="backStep"
                    >返回</el-button>
                    <el-button
                      type="primary"
                      @click="nextStep"
                    >{{ ruleActive === 3 ? "完成" : "继续" }}</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        formLabelWidth:'80px',
        backDisabled:false,
        form:{
          Name:'',
          otherName:'',
          Description:'',
          RuleName:'',
          cpu:'cpu利用率',
          cycle:'1分钟/周期',
          continuous:'连续1次',
          compare:'>',
          num:'10',
          level:'危险告警',
          model:'rule',
          NotifyTime:[new Date(2020, 10, 10, 8, 40), new Date(2020, 10, 15, 9, 40)],
          NotifyEmail:''
        },
        ruleActive:1,
        visible:false,
        tableData: [
          {
            IsEnabled:true,
            Name:'CPU 超出配额',
            Description:'当集群使用的CPU核数超出限额时，会发出警告级别告警',
            TargetType:'集群',
            RuleName:'集群CPU规则',
            NotifyTime:'08:00:00-24:00:00',
            NotifyEmail:'test@163.com',
            cpu:'cpu利用率',
            cycle:'1分钟/周期',
            continuous:'连续1次',
            compare:'>',
            num:'10',
            level:'危险告警',
            model:'rule',
          },
          {
            IsEnabled:true,
            Name:'主机时间不同步',
            Description:'当集群中存在时间不同步的主机时，会发出错误级别告警',
            TargetType:'主机',
            RuleName:'主机基本信息',
            NotifyTime:'08:00:00-24:00:00',
            NotifyEmail:'test@163.com',
            cpu:'cpu利用率',
            cycle:'1分钟/周期',
            continuous:'连续1次',
            compare:'>',
            num:'10',
            level:'危险告警',
            model:'rule',
          },
          {
            IsEnabled:true,
            Name:'主机内存使用率过高',
            Description:'当主机内存使用率超过 70% 时，会发出警告级别告警；当超过 90% 时，会发出错屋级别告警',
            TargetType:'主机',
            RuleName:'主机基本信息',
            NotifyTime:'08:00:00-24:00:00',
            NotifyEmail:'test@163.com',
            cpu:'cpu利用率',
            cycle:'1分钟/周期',
            continuous:'连续1次',
            compare:'>',
            num:'10',
            level:'危险告警',
            model:'rule',
          }
      ]
      }
    },
    methods:{
       backStep() {
        if (this.ruleActive === 2) {
          this.ruleActive = 1
        } else if (this.ruleActive === 3) {
          this.ruleActive = 2
        }
        if (this.ruleActive === 1) {
          this.backDisabled = true
        } else {
          this.backDisabled = false
        }
      },
      nextStep() {
        if (this.ruleActive === 3) {
          this.ruleActive = 1
          console.log(this.ruleActive)
          this.visible = false
        } else if (this.ruleActive === 1) {
          this.ruleActive = 2
        } else if (this.ruleActive === 2) {
          this.ruleActive = 3
        }
        this.backDisabled = false
      },
      addData(){
        this.visible=true
        this.form={
          name:'',
          otherName:'',
          desc:'',
          ruleName:'',
          rule:'',
          cpu:'cpu利用率',
          cycle:'1分钟/周期',
          continuous:'连续1次',
          compare:'>',
          num:'10',
          level:'危险告警',
          time:[new Date(2020, 10, 10, 8, 40), new Date(2020, 10, 15, 9, 40)],
          email:''
        }
      },
      delData(i){
        this.$confirm('您确定删除该条数据吗 ？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
           this.tableData.splice(i,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      editData(row){
        row.NotifyTime=[new Date(2020, 10, 10, 8, 40), new Date(2020, 10, 15, 9, 40)]
        this.visible=true
        this.form=row
      },
      handleSelectionChange(e){
        console.log(e)
        if(e){
          this.$message({
            type: 'success',
            message: '启动成功!'
          })
        }
         
      }
      
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../../styles/common.scss";
.desc{
  font-size: 14px;
color: #9ba3af;
}
/deep/ .el-input-group__prepend{
  padding: 0 10px;
}
.detail-list{
  li{
    margin-bottom: 20px;
    padding: 40px 0;
    &:nth-child(1){
      border-bottom:1px solid #ddd ;
    }
    span{
      display: inline-block;
      &:nth-child(1){
        width: 20%;
      }
      &:nth-child(2){
        width: 40%;
      }
      &:nth-child(3){
        width: 40%;
      }
    }
  }
}
</style>