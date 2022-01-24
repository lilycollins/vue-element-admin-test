<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />{{ type === 'add' ? '组织管理 - 创建组织' : '组织管理 - 编辑组织' }}</div>
    <!-- <el-button style="margin: 12px" size="small" type="plain" @click="back">返回</el-button> -->
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="form-item">
      <el-form-item label="组织名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="组织上级" prop="desc">
        <el-input v-model="ruleForm.desc" />
      </el-form-item>
      <el-form-item label="组织角色划分" prop="checkedCities">
        <div class="check-box">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="ruleForm.checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
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
const cityOptions = ['主任', '职员', '秘书', '接待']
export default {
  data() {
    return {
      type: this.$route.params.type,
      ruleForm: {
        name: '',
        desc: '',
        checkedCities: []
      },
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' }
        ]
      },
      checkAll: false,
      cities: cityOptions,
      isIndeterminate: false
    }
  },
  created() {
    if (this.type === 'edit') {
      this.ruleForm = {
        name: '事业1部',
        desc: '事务部',
        checkedCities: []
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
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
