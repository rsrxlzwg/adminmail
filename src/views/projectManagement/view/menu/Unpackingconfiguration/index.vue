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
        :formSelectList="formSelectList"
        @optionsChange="optionsChange"
        @serviceCodeChange="serviceCodeChange"
        v-for="(item, i) in moudlelist.filter((e) => e.id == selectid)"
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
import moudlelist from "./moudle";
import {
  getInfo,
  submitInfo,
  editInfo,
  deleteOne,
  downInfo,
  getService,
  getPattern
} from "@/api/commonComponents/unPack";
import { getApp } from "@/api/serviceManagement/appManage/sdkgroup";

let applist = [];
export default {
  components: {
    rendertable,
    headersearch,
  },
  filters: {
    filterType(type) {
      const statusMap = {
        0: "C端和P端",
        1: "C端",
        2: "P端",
      };
      return statusMap[type];
    },
  },
  data() {
    return {
      moudlelist,
      selectid: 1,
      dialogVisible: false,
      form: {},
      searchModel: {
        formModel: {
          appId: "",
          type: "",
          serviceId: "",
        },
        searchFild: [
          {
            type: "select",
            label: "所属应用",
            prop: "appId",
            options: applist,
          },
          {
            type: "select",
            label: "类型",
            prop: "type",
            options: [
              {
                label: "C端和P端",
                value: "0",
              },
              {
                label: "C端",
                value: "1",
              },
              {
                label: "P端",
                value: "2",
              },
            ],
          },
          {
            type: "input",
            label: "服务编码",
            prop: "serviceId",
          },
        ],
      },
      renderheader: [
        {
          prop: "serviceId",
          label: "服务编码",
        },
        {
          prop: "appName",
          label: "应用名称",
        },
        {
          prop: "type",
          label: "类型",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                },
              },
              this.$options.filters.filterType(params.row.type)
            );
          },
        },
        {
          prop: "fileName",
          label: "拆组包文件名称",
        },
        {
          prop: "patternName",
          label: "模式",
        },
      ],
      renderdata: [],
      // 操作按钮
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
              "修改"
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
                  icon: "el-icon-delete",
                },
                on: {
                  click: () => {
                    this.downFun();
                  },
                },
              },
              "打包下载"
            );
          },
        },
      ],
      pagination: {
        currentPage: 1,
        pagesize: 10,
        total: 10,
        show: true,
      },
      formData: {
        type: "",
        provideId: "",
        serviceId: "",
        cosuAppName:'',
        patternId: "",
      },
      pageType: "",
      formSelectList:{
        providerList:[],
        serviceCode:[],
        patternList:[]
      }
    };
  },
  beforeCreate() {
    applist = [];
    getApp().then((res) => {
      if (res.code === 200) {
        this.$nextTick(() => {
          res.data.forEach((e) => {
            applist.push({
              label: e.appName,
              value: e.id,
            });
          });
             this.formSelectList.providerList=res.data
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
     this.getMessageModel()
    // this.created()
  },
  methods: {
    onSearch() {
      this.pagination.currentPage = 1;
      this.pagination.pagesize = 10;
      this.getList();
    },
    serviceCodeChange(val){
      console.log({val})
      const obj=this.formSelectList.serviceCode.find(item=>item.id===val)
       this.formData.cosuAppName=obj.cosuAppName
    },
    getMessageModel(){
      getPattern().then(res=>{
        this.formSelectList.patternList=res.data
      })
    },
    optionsChange(val){
      getService({appId:val}).then(res=>{
        this.$nextTick(()=>{
              this.formSelectList.serviceCode=res.data
        })
    
      })
    },
    openAdd() {
      this.selectid = 1;
      this.pageType = "add";
      this.dialogVisible = true;
      Object.keys(this.formData).map((key) => (this.formData[key] = ""));
      this.formData.unpackList = [],
       this.formData.packList = [];
      //  this.getProvider()
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
      this.dialogVisible = true;
      this.selectid = 1;
      this.pageType = "edit";
      this.optionsChange(selectionData[0].provideId)
      // this.serviceCodeChange(selectionData[0].serviceId)
      let refForm = this.formData;
      Object.keys(refForm).forEach((key) => {
        refForm[key] = selectionData[0][key];
      });
    },
    downFun() {
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      if (selectionData.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条数据",
        });
        return false;
      }
      downInfo(selectionData[0].id).then((res) => {
        const appName = selectionData[0].appName;
        const serviceId = selectionData[0].serviceId;
        let fileName = "综合前置" + appName + serviceId + "打包下载";
        if (typeof window.chrome !== "undefined") {
          // Chrome version
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(res);
          link.setAttribute("download", fileName);
          link.click();
        } else if (typeof window.navigator.msSaveBlob !== "undefined") {
          // IE version
          var blob = new Blob([res], { type: "application/force-download" });
          window.navigator.msSaveBlob(blob, fileName);
        } else {
          // Firefox version
          var file = new File([res], fileName, {
            type: "application/force-download",
          });
          window.open(URL.createObjectURL(file));
        } //   this.$message({ //     type: 'success', //     message:'下载成功' // }); // this.getList()
      });
    },
    delFun() {
      // 获取选中值
      const selectionData = this.$refs.multipleTable.$refs.multipleTable
        .selection;
      let ids = [];
      selectionData.forEach((e) => {
        ids.push(e.id);
      });
      console.log({ ids });
      deleteOne({ id: ids }).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
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
      })
     
    },
    submitHandle() {
      const params = this.formData;
      // this.$refs.refForm[0].$refs.unpackUpload.submit();
      // this.$refs.refForm[0].$refs.packUpload.submit();
      // console.log({Upload})
      //   console.log('00',this.selectid)
      if(this.pageType==='add' && this.selectid===1){
        console.log('111')
        this.submitFun(params)
      }
      if(this.pageType==='edit'&& this.selectid===1){
           console.log('222')
        this.editFun(params)
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
