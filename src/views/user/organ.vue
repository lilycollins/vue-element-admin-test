<template>
  <div>
    <div v-show="showParent">
      <el-button type="primary" size="medium" style="width: 110px; margin: 24px" @click="addOrgan">创建组织</el-button>
      <div style="margin: 40px 50px" @click="toggleShow">
        <div>
          <organization-chart :datasource="ds" @node-click="nodeData => clickNode(nodeData)" />
        </div>
      </div>
    </div>
    <div v-show="!showParent">
      <el-button type="primary" size="medium" style="width: 110px; margin: 24px" @click="editOrgan">编辑组织</el-button>
      <div style="margin: 30px 50px">
        <organization-chart :datasource="dsFilter" @node-click="nodeData => clickNode(nodeData)" />
      </div>
      <el-button style="margin: 12px" size="small" type="plain" @click="toggleShow">返回</el-button>
    </div>
  </div>

</template>
<script>
// eslint-disable-next-line no-unused-vars
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'

export default {
  components: {
    OrganizationChart
  },
  data() {
    return {
      showParent: true,
      src: require('../../assets/img/organ1.png'),
      src2: require('../../assets/img/organ2.png'),
      dsFilter: {},
      ds: {
        'id': '1',
        'name': '总部',
        'title': '',
        'children': [
          {
            'id': '2', 'name': '事务部', 'title': '', children: [
              { 'id': '3', 'name': '事务1部', 'title': '' },
              { 'id': '4', 'name': '事务2部', 'title': '' }
            ]
          },
          {
            'id': '5', 'name': '信息部', 'title': '',
            'children': [
              { 'id': '7', 'name': '信息1部', 'title': '' },
              { 'id': '6', 'name': '信息2部', 'title': '' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    toggleShow() {
      this.showParent = !this.showParent
    },
    clickNode(data) {
      if (data.id === 1) {
        return
      }
      this.dsFilter = data
      this.showParent = !this.showParent
    },
    addOrgan() {
      this.$router.push({
        name: 'addChange', params: {
          type: 'add'
        }
      })
    },
    editOrgan() {
      this.$router.push({
          name: 'addChange', params: {
            type: 'edit'
          }
        }
      )
    }
  }
}

</script>

<style lang="scss">

.orgchart {
  background-image: none !important;
}

.orgchart-container {
  position: relative;
  display: inline-block;
  height: 420px;
  width: calc(100% - 24px);
  border: 0px;
  border-radius: 5px;
  overflow: auto;
  text-align: center;
}

.title {
  background-color: #1471ff !important;
}
</style>
