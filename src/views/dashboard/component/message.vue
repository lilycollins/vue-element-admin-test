<template>
  <div>
    <el-button style="margin: 12px" size="small" type="plain" @click="back">返回</el-button>
    <div style="width: 80%;margin: auto">
      <img :src="src" style="width: 100%">
      <h1>{{ title }}</h1>
      <span style="font-size: 14px; color: #999">{{ time }} <span style="padding-left: 12px">发布人:{{ publisher }}</span></span>
      <p v-html="content" />
    </div>
  </div>
</template>
<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      driver: null,
      title: '消防安全知识进校园！台江区开展全国消防安全宣传教育日系列活动',
      time: '2022-01-20 12:00:00',
      publisher: '系统管理员',
      src: require('../../../assets/img/default.svg'),
      content: `<p style="letter-spacing: 1px;font-size: 14px">11月9号是全国消防安全宣传教育日，为进一步加强学校安全工作，营造安全稳定和谐的校园环境，进一步提升全校师生的消防安全意识和应急处突的自防自救能力，保障全体师生的生命安全，台江区各中小学组织开展全国消防安全宣传教育日系列活动。
      <br/><br/><br/>福州市第十五中学联合福州市洋中派出所开展全国消防安全宣传教育日系列活动。学校开展消防逃生演练，学校综治副校长吴术霖警官讲解新安法，让“以人为本、生命至上”理念深入人心，并对学校保安员及保卫干部进行了反恐防暴的现场培训和学习演练。
      <br/><br/><br/>福州市台江第五中心小学组织学生进行消防安全疏散应急演练、召开消防安全主题班队会，通过图片、视频、黑板报、手抄报等多种形式，普及消防安全知识，进一步提升学生们对消防安全知识的掌握，为构筑校园消防安全“防火墙”奠定坚实基础。
      <br/><br/><br/>福州市台江区第三实验幼儿园联合福州市消防支援支队、台江区消防救援大队、台江区广达消防站开展消防安全教育及消防演练活动，进一步推进消防安全知识的普及教育工作，提高幼儿园师生的消防安全防范意识，筑牢幼儿园消防安全“防火墙”。
      <br/><br/><br/>福州市瀛滨小学开展消防安全培训演练、消防安全班会课、消防安全手抄报绘画比赛和绘制家庭逃生路线图活动，进一步强化消防安全意识。
      <br/><br/><br/>福州市南公幼儿园走进消防队，实地学习消防知识，体验消防员的日常生活，进一步提高了孩子们的安全意识和自我保护能力。
      <br/><br/><br/></p>`
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
