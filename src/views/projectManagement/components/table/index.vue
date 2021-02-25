<template>
  <div>
    <actionline
      v-if="actionlinedata&&showactionline"
      :actionlinedata='actionlinedata'
    />
    <el-table
      :data="tableData"
      size="medium"
      :header-cell-style="{background: '#EEF1F6'}"
      :row-style="{'font-size': '14px',color: 'rgb(32, 45, 64)','font-family': 'sans-serif;'}"
      ref="multipleTable"
      row-key="id"
      default-expand-all
      @sort-change="handleSort"
      @filter-change="filterHandler"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      :indent='30'
    >
      <el-table-column
        v-if="showselect"
        type="selection"
        width="55"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-for="(item, key) in tableHeader"
        :type='item.type'
        :key="`tableHeader${key}`"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :sortable="item.sortable?'custom':false"
        :filters="item.filters"
        :column-key="item.columnKey"
        :filtered-value="item.filteredValue"
        :filter-multiple="item.filterMultiple"
        :min-width="item.minWidth"
        :width="item.width"
        :align="cloumalign"
      >

        <template slot-scope="scope">
          <zslot
            v-if="item.render"
            :render="item.render"
            :row="scope.row"
            :index="scope.$index"
            :column="item"
          />
          <zbutton
            v-else-if="'routlink' in item"
            :row='scope.row'
            :item='scope.row[item.prop]'
          >{{ scope.row[item.prop]['name']}}</zbutton>
          <span v-else>{{ scope.row[item.prop]  }}</span>

        </template>
      </el-table-column>
    </el-table>
    <!-- <el-row
      type="flex"
      justify="end"
      style="marginTop:10px"
    >
      <el-col :span="24">
        <el-pagination
          background
          v-if="showpagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10"
        >
        </el-pagination>
      </el-col>
    </el-row> -->
    <div style="float:right;margin:10px 0">
      <el-pagination
        background
        v-if="showpagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page=pagination.currentPage
        :page-sizes="[10, 20, 30, 40]"
        :page-size=pagination.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total?pagination.total:0"
      >
      </el-pagination>
    </div>
    <!-- <el-pagination
      v-if="showpagination"
      layout="prev, pager, next, total"
      :total="10"
    >
    </el-pagination> -->
  </div>
</template>

<script>
/**
    :data="tableData"
    size="medium"
    fit
    :header-cell-style="{height: '30px',padding: '0',background: '#f7f9fa','font-size':
    option.headerfontsize+'px',color: '#8590a6',lineHeight:option.lineHeight + 'px'}"
    :cell-style="{height: '15px',padding: '0'}"
    :row-style="{'font-size': '14px',color: '#212121'}"
    ref="multipleTable"
    border
    stripe
    @sort-change="handleSort"
    @filter-change="filterHandler"
    @row-click="handleRowClick"
    */
import Sortable from "sortablejs";
let zslot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    let params = {
      row: data.props.row,
      index: data.props.index
    }
    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params)
  }
}
export default {
  data() {
    return {
      currentPage4:1,
      clonetabledata: ''
    }
  },
  inject: {
    showactionline: {
      default: true
    }
  },
  components: {
    zslot, zbutton: {
      props: {
        row: Object,
        item: Object
      },
      render(h, data) {
        return h('el-button', {
          attrs: {
            type: 'text'
          },
          style: {
            fontSize: '14px'
          },
          on: {
            'click': () => {
              this.$router.push({
                path: this.$props.item.path
              })
            }
          }
        }, this.$slots.default)
      },
    },
    actionline: {
      props: {
        actionlinedata: Array
      },
      render(h) {
        return h('div', {
          style: {
            marginBottom: '20px'
          }
        }, this.$props.actionlinedata.map(e => e.render(h)))
      },
    }
  },
  props: {
    totle: {
      type: Number,
      default: 0
    },
    expandKey:{
      type: Array,
      default: function () {
        return []
      } 
    },
    // 表格数据
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 表头数据
    tableHeader: {
      type: Array,
      default: function () {
        return []
      }
    },
    pagination:{
      type:Object,
      default: () => {
        return {
          currentPage: 1,
          pagesize: 10,
          totle:10,
          show:true
        }
      }
    },
    showpagination: {
      type: Boolean,
      default: true
    },
    actionlinedata: Array,
    option: {
      type: Object,
      default: () => {
        return {
          headerfontsize: 14,
          lineHeight: ''
        }
      }
    },
    showselect: {
      type: Boolean,
      default: false
    },
    cloumalign: {
      type: String,
      default: 'center'
    },
    cansort: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCurrentChange(val){
       this.$emit('currentChange', val);
    },
    handleSizeChange(val){
      this.$emit('sizeChange', val);
    },
    // 排序事件
    handleSort(sort) {
      this.$emit('sort-events', sort)
    },
    // 筛选事件
    filterHandler(filters) {
      this.$emit('filter-events', filters)
    },
    // 某一行被点击
    handleRowClick(row) {
      this.$emit('click-events', row)
    },
    // 选择器
    handleSelectionChange(val) {
      this.$emit('handle-Selection', val)
    },
    // 重置排序
    resetsort(array, indexa, indexb) {
      array.splice(indexb, 0, array.splice(indexa, 1)[ 0 ])
    },
    // 行排序
    rowsort() {
      if (this.cansort) {
        const rowdom = this.$el.getElementsByTagName('tbody')[ 0 ]
        const _this = this
        Sortable.create(rowdom, {
          sort: this.cansort,
          animation: 150,
          // handle: '.sortclassedit',
          onEnd: ({ newIndex, oldIndex }) => {
            this.resetsort(_this.clonetabledata, newIndex, oldIndex)
            this.$emit('rowsortchange', _this.clonetabledata)
          }
        })
      }
    }

  },
  mounted() {
    this.clonetabledata = JSON.parse(JSON.stringify(this.tableData))
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.rowsort()
  }
}
</script>
<style lang="scss" >
</style>