<template>
  <div>
    <el-form ref="form" :model="form" label-width="130px" label-position="left">
      <el-form-item label="所属应用">
        <el-select
          v-model="formData.appId"
          size="mini"
          style="width: 100%"
          placeholder=""
          @change="getServiceS"
          :disabled="this.selectDisabled"
        >
          <el-option
            v-for="item in applist"
            :label="item.appName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-bottm: 10px" label="服务编码">
        <el-select
          v-model="formData.serviceId"
          size="mini"
          style="width: 100%"
          placeholder=""
          :disabled="this.selectDisabled"
        >
          <el-option
            v-for="item in servicelist"
            :label="item.serviceCode"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="负载均衡策略策略">
        <el-select
          v-model="formData.loadManagePolicyId"
          size="mini"
          style="width: 100%"
          placeholder=""
          :disabled="this.selectDisabled"
        >
          <el-option
            v-for="item in policylist"
            :label="item.strategyName"
            :value="item.id"
            :key="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="策略参数">
        <el-input v-model="formData.loadManagePolicyParam" size="mini" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from "@/views/projectManagement/components/table";
import { getApp } from "@/api/serviceManagement/appManage/sdkgroup";
import { getService } from "@/api/serviceManagement/onlineManagement/flowControl";
import { getPolicy } from "@/api/serviceManagement/onlineManagement/loadBalance";
export default {
  components: {
    rendertable,
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    selectDisabled: {
      type: Boolean,
      default: () => {
        return {};
      },
    },
    pageType: {
      type: String,
      default: () => {
        return {};
      },
    },
    servicelist: {
      type: Array,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      activeName: "first",
      applist: [],
      policylist: [],
      form: {},
      tableHeader: [
        {
          prop: "key",
          label: "key",
          render: (h, { row }) => {
            return h("el-input", {
              attrs: {
                size: "mini",
                value: row["key"],
              },
              on: {
                input: (e) => {
                  row["key"] = e;
                },
              },
            });
          },
        },
        {
          prop: "value",
          label: "value",
          render: (h, { row }) => {
            return h("el-input", {
              attrs: {
                size: "mini",
                value: row["value"],
              },
              on: {
                input: (e) => {
                  row["value"] = e;
                },
              },
            });
          },
        },
      ],
    };
  },
  mounted() {
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
    });
    getPolicy().then((res) => {
      if (res.code === 200) {
        this.policylist = res.data;
      } else {
        this.$message({
          type: "error",
          message: res.message,
        });
      }
    });
  },
  methods: {
    getServiceS() {
      this.$emit("getServiceList");
    },
  },
};
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.overflow {
  overflow: auto;
  height: 400px;
}
</style>
