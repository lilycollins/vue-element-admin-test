<template>
  <div class="main-content">
    <div class="sub-title-head"> <div class="l-box" />{{ type === 'add' ? '角色管理 - 创建角色' : '角色管理 - 编辑角色' }}</div>
    <!-- <el-button style="margin: 12px" size="small" type="plain" @click="back">返回</el-button> -->
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="form-item">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="是否启用" prop="desc">
        <el-switch
          v-model="ruleForm.desc"
          active-color="#13ce66"
          active-text=""
          inactive-text=""
        />
      </el-form-item>
      <el-form-item label="角色定义" prop="desc2">
        <el-input
          v-model="ruleForm.desc2"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 8}"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="角色权限">
        <div class="check-box" style="width: 100%">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="checkedArr"
            :props="defaultProps"
          />
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
export default {
  data() {
    return {
      type: this.$route.params.type,
      ruleForm: {
        name: '',
        desc: false,
        desc2: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' }
        ]
      },
      checkAll: false,
      selectedList: [],
      isIndeterminate: false,
      checkedArr: [],
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    if (this.type === 'edit') {
      this.ruleForm = {
        name: '超级管理员',
        desc: true,
        desc2: ''
      }
      this.checkedArr = [5]
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
    handleCheckAllChange() {
      if (this.checkAll) {
        const allNode = this.getSelectedTree(this.$refs.tree.children)
        this.$refs.tree.setCheckedKeys(allNode)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
      this.isIndeterminate = false
    },
    getSelectedTree(tree) {
      const res = []
      let list = [...tree]
      while (list.length) {
        const item = list.pop()
        if (item.children && item.children.length) {
          list = list.concat(item.children)
        } else {
          res.push(item.id)
        }
      }
      return res
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
