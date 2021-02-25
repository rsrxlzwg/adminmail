<template>
  <div>
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

    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
      <component
        :is="item.component"
        ref="refForm"
        :formData="formData"
        :selectDisabled="selectDisabled"
        :pageType="pageType"
        :servicelist="servicelist"
        @getServiceList="getServiceList"
        v-for="item in moudlelist.filter((e) => e.id == selectid)"
      />

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
  getInfo,
  editInfo,
  submitInfo,
  deleteOne,
} from "@/api/serviceManagement/onlineManagement/loadBalance";
import { getService } from "@/api/serviceManagement/onlineManagement/flowControl";
import { getApp } from "@/api/serviceManagement/appManage/sdkgroup";
import moudlelist from "./moudle";
let applist = [];
let serviceCodeList = [];
export default {
  components: {
    rendertable,
    headersearch,
  },
  data() {
    return {
      moudlelist,
      selectid: "",
      dialogVisible: false,
      servicelist: [],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 10,
        show: true,
      },
      form: {},
      searchModel: {
        formModel: {},

        searchFild: [
          {
            type: "select",
            label: "所属应用",
            prop: "appId",
            options: applist,
          },
          {
            type: "select",
            label: "服务编码",
            prop: "serviceCode",
            options: serviceCodeList,
          },
        ],
      },
      renderheader: [
        {
          prop: "appName",
          label: "所属应用",
        },
        {
          prop: "serviceCode",
          label: "服务编码",
        },
        {
          prop: "strategyName",
          label: "策略",
        },
        {
          prop: "loadManagePolicyParam",
          label: " 参数",
        },
      ],
      renderdata: [{}],
      formData: {
        id: "",
        appId: "",
        appName: "",
        serviceId: "",
        serviceCode: "",
        loadManagePolicyId: "",
        loadManagePolicyParam: "",
      },
      selectDisabled: false,
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
                    this.dialogVisible = true;

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
                    this.dialogVisible = true;

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
                  icon: "el-icon-edit",
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
      ],
    };
  },
  beforeCreate() {
    let serviceQueryList={ appId: "", serviceName: "" };
    applist = [];
    serviceCodeList = [];
    getApp().then((res) => {
      if (res.code === 200) {
        this.$nextTick(() => {
          res.data.forEach((e) => {
            applist.push({
              label: e.appName,
              value: e.id,
            });
          });
        });
      } else {
        this.$message({
          type: "error",
          message: res.message,
        });
      }
    }),
      getService(serviceQueryList).then((res) => {
        if (res.code === 200) {
          console.log("eeee", res.data);
          this.$nextTick(() => {
            res.data.forEach((e) => {
              serviceCodeList.push({
                label: e.serviceCode,
                value: e.serviceCode,
              });
            });
          });
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
  },
  mounted() {
    this.getList();
  },
  methods: {
    onSearch() {
      this.pagination.currentPage = 1;
      this.pagination.pagesize = 10;
      this.getList();
    },

    getServiceList() {
      var queryList = { appId: this.formData.appId };
      getService(queryList).then((res) => {
        if (res.code === 200) {
          this.servicelist = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },

    openAdd() {
      this.selectid = 1;
      this.pageType = "add";
      this.dialogVisible = true;
      this.selectDisabled = false;
      var queryList = { appId: "" };
      getService(queryList).then((res) => {
        console.log("servdata", res.data);
        if (res.code === 200) {
          this.servicelist = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    //  Object.ke;
      Object.keys(this.formData).map((key) => (this.formData[key] = ""));
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

      var queryList = { appId: selectionData[0].appId };
      getService(queryList).then((res) => {
        console.log("servdata", res.data);
        if (res.code === 200) {
          this.servicelist = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
      this.dialogVisible = true;
      this.selectid = 1;
      this.pageType = "edit";
      this.selectDisabled = true;
      let refForm = this.formData;
      Object.keys(refForm).forEach((key) => {
        refForm[key] = selectionData[0][key];
      });
    },
    delFun() {
      // 获取选中值
      const selectionData = this.$refs.multipleTable.$refs.multipleTable.selection
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      const ids = []
      selectionData.forEach(e => {
        ids.push(e.id)
      })
      console.log({ids})
      deleteOne(ids[0]).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        }
      })
        })
    },
    getList() {
      const params = {
        requestObject: {
          ...this.searchModel.formModel,
        },
        pageNo: this.pagination.currentPage,
        pageSize: this.pagination.pagesize,
      };
      getInfo(params).then((res) => {
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
    submitHandle() {
      const params = this.formData;
      console.log("00", this.formData);
      if (this.pageType === "add" && this.selectid === 1) {
        console.log("111");
        this.submitFun(params);
      }
      if (this.pageType === "edit" && this.selectid === 1) {
        console.log("222");
        this.editFun(params);
      }
    },
    submitFun(params) {
      submitInfo(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.dialogVisible = false;
          this.getList();
        }
      });
    },
    editFun(params) {
      editInfo(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.dialogVisible = false;
          this.getList();
        }
      });
    },
    getList() {
      const params = {
        requestObject: {
          ...this.searchModel.formModel,
        },
        pageNo: this.pagination.currentPage,
        pageSize: this.pagination.pagesize,
      };
      getInfo(params).then((res) => {
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
    sizeChange(val) {
      this.pagination.pagesize = val;
      this.getList();
    },
    currentChange(val) {
      this.pagination.currentPage = val;
      this.getList();
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
