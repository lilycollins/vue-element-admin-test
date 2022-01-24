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
      <div v-for="(item, index) in tb" :key="index" class="top-card-box">
        <p style="text-align: center">{{ item.name }}</p>
        <el-table
          :data="item.tableData"
          style="width: 100%; max-height: 500px; overflow-y: auto"
        >
          <el-table-column type="index" label="编号" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="" label="操作" />
        </el-table>
        <div style="position: absolute; bottom: 10px; left: 30px">
          <el-input
            v-model="item.search"
            style="width: 214px"
            prefix-icon="el-icon-search"
            :placeholder="`请输入新的${item.name}`"
          />
          <el-button
            type="primary"
            @click="addItem(item, index)"
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
            address: ''
          }, {
            name: '一级类型',
            address: ''
          }, {
            name: '一级类型',
            address: ''
          }]
        },
        {
          name: '二级耗材类型',
          search: '',
          tableData: [{
            name: '打印纸',
            address: ''
          }, {
            name: '二级类型',
            address: ''
          }]
        },
        {
          name: '三级耗材类型',
          search: '',
          tableData: [{
            name: '70g',
            address: ''
          }, {
            name: '三级类型',
            address: ''
          }]
        }
      ]
    }
  },
  created() {
  },
  methods: {
    addItem(item, index) {
      this.tb[index].tableData.push({
        name: item.search,
        address: ''
      })
      this.tb[index].search = ''
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
  min-height: 600px;
  max-height: 800px;
  width: 350px;
  min-width: 350px;
  overflow-y: auto;
  border: 1px solid #adadad;
  position: relative;
  margin-right: 30px;
}
</style>
