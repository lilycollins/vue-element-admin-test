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
            :default-expand-all="true"
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
        label: '用户管理',
        children: [{
          id: 4,
          label: '用户信息',
          children: [{
            id: 9,
            label: '创建用户'
          }, {
            id: 10,
            label: '编辑用户'
          },
          {
            id: 15,
            label: '查看用户'
          }]
        },
        {
          id: 40,
          label: '组织管理',
          children: [{
            id: 90,
            label: '创建组织'
          }, {
            id: 100,
            label: '编辑组织'
          },
          {
            id: 101,
            label: '查看组织'
          }]
        }, {
          id: 64,
          label: '角色管理',
          children: [{
            id: 956,
            label: '创建角色'
          }, {
            id: 10773,
            label: '编辑角色'
          },
          {
            id: 106346,
            label: '查看角色'
          }]
        }]
      }, {
        id: 2,
        label: '消防管理',
        children: [{
          id: 445,
          label: '消防设备巡检计划',
          children: [{
            id: 29,
            label: '创建巡检计划'
          }, {
            id: 14340,
            label: '编辑巡检计划'
          },
          {
            id: 14350,
            label: '查看巡检计划'
          }]
        },
        {
          id: 4035,
          label: '消防设施维保计划',
          children: [{
            id: 940,
            label: '创建维保计划'
          }, {
            id: 10520,
            label: '编辑维保计划'
          },
          {
            id: 13401,
            label: '查看维保计划'
          }]
        }, {
          id: 6234,
          label: '历史记录查询',
          children: []
        }, {
          id: 623784,
          label: '消防安全信息发布',
          children: []
        }]
      }, {
        id: 3,
        label: '报修管理',
        children: [{
          id: 57,
          label: '报修事件'
        }, {
          id: 81204,
          label: '维修事件'
        }, {
          id: 814,
          label: '维修工单'
        }]
      }, {
        id: 4,
        label: '耗材管理',
        children: [{
          id: 5247,
          label: ' 耗材预申请'
        }, {
          id: 84,
          label: '耗材领用记录'
        }, {
          id: 8354,
          label: ' 耗材类型',
          children: [{
            id: 9415640,
            label: '创建耗材类型'
          }, {
            id: 15420,
            label: '编辑耗材类型'
          },
          {
            id: 1340451,
            label: '查看耗材类型'
          }]

        }, {
          id: 835154,
          label: ' 耗材耗材信息',
          children: [{
            id: 115640,
            label: '创建耗材信息'
          }, {
            id: 78510,
            label: '编辑耗材信息'
          },
          {
            id: 11451,
            label: '查看耗材信息'
          }]
        }, {
          id: 7654,
          label: ' 供应商管理',
          children: [{
            id: 12540,
            label: '创建供应商'
          }, {
            id: 785890,
            label: '编辑供应商'
          },
          {
            id: 154551,
            label: '查看供应商'
          }]
        }, {
          id: 8544,
          label: '耗材申请'
        }, {
          id: 8545144,
          label: '耗材库存查询'
        }, {
          id: 70654,
          label: ' 耗材入库',
          children: [{
            id: 120540,
            label: '入库'
          }, {
            id: 155890,
            label: '查看入库单'
          }]
        }, {
          id: 75844,
          label: ' 耗材出库',
          children: [{
            id: 65540,
            label: '出库'
          }, {
            id: 48490,
            label: '查看出库单'
          }]
        }, {
          id: 21244,
          label: ' 耗材盘点',
          children: [{
            id: 21540,
            label: '创建盘点计划'
          }, {
            id: 482090,
            label: '盘点'
          }, {
            id: 42580,
            label: '查看盘点单'
          }]
        }, {
          id: 2154,
          label: '  盘点修正',
          children: [{
            id: 951540,
            label: '  创建盘点修正'
          }, {
            id: 481090,
            label: '查看修正单'
          }]
        }, {
          id: 854104,
          label: '耗材申请审核'
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
      this.checkedArr = [3, 10, 90, 15420]
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
