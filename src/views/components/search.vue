<template>

  <div class="name-container" v-show="show">
        <headercontener >
      <el-form
        :inline="true"
        :model="searchModel.formModel"
        :label-width="searchModel.labelWidth?searchModel.labelWidth:'' "
        class="demo-form-inline"
      >
        <el-row
          class="row-bg"
          v-show="searchModel.searchFild && searchModel.searchFild.length>0"
        >
          <el-col
            :span="item.span?item.span:6"
            v-for="item in searchModel.searchFild"
          >
            <el-form-item :label="item.label">
              <!-- 输入框 -->
              <el-input
                v-if="item.type==='input'"
                v-model="searchModel.formModel[item.prop]"
                size="mini"
                :placeholder=' "请输入"+item.label'
              ></el-input>
              <!-- 数字 -->
              <el-input
                v-if="item.type==='number'"
                type="number"
                v-model="searchModel.formModel[item.prop]"
                size="mini"
                :placeholder=' "请输入"+item.label'
              ></el-input>
              <!-- 下拉框 -->
              <el-select
                v-if="item.type==='select'"
                v-model="searchModel.formModel[item.prop]"
                size="mini"
           
              >
                <el-option
                  v-for="op in item.options"
                  :label="op.label"
                  :value="op.value"
                  :key="op.value"
                ></el-option>
              </el-select>
              <!-- 下拉框 -->
              <el-select
                v-if="item.type==='selectSearch'"
                allow-create
                filterable
                v-model="searchModel.formModel[item.prop]"
                size="mini"
         
              >
                <el-option
                  v-for="op in item.options"
                  :label="op.label"
                  :value="op.value"
                  :key="op.value"
                ></el-option>
              </el-select>
              <el-date-picker
                size="mini"
                v-model="searchModel.formModel[item.prop]"
                v-if="item.type==='time'"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="datetimerange"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="searchModel.btnSpan?searchModel.btnSpan:4">
            <el-form-item>
              <el-button
                size="mini"
                icon="el-icon-search"
                @click="onSearch"
              >搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                size="mini"
                icon="el-icon-delete"
                @click="onResets"
              >清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </headercontener>
    
    </div>

</template>

<script>
  import headercontener from '@/views/projectManagement/components/fieldset'

export default {
  name: 'NameSpace',
  components: {
    headercontener,
  },
  props: {
    searchModel: {
      type: Object,
      default: () => {
        return {}
      }
    },
    show:{
      type:Boolean,
      default:true
    }
  },
  methods:{
     onSearch() {
       this.$emit('onSearch')
    },
    onResets() {
      Object.keys(this.searchModel.formModel).map(key => this.searchModel.formModel[ key ] = "")
      this.$emit('onSearch')

    },
  }
  }
</script>

<style lang="scss" scoped>

</style>