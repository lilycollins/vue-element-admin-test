<template>
  <div class="login-container">
    <div class="login-backGround-img-header">
      <img src="../../assets/img/logo.png" class="logo">
      <span class="login-title">智慧机关管理平台</span>
    </div>
    <div class="login-background-img" />
    <div class="login-background-content">
      <div class="login-backGround-img-content">
        <!-- <img
          src="https://wechatapppro-1252524126.file.myqcloud.com/appPYtT9SmK6848/image/b_u_5b2225aa46488_oGKN7IvA/kvm7z8fw03tt.png"
          class="login-backGround-img-logo"
        > -->
        <img
          src="https://wechatapppro-1252524126.file.myqcloud.com/appPYtT9SmK6848/image/b_u_5b2225aa46488_oGKN7IvA/kvm7z8fw03tt.png"
          class="login-backGround-img-logo"
        >
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">登录智慧机关管理平台</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="用户名"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-form-item prop="code">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="验证码"
            v-model="loginForm.code"
            placeholder="code"
            name="code"
            type="text"
            tabindex="1"
            autocomplete="on"
          />

        </el-form-item>
        <el-button
          class="login-btn"
          :loading="loading"
          type="primary"
          style="width: 100%; margin: 30px 0 20px 0"
          @click.native.prevent="handleLogin"
        >登录
        </el-button>

        <div style="position: relative">
          <!-- <div class="tips">
            <span>Username : admin</span>
            <span>Password : any</span>
          </div>
          <div class="tips">
            <span style="margin-right:18px;">Username : editor</span>
            <span>Password : any</span>
          </div> -->
          <div class="tips">
            <span
              class="forget-span"
              style="margin-right: 18px"
              @click="forgetPass"
            >忘记密码</span>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
// import { verificationCode } from '@/components/VerificationCode/index'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入密码，密码长度大于等于6'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      code: '',
      // 随机抽取四位数
      identifyCodes: '1234567890abcdef',
      identifyCode: '',
      checked: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          // this.redirect = query.redirect
          // this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    // 验证码处理
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 刷新验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          ]
      }
      console.log(this.identifyCode)
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetPass() {
      this.$router.push({ path: '/auth-redirect' })
    }
    // getOtherQuery(query) {
    //   return Object.keys(query).reduce((acc, cur) => {
    //     if (cur !== 'redirect') {
    //       acc[cur] = query[cur]
    //     }
    //     return acc
    //   }, {})
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .logo {
    position: absolute;
    top: 10px;
    left: 210px;
    z-index: 1;
    width: 80px;
    cursor: pointer;
  }

  .login-background-img {
    background-image: url(../../assets/img/loginbg.png);
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
    position: absolute;
    min-height: 730px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .login-backGround-img-header {
    width: 100%;
    height: 110px;
    background: #1472ff;
    position: relative;
    z-index: 100;

    .login-title {
      color: #fff;
      padding: 20px 300px;
      font-weight: 600;
      line-height: 110px;
      font-size: 18px;
    }
  }

  .login-background-content {
    width: 100%;
    height: 496px;
    display: flex;
    margin-top: 6%;
    justify-content: center;

    .login-backGround-img-content {
      z-index: 8;
      width: 680px;
      height: 680px;
      margin-right: 88px;
      transform: translate(0px, -58px);

      .login-backGround-img-logo {
        width: 680px;
        height: 680px;
      }
    }
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #666;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #dcdfe6;
    background: #fff;
    border-radius: 5px;
    color: #333;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    width: 408px;
    min-width: 408px;
    height: 100%;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    padding: 64px 40px 40px 40px;
    background: #fff;
    position: relative;
    box-shadow: 0px 8px 24px 0px rgb(42 94 173 / 6%);

    .login-btn {
      font-size: 16px;
      line-height: 24px;
      border: none;
      color: #fff;
      cursor: pointer;
      text-align: center;
      outline: none;
      width: 328px;
      height: 40px;
      border-radius: 4px;
      opacity: 1;
      border: 0;
      background: #1472ff;
    }
  }

  .tips {
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
    text-align: center;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }

    .forget-span {
      color: #1472ff;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 20px;
      color: black;
      margin: 0px auto 40px auto;
      text-align: left;
      font-weight: 600;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
