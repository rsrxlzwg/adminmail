<template>
  <div>
    <el-card
      shadow='never'
      style="marginBottom:20px"
    >
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        slot="header"
      >
        <el-col :span="10">
          <el-row
            type="flex"
            align="middle"
          >
            <el-col :span="2">
              <i
                style="fontSize:26px;color:#fff;backgroundColor:#EFC100;padding:6px;borderRadius:3px"
                class="el-icon-share"
              ></i>
            </el-col>
            <el-col :span="16">
              <ul>
                <li style="fontSize:14px;fontWeight:600">app_20845-app-2095_default</li>
                <li style="fontSize:14px;color:#ccc">创建于一个月前</li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-dropdown
            size="small"
            @command="handcommond"
          >
            <el-button size="mini">更多 <i class="el-icon-caret-bottom el-icon--left"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='1'>配置</el-dropdown-item>
              <el-dropdown-item command='2'>高级配置</el-dropdown-item>
              <el-dropdown-item
                command='3'
                divided
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          v-for="(item,key) in showdatalist"
          :span='8'
          :key="key"
        >
          <showlist
            :name='item.name'
            :value='item.value'
          />
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow='never'>
      <el-row>
        <el-col :span="4">
          <jointable
            @clickli='clickli'
            :jointablelist='jointablelist'
          />
        </el-col>
        <el-col :span="20">
          <component
            v-for="(item,key) in comlist.filter(e => e.id == choseli)"
            :is="item.component"
            :key="key"
          ></component>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span
        slot="title"
        style="fontSize=14px"
      >{{dialogtitle}}</span>
      <div>
        <component
          v-for="item in dropdownlist.filter(e => e.id ==  dropdownid )"
          :is="item.component"
        ></component>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import comlist from './component'
import dropdownlist from './component/dialogmoudle'
export default {
  components: {
    showlist: {
      props: {
        name: String,
        value: String,
      },
      render(h) {
        return h('div', {
          style: {
            fontSize: '14px'
          }
        }, [
          h('span', this.$props.name),
          h('span', {
            style: {
              marginRight: '5px'
            }
          }, ':'),
          h('span', this.$props.value)
        ])
      },
    },
    jointable: {
      props: {
        jointablelist: Array
      },
      data() {
        return {
          listch: '1'
        }
      },
      methods: {
        click(e) {
          this.listch = e
          this.$emit('clickli', e)
        }
      },
      render(h) {
        return h('ul', {
          class: 'ulstyle'
        }, this.$props.jointablelist.map(e => {
          return < li
            onClick={ () => { this.click(e.id) } }
            class={ e.id == this.listch ? 'listylepend' : 'listylepends'
            }>
            <el-row type='flex' justify='space-between'>
              <el-col span={ 20 }>{ e.name }</el-col>
              <el-col span={ 4 }>
                <i class={ e.id == this.listch ? 'el-icon-arrow-right' : '' }></i>
              </el-col>
            </el-row>
          </li >
        })
        )
      },
    }
  },
  data() {
    return {
      dropdownlist,
      dialogVisible: false,
      dialogtitle: '',
      dropdownid: '',
      comlist,
      choseli: '1',
      showdatalist: [
        {
          name: '应用',
          value: 'app-2049'
        },
        {
          name: '集群IP',
          value: '192.168.131.1'
        },
        {
          name: '协议',
          value: 'TCP'
        },
        {
          name: '接入点',
          value: '343131'
        }
      ],
      jointablelist: [
        {
          name: '概览',
          id: '1',
          locking: true
        },
        {
          name: '高级配置',
          id: '2'
        }
      ]
    }
  },
  methods: {
    clickli(e) {
      this.choseli = e
    },
    handcommond(value) {
      this.dropdownid = value
      switch (value) {
        case '1':
          this.dialogVisible = true
          this.dialogtitle = '配置'
          break;
        case '2':
          this.dialogVisible = true
          this.dialogtitle = '高级设置'
          break;
        default:
          break;
      }
    }
  },
}
</script>

<style scoped lang="scss">
.linerow {
  padding-bottom: 18px;
  border-bottom: 1px solid #f1f3f5;
}
.linerow:nth-of-type(2) {
  margin: 14px 0;
}
/deep/.ulstyle {
  border: 1px solid #ebeef5;
  width: 90%;
  border-radius: 4px;
  padding: 10px 2px;
  box-shadow: 3px 3px 8px 3px #f3f3f3;
  font-weight: bold;
  li {
    font-size: 14px;
    margin: 25px 16px;
    border-radius: 5px;
    border-bottom: 1px solid #e4e7ed;
    padding-bottom: 6px;
    cursor: pointer;
  }
}
/deep/ .listylepend {
  // background-color: #ccc;
  color: #000;
}
/deep/ .listylepends {
  // background-color: #ccc;
  color: #9ba3af;
}
</style>
