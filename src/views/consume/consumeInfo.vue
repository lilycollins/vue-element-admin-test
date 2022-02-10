<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      耗材信息
    </div>
    <div class="head-select-btn mw700">
      <div class="tag-warp">
        <el-button plain>刷新</el-button>
        <el-button type="primary" @click="addIt">创建</el-button>
        <el-button
          type="danger"
          :disabled="selected.length == 0"
          @click="deleteIt"
        >删除
        </el-button>
        <div style="margin-left: 10px">
          <el-dropdown>
            <el-button type="info">
              全部供应商<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>米宝供应商</el-dropdown-item>
              <el-dropdown-item>大宝供应商</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

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
            placeholder="搜索供应商编号/名称"
          />
        </el-form-item>
        <el-form-item style="margin-left: 10px">
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="head-select-btn mw700">
      <div
        style="
          flex: 1;
          border: 1px solid #dfe6ec;
          height: 600px;
          margin-right: 15px;
        "
      >
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
              <el-tree
                ref="tree"
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
              />

            </el-col>
          </el-row>
        </div>
      </div>
      <div style="flex: 3">
        <div
          style="
            height: 30px;
            background: #cccccc;
            text-align: center;
            line-height: 30px;
          "
        >
          商品类型
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
    label: '供应商',
    key: 'a6'
  }, {
    id: 8,
    type: 0,
    label: '保质期',
    key: 'a7'
  }, {
    id: 10,
    type: 0,
    label: '最后一次采购日期',
    width: '140',
    key: 'a8'
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
        operationName: '操作',
        operationWidth: '180',
        OperationBtn: [
          {
            type: 'text',
            key: '1',
            name: '编辑'
          }
        ]
      },
      total: 0,
      selected: [],
      data: [{
          id: 1,
          label: '一级耗材类型',
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
          label: '二级耗材类型',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '三级耗材类型',
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
        'a8': '2021-01-02  12:12'
      }, {
        'a1': require('../../assets/img/default.svg'),
        'a2': '1234567890123',
        'a3': '得力A4 70g打印纸',
        'a4': '办公用品',
        'a5': '包',
        'a6': '米宝供应商',
        'a7': '12个月',
        'a8': '2021-01-02  12:12'
      }, {
        'a1': require('../../assets/img/default.svg'),
        'a2': '1234567890123',
        'a3': '得力A4 70g打印纸',
        'a4': '办公用品',
        'a5': '包',
        'a6': '米宝供应商',
        'a7': '12个月',
        'a8': '2021-01-02  12:12'
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
    filterNode() {},
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
        name: 'messageChange', params: {
          type: 'edit'
        }
      })
    },
    addIt() {
      this.$router.push({
        name: 'messageChange', params: {
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
