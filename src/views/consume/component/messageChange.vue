<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      耗材信息 - 创建耗材信息
    </div>
    <h4>基本信息</h4>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="130px"
      class="form-item"
    >
      <el-form-item label="耗材编号" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="耗材名称" prop="a1">
        <el-input v-model="ruleForm.a1" />
      </el-form-item>
      <el-form-item label="耗材类型" prop="a2">
        <el-select v-model="ruleForm.a2" placeholder="全部类型">
          <el-option key="1" label="一级耗材类型" value="1" />
          <el-option key="2" label="二级耗材类型" value="2" />
          <el-option key="3" label="三级耗材类型" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="单位" prop="a3">
        <el-input v-model="ruleForm.a3" />
      </el-form-item>
      <el-form-item label="耗材单价" prop="a8">
        <el-input v-model="ruleForm.a3" />
      </el-form-item>
      <el-form-item label="质保时间" prop="a4">
        <el-input v-model="ruleForm.a4" />
      </el-form-item>
      <h4>其他信息</h4>
      <el-form-item label="供应商" prop="a5">
        <el-input v-model="ruleForm.a5" />
      </el-form-item>
      <el-form-item label="采购时间" prop="a6">
        <el-date-picker
          v-model="ruleForm.a6"
          type="datetime"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="商品图片" prop="a7">
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
        <el-button
          type="primary"
          @click="resetForm('ruleForm')"
        >确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: this.$route.params.type,
      ruleForm: {
        name: '',
        a1: '',
        a2: '',
        a3: '',
        a4: '',
        a5: '',
        a6: '', a7: '', a8: ''
      },
      listObj: {},
      fileList: [],
      rules: {
        a1: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a2: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a3: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a4: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a5: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a6: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a7: [{ required: true, message: '不能为空', trigger: 'blur' }],
        a8: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.type === 'edit') {
      this.ruleForm = {
        name: '12345678',
        a1: '得力A4 70g打印纸',
        a2: '办公用品',
        a3: '包',
        a4: '12个月',
        a5: '米宝供应商',
        a6: '2020-01-01', a7: ''
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
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
