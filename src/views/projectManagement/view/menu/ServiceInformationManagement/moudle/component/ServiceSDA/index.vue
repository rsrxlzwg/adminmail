<template>
  <div>
    <fieldset>
      <legend>基础信息</legend>
      <el-row
        type="flex"
        align="middle"
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
          <span style="fontSize:'5px'">场景号</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <span style="fontSize:'5px'">场景名称</span>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="请输入"
            size="mini"
          ></el-input>
        </el-col>
        <el-col :span="1">
          <span style="fontSize:'5px'">版本</span>
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
          >版本历史</el-button>
        </el-col> -->
      </el-row>
    </fieldset>

    <el-card>
      <span slot="header">SDA</span>
      <rendertable
        :tableData='renderdata1'
        :tableHeader='renderHeader1'
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
      renderdata1: [
        {
          id: 1,
          FieldName: 'root',
          Fieldalias: '根节点',
          Typesof: '',
          length: '',
          Istrequired: '',
          Restrictions: '',
          Remarks: '',
          Attributes: '',
          children: [ {
            id: 11,
            FieldName: 'request',
            Fieldalias: '请求报文体',
            Typesof: '',
            length: '',
            Istrequired: '',
            Restrictions: '',
            Remarks: '',
            Attributes: '',
            children: [ {
              id: 111,
              FieldName: 'card_no',
              Fieldalias: '卡号',
              Typesof: 'STRING',
              length: '19',
              Istrequired: 'Y',
              Restrictions: '',
              Remarks: '',
              Attributes: '',
            } ]
          } ]
        }
      ],
      renderHeader1: [
        {
          prop: 'FieldName',
          label: '字段名称'
        },
        {
          prop: 'Fieldalias',
          label: '字段别名'
        },
        {
          prop: 'Typesof',
          label: '类型'
        },
        {
          prop: 'length',
          label: '元数据'
        },
        {
          prop: 'Istrequired',
          label: '是否必填'
        },
        {
          prop: 'Restrictions',
          label: '约束条件'
        },
        {
          prop: 'Remarks',
          label: '备注'
        },
        {
          prop: 'Attributes',
          label: '属性'
        }
      ],
      actionlinedata: [
        {
          render: (h) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: "el-icon-zoom-in"
              },
              on: {
                click: () => {
                  this.dialogVisible = true
                  this.selectid = 1
                }
              }
            }, '关联场景')
          }
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
