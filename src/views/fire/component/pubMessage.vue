<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />{{ type === 'add' ? '消防安全信息发布 - 信息发布' : '消防安全信息发布 - 编辑信息' }}</div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="form-item">
      <el-form-item label="信息主题" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="副标题" prop="a1">
        <el-input v-model="ruleForm.a1" />
      </el-form-item>
      <el-form-item label="信息类别" prop="a2">
        <el-select v-model="ruleForm.a2" placeholder="全部类型">
          <el-option key="1" label="巡检" value="1" />
          <el-option key="2" label="维保" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="信息封面" prop="a3">
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
      <el-form-item label="信息内容" prop="a4">
        <ArticleDetail :is-edit="false" />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="danger" @click="resetForm('ruleForm')">保存</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>

      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import ArticleDetail from './ArticalDetail'
export default {
  components: { ArticleDetail },
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
      }
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
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
