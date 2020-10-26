<template>
  <header>
    <div class="logo">
      <router-link to="/practice/signin">
        <img src="https://i.imgur.com/3DfRKXD.png" alt="logo" />
      </router-link>
    </div>
    <nav class="nav" v-if="isAuthenticated">
      <input type="checkbox" id="nav-toggle" class="nav-toggle" />
      <ul class="nav-list">
        <li class="nav-active"><a href="#">訓練項目</a></li>
        <li><a href="#">暫定菜單</a></li>
        <li><a href="#">已排菜單</a></li>
        <li><a href="#">類別設定</a></li>
        <li class="logout">
          <button @click.stop.prevent="logout">登出</button>
        </li>
      </ul>
      <label for="nav-toggle" class="nav-toggle-label">
        <span class="hamburger"></span>
      </label>
    </nav>
  </header>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/practice/signin')
    }
  }
}
</script>

<style lang="scss">
header {
  z-index: 100;
  background-color: $op-black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.5);
  height: 4rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  .logo {
    img {
      width: 8rem;
      height: auto;
      vertical-align: middle;
    }
  }
  .nav {
    margin-right: 1rem;
    padding: 0.9rem 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.3rem;
    .nav-list {
      position: absolute;
      top: 4rem;
      left: 0;
      background-color: $white;
      width: 100%;
      box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.5);
      transform: scale(1, 0);
      transform-origin: top;
      transition: transform 0.2s ease-out;
      li {
        text-align: center;
        padding: 0 10px;
        a {
          display: block;
          padding: 12px 0;
          letter-spacing: 2px;
          color: $dark-gray;
          border-bottom: 3px solid $light-gray;
        }
        button {
          display: block;
          border-bottom: 0px solid $light-gray;
          background-color: transparent;
          font-size: 1.3rem;
          letter-spacing: 2px;
          color: $logo-green;
          font-weight: 700;
        }
        &:hover,
        &.nav-active {
          background-color: $light-logo-green;
        }
        &.logout {
          &:hover {
            background-color: $logo-green;
            button {
              color: $dark-gray;
            }
          }
        }
      }
    }
    .nav-toggle {
      display: none;
      &:checked ~ .nav-list {
        transform: scale(1, 1);
      }
    }
    .nav-toggle-label {
      height: 30px;
      width: 30px;
      margin-right: 15px;
      display: flex;
      align-items: center;
      .hamburger {
        display: block;
        width: 30px;
        height: 3px;
        background-color: $light-gray;
        &::before,
        &::after {
          width: 30px;
          height: 3px;
          background-color: $light-gray;
          position: absolute;
          content: '';
        }
        &::before {
          top: 20px;
        }
        &::after {
          bottom: 20px;
        }
      }
    }
  }
}
//電腦版介面
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
      font-size: 1.3rem;
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
}
</style>
