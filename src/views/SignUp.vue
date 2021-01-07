<template>
  <div class="form-area">
    <BackgroundImg />
    <div class="container">
      <form
        action="POST"
        class="login-form"
        @submit.prevent.stop="submitHandler"
      >
        <h1>註冊帳號</h1>
        <div class="form-item">
          <div class="form-input">
            <label for="name">名字：</label>
            <input type="text" v-model="name" id="name" />
          </div>
          <div class="form-input">
            <label for="email">信箱：</label>
            <input type="email" v-model="email" id="email" />
          </div>
          <div class="form-input">
            <label for="password">密碼：</label>
            <input type="password" v-model="password" id="password" />
          </div>
          <div class="form-input">
            <label for="confirmPassword">再次確認密碼：</label>
            <input
              type="password"
              v-model="confirmPassword"
              id="confirmPassword"
            />
          </div>
        </div>
        <div class="form-buttons">
          <button class="form-button nomal-login" :disabled="isProcessing">
            {{ loginMsg }}
          </button>
        </div>
        <p class="form-text">
          已經有帳號？ <router-link to="signin">點此登入</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorizaiton'
import { Toast } from '../utils/helpers'
import BackgroundImg from '../components/BackgroundImg'
export default {
  name: 'signUp',
  components: {
    BackgroundImg
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isProcessing: false,
      loginMsg: '註冊'
    }
  },
  methods: {
    async submitHandler() {
      try {
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.confirmPassword
        ) {
          Toast.fire({
            icon: 'error',
            title: '所有欄位都須填寫唷！'
          })
          return
        }
        if (this.password !== this.confirmPassword) {
          Toast.fire({
            icon: 'error',
            title: '密碼與確認密碼不相同'
          })
          return
        }
        this.isProcessing = true
        this.loginMsg = '註冊中'

        const response = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
        const { data } = response
        if (data.status !== 'success') {
          this.isProcessing = false
          this.loginMsg = '註冊'
          Toast.fire({
            icon: 'error',
            title: data.message
          })
          return
        } else {
          Toast.fire({
            icon: 'success',
            title: '成功註冊，請再登入一次'
          })
          this.$router.push('/signin')
        }
      } catch (err) {
        this.isProcessing = false
        this.loginMsg = '註冊'
        Toast.fire({
          icon: 'error',
          title: '發生錯誤，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* 登入頁 */
.form-area {
  .container {
    display: flex;
    justify-content: center;
    padding-top: 100px;
    padding-bottom: 20px;
  }
}
.login-form {
  padding: 20px;
  width: 600px;
  min-width: 320px;
  background-color: $op-black;
  border-radius: 5px;
  h1 {
    padding-bottom: 20px;
    border-bottom: 1px solid $logo-green;
    letter-spacing: 2px;
    text-align: center;
    font-weight: 700;
    font-size: 1.7rem;
    color: $logo-green;
  }
  .form-item {
    padding: 10px 20px 30px 20px;
    border-bottom: 1px solid $logo-green;
    .form-input {
      padding: 10px 0;
    }
    label {
      display: block;
      margin-bottom: 10px;
      color: $logo-green;
      font-size: 1.3rem;
      letter-spacing: 1px;
    }
    input {
      display: block;
      padding: 4px 7px;
      width: 100%;
      border-radius: 3px;
      font-size: 1.1rem;
    }
  }
  .form-buttons {
    display: grid;
    grid-gap: 20px;
    padding: 30px 20px;
    .form-button {
      padding: 7px 0;
      border-radius: 2px;
      font-size: 1rem;
      color: $white;
      letter-spacing: 3px;
      &:hover {
        box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.7);
      }
      &.facebook {
        background-color: #0d33ff;
      }
      &.google {
        background-color: #d54c3f;
      }
      &.nomal-login {
        background-color: $dark-green;
        font-weight: 700;
        font-size: 1.3rem;
        &:disabled {
          background-color: $font-green;
        }
      }
    }
  }
  .form-text {
    padding-left: 20px;
    color: $light-gray;
    font-size: 1.2rem;
    a {
      color: $logo-green;
      &:hover {
        color: $dark-green;
      }
    }
  }
}
</style>
