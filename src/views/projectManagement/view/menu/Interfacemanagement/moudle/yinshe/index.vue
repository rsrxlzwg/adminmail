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
          <span style="fontSize:'5px'">接口标签</span>
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
        <!-- <el-col :span="2">
          <el-button
            size="mini"
            icon="el-icon-search"
          >版本历史</el-button>
        </el-col> -->
      </el-row>
    </fieldset>
    <el-card style="marginBottom:20px">
      <span slot="header">列表</span>
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
        <el-col :span="6">SDA信息</el-col>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="50%"
      append-to-body
    >
      <el-card style="marginBottom:20px">
        <rendertable
          :tableHeader='renderheader3'
          :tableData='renderdata3'
          :showselect='true'
        />
      </el-card>
      <el-card>
        <el-row
          type="flex"
          align="middle"
          :gutter="12"
        >
          <el-col :span="3">
            <span style="fontSize:'5px'">字段名称</span>
          </el-col>
          <el-col :span="3">
            <el-input
              placeholder="请输入"
              size="mini"
            ></el-input>
          </el-col>
          <el-col :span="3">
            <span style="fontSize:'5px'">字段别名</span>
          </el-col>
          <el-col :span="3">
            <el-input
              placeholder="请输入"
              size="mini"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <span style="fontSize:'5px'">类型</span>
          </el-col>
          <el-col :span="3">
            <el-input
              placeholder="请输入"
              size="mini"
            ></el-input>
          </el-col>
          <el-col :span="3">
            <span style="fontSize:'5px'">IDE备注</span>
          </el-col>
          <el-col :span="3">
            <el-input
              placeholder="请输入"
              size="mini"
            ></el-input>
          </el-col>
        </el-row>
      </el-card>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="dialogVisible1 = false"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="dialogVisible1 = false"
        >确 定</el-button>
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
      dialogVisible1: false,
      renderheader: [
        {
          prop: 'Startitemclassname',
          label: '系统ID'
        },
        {
          prop: 'Startupsequence',
          label: '系统名称',
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
          sysname: '提供者'
        }
      ],
      renderdata1: [
        {
          id: 1,
          FieldName: 'root',
          Fieldalias: '根节点',
          Typesof: '',
          length: '',
          Istrequired: '',
          Remarks: '',
          Attributes: '',
          children: [ {
            id: 11,
            FieldName: 'request',
            Fieldalias: '请求报文体',
            Typesof: '',
            length: '',
            Istrequired: '',
            Remarks: '',
            Attributes: '',
            children: [ {
              id: 111,
              FieldName: 'card_no',
              Fieldalias: '卡号',
              Typesof: 'STRING',
              length: '19',
              Istrequired: 'Y',
              Remarks: '',
              Attributes: '',
            } ]
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
          prop: 'Typesof',
          label: '类型'
        },
        {
          prop: 'length',
          label: 'IDA备注'
        },
        {
          prop: 'Istrequired',
          label: '对应SNA'
        },
        {
          prop: 'Remarks',
          label: '元数据'
        },
        {
          prop: 'Attributes',
          label: '是否必输'
        },
        {
          prop: 'Restrictions',
          label: '约束条件'
        },
        {
          prop: 'SNAnotes',
          label: 'SNA备注'
        },
        {
          prop: 'edit',
          label: '操作',
          render: (h, { row }) => {
            return h('el-button', {
              attrs: {
                size: 'mini',
                icon: "el-icon-plus",
                circle: true
              },
              on: {
                click: () => {
                  this.dialogVisible1 = true
                }
              }
            })
          }
        }
      ],
      renderheader3: [
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
          label: '元数据名'
        },
        {
          prop: 'Startupsequence',
          label: '属性名称',
        },
        {
          prop: 'Systemid',
          label: '状态'
        },
        {
          prop: 'Systemtype',
          label: '数据类型'
        },
        {
          prop: 'state',
          label: '数据长度',

        },
        {
          prop: 'sysname',
          label: '精度',

        },
        {
          prop: 'ISPIN',
          label: 'ISPIN',

        }
      ],
      renderdata3: [
        {
          Startitemclassname: 'ccCASaDapter',
          Startupsequence: '受益人证件号码',
          Systemid: '已下发',
          Systemtype: 'String',
          state: '18',
          sysname: '',
          ISPIN: 'false'
        }
      ],
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
