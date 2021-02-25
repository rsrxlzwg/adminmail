<template>
  <div>
    <el-row :gutter="13">
      <el-col :span="7">
        <el-row>
          <el-card>
            <el-input
              size="small "
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              >1
            </el-input>
          </el-card>
        </el-row>
        <el-row>
          <el-card style="margintop: 8px">
            <div @mouseleave="enterleave">
              <el-tree
                ref="tree"
                :filter-node-method="filterNode"
                :expand-on-click-node="false"
                :render-content="renderContent"
                :data="dirData"
                :props="defaultProps"
                :default-expand-all="true"
                @node-click="handleNodeClick"
              />
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="17">
        <headersearch
          :searchModel="searchModel"
          @onSearch="onSearch"
        ></headersearch>
        <el-card>
          <rendertable
            ref="multipleTable"
            :table-data="renderdata"
            :table-header="renderheader"
            :actionlinedata="actionlinedata"
            :pagination="pagination"
            @currentChange="currentChange"
            @sizeChange="sizeChange"
            :showselect="true"
          />
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
      <el-form

        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="所属应用">
          <el-select
            v-model="form.appId"
            size="mini"
            style="width: 100%"
            placeholder=""
          >
            <el-option
              v-for="item in appList"
              :key="item.id"
              :label="item.appName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="交易名称">
          <el-input size="mini" v-model="form.tradeName" />
        </el-form-item>
        <el-form-item label="交易码">
          <el-input size="mini" v-model="form.tradeCode" />
        </el-form-item>
        <el-form-item label="接口编码">
          <el-input size="mini" v-model="form.interfaceCode" />
        </el-form-item>
        <el-form-item label="接口地址">
          <el-input
            type="textarea"
            size="mini"
            v-model="form.interfaceAddress"
          />
        </el-form-item>
        <el-form-item label="接口版本">
          <el-input size="mini" v-model="form.interfaceVersion" />
        </el-form-item>
        <el-form-item label="接口协议">
          <el-select
            v-model="form.protocolId"
            size="mini"
            style="width: 100%"
            placeholder=""
          >
            <el-option
              v-for="item in protocolList"
              :label="item.protocolName"
              :key="item.id"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="协议参数">
          <el-input type="textarea" size="mini" v-model="form.protocolParam" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" size="mini" v-model="form.interfaceDesc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitHandle">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from "@/views/projectManagement/components/table";
