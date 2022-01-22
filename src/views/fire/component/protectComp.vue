<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />{{ type === 'add' ? '消防设施维保计划 - 新建维保计划' : '消防设施维保计划 - 编辑维保计划' }}</div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="form-item">
      <el-form-item label="任务编号" prop="a2">
        <el-input v-model="ruleForm.a2" />
      </el-form-item>
      <el-form-item label="维保时间" prop="a5">
        <el-date-picker
          v-model="ruleForm.a5"
          type="datetime"
          placeholder="选择维保时间"
        />
      </el-form-item>
      <el-form-item label="维保人" prop="a3">
        <el-input v-model="ruleForm.a3" />
      </el-form-item>
      <el-form-item label="联系方式" prop="a4">
        <el-input v-model="ruleForm.a4" />
      </el-form-item>
      <el-form-item label="维保名称" prop="checkedCities">
        <div class="check-box">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="ruleForm.checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="维保内容定制" prop="checkedCities2">
        <div class="check-box">
          <div v-for="(value, name) of filterObj" :key="name" style="margin: 15px 0;">
            <h4>{{ name }}</h4>
            <el-checkbox-group v-model="ruleForm.checkedCities2">
              <el-checkbox v-for="item in value" :key="item" :label="item">{{ item }}</el-checkbox>
            </el-checkbox-group>
          </div>
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
const cityOptions = ['name1', 'name2', 'name3', 'name4']
const subOptions = {
  'name1': ['sub1', 'sub2', 'sub3'],
  'name2': ['sub1-', 'sub2-', 'sub3-'],
  'name3': ['sub+1', 'sub2+', 'sub3+'],
  'name4': ['sub1.', 'sub2.', 'sub3.']
}
export default {
  data() {
    return {
      type: this.$route.params.type,
      ruleForm: {
        name: '',
        checkedCities: [],
        checkedCities2: [],
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
      subOptions: subOptions,
      filterObj: {},
      isIndeterminate: false,
      isIndeterminate2: false,
      isIndeterminate3: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '职员'
      }, {
        value: '选项5',
        label: '事业部'
      }]
    }
  },
  created() {
    if (this.type === 'edit') {
      this.ruleForm = {
        a2: '20220101001',
        a3: '张三',
        a4: '15412451245',
        a5: '2022-01-01 10:00',
        checkedCities: ['name1', 'name3'],
        checkedCities2: ['name1', 'name3']
      }
      this.filterObj = {
        'name1': ['sub1', 'sub2', 'sub3'],
        'name2': ['sub1-', 'sub2-', 'sub3-']
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
    handleCheckedCitiesChange(value) {
      this.filterObj = {}
      value.forEach(val => {
        if (Object.keys(this.subOptions).includes(val)) {
          this.filterObj[val] = this.subOptions[val]
        }
      })
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
