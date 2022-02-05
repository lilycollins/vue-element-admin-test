<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />{{ '报修申请' }}</div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="form-item">
      <el-form-item label="报修主题" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="报修类型" prop="a1">
        <div class="check-box" style="width: 80%">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="ruleForm.a1" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="报修设备名称" prop="a2">
        <el-input v-model="ruleForm.a2" />
      </el-form-item>
      <el-form-item label="报修情况描述" prop="a4">
        <el-input
          v-model="ruleForm.a2"
          style="width: 80%"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 14}"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="附件上传" prop="a3">
        <el-upload
          :multiple="true"
          :file-list="fileList"
          :show-file-list="true"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          class="editor-slide-upload"
          action="https://httpbin.org/post"
          list-type="picture-card"
        >
          <i class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>

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
        a1: '',
        a2: '',
        a3: '',
        a4: ''
      },
      listObj: {},
      fileList: [],
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a1: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a2: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      checkAll: false,
      cities: cityOptions,
      isIndeterminate: false
    }
  },
  created() {
    if (this.type === 'edit') {
      this.ruleForm = {
        name: '全国消防安全检查',
        a1: '全国消防安全检查',
        a2: '1'
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
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    handleCheckAllChange(val) {
      this.ruleForm.a1 = val ? cityOptions : []
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
