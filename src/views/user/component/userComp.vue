<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      {{ type === "add" ? "用户信息 - 创建用户" : "用户信息 - 编辑用户" }}
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="form-item"
    >
      <el-form-item label="用户编号" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="是否启用" prop="a1">
        <el-switch
          v-model="ruleForm.a1"
          active-color="#13ce66"
          active-text=""
          inactive-text=""
        />
      </el-form-item>
      <el-form-item label="用户姓名" prop="a2">
        <el-input v-model="ruleForm.a2" />
      </el-form-item>
      <el-form-item label="年龄" prop="a3">
        <el-input v-model="ruleForm.a3" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="a4">
        <el-input v-model="ruleForm.a4" />
      </el-form-item>
      <el-form-item label="邮箱" prop="a5">
        <el-input v-model="ruleForm.a5" />
      </el-form-item>
      <el-form-item label="部门" prop="a6">
        <el-select v-model="ruleForm.a6" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="a7">
        <el-select v-model="ruleForm.a7" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确定</el-button>
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
        a2: '',
        a3: '',
        a4: '',
        a5: '',
        a6: '',
        a7: '',
        a1: ''
      },
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a2: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a3: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a4: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a5: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a6: [{ required: true, message: '不能为空', trigger: 'change' }],
        a7: [{ required: true, message: '不能为空', trigger: 'change' }]
      },
      checkAll: false,
      cities: cityOptions,
      isIndeterminate: false,
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
        name: '01',
        a1: true,
        a2: '张三',
        a3: '12',
        a4: '441241199001124512',
        a5: '673535677@hh.com',
        a6: '选项5',
        a7: '选项4'
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
