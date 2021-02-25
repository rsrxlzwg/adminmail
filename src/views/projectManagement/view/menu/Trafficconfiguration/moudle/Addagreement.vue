<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      label-width="130px"
      label-position="left"
    >

      <el-form-item
        label="所属应用">
        <el-select
          v-model="formData.appId"
          size="mini"
          style="width:100%"
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
      <el-form-item
      style="margin-bottm:10px"
        label="服务编码">
        <el-select
          v-model="formData.serviceId"
          size="mini"
          style="width:100%"
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
      <el-form-item
       label="流控策略">
        <el-select
          v-model="formData.flowControlPolicyId"
          size="mini"
          style="width:100%"
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

      <el-form-item label='流量分配'>
        <rendertable
          :tableHeader='tableHeader'
          :tableData='formData.esbGovFlowTerminalThreshold'
          :showpagination='false'
        />
      </el-form-item>
    </el-form>

  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from "@/views/projectManagement/components/table";
import { getApp } from "@/api/serviceManagement/appManage/sdkgroup";
import {
  getService,
  getPolicy,
  getTerminal,
} from "@/api/serviceManagement/onlineManagement/flowControl";

export default {
  components: {
    rendertable
  },
  props:{
    formData:{
      type:Object,
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
      type: Object,
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
      num: 1,
      radio: "1",
      activeName: "first",
      applist: [],
      policylist: [],
      form: {},
      tableHeader: [
        {
          prop: 'terminalCode',
          label: '终端'
        },
        {
          prop: 'thresholdValue',
          label: '阈值',
          render: (h, { row } ) => {
            return h('el-input', {
              attrs: {
                size: 'mini',
                value: row[ 'thresholdValue' ]
              },
              on: {
                input: e => {
                  row[ 'thresholdValue' ] = e
                }
              }
            })
          }
        }
      ],
      tableData: [
        {
          terminal: 'ECIF105',
          Threshold: ''
        },
        {
          terminal: 'ECIF105',
          Threshold: ''
        }
      ]
    }
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
    }),
      getPolicy().then((res) => {
        if (res.code === 200) {
          this.policylist = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }

      })

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
