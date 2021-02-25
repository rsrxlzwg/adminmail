<template>
  <div>
    <fieldset>
      <legend>基础信息</legend>
      <el-row
        type="flex"
        align="middle"
        style="margin-bottom:20px"
        :gutter="12"
      >
        <el-col :span="2">
          <span style="fontSize:'5px'">服务代码</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">服务名称</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">服务备注</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="3">
          <span style="fontSize:'5px'">服务功能描述</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">服务标签</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <!-- <el-col :span="2">
          <el-button
            size="mini"
            icon="el-icon-search"
          >搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            size="mini"
            icon="el-icon-delete"
          >清空</el-button>
        </el-col> -->
      </el-row>
    </fieldset>
    <!-- <el-card>
      <span slot="header">场景列表</span>
      <rendertable
        :tableData='renderdata'
        :tableHeader='renderheader'
      />
    </el-card> -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <component
        v-for="item in moudlelist.filter(e => e.id == selectid)"
        :is="item.component"
      ></component>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import rendertable from '@/views/projectManagement/components/table'
import headercontener from '@/views/projectManagement/components/fieldset'
import moudlelist from './moudle'
export default {
  data() {
    return {
      moudlelist,
      selectid: '',
      dialogVisible: false,
      form: {
        region: ''
      },
      renderheader: [
        // {
        //   label: '选择',
        //   render: (h, params) => {
        //     return h('el-checkbox',
        //       {
        //         on: {
        //           change: () => { }
        //         }
        //       }
        //     )
        //   },
        //   width: 50
        // },
        {
          prop: 'Startitemclassname',
          label: '场景代码'
        },
        {
          prop: 'Startupsequence',
          label: '场景名称',
        },
        {
          prop: 'Systemid',
          label: '场景功能描述'
        },
        {
          prop: 'Systemtype',
          label: '消费者'
        },
        {
          prop: 'state',
          label: '提供者',

        },
        {
          prop: 'sysname',
          label: '版本号',

        },
        {
          prop: 'time',
          label: '版本说明',

        },
        {
          prop: 'status',
          label: '状态',

        },
        {
          prop: 'Updatetime',
          label: '更新时间',

        },
        {
          prop: 'Updateuser',
          label: '更新用户',

        }
      ],
      renderdata: [
        {
          Startitemclassname: '01',
          Startupsequence: '对私客户',
          Systemid: '本场景咨询对私客户',
          Systemtype: '增值业务',
          state: '核心系统',
          sysname: '1.0.0',
          status: '已发布',
          Updatetime: '2020.1.1',
          Updateuser: 'tianjingw'
        }
      ],
    }
  },
  components: {
    rendertable,
    headercontener
  }
}
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
