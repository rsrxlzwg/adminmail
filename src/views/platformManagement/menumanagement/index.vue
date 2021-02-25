<template>
  <!-- 集群  -->
  <div class="culster-container">
    <!-- <el-card> -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>菜单</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="addModal"
              >新增</el-button
            >
          </div>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            size="small"
            style="margin-bottom: 20px"
          >
          </el-input>
          <el-tree
            ref="tree"
            draggable
            node-key="menuId"
            highlight-current
            :current-node-key="currentMenu.menuId"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            :data="treeData"
            :props="defaultProps"
            :default-expand-all="true"
            @node-click="handleNodeClick"
            :render-content="renderContent"
            @node-drop="handleDrop"
          />
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card>
          <div slot="header" class="clearfix">
            <span>按钮</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <comp-table
            ref="btnTable"
            :tableModel="tableModel"
            :searchModel="searchModel"
            @addBtnFun="addBtnFun"
            @editBtnFun="editBtnFun"
            @delInfo="delBtn"
          ></comp-table>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card>
          <div slot="header" class="clearfix">
            <span>规则</span>
          </div>
          <comp-table
            ref="ruleTable"
            :tableModel="tableRuleModel"
            :searchModel="searchRuleModel"
            @addRuleFun="addRuleFun"
            @editRuleFun="editRuleFun"
             @delInfo="delRule"
          ></comp-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- </el-card> -->
    <el-dialog
      class="deepdialog"
      title="菜单"
      :visible.sync="addMenuVisible"
      width="40%"
    >
      <el-form
        :model="menuForm"
        label-position="left"
        ref="ruleForm"
        label-width="120px"
      >
        <el-form-item prop="teamName" label="上级菜单">
          <treeselect
            v-model="menuForm.parentId"
            :multiple="false"
            :options="options"
            :normalizer="normalizer"
          />
        </el-form-item>
        <el-form-item prop="teamName" label="菜单名称">
          <el-input
            v-model="menuForm.text"
            size="mini"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item prop="teamName" label="链接">
          <el-input
            v-model="menuForm.path"
            size="mini"
            placeholder="请输入"
          />
        </el-form-item>
        <!-- <el-form-item 
          prop="teamName"
          label='菜单类型' >
          <el-select  v-model="groupForm.type" size="mini" >
              <el-option label="菜单" :value="1"  />
              <el-option label="按钮" :value="2"  />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item prop="teamName" label="是否显示">
          <el-radio-group v-model="menuForm.isShow">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="2">隐藏</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item prop="teamName" label="描述">
          <el-input
            v-model="menuForm.description"
            size="mini"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMenuFun" type="primary" size="mini"
          >确定</el-button
        >
        <el-button @click="addMenuVisible=false" type="" size="mini">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="deepdialog"
      title="按钮规则"
      :visible.sync="btnRuleVisible"
      width="40%"
    >
      <components
        :groupRuleForm="groupRuleForm"
        :groupForm="groupForm"
        ref="commonDialog"
        :is="componentType"
      ></components>
      <div slot="footer" class="dialog-footer">
        <el-button @click="btnRuleAdd()" type="primary" size="mini"
          >确定</el-button
        >
        <el-button @click="btnRuleAddCancel()" type="" size="mini"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import compTable from "../../components/table";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import addTabs from "../components/addTabs";
import addBtn from "../components/addBtn";
import addRule from "../components/addRule";
import {
  getOperateList,
  submitOperateInfo,
  editOperateInfo,
  deleteOperateInfo,
  getMenuTree,
  submitMenuInfo,
  editMenuInfo,
  editMenuInfoPosition,
  deleteMenuInfo,
  getDataRuleList,
  submitDataRuleInfo,
  editDataRuleInfo,
  deleteDataRuleInfo,
  updateSort
} from "@/api/sysManagement/menu";

