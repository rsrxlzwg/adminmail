<template>
  <div>
    <el-row
      v-for="(item,key) in listmap"
      class="rowline"
      :key="key"
    >
      <el-col :span="4">
        <span style="fontSize:14px">{{item.name}}</span>
        <i :class="item.icon"></i>
      </el-col>
      <el-col :span="20">
        <span v-if="item.id == 1">
          <el-input size="mini"></el-input>
        </span>
        <span v-if="item.id == 2">
          <renderdate
            :tableHeader='tableHeader'
            :tableData='tableData1'
            :showpagination='false'
            :option="{headerfontsize: 13,lineHeight: 20}"
          />
          <el-button
            style="fontSize:16px"
            size="small"
            type="text"
            icon="el-icon-circle-plus"
            @click="tableData1.push({key:'',value:''})"
          >新增</el-button>
        </span>
        <span v-if="item.id == 3">
          <el-row style="lineHeight:40px">
            <el-col :span="24">
              <el-radio
                v-model="radio"
                label="1"
              >存储源</el-radio>
              <el-radio
                v-model="radio"
                label="2"
              >存储类型</el-radio>
            </el-col>
            <el-col :span="24">
              <el-card
                style="backgroundColor:#F5F7FA"
                shadow='never'
              >
                <el-row v-if="radio == 2">
                  <selectop />
                </el-row>
                <el-row v-if="radio == 1">
                  <cl-col :span='24'>
                    <span>选择器（必填）</span>
                  </cl-col>
                </el-row>
                <el-row v-if="radio == 1">
                  <el-col :span="24">
                    <el-radio
                      v-model="radio1"
                      label="1"
                    >一个存储原</el-radio>
                    <el-radio
                      v-model="radio1"
                      label="2"
                    >指定标签下的存储原</el-radio>
                  </el-col>
                  <el-col :span="24">
                    <span v-if="radio1 == 1">
                      <selectop />
                      <div style="fontSize:14px;color:#ccc">请联系平台管理员</div>
                    </span>
                    <span v-if="radio1 == 2">
                      <el-row>
                        <renderdate
                          :tableHeader='tableHeader'
                          :tableData='tableData'
                          :showpagination='false'
                          :option="{headerfontsize: 13,lineHeight: 20}"
                        />
                      </el-row>
                      <div>
                        <el-button
                          style="fontSize:16px"
                          size="small"
                          type="text"
                          icon="el-icon-circle-plus"
                          @click="tableData.push({key:'',value:''})"
                        >新增</el-button>
                      </div>
                    </span>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import renderdate from '@/views/projectManagement/components/table'
export default {
  data() {
    return {
      radio: '1',
      radio1: '1',
      listmap: [
        {
          name: '卷名称',
          icon: 'el-icon-warning-outline',
          id: 1
        },
        {
          name: '标签',
          icon: 'el-icon-warning-outline',
          id: 2

        },
        {
          name: '存储整理',
          icon: 'el-icon-warning-outline',
          id: 3
        }
      ],
      tableHeader: [
        {
          prop: 'key',
          label: '键',
          render: (h, params) => {
            return h('el-input', {
              attrs: {
                value: params.row[ 'key' ],
                size: 'mini'
              },
              style: {
                padding: '10px'
              },
              on: {
                input: (value) => {
                  params.row[ 'key' ] = value
                }
              }
            })
          }
        },
        {
          prop: 'value',
          label: '值',
          render: (h, params) => {
            return h('el-input', {
              attrs: {
                value: params.row[ 'value' ],
                size: 'mini'
              },
              style: {
                padding: '10px'
              },
              on: {
                input: (value) => {
                  params.row[ 'value' ] = value
                }
              }
            })
          }
        },
        {
          prop: 'edit',
          label: '操作',
          width: '50',
          render: (h, params) => {
            return h('i', {
              attrs: {
                class: 'el-icon-remove'
              },
              style: {
                fontSize: '15px'
              }
            })
          }
        }
      ],
      tableData: [

      ],
      tableData1: [

      ],
      tags: [
        { name: '标签', type: '' },
        { name: '标签', type: '' },
      ]
    }
  },
  components: {
    selectop: {
      render(h) {
        return h('el-select', {
          attrs: {
            placeholder: '请选择',
            size: 'small'
          }
        })
      },
    },
    renderdate
  }
}
</script>

<style scoped lang="scss">
/deep/ .rowline {
  line-height: 80px;
  border-bottom: 1px solid #ebeef5;
}
</style>