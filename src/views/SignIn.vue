<template>
  <div class="bg-img">
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
            <input type="email" v-model="email" />
          </div>
          <div class="form-input">
            <label for="name">密碼：</label>
            <input type="password" v-model="password" />
          </div>
        </div>
        <div class="form-buttons">
          <button class="form-button nomal-login" type="submit">
            登入
          </button>
        </div>
        <p class="form-text">
          沒有帳號？ <router-link to="signup">點此註冊</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signIn',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitHandler() {
      const data = JSON.stringify({
        email: this.email,
        password: this.password
      })
      //TODO: 向後端驗證資料是否是否合法
      console.log('data', data)
    }
  }
}
</script>

<style lang="scss">
/* 登入頁 */
.bg-img {
  height: 100vh;
  width: 100%;
  background-image: $login-bg-img;
  background-size: cover;
  background-position: right;
  background-attachment: fixed;
  .container {
    display: flex;
    justify-content: center;
    padding-top: 100px;
    padding-bottom: 20px;
  }
}
.login-form {
  background-color: $op-black;
  border-radius: 5px;
  padding: 20px;
  width: 600px;
  min-width: 320px;
  h1 {
    font-size: 1.7rem;
    color: $logo-green;
    letter-spacing: 2px;
    text-align: center;
    font-weight: 700;
    padding-bottom: 20px;
    border-bottom: 1px solid $logo-green;
  }
  .form-item {
    padding: 10px 20px;
    border-bottom: 1px solid $logo-green;
    .form-input {
      padding: 10px 0;
    }
    label {
      display: block;
      color: $logo-green;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
    input {
      display: block;
      width: 100%;
      font-size: 1.1rem;
      padding: 4px 7px;
      border-radius: 3px;
    }
  }
  .form-buttons {
    padding: 20px;
    display: grid;
    grid-gap: 20px;
    .form-button {
      padding: 7px 0;
      font-size: 1rem;
      border-radius: 2px;
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
        font-size: 1.1rem;
      }
    }
  }
  .form-text {
    padding-left: 20px;
    color: $light-gray;
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
  /* nav */
  header {
    height: 3rem;
    .logo {
      img {
        width: 7rem;
        height: auto;
        vertical-align: middle;
      }
    }
    .nav {
      margin-right: 1.5rem;
      display: flex;
      font-size: 1.1rem;
      .nav-toggle-label {
        display: none;
      }
      .nav-list {
        display: flex;
        align-items: center;
        box-shadow: none;
        position: static;
        transform: scale(1, 1);
        background-color: transparent;
        li {
          padding: 0 15px;
          a {
            color: $light-gray;
            border-bottom: none;
            padding: 0;
          }
          &.nav-active,
          &:hover {
            background-color: transparent;
            a {
              color: $logo-green;
            }
          }
          &.logout {
            margin-left: 10px;
            display: inline-block;
            padding: 2px 7px;
            border: 1px solid $logo-green;
            border-radius: 5px;
          }
        }
      }
    }
  }
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