export default {
  name: "Culster",
  components: {
    compTable,
    Treeselect,
    addTabs,
    addBtn,
    addRule,
  },
  data() {
    return {
      addMenuVisible:false,
      menuForm:{
        menuId:'',
        parentId:'',
        text:'',
        path:'',
        description:'',
      },
      groupRuleForm: {},
      groupForm: {
        teamName: "",
        num: "",
        item: "",
        type: 1,
        level: 1,
      },
      saveoredit: "save",
      componentType: "addBtn",
      btnVisible: false,
      btnRuleVisible: false,
      filterText: "",
      restaurants: [],
      state1: "",
      title: "新增",
      treeData: [],
      dialogFormVisible: false,
      searchTableData: [
        {
          userName: "admin",
          email: "yo@163.com",
          ldap: "s",
          manage: "admin",
        },
      ],
      // define options
      options: [
        {
          id: "10001",
          label: "通用组件",
          children: [
            {
              id: "10002",
              label: "协议类型",
            },
            {
              id: "10003",
              label: "报文解析器",
            },
          ],
        },
      ],
       normalizer(node) {
        return {
          id: node.menuId,
          label: node.text,
          children: node.children,
        }
      },
      groupForm: {
        code: "",
        name: "",
        item: "",
        type: 1,
        level: 1,
      },

      tableModel: {
        tableData: [],
        rowData: [
          {
            prop: "code",
            label: "编号",
          },
          {
            prop: "name",
            label: "名称  ",
          },
          {
            prop: "path",
            label: "路径",
          },
        ],
        operateData: [],
        pagination: {
          // currentPage:1,
          // pagesize:10,
          // total:3
        },
        defaultExpand: false,
      },
      formModel: {
        formData: {
          teamName: "",
        },
        formLabelWidth: "80px",
        formFilds: [
          {
            label: "菜单名称",
            prop: "teamName",
            type: "input",
            disabled: false,
          },
          {
            label: "菜单编码",
            prop: "num",
            type: "input",
            disabled: false,
          },
        ],
        btnData: [
          {
            type: "submit",
            style: "primary",
            label: "确定",
            handle: () => {},
          },
          {
            type: "cancle",
            label: "取消",
            style: "",
            handle: () => {},
          },
        ],
        rules: {
          tenantName: [
            { required: true, message: "请输入名称", trigger: "blur" },
          ],
        },
      },
      searchModel: {
        show: false,
        btnGroup: [
          {
            type: "addBtnFun",
            style: "primary",
            label: "新增按钮",
            funName: "addBtnFun",
          },
          {
            type: "editBtnFun",
            style: "primary",
            label: "编辑",
            funName: "editBtnFun",
          },
          {
            type: "delete",
            label: "删除",
          },
        ],
        formModel: {},
        searchFild: [],
      },

      tableRuleModel: {
        tableData: [],
        rowData: [
          {
            prop: "name",
            label: "规则名称",
          },
          {
            prop: "code",
            label: "编码",
          },
          {
            prop: "rule",
            label: "规则",
          },
        ],
        operateData: [],
        pagination: {
          // currentPage:1,
          // pagesize:10,
          // total:3
        },
        defaultExpand: false,
      },
      formRuleModel: {
        formData: {
          teamName: "",
        },
        formLabelWidth: "80px",
        formFilds: [
          {
            label: "菜单名称",
            prop: "teamName",
            type: "input",
            disabled: false,
          },
          {
            label: "菜单编码",
            prop: "num",
            type: "input",
            disabled: false,
          },
        ],
        btnData: [
          {
            type: "submit",
            style: "primary",
            label: "确定",
            handle: () => {},
          },
          {
            type: "cancle",
            label: "取消",
            style: "",
            handle: () => {},
          },
        ],
        rules: {
          tenantName: [
            { required: true, message: "请输入名称", trigger: "blur" },
          ],
        },
      },
      searchRuleModel: {
        show: false,
        btnGroup: [
          {
            type: "addRuleFun",
            style: "primary",
            label: "新增规则",
            url: "",
            funName: "addRuleFun",
          },
          {
            type: "editRuleFun",
            style: "primary",
            label: "编辑",
            url: "",
            funName: "editRuleFun",
          },
          {
            type: "delete",
            label: "删除",
          },
        ],
        formModel: {},
        searchFild: [],
      },
      treedata: [
        {
          id: 1,
          label: "系统管理",
          btnTableData: [],
          ruleTableData: [],
          children: [
            {
              id: 11,
              label: "系统配置",
              btnTableData: [],
              ruleTableData: [
                {
                  id: 1,
                  code: "10001",
                  menuName: "新增规则",
                  menuLink: "",
                  desc: "",
                },
              ],
              children: [
                {
                  id: 12,
                  label: "菜单管理",
                  btnTableData: [
                    {
                      id: 1,
                      code: "10001",
                      menuName: "新增",
                      menuLink: "",
                      desc: "",
                    },
                  ],
                  ruleTableData: [],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "服务治理",
          btnTableData: [],
          ruleTableData: [],
          children: [
            {
              id: 21,
              label: "线下治理",
              btnTableData: [],
              ruleTableData: [],
              children: [
                {
                  id: 211,
                  label: "协议管理",
                  btnTableData: [],
                  ruleTableData: [],
                },
              ],
            },
            {
              id: 22,
              label: "线上治理",
              btnTableData: [],
              ruleTableData: [],
              children: [
                {
                  id: 23,
                  label: "链路追踪",
                  btnTableData: [],
                  ruleTableData: [],
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "text",
      },
      checkMenu: "",
      currentMenu: "",
      addMenuType:'',
      addBtnType:''
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    // this.getList()
    this.getList("");
    this.getTree();
    this.getDataRules("");
  },
  methods: {
    handleDrop(draggingNode, dropNode, dropType, ev){
      console.log('tree drop: ',draggingNode.data.text ,dropNode.data.text, dropType);
      const params= {
        "position":dropType,
        "targetId":dropNode.data.menuId,
        "id":draggingNode.data.menuId
      }
      updateSort(params).then(res=>{
        if(res.code===200){
           this.$message({
            type: 'success',
            message: '成功'
          });
          this.getTree();
        }
      })
    },
    // 删除按钮
    delBtn(params){
      deleteOperateInfo({idList:params}).then(res=>{
        if(res.code===200){
            this.$message({
            type: 'success',
            message: '删除成功'
          });
        }
      })
    },
    // 删除规则
    delRule(params){
      deleteDataRuleInfo({idList:params}).then(res=>{
        if(res.code===200){
            this.$message({
            type: 'success',
            message: '删除成功'
          });
        }
      })
    },
     /**
       * 新增编辑菜单提交接口
       */
    addMenuFun(){
      if(this.addMenuType==='add'){
        this.submitMenus(this.menuForm)
      }
      if(this.addMenuType==='edit'){
        this.editMenus(this.menuForm)
      }
    },
    submitMenus(params){
       submitMenuInfo(params).then(res=>{
         if(res.code===200){
           this.$message({
             type:'success',
             message:'新增成功'
           })
           this.addMenuVisible=false
          this.getTree()
         }
       })
    },
    editMenus(params){
       editMenuInfo(params).then(res=>{
         if(res.code===200){
           this.$message({
             type:'success',
             message:'编辑成功'
           })
            this.addMenuVisible=false
             this.getTree()
         }
       })
    },
    /**弹窗确定按钮 */
    btnRuleAdd() {
      if(this.componentType==='addBtn'){
        if ( this.addBtnType==='add' ) {
          //新增保存
          // let form = this.$refs["commonDialog"].getSaveForm();
          console.log('11')
          submitOperateInfo(this.groupForm).then((res) => {
            this.btnRuleVisible = false;
        
          });
        } 
        if ( this.addBtnType==='edit') {
          // 修改保存
          // let form = this.$refs["commonDialog"].getSaveForm();
              console.log('12')
          editOperateInfo(this.groupForm).then((res) => {
            this.btnRuleVisible = false;
          });
        }
        this.getList(this.currentMenu.menuId)
      }
      if(this.componentType==='addRule'){
        if ( this.addBtnType==='add' ) {
              console.log('21')
            //新增保存
            // let form = this.$refs["commonDialog"].getSaveForm();
            submitDataRuleInfo(this.groupRuleForm).then((res) => {
              this.btnRuleVisible = false;
          
            });
          } 
        if ( this.addBtnType==='edit') {
          // 修改保存
          // let form = this.$refs["commonDialog"].getSaveForm();
              console.log('22')
          editDataRuleInfo(this.groupRuleForm).then((res) => {
            this.btnRuleVisible = false;
          });
        }
        this.getDataRules(this.currentMenu.menuId);
      }
     
      
    },

    btnRuleAddCancel() {
      this.btnRuleVisible = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    /**
     * 点击菜单查询 数据规则和按钮
     */
    handleNodeClick(node, data) {
      this.getList(node.menuId);
      this.getDataRules(node.menuId);
      this.currentMenu = node;
    },
    renderContent(h, { node, data, store }) {
      return (
        <el-row style="flex:1;display:flex;align-items:center">
          <el-col span={18}>{node.label}</el-col>
          <el-col span={4}>
            <span>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                on-click={($event) => this.editMenu(data,$event)}
              ></el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                on-click={($event) => this.delMenu(data,$event)}
              ></el-button>
            </span>
          </el-col>
        </el-row>
      );
    },
    //新增按钮
    addBtnFun() {
      this.groupForm = {
        menuId: this.currentMenu.menuId,
        teamName: "",
        num: "",
        item: "",
        type: 1,
        level: 1,
      };
      console.log("ddd", this.currentMenu);
      if (this.currentMenu.menuId &&this.currentMenu.isLeaf==='Y') {
        this.btnRuleVisible = true;
        this.componentType = "addBtn";
        this.addBtnType='add'
      } else {
        this.$message({
          message: "请选中一条叶子菜单",
          type: "warning",
        });
      }
    },
    //编辑按钮
    editBtnFun() {
      this.addBtnType='edit'
      //获取选中数据
      const selectData = this.$refs.btnTable.$refs.commonTable.selection;
      if (selectData.length == 1) {
        selectData.forEach((row) => {
          this.groupForm = row;
          this.checkMenu = true;
          this.btnRuleVisible = true;
          this.componentType = "addBtn";
        });
      } else {
        this.$message({
          message: "请选中一条菜单",
          type: "warning",
        });
      }
    },

    /**
     * 新增数据规则
     */
    addRuleFun() {
       this.groupRuleForm = {
        menuId: this.currentMenu.menuId,
        name: "",
        rule: "",
        path: "",
        desc: "",
        teamName: "",
        sql:""
      };
      console.log("ddd", this.currentMenu);
      if (this.currentMenu.menuId &&this.currentMenu.isLeaf==='Y') {
        this.btnRuleVisible = true;
        this.componentType = "addRule";
        this.addBtnType='add'
      } else {
        this.$message({
          message: "请选中一条叶子菜单",
          type: "warning",
        });
      }
    },
    /**编辑数据规则 */
    editRuleFun() {
       this.addBtnType='edit'
      // 获取选中数据
      const selectData = this.$refs.ruleTable.$refs.commonTable.selection;
      if (selectData.length == 1) {
        selectData.forEach((row) => {
          this.groupRuleForm = row;
          this.btnRuleVisible = true;
          this.componentType = "addRule";
        });
      } else {
        this.$message({
          message: "请选中一条菜单",
          type: "warning",
        });
      }
    },

    // /**数据规则添加 */
    // btnRuleAdd() {
    //   if (this.saveoredit == "save") {
    //     /**
    //      * 新增保存
    //      */
    //     let form = this.$refs["commonDialog"].getSaveForm();
    //     submitDataRuleInfo(form).then((res) => {
    //       this.btnRuleVisible = false;
    //     });
    //   } else if (this.saveoredit == "edit") {
    //     /**
    //      * 修改保存
    //      */
    //     let form = this.$refs["commonDialog"].getSaveForm();

    //     editDataRuleInfo(form).then((res) => {
    //       this.btnRuleVisible = false;
    //     });
    //   }
    // },
    // 新增菜单弹窗
    addModal() {
      this.addMenuVisible = true;
      this.addMenuType='add'
      Object.keys(this.menuForm).map((key) => (this.menuForm[key] = ""));
      this.menuForm.parentId=this.currentMenu.menuId
    },
    // 删除按钮
    delMenu(row,event){
      console.log({row})
      event.stopPropagation();
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMenuInfo(row.menuId).then(res=>{
            if(res.code===200){
              this.$message({
                type:'success',
                message:'成功'
              })
              this.getTree()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 编辑按钮
    editMenu(row,event) {
        this.addMenuType='edit'
       event.stopPropagation();
      console.log({row})
      this.addMenuVisible = true;
      Object.keys(this.menuForm).map((key) => (this.menuForm[key] = row[key]));
    },
    getList(params) {
      getOperateList({ id: params }).then((response) => {
        this.tableModel.tableData = response.data;
      });
    },
  
    // submitBtn(params){
    //    submitInfo(params).then((res) => {
    //     if (res.status === 200) {
    //       this.$refs.compTable.hideDialog();
    //       this.getList();
    //     }
    //   });
    // },
    //  editBtn(params){
    //    submitInfo(params).then((res) => {
    //     if (res.status === 200) {
    //       this.$refs.compTable.hideDialog();
    //       this.getList();
    //     }
    //   });
    // },
    // editInfo(params) {
    //   editInfo(params).then((res) => {
    //     if (res.status === 200) {
    //       this.$refs.compTable.hideDialog();
    //       this.getList();
    //     }
    //   });
    // },

    /**获取左侧的菜单树 */
    getTree() {
      getMenuTree().then((res) => {
        if (res.code === 200) {
          this.treeData = res.data;
          this.options = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },

    getDataRules(params) {
      getDataRuleList({ id: params }).then((response) => {
        this.tableRuleModel.tableData = response.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.culster-container {
  // &-container {
  // }
  .mr0 {
    margin-right: 0 !important;
  }
  // form.el-form {
  //   float: right;
  // }
  .block {
    float: right;
    margin: 12px;
  }
}
</style>
