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
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="a7">
        <el-select v-model="ruleForm.a7" placeholder="请选择">
          <el-option
            v-for="item in options2"
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
      options2: [{
        value: '1',
        label: '职员'
      }, {
        value: '2',
        label: '主任'
      }, {
        value: '3',
        label: '科长'
      }, {
        value: '4',
        label: '库管'
      }],
       options: [{
          label: '综合部',
          options: [{
            value: 'Shanghai',
            label: '安保部'
          }, {
            value: 'Beijing',
            label: '安保1科'
          }]
        }, {
          label: ' ',
          options: [{
            value: 'Chengdu',
            label: '事业部'
          }, {
            value: 'Shenzhen',
            label: '技术部'
          }]
        }]
    }
  },
  created() {
    if (this.type === 'edit') {
      this.ruleForm = {
        name: 'A123456789',
        a1: true,
        a2: '米小宝',
        a3: '30',
        a4: '441241199001124512',
        a5: '673535677@163.com',
        a6: 'Chengdu',
        a7: '1'
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
