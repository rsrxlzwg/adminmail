<template>
  <div>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
     
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <div v-for="city in cities" :label="city" :key="city.value" style="margin-bottom:20px">
          <el-checkbox >{{city.label}}{{city.status?'已下发':'未下发'}} </el-checkbox>
        </div>
      </el-checkbox-group>
  </div>
</template>

<script>
const cityOptions = [
          {label:'ECIF05[9.1.13.04]',status:false,value:1},
          {label:'ECIF06[9.1.13.05]',status:false,value:2}
        ];
  export default {
    data(){
      return {
         checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        fileData:{
          content:[
            {
              workload:'',
              versions:'',
            }
          ],
      },
      }

    },
    methods:{
       handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  }
</script>

<style lang="scss" scoped>
/deep/ .el-radio{
  margin-bottom: 30px;
}

</style>