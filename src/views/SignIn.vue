<template>
  <div class="form-area">
    <BackgroundImg />
    <div class="container">
      <form
        action="POST"
        class="login-form"
        @submit.prevent.stop="submitHandler"
      >
        <h1>登入</h1>
        <div class="form-item">
          <div class="form-input">
            <label for="name">信箱：</label>
            <input
              type="email"
              v-model="email"
              id="name"
              required
              autocomplete
            />
          </div>
          <div class="form-input">
            <label for="password">密碼：</label>
            <input
              type="password"
              v-model="password"
              id="password"
              required
              autocomplete
            />
          </div>
        </div>
        <div class="form-buttons">
          <button
            class="form-button nomal-login"
            type="submit"
            :disabled="isProcessing"
          >
            {{ loginMsg }}
          </button>
        </div>
        <p class="form-text">
          沒有帳號？ <router-link to="signup">點此註冊</router-link>
        </p>
        <p class="form-text ">
          該怎麼使用？<router-link to="/howtouse">介紹</router-link>
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
  name: 'signIn',
  components: {
    BackgroundImg
  },
  data() {
    return {
      email: '',
      password: '',
      isProcessing: false,
      loginMsg: '登入'
    }
  },
  methods: {
    async submitHandler() {
      try {
        if (!this.email || !this.password) {
          throw new Error()
        }
        this.isProcessing = true
        this.loginMsg = '驗證中'
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })
        const { data } = response
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        await localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', data.user)
        this.$router.push('/')
      } catch (err) {
        this.password = ''
        this.isProcessing = false
        this.loginMsg = '登入'
        Toast.fire({
          icon: 'error',
          title: '請確認是否輸入了正確的帳號與密碼'
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
    padding: 100px 0 20px 0;
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
    font-size: 1.7rem;
    font-weight: 700;
    color: $logo-green;
    letter-spacing: 2px;
    text-align: center;
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

/*********  電腦板介面  **********/
@media (min-width: 768px) {
  /* form */
  .login-form {
    .form-buttons {
      grid-template-columns: repeat(2, 1fr);
      > .nomal-login {
        grid-column: 1/3;
      }
    }
  }
}
</style>
