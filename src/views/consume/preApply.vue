<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      耗材预申请
    </div>
    <div style="display: flex; justify-content: space-between">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="全部状态">
            <el-option key="1" label="确认中" value="1" />
            <el-option key="2" label="审核中" value="2" />
            <el-option key="3" label="审核通过" value="3" />
            <el-option key="4" label="驳回审核" value="4" />
            <el-option key="5" label="采购出库中" value="5" />
            <el-option key="6" label="已发放" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-form-item label="" prop="a5">
            <el-date-picker
              v-model="formInline.a5"
              type="datetime"
              placeholder="选择申请时间"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="formInline.user"
            prefix-icon="el-icon-search"
            placeholder="搜索申请单号"
          />
        </el-form-item>
        <el-form-item>
          <el-button plain class="search-btn" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tag-warp">
      <el-button plain>刷新</el-button>
      <el-button type="primary" @click="addIt">耗材申请</el-button>
      <el-button
        type="danger"
        :disabled="selected.length == 0"
        @click="deleteIt"
      >删除</el-button>
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
</template>
<script>
import myTable from '@/components/Table'
import pagination from '@/components/Pagination'
const field = [
  {
    id: 2,
    type: 0,
    label: '申请单号',
    key: 'a1'
  },
  {
    id: 3,
    type: 0,
    label: '出库单号',
    key: 'a2',
    showOverflow: true
  },
  {
    id: 4,
    type: 7,
    label: '耗材图片',
    key: 'a3'
  }, {
    id: 5,
    type: 0,
    label: '耗材名称',
    key: 'a4'
  }, {
    type: 0,
    label: '耗材类型',
    key: 'a5'
  }, {
    type: 0,
    label: '单位',
    key: 'a6'
  }, {
    type: 0,
    label: '申请数量',
    key: 'a7'
  }, {
    type: 0,
    label: '使用时间',
    key: 'a8'
  }, {
    type: 0,
    label: '状态',
    key: 'a9'
  }, {
    type: 0,
    label: '申请时间',
    key: 'a10'
  }]
export default {
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
          },
          {
            type: 'text',
            key: '2',
            name: '详情'
          },
          {
            type: 'text',
            key: '3',
            name: '删除'
          },
          {
            type: 'text',
            key: '4',
            name: '签收'
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
        a1: '12345678',
        a2: 'fsf121',
        a3: require('../../assets/img/default.svg'),
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '10',
        a8: '2022-01-01',
        a9: '确认中',
        a10: '2022-01-01 10:00'
      }, {
        a1: '12345678',
        a2: '',
        a3: require('../../assets/img/default.svg'),
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '10',
        a8: '2022-01-01',
        a9: '确认中',
        a10: '2022-01-01 10:00'
      }, {
        a1: '12345678',
        a2: '',
        a3: require('../../assets/img/default.svg'),
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '10',
        a8: '2022-01-01',
        a9: '确认中',
        a10: '2022-01-01 10:00'
      }, {
        a1: '12345678',
        a2: '',
        a3: require('../../assets/img/default.svg'),
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '10',
        a8: '2022-01-01',
        a9: '确认中',
        a10: '2022-01-01 10:00'
      }, {
        a1: '12345678',
        a2: '',
        a3: require('../../assets/img/default.svg'),
        a4: '得力A4 70g打印纸',
        a5: '办公用品',
        a6: '包',
        a7: '10',
        a8: '2022-01-01',
        a9: '确认中',
        a10: '2022-01-01 10:00'
      }]
      this.total = 5
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
      if (btn.key === '1') {
        this.$router.push({
          name: 'preAdd', params: {
            type: 'edit'
          }
        })
      }
      if (btn.key === '2') {
        this.$router.push({
          name: 'preDetail', params: {
            type: 'detail'
          }
        })
      }
      if (btn.key === '3') {
        this.deleteIt()
      }
      if (btn.key === '4') {
        this.$router.push({
          name: 'preDetail', params: {
            type: 'check'
          }
        })
      }
    },
    addIt() {
      this.$router.push({
        name: 'preAdd', params: {
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