import headersearch from "@/views/components/search";
import {
  getInterfaceTree,
  addInterface,
  editInterface,
  getInterfaces,
  deletetInterface,
  getApps,
  getProtocols,
} from "@/api/serviceManagement/offlineManagement/interfaceManage";
import moudlelist from "./moudle";
export default {
  components: {
    rendertable,
    headersearch,
  },
  filters: {
    filterStatus(status) {
      const statusMap = {
        1: "编辑中",
        2: "已发布",
        3: "已修改",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      moudlelist,
      filterText: "",
      checknode: "",
      selectid: "",
      dialogVisible: false,
      appList: [],
      protocolList: [],
      dirData: [],
      searchModel: {
        btnSpan:6,
        formModel: {
          tradeName: "",
          tradeCode: "",
          interfaceCode: "",
        },
        searchFild: [
          {
            type: "input",
            label: "交易名称",
            prop: "tradeName",
            span:12
          },
          {
            type: "input",
            label: "交易码",
            prop: "tradeCode",
                span:12
          },
          {
            type: "input",
            label: "接口编码",
            prop: "interfaceCode",
                span:12
          },
        ],
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      renderheader: [
        {
          prop: "appName",
          label: "所属应用",
        },
        {
          prop: "tradeName",
          label: "交易名称",
        },
        {
          prop: "tradeCode",
          label: "交易码",
        },
        {
          prop: "interfaceCode",
          label: "接口编码",
        },

        {
          prop: "protocolName",
          label: "接口协议",
        },
        {
          prop: "interfaceVersion",
          label: "版本号",
        },
        {
          prop: "interfaceStatus",
          label: "接口状态",
          render: (h, { row }) => {
            return h(
              "span",
              this.$options.filters.filterStatus(row.interfaceStatus)
            );
          },
        },
        {
          prop: "interfaceDesc",
          label: "接口描述",
        },
      ],
      renderdata: [],
      form: {
        id: "",
        appId: "",
        tradeName: "",
        tradeCode: "",
        interfaceCode: "",
        interfaceAddress: "",
        interfaceVersion: "",
        protocolId: "",
        protocolParam: "",
        interfaceStatus: "",
        interfaceDesc: "",
      },
      actionlinedata: [
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-zoom-in",
                },
                on: {
                  click: () => {
                    this.openAdd();
                  },
                },
              },
              "新增"
            );
          },
        },
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-edit",
                },
                on: {
                  click: () => {
                    this.openEdit();
                  },
                },
              },
              "编辑"
            );
          },
        },
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-delete",
                },
                on: {
                  click: () => {
                    this.delFun();
                  },
                },
              },
              "删除"
            );
          },
        },
        {
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-s-operation",
                },
                on: {
                  click: () => {
                    this.openFieldConfig();
                  },
                },
              },
              "字段配置"
            );
          },
        },{
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-s-operation",
                },
                on: {
                  click: () => {
                    // this.openFieldConfig();
                  },
                },
              },
              "导入"
            );
          },
        },{
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-s-operation",
                },
                on: {
                  click: () => {
                    // this.openFieldConfig();
                  },
                },
              },
              "导出"
            );
          },
        },{
          render: (h) => {
            return h(
              "el-button",
              {
                attrs: {
                  size: "mini",
                  icon: "el-icon-s-operation",
                },
                on: {
                  click: () => {
                    // this.openFieldConfig();
                  },
                },
              },
              "模板下载"
            );
          },
        },
      ],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 0,
        show: true,
      },
      pageType: "",
    };
  },
  mounted() {
    this.getTree();
    this.getList();
  },
  methods: {
    getTree() {
      getInterfaceTree().then((res) => {
        if (res.code === 200) {
          this.dirData = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    getList(requestParam) {
      if (!requestParam) {
        requestParam = this.searchModel.formModel;
      }
      const params = {
        requestObject: requestParam,
        pageNo: this.pagination.currentPage,
        pageSize: this.pagination.pagesize,
      };
      getInterfaces(params).then((res) => {
        if (res.code === 200) {
          this.renderdata = res.data.data;
          this.pagination.total = res.data.totalCount;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    onSearch() {
      this.getList();
    },
    openAdd() {
      this.getSelected();
      this.selectid = 1;
      this.pageType = "add";
      Object.keys(this.form).map((key) => (this.form[key] = ""));
      this.dialogVisible = true;
    },
    openEdit() {
      // 获取选中值
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      this.selectid = 1;
      this.pageType = "edit";
      this.getSelected();
      let refForm = this.form;
      Object.keys(refForm).forEach((key) => {
        refForm[key] = selectionData[0][key];
      });
      this.dialogVisible = true;
    },
    openFieldConfig() {
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      this.$router.push({
        path: "/serviceGovernance/Offlinegovernance/Interfacemanagement",
        query: { interfaceId: selectionData[0].id },
      });
      sessionStorage["currentSubRouter"] =
        "/serviceGovernance/Offlinegovernance/Interfacemanagement";
    },
    submitHandle() {
      const params = this.form;
      if (this.pageType === "add" && this.selectid === 1) {
        this.submitFun(params);
      } else if (this.pageType === "edit" && this.selectid === 1) {
        this.editFun(params);
      }
    },
    submitFun(params) {
      addInterface(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.dialogVisible = false;
          this.getTree();
          this.getList();
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    editFun(params) {
      editInterface(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.dialogVisible = false;
          this.getList();
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    delFun() {
      // 获取选中值
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        selectionData.forEach((e) => {
          ids.push(e.id);
        });
        deletetInterface(ids[0]).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getTree();
            this.getList();
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
          }
        });
      });
    },
    getSelected() {
      getApps().then((res) => {
        if (res.code === 200) {
          this.$nextTick(() => {
            this.appList = res.data;
          });
        }
      });
      getProtocols().then((res) => {
        if (res.code === 200) {
          this.protocolList = res.data;
        }
      });
    },
    sizeChange(val) {
      this.pagination.pagesize = val;
      this.getList();
    },
    currentChange(val) {
      this.pagination.currentPage = val;
      this.getList();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    enterleave() {
      this.checknode = "";
    },
    handleNodeClick(node) {
      let params = {};
      let nodeType = node.nodeType;
      let nodeData = node.nodeData;
      if (nodeType === "1" && nodeData != null) {
        params.appId = nodeData.id;
      } else if (nodeType === "2") {
        params.id = nodeData.id;
      }
      this.getList(params);
    },
    renderContent(h, { node, data, store }) {
      return h(
        "span",
        {
          style: {
            lineHeight: "100%",
            width: "100%",
          },
          on: {
            mouseenter: () => {
              this.checknode = data.label;
            },
          },
        },
        [
          h(
            "el-row",
            {
              style: {
                width: "100%",
              },
              attrs: {
                type: "flex",
              },
            },
            [
              data.children
                ? h("i", {
                    attrs: {
                      class: "el-icon-folder-opened",
                    },
                  })
                : h("i", {
                    attrs: {
                      class: "el-icon-tickets",
                    },
                  }),
              h(
                "el-col",
                {
                  attrs: {
                    span: 18,
                  },
                },
                node.label
              ),
              //   h('el-col', {
              //     attrs: {
              //       span: 4,
              //       // offset: 15
              //     }
              //   }, this.checknode === node.label ? node.level === 1 ? [] : node.level === 3 ? [ 'el-icon-circle-close' ].map(e => {
              //     return h('i', {
              //       attrs: {
              //         class: e
              //       },
              //       style: {
              //         marginRight: '5px'
              //       },
              //       on: {
              //         // click: () => {
              //         //   if (e === 'el-icon-circle-plus-outline') {
              //         //     this.$message({
              //         //       type: 'success',
              //         //       message: `新增${JSON.stringify(data)}`
              //         //     })
              //         //   } else {
              //         //     this.$message({
              //         //       type: 'error',
              //         //       message: '删除'
              //         //     })
              //         //   }
              //         // }
              //       }
              //     })
              //   }) : [ 'el-icon-circle-plus-outline', 'el-icon-circle-close' ].map(e => {
              //     return h('i', {
              //       attrs: {
              //         class: e
              //       },
              //       style: {
              //         marginRight: '5px'
              //       },
              //       on: {
              //         // click: () => {
              //         //   if (e === 'el-icon-circle-plus-outline') {
              //         //     this.$router.push({ path: '/serviceGovernance/Offlinegovernance/Interfacemanagement' })
              //         //     sessionStorage[ 'currentSubRouter' ] = '/serviceGovernance/Offlinegovernance/Interfacemanagement'
              //         //   } else {
              //         //     this.$message({
              //         //       type: 'error',
              //         //       message: '删除'
              //         //     })
              //         //   }
              //         // }
              //       }
              //     })
              //   }) : []

              //   )
            ]
          ),
        ]
      );
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>

<style scoped lang="scss">
fieldset {
  border-radius: 3px;
  padding: 20px 10px;
  border-color: #f2f2f2;
  border-width: 1px;
  margin-bottom: 20px;
}
</style>
