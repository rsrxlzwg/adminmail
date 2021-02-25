<template>
  <!-- 主机  -->
  <div class="host-container">
     <el-row class="row-bg">
      <el-col :span="12">
        <el-button
          type="primary"
          @click="addHost()">接入主机</el-button>
      </el-col>
      <el-col :span="12">
         <!-- 查询部分 -->
          <el-form :inline="true" :model="formInline">
            <!-- <el-form-item label="集群">
              <el-select v-model="formInline.cluster" placeholder="集群">
                <el-option label="81-test" value="81-test" />
                <el-option label="xxx" value="xxx" />
              </el-select>
            </el-form-item> -->
            <el-form-item label>
              <el-input placeholder="请输入主机名称" v-model="formInline.user">
                <el-button slot="append" @click="onSubmit">搜索</el-button>
              </el-input>
            </el-form-item>
          </el-form>
      </el-col>
     </el-row>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 99%"
      stripe
      :cell-style="rowClass"
      :header-cell-style="headClass"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <!-- <el-table-column prop="date" label="状态" /> -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="名称" sortable>
      
         <template slot-scope="scope">
          <el-link type="primary"  @click="editRow(scope.row)">
            {{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="ip" label="私有IP" /> -->
      <el-table-column prop="character" label="角色" />
       <el-table-column label="内存容量">
        <template slot-scope="scope">
          <template v-if="scope.row.store !== 'NaN' ">
            <el-progress :percentage="3" :stroke-width="10" :format="format2" />
          </template>
          <span style="font-size:10px">{{ scope.row.store }}</span>
        </template>
      </el-table-column>
      <el-table-column label="逻辑CPU数">
        <template slot-scope="scope">
          <template v-if="scope.row.cpu !== 'NaN' ">
            <el-progress :percentage="3" :stroke-width="10" :format="format1" />
          </template>
          <span style="font-size:10px">{{ scope.row.cpu }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内存使用率">
        <template slot-scope="scope">
          <template v-if="scope.row.storeUsage !== 'NaN' ">
            <el-progress :percentage="3" :stroke-width="10" :format="format2" />
          </template>
          <span style="font-size:10px">{{ scope.row.storeUsage }}</span>
        </template>
      </el-table-column>
       <el-table-column label="cpu使用率">
        <template slot-scope="scope">
          <template v-if="scope.row.cpuUsage !== 'NaN' ">
            <el-progress :percentage="3" :stroke-width="10" :format="format2" />
          </template>
          <span style="font-size:10px">{{ scope.row.cpuUsage }}</span>
        </template>
      </el-table-column>
     
      <el-table-column prop="ip" label="主机IP" />
      <el-table-column prop="stain" label="污点" />

      <el-table-column label="操作">
        <template slot-scope="scope">
            <!-- <el-button
            @click.native.prevent="editRow(scope.$index, tableData)"
            type="text"
            size="small">详情</el-button> -->
             <el-button
            @click.native.prevent="editTag(scope.$index, tableData)"
            type="text"
            size="small">修改标签</el-button>
             <el-button
            @click.native.prevent="editComment(scope.$index, tableData)"
            type="text"
            size="small">修改注解</el-button>
             <el-button
            @click.native.prevent="editStain(scope.$index, tableData)"
            type="text"
            size="small">修改污点</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="3"
      ></el-pagination>
    </div>

    <el-dialog class="deepdialog" title="修改标签" :visible.sync="tagVisible">
      <el-button type="primary" size="mini" @click="addTag">添加</el-button>
       <el-table
      :data="tagData"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="键">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.key" size="small" />
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
         <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.key"  size="small" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="tagDel(scope.$index)" type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
       </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tagVisible = false">取 消</el-button>
        <el-button type="primary" @click="tagVisible = false">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog class="deepdialog" title="修改注解" :visible.sync="commentVisible">
      <el-button type="primary" size="mini" @click="addComment">添加</el-button>
       <el-table
      :data="commentData"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="键">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.key" size="small" />
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
         <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.key"  size="small" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="commentDel(scope.$index)" type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
       </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commentVisible = false">取 消</el-button>
        <el-button type="primary" @click="commentVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="deepdialog" title="修改污点" :visible.sync="stainVisible">
      <el-button type="primary" size="mini" @click="addStain">添加</el-button>
       <el-table
      :data="stainData"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="键">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.key" size="small" />
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
         <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.key"  size="small" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="stainDel(scope.$index)" type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
       </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stainVisible = false">取 消</el-button>
        <el-button type="primary" @click="stainVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "host",
  filters: {
    statusFilter(status) {
      const statusMap = {
        Active: "success",
        Cordoned: "warning",
        xxx1: "gray",
        xxx2: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      stainVisible:false,
      commentVisible:false,
      tagVisible:false,
      tagData:[
        {
          key:'beta.kubernetes.io/arch',
          value:'amd64'
        }
      ],
      commentData:[
        {
          key:'beta.kubernetes.io/arch',
          value:'amd64'
        }
      ],
      stainData:[
        {
          key:'beta.kubernetes.io/arch',
          value:'amd64'
        }
      ],
      formInline: {
        cluster: "81-test",
        region: ""
      },
      tableData: [
        {
          status: "Active",
          name: "master ",
          // ip: "172.16.5.50",
          character: "控制器、镜像仓库",
          label: "8个",
          cpu: "NaN",
          store: "NaN",
          cpuUsage:'5%',
          storeUsage:'10%',
          createTime:'2020-9-20',
          ip:'172.16.5.50',
          cpu:'9.7',
          memory:'21.06G',
          stain:'node-role.kubernetes.io/master:NoSchedule'
        },
        {
          status: "Active",
          name: "node1",
          // ip: "172.16.5.51",
          character: "容器引擎、基础设施",
          label: "7个",
          cpu: "2.03/56Cores",
          store: "54.58/125.04G",
          cpuUsage:'10%',
          storeUsage:'15%',
          createTime:'2020-9-20',
           ip:'172.16.5.51',
          cpu:'9.7',
          memory:'21.06G',
          stain:'node-role.kubernetes.io/master:NoSchedule'

        },
        {
          status: "Active",
          name: "node2",
          // ip: "172.16.5.81",
          character: "容器引擎",
          label: "3个",
          cpu: "NaN",
          store: "NaN",
          cpuUsage:'20%',
          storeUsage:'25%',
          createTime:'2020-9-20',
           ip:'172.16.5.52',
          cpu:'9.7',
          memory:'21.06G',
          stain:'空'

        }
      ]
    };
  },
  methods: {
    stainDel(i){
      this.stainData.splice(i,1)
    },
    stainComment(){
      this.stainData.push({
        key:'',
        value:''
      })
    },
    addStain(){
      this.stainData.push({
        key:'',
        value:''
      })
    },
    editStain(){
      this.stainVisible=true
    },
    commentDel(i){
      this.commentData.splice(i,1)
    },
    addComment(){
      this.commentData.push({
        key:'',
        value:''
      })
    },
    editComment(){
      this.commentVisible=true
    },
    tagDel(i){
      this.tagData.splice(i,1)
    },
    addTag(){
      this.tagData.push({
        key:'',
        value:''
      })
    },
    editTag(){
      this.tagVisible=true
    },
    addHost(){
      this.$router.push('/addHost')
    },
    headClass() {
      return "text-align: center;background:#eef1f6;";
    },
    rowClass() {
      return "text-align: center;";
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    format1(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return "";
    },
    format2(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;
      return ``;
    },
    // 编辑表格跳转
    editRow() {
      this.$router.push("hostDetail");
    }
  }
};
</script>

<style lang="scss" scoped>

.host-container {
  // &-container {
  // }
  .mr0 {
    margin-right: 0 !important;
  }
  form.el-form {
    float: right;
  }
  .block {
    float: right;
    margin: 12px;
  }
}
</style>