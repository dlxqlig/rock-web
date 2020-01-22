<template>
  <div class="login-container">
    <div class="login-info">
      <div class="title">Rock管理系统</div>
      <div class="desc">大道至简</div>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" autocomplete="off" label-position="left">
      <div class="title-container">
        <h3 class="title">
          系统登录
        </h3>
      </div>
      <span v-if="login.type === 'up'">
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="el-icon-user"
            name="username"
            type="text"
            autocomplete="off"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-key"
            type="password"
            placeholder="密码"
            name="password"
            autocomplete="off"
            :show-password="true"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="code" class="code-input">
          <el-input
            ref="code"
            v-model="loginForm.code"
            prefix-icon="el-icon-lock"
            placeholder="验证码"
            name="code"
            type="text"
            autocomplete="off"
            style="width: 70%"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <img :src="imageCode" alt="codeImage" class="code-image" @click="getCodeImage">
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:14px;" @click.native.prevent="handleLogin">
        登录
        </el-button>
      </span>

    </el-form>
    <span class="login-footer">
      © 2019 FlyBird Rock
    </span>
  </div>
</template>

<script>
import db from '@/utils/localstorage'
import { randomNum } from '@/utils'
  import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      codeUrl: `${process.env.BASE_API}/auth/captcha`,
      login: {
        type: 'up'
      },
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: { required: true, message: '必须输入', trigger: 'blur' },
        password: { required: true, message: '必须输入', trigger: 'blur' },
        code: { required: true, message: '必须输入', trigger: 'blur' },
      },
      authUser: null,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      randomId: randomNum(24, 16),
      imageCode: '',
      page: {
        width: window.screen.width * 0.5,
        height: window.screen.height * 0.5
      }
    }
  },
  mounted() {
    db.clear()
    this.getCodeImage()
  },
  destroyed() {

  },
  methods: {
    getCodeImage() {
      axios({
        method: 'GET',
        url: `${this.codeUrl}?key=${this.randomId}`,
        responseType: 'arraybuffer'
      }).then(res => {
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      }).then((res) => {
        this.imageCode = res
      }).catch((e) => {
        if (e.toString().indexOf('429') !== -1) {
          this.$message({
            message:'请求次数太多',
            type: 'error'
          })
        } else {
          this.$message({
            message: '获取验证码失败',
            type: 'error'
          })
        }
      })
    },
    handleLogin() {
      let username_c = false
      let password_c = false
      let code_c = false
      this.$refs.loginForm.validateField('username', e => { if (!e) { username_c = true } })
      this.$refs.loginForm.validateField('password', e => { if (!e) { password_c = true } })
      this.$refs.loginForm.validateField('code', e => { if (!e) { code_c = true } })
      if (username_c && password_c && code_c) {
        this.loading = true
        const that = this
        this.$store.dispatch('Login', {
          ...that.loginForm,
          key: this.randomId
        }).then((r) => {
            this.loading = false;
            setCookie("username",this.loginForm.username,15);
            setCookie("password",this.loginForm.password,15);
            this.$router.push({path: '/'})
        }).catch((error) => {
          that.loading = false
          that.getCodeImage()
        })
      }
    }
  }
}
</script>

<style lang="scss">
  @import "login";
</style>
<style lang="scss" scoped>
  @import "login-scoped";
</style>
