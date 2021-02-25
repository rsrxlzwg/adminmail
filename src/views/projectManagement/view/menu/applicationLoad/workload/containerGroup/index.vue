<template>
  <div>
    <el-card
      shadow='never'
      style="marginBottom:20px"
    >
      <el-row
        slot="header"
        type="flex"
        justify="space-between"
        align="middle"
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
                <li style="fontSize:14px;color:#ccc;marginTop:14px">
                  <el-progress
                    :show-text='false'
                    :percentage="50"
                  ></el-progress>
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <!-- <el-button
          size="mini"
          type="primary"
        >控制台 </el-button> -->
          <!-- ..... -->
          <el-dropdown
            size="small"
            trigger='click'
            :hide-on-click="false"
            @command="handleCommand"
          >
            <el-button
              style="marginLeft:10px"
              size="mini"
            >更多 <i class="el-icon-caret-bottom el-icon--left"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <span v-for="(item,key) in consolelist">
                <el-dropdown-item
                  v-if="'divided' in item"
                  divided
                  :key="key"
                >
                  <span v-if="'rightdropdown' in item">

                    <el-dropdown
                      @command="handleCommand"
                      size="small"
                      placement='right'
                      trigger='click'
                    >
                      <span
                        class="el-dropdown-link"
                        style="fontSize:10px"
                      >
                        {{item.name}}
                        <i
                          style="fontSize:10px"
                          class="el-icon-arrow-right"
                        ></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          style="marginLeft:40px"
                          v-for="(items,keys) in item.rightdropdown"
                          :command="{key:key*10+keys,name:items.name}"
                          :key="keys"
                        >{{items.name}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                  <span v-else> {{item.name}}</span>
                </el-dropdown-item>
                <el-dropdown-item
                  :command='{key,name:item.name}'
                  v-else
                >
                  <span>{{item.name}}</span>
                </el-dropdown-item>
              </span>
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
      title=""
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span
        slot="title"
        style="fontSize:15px;fontWeight:900"
      >
        {{commonid.name}}
      </span>

      <component
        v-for="(item,key) in dialogmodulelist.filter(e => e.id == commonid.key)"
        :is="item.component"
        :key="key"
      ></component>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import comlist from './component'
import dialogmodulelist from './component/dialogmoudle'
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
      commonid: '',
      dialogVisible: false,
      comlist,
      dialogmodulelist,
      choseli: '1',
      consolelist: [
        {
          name: '弹性扩展',
        },
        {
          name: '更新镜像',
        },
        {
          name: '状态',
          divided: true,
          rightdropdown: [
            {
              name: '启动',
            },
            {
              name: '停止',
            },
            {
              name: '重启',
            }
          ]
        },
        {
          name: '配置',
          divided: true,
          rightdropdown: [
            {
              name: '计算资源',
            },
            {
              name: '存储资源',
            },
            {
              name: '网络配置',
            },
            {
              name: '调度与发布',
            },
            {
              name: '容器配置',
            },
            {
              name: '编辑标签',
            },
            {
              name: '编辑注解',
            }
          ]
        },
        {
          name: '其他操作',
          divided: true,
          rightdropdown: [
            {
              name: '上传文件',
            },
            {
              name: '下载文件',
            },
            {
              name: '高级配置',
            }
          ]
        },
        {
          name: '删除'
        }

      ],
      showdatalist: [
        {
          name: 'CPU',
          value: '0.256核'
        },
        {
          name: '内存',
          value: '512mb'
        },

      ],
      jointablelist: [
        {
          name: '概览',
          id: '1',
          locking: true
        },
        {
          name: '容器组',
          id: '2'
        },
        {
          name: '历史版本',
          id: '3'
        },
        {
          name: '发布',
          id: '4'
        },
        {
          name: '镜像认证',
          id: '5'
        },
        {
          name: '实时日志',
          id: '6'
        },
        {
          name: '事件',
          id: '7'
        }
      ]
    }
  },
  methods: {
    clickli(e) {
      this.choseli = e
    },
    handleCommand(value) {
      if (value !== undefined) {
        let noshoww = [ 20, 21, 22 ]
        let routerpath = [ 31 ]
        let deletes = [ 5 ]
        if (noshoww.includes(value.key)) {
          this.$confirm(`${value.name}服务 “app-2048” 前，请确保业务数据保存在存储中。`, value.name, {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(res => { }).catch(rej => { })
          return
        }
        if (routerpath.includes(value.key)) {
          switch (value.key) {
            case 31:
              this.$router.push({
                // path: '/Storagevolumedetails'
                path: '/Storageresourcesdes'
              })
              break;
            default:
              break;
          }
          return
        }
        if (deletes.includes(value.key)) {
          this.$confirm(`你确定要删除服务 'app-2048' 吗？`, value.name, {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(res => { }).catch(rej => { })
          return
        }
        this.commonid = value
        this.dialogVisible = true
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
  margin: 13px 0;
}
/deep/.ulstyle {
  border: 1px solid #ebeef5;
  width: 90%;
  border-radius: 4px;
  padding: 10px 2px;
  box-shadow: 3px 3px 8px 3px #f3f3f3;
  font-weight: bold;
  li {
    font-size: 13px;
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
