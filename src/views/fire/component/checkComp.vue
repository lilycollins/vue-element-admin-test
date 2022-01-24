<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />{{ type === 'add' ? '消防设备巡检计划 - 新建巡检计划' : type ==='detail' ? '历史记录查询 - 巡检计划详情' : '消防设备巡检计划 - 编辑巡检计划' }}</div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="form-item">
      <el-form-item label="巡检名称" prop="name">
        <el-select v-model="ruleForm.name" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务编号" prop="a2">
        <el-input v-model="ruleForm.a2" />
      </el-form-item>
      <el-form-item label="巡检人" prop="a3">
        <el-input v-model="ruleForm.a3" />
      </el-form-item>
      <el-form-item label="联系方式" prop="a4">
        <el-input v-model="ruleForm.a4" />
      </el-form-item>
      <el-form-item label="巡检开始时间" prop="a5">
        <el-date-picker
          v-model="ruleForm.a5"
          type="datetime"
          placeholder="选择巡检开始时间"
        />
      </el-form-item>
      <el-form-item label="巡检结束时间" prop="a6">
        <el-date-picker
          v-model="ruleForm.a6"
          type="datetime"
          placeholder="选择巡检结束时间"
        />
      </el-form-item>
      <el-form-item label="巡检内容制定" prop="checkedCities">
        <div class="check-box">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="ruleForm.checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="设备类型" prop="checkedCities2">
        <div class="check-box">
          <el-checkbox v-model="checkAll2" :indeterminate="isIndeterminate2" @change="handleCheckAllChange2">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="ruleForm.checkedCities2" @change="handleCheckedCitiesChange2">
            <el-checkbox v-for="city in cities2" :key="city" :label="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="所属建筑" prop="checkedCities3">
        <div class="check-box">
          <el-checkbox v-model="checkAll3" :indeterminate="isIndeterminate3" @change="handleCheckAllChange3">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="ruleForm.checkedCities3" @change="handleCheckedCitiesChange3">
            <el-checkbox v-for="city in cities3" :key="city" :label="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
const cityOptions = ['消防控制室设备巡检', '水泵房管阀巡检', '楼层消防栓巡检', '消防楼层管阀巡检',
'消防主干管道压力测试', '消防分支管道压力测试', '消防喷淋头巡检', '消防配电巡检',
'楼层火灾报警器检查', '报警联动装置检查', '消防探测器抽查', '消防水箱检查',
'消防主干管道测试', '消防通道情况检查', '消防排烟阀检查', '消防广播检查']
const cityOptions2 = ['消防周边设施', '消防应急', '消防报警设备', '消防灭火设施', '消防警示设备']
const cityOptions3 = ['大楼整体', '外围', '楼层', '控制室', '水泵/水箱']
export default {
  data() {
    return {
      type: this.$route.params.type,
      ruleForm: {
        name: '',
        checkedCities: [],
        checkedCities2: [],
        checkedCities3: [],
        a2: '',
        a3: '',
        a4: '',
        a5: '',
        a6: '',
        a7: ''
      },
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a3: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a4: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a5: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a6: [{ required: true, message: '不能为空', trigger: 'change' }],
        a7: [{ required: true, message: '不能为空', trigger: 'change' }]
      },
      checkAll: false,
      checkAll2: false,
      checkAll3: false,
      cities: cityOptions,
      cities2: cityOptions2,
      cities3: cityOptions3,
      isIndeterminate: false,
      isIndeterminate2: false,
      isIndeterminate3: false,
      options: [{
        value: '1',
        label: '日常巡检'
      }, {
        value: '2',
        label: '周期巡检'
      }, {
        value: '3',
        label: '重点巡检'
      }]
    }
  },
  created() {
    if (['edit', 'detail'].includes(this.type)) {
      this.ruleForm = {
        name: '1',
        a2: '20220101001',
        a3: '张三',
        a4: '15412451245',
        a5: '2022-01-01 10:00',
        a6: '2022-01-01 10:00',
        a7: '',
        checkedCities: ['消防广播检查', '消防水箱检查'],
        checkedCities2: ['消防应急', '消防警示设备'],
        checkedCities3: ['大楼整体', '外围']
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //   alert('submit!')
          this.$message.success('提交成功')
          this.$router.go(-1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    },
    handleCheckAllChange(val) {
      this.ruleForm.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckAllChange2(val) {
      this.ruleForm.checkedCities2 = val ? cityOptions2 : []
      this.isIndeterminate2 = false
    },
    handleCheckAllChange3(val) {
      this.ruleForm.checkedCities3 = val ? cityOptions3 : []
      this.isIndeterminate3 = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    handleCheckedCitiesChange2(value) {
      const checkedCount = value.length
      this.checkAll2 = checkedCount === this.cities2.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.cities2.length
    },
    handleCheckedCitiesChange3(value) {
      const checkedCount = value.length
      this.checkAll3 = checkedCount === this.cities3.length
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities3.length
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
