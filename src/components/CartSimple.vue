<template>
  <div class="cart-simple">
    <label for="cart-simple-input" class="cart-simple-label"
      ><font-awesome-icon icon="list-alt"
    /></label>
    <input
      type="checkbox"
      class="cart-simple-input"
      id="cart-simple-input"
      v-model="isOpenCart"
    />
    <div class="card-simple-modal" @click.stop.prevent="closeCart"></div>
    <div class="cart-simple-content">
      <h3>暫定菜單</h3>
      <ul class="cart-simple-ul">
        <li
          class="cart-simple-li"
          v-for="cartItem in cartItems"
          :key="cartItem.id"
        >
          <div class="cart-simple-title">
            <router-link
              :to="{ name: 'practice-item', params: { id: cartItem.Item.id } }"
              class="cart-simple-link"
            ></router-link>
            <p>{{ cartItem.Item.name }}</p>
            <p class="cart-simple-category">
              {{ cartItem.Item.Category.name }}
            </p>
            <div class="cart-simple-subcategory">
              <span
                v-for="subcategory in cartItem.Item.Subcategories"
                :key="subcategory.id"
                >{{ subcategory.name }}</span
              >
              <span>123</span>
            </div>
          </div>
          <button
            class="cart-simple-button"
            @click.stop.prevent="
              deleteCartItem(cartItem.id, cartItem.ItemId, cartItem.Item.name)
            "
          >
            &times;
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import cartsAPI from '../apis/carts'
import { Toast, Confirm } from '../utils/helpers'
export default {
  name: 'CartSimple',
  props: {
    oriCartItems: {
      type: Array
    }
  },
  data() {
    return {
      cartItems: this.oriCartItems,
      isOpenCart: false
    }
  },
  watch: {
    oriCartItems(newValue) {
      this.cartItems = [...newValue]
    }
  },
  methods: {
    async deleteCartItem(cartId, itemId, name) {
      try {
        const result = await Confirm.fire({
          title: `確定要刪除暫定菜單中的  「${name}」嗎？`,
          confirmButtonText: `刪除`
        })
        if (result.isConfirmed) {
          const { statusText } = await cartsAPI.deleteCartItem({
            cartId
          })
          if (statusText !== 'OK') {
            throw new Error()
          }
          Toast.fire({
            icon: 'success',
            title: '已成功刪除項目'
          })
          this.$emit('deleteCartItem', { cartId, itemId })
        }
      } catch (err) {
        Toast.fire({
          icon: 'success',
          title: '目前無法刪除暫定菜單的項目，請稍後再試'
        })
      }
    },
    closeCart() {
      return (this.isOpenCart = false)
    }
  }
}
</script>

<style lang="scss">
.cart-simple {
  z-index: 50;
  position: fixed;
  top: 75px;
  left: 10px;
  width: 100%;
  .cart-simple-input {
    display: none;
    &:checked ~ .cart-simple-content {
      transform: scale(1, 1);
    }
    &:checked ~ .card-simple-modal {
      display: block;
    }
  }
  .cart-simple-label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 8px 6px 8px;
    width: 50px;
    border-radius: 40%;
    background-color: $op-black;
    box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.2);
    font-size: 28px;
    color: $light-logo-green;
    cursor: pointer;
    &:hover {
      background-color: $logo-green;
      color: $white;
    }
  }
  .card-simple-modal {
    z-index: -20;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $op-light-black;
  }
  .cart-simple-content {
    z-index: -10;
    position: absolute;
    top: -10px;
    left: -10px;
    width: 100%;
    height: 100vh;
    padding: 0px 15px 80px 15px;
    background-color: $white;
    overflow-y: scroll;
    @extend .scroll-style;
    transform: scale(0, 1);
    transform-origin: left;
    transition: transform 0.2s ease-out;
    h3 {
      padding: 20px 0;
      border-bottom: 2px solid $font-green;
      font-size: 1.3rem;
      color: $font-green;
      text-align: center;
    }
    .cart-simple-li {
      display: flex;
      align-items: center;
      margin: 10px;
      background-color: $light-logo-green;
      border-radius: 10px;

      &:hover {
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
      }
      .cart-simple-title {
        flex-grow: 1;
        display: flex;
        align-items: center;
        padding: 10px 0;
        position: relative;
        .cart-simple-link {
          position: absolute;
          height: 100%;
          width: 100%;
        }
        .cart-simple-category {
          flex-basis: 15%;
          padding: 5px;
          color: $dark-gray;
          font-weight: 700;
        }
        .cart-simple-subcategory {
          flex-basis: 45%;
          padding: 5px;
        }
        p {
          flex-basis: 40%;
          padding: 5px 20px;
          font-size: 1.2rem;
          padding-bottom: 5px;
        }
        span {
          display: inline-block;
          border: 1px solid $dark-gray;
          border-radius: 8px;
          padding: 0 3px;
          margin: 2px;
          color: $dark-gray;
        }
      }
      .cart-simple-button {
        margin-right: 10px;
        font-size: 2.5rem;
        cursor: pointer;
        &:hover {
          color: $dark-gray;
          text-shadow: 0px 2px 2px (rgba(0, 0, 0, 0.2));
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .cart-simple {
    top: 60px;
    border-radius: 20px;
    .cart-simple-content {
      padding: 10px;
      width: 600px;
      height: 600px;
      border-radius: 10px;
      box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
