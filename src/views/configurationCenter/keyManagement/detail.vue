<template>
  <div>
     <el-card>
      <div class="flex-inline-between">
        <div class="flex">
          <svg-icon class-name="hostImg" icon-class="hostImg" />            
          <div class="flex-1 m-l-15 flex-column-center">
            <span class="host-name m-r-10 m-b-5">my-conf</span>            
             <div class="desc">类型: op 创建于 6 小时前</div>
          </div>
        </div>
        <el-button size="mini" @click="backPage()">返回</el-button>
        
      </div>
      <!-- <el-divider></el-divider> -->
      <!-- <ul class="flex-wrap detail-info">
        <li>
          <span>类型：</span>
          <span>op</span>
        </li>
         <li>
          <span>创建于：</span>
          <span>6 小时前</span>
        </li>
      </ul> -->
      
    </el-card>
     <el-row :gutter="20" class="m-t-20">
      <el-col :span="4">
        <el-card>
          <ul class="menulists">
            <li v-for="item in menus" :class="item.id===active?'active':'' " @click="changeMenu(item.id)">{{item.label}}</li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="20" >
        <div v-if="active===1">
          <el-card>
            <el-row>
              <el-col :span="3">标签</el-col>
              <el-col :span="21">
                <!-- <component is="TagEdit" :tagData='tagData'></component> -->
                  <el-button size="mini" @click="tagVisible=true">编辑</el-button>
                  <el-table 
                    class="m-t-20"
                    :data="tagData"
                    style="width: 100%">
                    <el-table-column
                      prop="key"
                      label="键">
                      <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.key" size="small" disabled />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      label="值">
                      <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.value"  size="small" disabled />
                      </template>
                    </el-table-column>
                  </el-table>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="3">内容</el-col>
              <el-col :span="21">
                  <el-button size="mini" @click="addVisible=true">编辑</el-button>
                  <el-table 
                  class="m-t-20"
                    :data="content"
                    style="width: 100%">
                    <el-table-column
                      prop="key"
                      label="键">
                      <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.key" size="small" disabled />
                      </template>
                    </el-table-column>
                    <el-table-column>
                      <template slot="header" slot-scope="scope">
                         <span class="m-r-10">值</span>
                         <svg-icon icon-class="show" @click="show=!show" v-show="show"></svg-icon>
                         <svg-icon icon-class="hide" @click="show=!show" v-show="!show"></svg-icon>
                      </template>
                      <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.value"  size="small" disabled  v-show="!show"/>
                        <!-- <span v-show="show">******</span> -->
                        <el-input type="text" value="******"  size="small" disabled  v-show="show"/>

                      </template>
                    </el-table-column>
                  </el-table>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="3">注解</el-col>
              <el-col :span="21">
                 <el-button size="mini" @click="noteVisible=true">编辑</el-button>
                  <el-table 
                  class="m-t-20"
                    :data="noteData"
                    style="width: 100%">
                    <el-table-column
                      prop="key"
                      label="键">
                      <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.key" size="small" disabled />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      label="值">
                      <template slot-scope="scope">
                        <el-input type="text" v-model="scope.row.value"  size="small" disabled />
                      </template>
                    </el-table-column>
                  </el-table>
              </el-col>
            </el-row>
          </el-card>
       

        </div>
        <el-card v-if="active===2" class="p-tb-20">
          <component is="advanced" :entercode='entercode'></component>
           <div  class="dialog-footer m-t-20  right">
            <el-button  size="mini">取 消</el-button>
            <el-button type="primary"  size="mini">确 定</el-button>
          </div>
        </el-card>
      </el-col>
     </el-row>
    <el-dialog class="deepdialog" title="修改标签" :visible.sync="tagVisible">
      <component is="TagEdit" :tagData='tagData'></component>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tagVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="tagVisible = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="deepdialog" title="修改注解" :visible.sync="noteVisible">
      <component is="TagEdit" :tagData='noteData'></component>
       <div slot="footer" class="dialog-footer">
        <el-button @click="noteVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="noteVisible = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="deepdialog" title="修改内容" :visible.sync="addVisible" >
         <el-button type="primary" size="mini" @click="addTable" style="float:right">添加</el-button>
          <el-table
            :data="content"
            style="width: 100%">
            <el-table-column
              prop="key"
              label="键">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.key" size="small" />
              </template>
            </el-table-column>
            <el-table-column
              label="模式">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type"  size="small">
                  <el-option value="1" label="手动输入"></el-option>
                  <el-option value="2"  label="上传文件"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="值">
              <template slot-scope="scope"    >
                <el-input type="text" v-model="scope.row.value"  size="small"  v-if="scope.row.type==1 " />
                 <el-upload
                 v-if="scope.row.type==2 "
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="scope.row.fileList">
                  <el-button size="mini" type="primary">上传</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="tableDel(scope.$index)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
           <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addVisible = false" size="mini">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</template>

<script>
import TagEdit from '../../components/tagEdit'
import advanced from '../../components/advanced'

  export default {
    components:{
      TagEdit,
      advanced
    },
    data(){
      return{
         addVisible:false,
        noteVisible:false,
        tagVisible:false,
        active:1,
        show:false,
        menus:[
          {
             label:'概览',
             id:1
          },
          {
             label:'高级配置',
             id:2
          }
        ],
        tagData:[
          {
            key:'beta.kubernetes.io/arch',
            value:'amd64'
          }
        ],
        noteData:[
          {
            key:'beta.kubernetes.io/arch',
            value:'amd64'
          }
        ],
        content:[
          {
            key:'hh',
            value:'ss',
            type:1,
            fileList:[]
          }
        ],
         entercode:`
        kind: Secret
        apiVersion: v1
        metadata:
          name: my-conf
          namespace: default
          selfLink: /api/v1/namespaces/default/secrets/my-conf
          uid: e2a23edf-2a9b-467e-a7b3-77f72f985662
          resourceVersion: '7150648'
          creationTimestamp: '2020-10-21T01:32:19Z'
        data:
          c: Y2Q=
        type: op
      `
      }
    },
    methods:{
      backPage(){
        this.$router.replace('keyManagement')
      },
      tableDel(i){
      this.content.splice(i,1)
    },
    addTable(){
      this.content.push({
        key:'',
        value:'',
        type:1,
        fileList:[]
      })
    },
      changeMenu(id){
        this.active=id
      },
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../styles/common.scss";
.hostImg{
  width: 40px;
  height: 40px;
}
.desc{
   color: #9ba3af;
    font-size: 13px;
}
.detail-info{
  li{
    width: 25%;
    display: flex;
    margin-bottom: 20px;
    color: #9ba3af;
    font-size: 13px;
    span{
      &:nth-child(2){
        flex: 1;
      }
    }
  }
}
 .menulists{
  font-size: 14px;
  margin-bottom: 10px;
  padding: 0;
  list-style-type: none;
  border-radius: 4px;
  // box-shadow: 0 1px 4px 0 rgba(204,209,217,.3);
  font-weight: bold;
  li{
    line-height: 40px;
    position: relative;
    height: 40px;
    // padding: 0 10px;
    cursor: pointer;
    color: #9ba3af;
    // border: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
    // background-color: #f5f7fa;
    // text-shadow: 0 1px 0 hsla(0,0%,100%,.9);

  }
  .active{
    color: #000;
    background-color: #fff;   
  }
}
</style>