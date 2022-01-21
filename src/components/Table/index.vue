<template>
  <div class="table-warp">
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tb.data"
      :max-height="tb.height"
      highlight-current-row
      tooltip-effect="dark"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中"
      element-loading-background="rgba(0, 0, 0, 0.1)"
      size="middle"
      :default-sort="tb.tbDefaultSort"
      width="100%"
      border
      @current-change="handleCurrentPage"
      @selection-change="tbSelectionChange"
      @sort-change="tbsortChange"
    >
      <!-- 需要做下判斷，有些不需要多选 -->
      <el-table-column v-if="tb.selectionBtn" type="selection" align="center" :selectable="selectable" />
      <el-table-column v-if="tb.index" type="index" width="50" align="center" label="序号" />
      <el-table-column
        v-for="field in tb.fields"
        :key="field.id"
        :align="field.align||'center'"
        :header-align="field.Halign||'center'"
        :prop="field.key"
        :label="field.label"
        :width="field.width"
        :show-overflow-tooltip="field.showOverflow && true"
        :sortable="field.sortable"
      >
        <template slot-scope="scope">
          <!-- 普通样式 -->
          <template v-if="field.type == '0'">
            {{ scope.row[scope.column.property] }}
          </template>
          <!-- 普通样式+百分比 -->
          <template v-if="field.type == '1'">
            {{ scope.row[scope.column.property] + '%' }}
          </template>
          <!-- a标签 -->
          <template v-if="field.type == '2'">
            <a href="javascript:void(0)" class="el-button--text" @click="goDetail(scope,0)">{{ scope.row[scope.column.property] }}</a>
          </template>
          <!-- a标签加单选框 -->
          <template v-if="field.type == '3'">
            <el-radio v-model="radio" class="radio" :label="scope.$index" @change.native="getCurrentRow(scope)">&nbsp;
            </el-radio>
            {{ scope.row[scope.column.property] }}
          </template>
          <!-- 开关按钮 -->
          <template v-if="field.type == '4'">
            <el-switch
              v-model="scope.row[scope.column.property]"
              active-value="1"
              inactive-value="0"
              active-color="#79cf96"
              inactive-color="#E0EE0"
              disabled
              @change="change(scope.$index,scope.row)"
            />
          </template>
          <!-- 转换时间格式 -->
          <template v-if="field.type == '5'">
            {{ scope.row[scope.column.property] | parseTime }}
          </template>
          <!-- 颜色 -->
          <template v-if="field.type == '6'">
            <span :class="scope.row[scope.column.property] === '禁用'?'danger':'normal'">
              {{ scope.row[scope.column.property] }}
            </span>
          </template>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column v-if="tb.OperationBtn" :label="tb.operationName" :width="tb.operationWidth" align="center" fixed="right" class="tbOperationBtn">
        <template slot-scope="scope">
          <el-button v-for="(btn,index) in tb.OperationBtn" :key="scope.row[btn.icon] || btn.key" :type="btn.type" :size="btn.size" :icon="btn.icon" :disabled="scope.row[btn.disableKey]" @click="HandleClick(scope, btn, index)">
            <template>
              <el-link size="mini" :underline="false" type="primary">{{ btn.name }}</el-link>
            </template>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
var height = window.innerHeight
export default {
  name: 'Mytable',
  props: {
    tb: {
      type: Object,
      default() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      selected: {},
      currentData: [],
      tableHeight: 0,
      radio: '',
      checked: false
    }
  },
  created() {
    this.tableHeight = (height - this.tb.height) < 500 ? 500 : (height - this.tb.height)
  },
  methods: {
    // 复选框是否可用
    selectable(row, index) {
      // 有禁用复选框需求的
      if (this.tb.disableSelect) {
        return !row.disSelect
      } else {
        return true
      }
    },
    // 表行数
    indexMethod(index) {
      return index + 1
    },
    // 多选- 点击selection按钮选择一或多行
    tbSelectionChange(selection) {
      this.selected = selection
      if (selection) {
        this.$emit('choose', selection, this.$refs.multipleTable)
      }
    },
    tbsortChange(item) {
      this.$emit('sortChange', item)
    },
    // 选中表格行-切换当前所选行
    handleCurrentPage(currentRow, oldCurrentRow) {
      this.currentData = currentRow
    },
    // 跳转
    goDetail(scope, index) {
      this.$emit('goDetail', scope, index)
    },
    // 操作-点击按钮事件,根据btn.key改变
    HandleClick(scope, btn, index) {
      this.$emit('editRow', scope, btn, index)
    },
    // 单选框获取当前行
    getCurrentRow(scope) {
      this.$emit('choice', scope)
    }

  }
}

</script>

<style lang="scss" scoped>
  .el-icon-download.el-button--text {
    font-size: 18px !important
  }

  .el-icon-service.el-button--text {
    font-size: 16px !important
  }

  .el-icon-delete {
    color: #ffa4a4;
  }
  .danger {
    color: red;
  }
  .normal {
    color: #89e7b3;
  }

  .span-delete {
    text-decoration: line-through;
    color: #888888;
  }
  .phone-recognize {
    input {
        opacity: 0;
        position: absolute;
        z-index:2;
        width: 60px;
        height: 33px;
    }
  }

</style>
