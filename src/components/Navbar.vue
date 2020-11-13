<template>
  <header>
    <div class="logo">
      <router-link to="/signin">
        <img src="https://i.imgur.com/3DfRKXD.png" alt="logo" />
      </router-link>
    </div>
    <nav class="nav" v-if="isAuthenticated">
      <input
        type="checkbox"
        id="nav-toggle"
        class="nav-toggle"
        v-model="isOpenNav"
      />
      <div class="nav-modal" @click.stop.prevent="closeNav"></div>
      <ul class="nav-list" @click.stop.prevent="closeNav">
        <li class="nav-active">
          <router-link to="/items">訓練項目</router-link>
        </li>
        <li><router-link to="/cart">暫定菜單</router-link></li>
        <li><router-link to="/lists">已排菜單</router-link></li>
        <li>
          <router-link to="/setting">類別設定</router-link>
        </li>
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
  data() {
    return {
      isOpenNav: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout() {
      this.closeNav()
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signin')
    },
    closeNav() {
      this.isOpenNav = false
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
        a {
          display: block;
          padding: 12px 0;
          letter-spacing: 2px;
          color: $dark-gray;
          border-bottom: 3px solid $light-gray;
          &:hover,
          &.router-link-active {
            background-color: $light-logo-green;
          }
        }
        button {
          width: 100%;
          display: block;
          border-bottom: 0px solid $light-gray;
          padding: 12px 0;
          background-color: transparent;
          font-size: 1.3rem;
          letter-spacing: 2px;
          color: $logo-green;
          font-weight: 700;
          cursor: pointer;
        }

        &.logout {
          cursor: pointer;
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
      &:checked ~ .nav-modal {
        display: block;
      }
    }
    .nav-modal {
      display: none;
      z-index: -10;
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $op-light-black;
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
      .nav-toggle-label,
      .nav-modal {
        visibility: hidden;
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
            &.router-link-active,
            &:hover {
              background-color: transparent;
              color: $logo-green;
            }
          }
          button {
            padding: 0;
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
