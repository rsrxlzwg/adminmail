<template>
  <div>
    <el-card  > 
      <div slot="header" class=" flex-inline-between">
        <div>
           <h2>容器组带宽限制</h2>
          <span class="desc">容器组带宽默认值，创建的容器组默认使用此带宽限制，修改后容器组带宽限制不可能大于默认值。</span>
        </div>
        <el-button type="primary" @click="editData">编辑</el-button>
      </div>
      <ul class="detail-list">
        <li>
          <span>入口速率限制</span>
          <span>
            <p>入口速率平均值限制</p>
            <p>{{form.ingressRate}} <span v-show="form.ingressRate=='限制'">{{ingressRate.average}}Mbps</span> </p>
            
          </span>
          <span>
            <p>入口速率最大值限制</p>
            <p>{{form.ingressRate}} <span v-show="form.ingressRate=='限制'">{{ingressRate.max}}Mbps</span></p>
          </span>
        </li>
        <li>
          <span>出口速率限制</span>
          <span>
            <p>出口速率平均值限制</p> 
            <p>{{form.exportRate}} <span v-show="form.exportRate=='限制'">{{exportRate.average}}Mbps</span></p> 
          </span>
          <span>
            <p>出口速率最大值限制</p>
            <p>{{form.exportRate}} <span v-show="form.exportRate=='限制'">{{exportRate.max}}Mbps</span></p>
          </span>
        </li>
      </ul>
    </el-card>
    <el-dialog class="deepdialog" title="容器组带宽限制编辑" :visible.sync="visible" width="40%" >
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="入口速率限制" >
          <el-radio-group v-model="form.ingressRate">
            <el-radio label="限制"></el-radio>
            <el-radio label="不限制"></el-radio>
          </el-radio-group>
          <el-form label-position="top" :inline="true" label-width="80px" :model="ingressRate" v-show="form.ingressRate=='限制' ">
            <el-form-item label="入口速率平均值限制">
              <el-input v-model="ingressRate.average" size="mini" type="number" >
                <template slot="append">Mbps</template>
              </el-input>
            </el-form-item>
             <el-form-item label="入口速率最大值限制">
              <el-input v-model="ingressRate.max"  size="mini" type="number">
                <template slot="append">Mbps</template>
              </el-input>
            </el-form-item>
          </el-form>
          <p v-show="form.ingressRate=='限制' ">设置入口速率限制值后，部署的业务容器组的入口带宽会受到上述值限制</p>
          <p v-show="form.ingressRate=='不限制' ">部署的业务容器组入口速率不受约束</p>
        </el-form-item>
        <el-form-item label="出口速率限制" >
          <el-radio-group v-model="form.exportRate">
            <el-radio label="限制"></el-radio>
            <el-radio label="不限制"></el-radio>
          </el-radio-group>
           <el-form label-position="top" :inline="true" label-width="80px" :model="exportRate" v-show="form.exportRate=='限制' ">
            <el-form-item label="入口速率平均值限制">
              <el-input v-model="exportRate.average" size="mini" type="number">
                <template slot="append">Mbps</template>
              </el-input>
            </el-form-item>
             <el-form-item label="入口速率最大值限制">
              <el-input v-model="exportRate.max"  size="mini" type="number">
                <template slot="append">Mbps</template>
              </el-input>
            </el-form-item>
          </el-form>
          <p v-show="form.exportRate=='限制' ">设置出口速率限制值后，部署的业务容器组的出口带宽会受到上述值限制</p>
          <p v-show="form.exportRate=='不限制' ">部署的业务容器组出口速率不受约束</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        visible:false,
        form:{
          ingressRate:'不限制',
          exportRate:'不限制'
        },
        ingressRate:{
          average:'',
          max:'',
        },
         exportRate:{
          average:'',
          max:'',
        }
      }
    },
    methods:{
      editData(){
        this.visible=true
      },
      submitData(){
         this.$confirm('开启后，会对新创建的业务容器组带宽进行限制，以防止单容器组吞吐量过大独占网络带宽。此配置仅对修改后创建的容器组生效，开启前已创建的容器组不受限制。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.visible=false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
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