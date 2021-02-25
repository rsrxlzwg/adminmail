<template>
  <div>
    <el-card style="marginBottom:20px">
      <span slot="header">提供者和消费者关系</span>
      <rendertable
        :tableData='renderdata'
        :tableHeader='renderheader'
      />
    </el-card>
    <el-card>
      <span slot="header">字段映射操作</span>
      <el-row
        type="flex"
        align="middle"
        justify="center"
        style="backgroundColor:#EEF1F6;height:30px;borderBottom:1px solid #E2E2E2"
      >
        <el-col :span="6"></el-col>
        <el-col
          :span="6"
          style="borderRight:1px solid #ccc"
        >接口信息</el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6">元数据信息</el-col>
      </el-row>
      <rendertable
        :tableData='renderdata1'
        :tableHeader='renderHeader1'
        cloumalign='left'
      />
    </el-card>
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
import moudlelist from './moudle'
export default {
  data() {
    return {
      moudlelist,
      selectid: '',
      dialogVisible: false,

      renderheader: [
        {
          prop: 'Startitemclassname',
          label: '应用ID'
        },
        {
          prop: 'Startupsequence',
          label: '应用名称',
        },
        {
          prop: 'Systemid',
          label: '标准'
        },
        {
          prop: 'Systemtype',
          label: '接口id'
        },
        {
          prop: 'state',
          label: '接口名称',

        },
        {
          prop: 'sysname',
          label: '类型',

        },
        {
          prop: 'Header',
          label: '报文头',

        },
        {
          prop: 'Remarks',
          label: '备注',

        }
      ],
      renderdata: [
        {
          Startitemclassname: '300100',
          Startupsequence: '核心系统',
          Systemid: '是',
          Systemtype: 'core00018',
          state: '客户信息查询',
          sysname: '提供者',
          Header:'/provider/user',
        },
        {
          Startitemclassname: '300101',
          Startupsequence: '账户系统',
          Systemid: '是',
          Systemtype: 'core00019',
          state: '客户信息查询',
          sysname: '消费者',
          Header:'/consumer/user',

        }
      ],
      renderdata1: [
        {
          id: 1,
          FieldName: 'root',
          Fieldalias: '根节点',
          Typesof: '',
          length: '',
          Istrequired: 'Y',
          Remarks: '',
          Attributes: '',
          children: [ {
            id: 11,
            FieldName: 'request',
            Fieldalias: '请求报文体',
            Typesof: '',
            length: '',
            Istrequired: 'Y',
            Remarks: '',
            Attributes: '',
            children: [ {
              id: 111,
              FieldName: 'card_no',
              Fieldalias: '卡号',
              Typesof: 'STRING',
              length: '',
              Istrequired: 'Y',
              metadata:'卡号',
              Remarks: 'card',
              Attributes: 'String ',
            } ]
          }, {
            id: 12,
            FieldName: 'response',
            Fieldalias: '响应报文体',
            Typesof: '',
            length: '',
            Istrequired: 'Y',

            Remarks: '',
            Attributes: '',
            children: []
          } ]
        }
      ],
      renderHeader1: [
        {
          prop: 'FieldName',
          label: '字段名称',
          width: 200

        },
        {
          prop: 'Fieldalias',
          label: '字段别名'
        },
        {
          prop: 'Istrequired',
          label: '是否必输入'
        },
        {
          prop: 'length',
          label: '备注'
        },
        {
          prop: 'metadata',
          label: '元数据名'
        },
        {
          prop: 'Remarks',
          label: '属性名称'
        },
        {
          prop: 'Attributes',
          label: '数据类型'
        },
        {
          prop: 'length',
          label: '数据长度'
        },
      ]
    }
  },
  components: {
    rendertable
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
