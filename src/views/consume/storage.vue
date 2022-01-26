<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      耗材库存查询
    </div>
    <div class="head-select-btn mw700" style="margin: 0 20px">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="margin-left: 10px"
      >
        <el-form-item label="">
          <el-input
            v-model="formInline.user"
            prefix-icon="el-icon-search"
            placeholder="搜索耗材编号/名称"
          />
        </el-form-item>
        <el-form-item style="margin-left: 10px">
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
      </div>
    </div>

    <div class="head-select-btn mw700">
      <div style="flex: 1; padding: 20px">
        <div
          style="
            height: 30px;
            background: #cccccc;
            text-align: center;
            line-height: 30px;
            min-width: 300px;
          "
        >
          耗材类型
        </div>
        <div>
          <el-row class="tac">
            <el-col>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <div style="padding-left: 20px !important">
                      <!-- <i class="el-icon-location" /> -->
                      <span>一级类型</span>
                    </div>
                  </template>
                  <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                  <!-- <i class="el-icon-menu" /> -->
                  <span slot="title">二级类型</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <!-- <i class="el-icon-document" /> -->
                  <span slot="title">三级类型</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <!-- <i class="el-icon-setting" /> -->
                  <span slot="title">四级类型</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="flex: 3; padding: 20px">
        <div
          style="
            height: 30px;
            background: #cccccc;
            text-align: center;
            line-height: 30px;
          "
        >
          耗材信息
        </div>
        <!-- 表格 -->
        <my-table :tb="tb" @choose="tbSelect" @editRow="editRow" />
        <!-- 分页 -->
        <pagination
          v-show="total >= 0"
          :total="total"
          :page.sync="form.pageIndex"
          :limit.sync="form.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>
<script>
import myTable from '@/components/Table'
import pagination from '@/components/Pagination'

const field = [
  {
    id: 2,
    type: 7,
    label: '图片',
    key: 'a1'
  },
  {
    id: 3,
    type: 0,
    label: '耗材编号',
    key: 'a2',
    showOverflow: true
  },
  {
    id: 4,
    type: 0,
    label: '耗材名称',
    key: 'a3'
  }, {
    id: 5,
    type: 0,
    label: '耗材类型',
    key: 'a4'
  }, {
    id: 6,
    type: 0,
    label: '单位',
    key: 'a5'
  }, {
    id: 7,
    type: 0,
    label: '当前库存',
    key: 'a7'
  }, {
    id: 8,
    type: 0,
    label: '供应商',
    key: 'a6'
  }]
export default {
  name: 'ConsumeInfo',
  components: {
    myTable,
    pagination
  },
  data() {
    return {
      form: {
        pageIndex: 1,
        pageSize: 20
      },
      formInline: {
        user: '',
        time: ''
      },
      tabPosition: 'check',
      tb: {
        fields: field,
        data: [],
        index: true,
        selectionBtn: true,
        height: null,
        operationName: '变动明细',
        operationWidth: '180',
        OperationBtn: [
          {
            type: 'text',
            key: '1',
            name: '详情'
          }
        ]
      },
      total: 0,
      selected: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.tb.height = document.body.clientHeight - 240
  },
  methods: {
    getList() {
      this.tb.data = [{
        'a1': require('../../assets/img/default.svg'),
        'a2': '1234567890123',
        'a3': '得力A4 70g打印纸',
        'a4': '办公用品',
        'a5': '包',
        'a6': '米宝供应商',
        'a7': '12个月',
        'a8': ''
      }, {
        'a1': require('../../assets/img/default.svg'),
        'a2': '1234567890123',
        'a3': '得力A4 70g打印纸',
        'a4': '办公用品',
        'a5': '包',
        'a6': '米宝供应商',
        'a7': '12个月',
        'a8': ''
      }, {
        'a1': require('../../assets/img/default.svg'),
        'a2': '1234567890123',
        'a3': '得力A4 70g打印纸',
        'a4': '办公用品',
        'a5': '包',
        'a6': '米宝供应商',
        'a7': '12个月',
        'a8': ''
      }]
      this.total = 3
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val
      this.getList()
    },
    onSubmit() {
      this.form.pageIndex = 1
      this.getList()
    },
    tbSelect(select) {
      this.selected = []
      select.forEach(ele => {
        this.selected.push(ele.id)
      })
    },
    editRow({ row }, btn, index) {
      this.$router.push({
        name: 'storageDetail'
      })
    },
    addIt() {
      this.$router.push({
        name: 'supplyChange', params: {
          type: 'add'
        }
      })
    },
    deleteIt() {
      this.$alert('确定要删除吗？', '确认提示', {
        confirmButtonText: '确定'
      }).then(() => {
        this.$message.success('操作成功')
      })
    }
  }
}
</script>

<style scoped>
.el-dropdown {
  vertical-align: top;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
