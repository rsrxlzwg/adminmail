<template>
  <div class="main">
    <el-card>
      <span slot="header">
        <el-row
          type="flex"
          justify="space-between"
        >
          <el-col :span="3">
            <span style="fontSize:14px">
              资源配置
            </span>
          </el-col>
          <el-col :span="1">
            <el-button
              size="mini"
              type="text"
            >
              修改
            </el-button>
          </el-col>
        </el-row>
      </span>

      <el-row
        v-for="(item,key) in datalist"
        class="linestyle"
        :key="key"
      >
        <el-row
          v-for="(items,key) in item"
          :key="key"
        >
          <el-col :span="3">
            <span style="fontSize:14px">
              {{items.name}}
            </span>
          </el-col>
          <el-col :span="3">
            <span style="fontSize:14px">
              {{items.value}}
            </span>
          </el-col>
        </el-row>
      </el-row>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">



// import base style
import 'codemirror/lib/codemirror.css'

export default {
  props: {
  },
  data() {
    return {
      datalist: [
        [
          {
            name: 'CPU限制',
            value: '不限'
          },
          {
            name: 'CPU申请',
            value: '不限'
          }
          ,
          {
            name: '内存限制',
            value: '不限'
          }
          ,
          {
            name: '内存申请',
            value: '不限'
          }
        ],
        [
          {
            name: '所有容器组最大数量',
            value: '不限'
          },
          {
            name: '无资源限制的容器最大数量',
            value: '不限'
          }
        ],
        [
          {
            name: '存储容量预留',
            value: '不限'
          },
          {
            name: '存储卷最大数量',
            value: '不限'
          }
        ],
        [
          {
            name: '四层负载均衡最大数量',
            value: '不限'
          },
          {
            name: '主机端口最大数量',
            value: '不限'
          },
          {
            name: '配置项最大数量',
            value: '不限'
          },
          {
            name: '加密文件最大数量',
            value: '不限'
          }
        ]
      ]
    }
  },
  methods: {


  },
  watch: {

  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.linestyle {
  border-bottom: 1px solid #ebeef5;
  line-height: 30px;
  padding: 14px 0;
}
</style>
