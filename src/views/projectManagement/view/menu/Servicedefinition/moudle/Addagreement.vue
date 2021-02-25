<template>
  <div>
    <el-form
      ref="addForm"
      :model="formData"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="服务目录">
        <!-- <treeselect
            v-model="formData.catalog"
            :multiple="false"
            :options="treeOptions"
            :normalizer="normalizer"
            ></treeselect> -->
        <el-select
          ref="selectTree"
          size="mini"
          style="width: 100%"
          v-model="formData.catalogName"
          placeholder=""
          @visible-change="showselect"
        >
          <el-option ref="selectoption" value="">
            <el-tree
              ref="tree"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              :render-content="renderContent"
              :data="data"
              :props="defaultProps"
              :default-expand-all="true"
              @node-click="handleNodeClick"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属应用">
        <el-select
          v-model="formData.appId"
          size="mini"
          style="width: 100%"
          placeholder=""
          @change="getinterfaceCodeList"
        >
          <el-option
            v-for="item in applist"
            :label="item.appName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="消费方应用">
        <el-select
          v-model="formData.cosuAppId"
          size="mini"
          style="width: 100%"
          placeholder=""
        >
          <el-option
            v-for="item in applist"
            :label="item.appName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="服务挡板">
        <el-select
          v-model="formData.baffleId"
          size="mini"
          style="width: 100%"
          placeholder=""
        >
          <el-option
            v-for="item in baffleList"
            :label="item.baffleName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="服务编码">
        <el-input size="mini" v-model="formData.serviceCode"></el-input>
      </el-form-item>
      <el-form-item label="场景码">
        <el-input size="mini" v-model="formData.sceneCode"></el-input>
      </el-form-item>
      <el-form-item label="当前版本">
        <el-input size="mini" v-model="formData.version"></el-input>
      </el-form-item>
      <el-form-item label="服务名称">
        <el-input size="mini" v-model="formData.serviceName"></el-input>
      </el-form-item>
      <!-- <el-form-item
        label="接口编码"

      >
        <el-select
          v-model="formData.interfaceId"
          size="mini"
          style="width:100%"
          placeholder=""
        >
          <el-option
            v-for="item in interfaceList"
            :label="item.interfaceCode"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>  -->
      <el-form-item label="接口编码">
                <el-select
          v-model="formData.interfaceId"
          size="mini"
          style="width: 100%"
          placeholder=""
        >
          <el-option
            v-for="item in interfaceCode"
            :label="item.interfaceCode"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="超时判定">
        <el-radio v-model="formData.enableTimeout" label="1">禁用</el-radio>
        <el-radio v-model="formData.enableTimeout" label="2">启用</el-radio>
      </el-form-item>

        <el-form-item label="超时时间" v-show="formData.enableTimeout == 2">
          <el-input size="mini" v-model="formData.timeout" placeholder="单位：ms"></el-input>
      </el-form-item>

            <el-form-item label="失败重试">
        <el-radio v-model="formData.enableRetry" label="1">禁用</el-radio>
        <el-radio v-model="formData.enableRetry" label="2">启用</el-radio>
      </el-form-item>

        <el-form-item label="重试次数" v-show="formData.enableRetry == 2">
          <el-input size="mini" v-model="formData.retryCount"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import rendertable from "@/views/projectManagement/components/table";
import { getTree } from "@/api/serviceManagement/offlineManagement/serviceCatalog";
import {
  getApp,
  getServiceBaffle,
  getInterface,
} from "@/api/serviceManagement/offlineManagement/serviceList";

export default {
  components: {
    rendertable,
    Treeselect,
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    interfaceCode: {
      type: Array,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      treeOptions: [],
      activeName: "first",
      applist: [],
      baffleList: [],
     
      data: [],
      defaultProps: {
        children: "children",
        label: "catalogName",
        value: "id",
        des: "catalogDes",
      },
      normalizer(node) {
        return {
          id: node.id,
          label: node.catalogName,
          children: node.children,
        };
      },
    };
  },

  mounted() {
    this.getCatalogTree(),
      getApp().then((res) => {
        if (res.code === 200) {
          this.$nextTick(() => {
            this.applist = res.data;
          });
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      }),
      this.getServiceBaffle();
  },
  methods: {
    getinterfaceCodeList() {
      this.$emit("getinterfaceCodeList");
    },


    getServiceBaffle() {
      getServiceBaffle().then((res) => {
        if (res.code == 200) {
          this.baffleList = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    getCatalogTree() {
      getTree().then((res) => {
        if (res.code === 200) {
          this.data = res.data;
          this.treeOptions = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.catalogName.indexOf(value) !== -1;
    },
    showselect() {
      this.$nextTick((_) =>
        this.$refs["selectoption"].$el.setAttribute(
          "style",
          "padding:0;height:100%"
        )
      );
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
            // click: () => {
            //      console.log({node, data, store})
            //      this.fileData.parentDirectory=data.label
            //   }
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
            ]
          ),
        ]
      );
    },
    handleNodeClick(node) {
      this.formData.catalogName = node.catalogName;
      this.formData.cateId = node.id;
      this.$refs.selectTree.blur();
    },
  },
  components: {
    rendertable,
  },
};
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
}
</style>
