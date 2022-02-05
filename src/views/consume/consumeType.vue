<template>
  <div class="main-content">
    <div class="sub-title-head">
      <div class="l-box" />
      耗材类型
    </div>
    <div class="tag-warp">
      <el-button plain>刷新</el-button>
    </div>
    <div class="top-card">
      <!-- 一级 -->
      <div v-for="(item, index) in tb" :key="item.name" class="top-card-box">
        <p style="text-align: center">{{ item.name }}</p>
        <el-table
          :data="item.tableData"
          highlight-current-row
          style="width: 100%; max-height: 500px; overflow-y: auto"
          @current-change="handleCurrentChange"
        >
          <el-table-column type="index" label="编号" />

          <el-table-column label="名称">
            <template slot-scope="scope">
              <span style="cursor:pointer" @click="chooseCurrent(scope.row)">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" />
        </el-table>
        <div style="position: absolute; bottom: 10px; left: 30px">
          <el-input
            v-model.trim="item.search"
            style="width: 200px"
            prefix-icon="el-icon-search"
            :placeholder="`请输入新的${item.name}`"
          />
          <el-button
            type="primary"
            :disabled="!item.search"
            @click="addItem(tb, item, index)"
          >添加</el-button>
        </div>
      </div>
      <!-- 二级 -->
      <div v-for="(item, index) in subTb" :key="item.name" class="top-card-box">
        <p style="text-align: center">{{ item.name }}</p>
        <el-table
          :data="item.tableData"
          highlight-current-row
          style="width: 100%; max-height: 500px; overflow-y: auto"
          @current-change="handleSecondChange"
        >
          <el-table-column type="index" label="编号" />

          <el-table-column label="名称">
            <template slot-scope="scope">
              <span style="cursor:pointer; padding: 10px" @click="chooseThird(scope.row)">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" />
        </el-table>
        <div style="position: absolute; bottom: 10px; left: 30px">
          <el-input
            v-model.trim="item.search"
            style="width: 200px"
            prefix-icon="el-icon-search"
            :placeholder="`请输入新的${item.name}`"
          />
          <el-button
            type="primary"
            :disabled="!item.search || !subCurrent"
            @click="addItem(subTb,item, index)"
          >添加</el-button>
        </div>
      </div>
      <!-- 三级 -->
      <div v-for="(item, index) in thirdTb" :key="item.name" class="top-card-box">
        <p style="text-align: center">{{ item.name }}</p>
        <el-table
          :data="item.tableData"
          style="width: 100%; max-height: 500px; overflow-y: auto"
        >
          <el-table-column type="index" label="编号" />

          <el-table-column label="名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" />
        </el-table>
        <div style="position: absolute; bottom: 10px; left: 30px">
          <el-input
            v-model.trim="item.search"
            style="width: 200px"
            prefix-icon="el-icon-search"
            :placeholder="`请输入新的${item.name}`"
          />
          <el-button
            type="primary"
            :disabled="!item.search || !secondCurrent"
            @click="addItem(thirdTb, item, index)"
          >添加</el-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      formInline: {
        user: ''
      },
      tb: [
        {
          name: '一级耗材类型',
          search: '',
          tableData: [{
            name: '办公用品',
            address: '',
            children: {
              name: '二级耗材类型',
              search: '',
              tableData: [{
                name: '打印纸',
                address: '',
                children: {
                  name: '三级耗材类型',
                  search: '',
                  tableData: [{
                    name: '70g',
                    address: '',
                    children: {}
                  }, {
                    name: '三级类型',
                    address: '',
                    children: {}
                  }]
                }
              }, {
                name: '二级类型',
                address: '',
                children: {
                  tableData: []
                }
              }]
            }
          }, {
            name: '一级类型',
            address: '',
            children: {
              tableData: []
            }
          }, {
            name: '一级类型',
            address: '',
            children: {
              tableData: []
            }
          }]
        }
      ],
      subTb: [{
        name: '二级耗材类型',
        search: '',
        tableData: []
      }],
      thirdTb: [{
        name: '三级耗材类型',
        search: '',
        tableData: []
      }],
      subCurrent: null,
      secondCurrent: null
    }
  },
  created() {
  },
  methods: {
    addItem(tbItem, item, index) {
      tbItem[index].tableData.push({
        name: item.search,
        address: '',
        children: {
          tableData: []
        }
      })
      tbItem[index].search = ''
    },
    chooseCurrent(row) {
      this.subTb = [{
        name: '二级耗材类型',
        search: '',
        tableData: []
      }]
       this.thirdTb = [{
        name: '三级耗材类型',
        search: '',
        tableData: []
      }]
      this.subTb[0].tableData = row.children.tableData
    },
    chooseThird(row) {
      this.thirdTb = [{
        name: '三级耗材类型',
        search: '',
        tableData: []
      }]
      this.thirdTb[0].tableData = row.children.tableData
    },
    handleCurrentChange(currentRow) {
      this.subCurrent = currentRow
    },
    handleSecondChange(currentRow) {
      this.secondCurrent = currentRow
    }
  }
}
</script>
<style scoped>
.top-card {
  display: flex;
  justify-content: center;
  padding: 20px 105px;
}
.top-card-box {
  min-height: calc(100vh - 240px);
  max-height: 800px;
  /* width: 350px; */
  min-width: 320px;
  max-width: 400px;
  overflow-y: auto;
  border: 1px solid #adadad;
  position: relative;
  margin-right: 30px;
}
</style>
