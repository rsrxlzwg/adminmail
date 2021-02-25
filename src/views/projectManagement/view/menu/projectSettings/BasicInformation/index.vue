<template>
  <div>
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
  </div>
</template>

<script type="text/ecmascript-6">
import comlist from './component'
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
          listch: '6'
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
      comlist,
      choseli: '6',
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
        // {
        //   name: '概览',
        //   id: '1',
        //   locking: true
        // },
        // {
        //   name: '配额',
        //   id: '2'
        // },
        // {
        //   name: '超卖策略',
        //   id: '3'
        // },
        // {
        //   name: '使用情况',
        //   id: '4'
        // },
        // {
        //   name: '授权',
        //   id: '5'
        // },
        {
          name: '专享主机',
          id: '6'
        },
        {
          name: '安全策略',
          id: '7'
        }
      ]
    }
  },
  methods: {
    clickli(e) {
      this.choseli = e
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
