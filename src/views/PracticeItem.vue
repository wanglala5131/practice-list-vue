<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <CartSimple
      v-show="!isLoading"
      :ori-cart-items="cartItems"
      @deleteCartItem="deleteCartItemHandler"
    />
    <PageTitle>
      <template v-slot:title> {{ isLoading ? '' : item.name }} </template>
      <template v-slot:buttons>
        <div class="setting-links-wrapper">
          <router-link to="/" class="title-link item-goback-btn"
            >回首頁</router-link
          >
          <button
            class="title-link item-star-btn active"
            @click.stop.prevent="changeLike"
            v-show="!isLoading"
          >
            {{ item.isLiked ? '移除星號' : '加上星號' }}
          </button>
          <button
            class="title-link item-edit-btn active"
            @click.stop.prevent="toEditPage"
            v-show="!isLoading"
          >
            編輯
          </button>
          <button
            class="title-link"
            :class="{ active: !item.isInCart }"
            @click.stop.prevent="addToCart"
            :disabled="item.isInCart"
            v-if="!item.isClosed"
            v-show="!isLoading"
          >
            {{ item.isInCart ? '已加入暫定菜單' : '加到暫定菜單中' }}
          </button>
          <button
            class="title-link item-close-btn"
            :class="{ active: !item.isInCart }"
            :disabled="item.isInCart"
            @click.stop.prevent="closeItem"
            v-show="!isLoading"
          >
            {{ item.isClosed ? '取消封存' : '封存' }}
          </button>
        </div>
      </template>
    </PageTitle>
    <div class="item-content">
      <div v-show="isLoading">
        <loading
          id="loading-box"
          :active.sync="isLoading"
          :can-cancel="true"
        ></loading>
      </div>
      <div class="container" v-show="!isLoading">
        <span class="title-closed" v-if="item.isClosed">※ 此為封存項目</span>
        <div class="item-section one-line">
          <h3>運動類別：</h3>
          <span>{{ item.Category.name }}</span>
        </div>
        <div class="item-section">
          <h3>項目類型：</h3>
          <div class="item-subcategories-box">
            <span
              v-for="subcategory in item.Subcategories"
              :key="subcategory.id"
              >{{ subcategory.name }}</span
            >
          </div>
        </div>
        <div class="item-section">
          <h3>描述：</h3>
          <p>
            {{ item.description }}
          </p>
        </div>
        <div class="item-section">
          <h3>限制：</h3>
          <p>
            {{ item.limit }}
          </p>
        </div>
        <div class="item-section" v-if="item.image">
          <h3>相關圖片：</h3>
          <div class="item-img">
            <img :src="item.image" alt="" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Banner from '../components/Banner'
import PageTitle from '../components/PageTitle'
import ToTop from '../components/ToTop'
import CartSimple from '../components/CartSimple'
import { Toast } from '../utils/helpers'
import { Confirm } from '../utils/helpers'
import itemsAPI from '../apis/items'
import cartsAPI from '../apis/carts'
export default {
  name: 'PracticeItem',
  components: {
    Banner,
    PageTitle,
    ToTop,
    CartSimple
  },
  data() {
    return {
      bannerImgURL:
        'https://image.freepik.com/free-photo/exercise-weights-iron-dumbbell-with-extra-plates_1423-223.jpg',
      cartItems: [],
      cartItemsArr: [],
      item: {
        id: undefined,
        name: undefined,
        limit: undefined,
        description: undefined,
        image: undefined,
        isClosed: false,
        isLiked: false,
        CategoryId: undefined,
        Category: {},
        Subcategories: []
      },
      isLoading: true
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchItem(id)
  },
  methods: {
    async fetchItem(itemId) {
      try {
        const { data, statusText } = await itemsAPI.getItem({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          Toast.fire({
            icon: 'error',
            title: '無法取得項目資料，返回首頁'
          })
          this.$router.push('/')
        }
        this.item = {
          ...data.item,
          isInCart: data.cartItemsArr.includes(data.item.id)
        }
        this.cartItems = data.cartItems
        this.cartItemsArr = data.cartItemsArr
        this.isLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前暫時無法取得項目資料，請稍後再試'
        })
      }
    },
    async changeLike() {
      try {
        const itemId = this.item.id
        const { statusText } = await itemsAPI.changeLike({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (this.item.isLiked) {
          Toast.fire({
            icon: 'success',
            title: '成功移除星號'
          })
        } else {
          Toast.fire({
            icon: 'success',
            title: '成功加上星號'
          })
        }
        this.item.isLiked = !this.item.isLiked
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法改變狀態，請稍後再試'
        })
      }
    },
    async addToCart() {
      try {
        const itemId = this.item.id
        const { data, statusText } = await cartsAPI.addToCart({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          Toast.fire({
            icon: 'error',
            title: data.message
          })
          return
        }
        this.item.isInCart = true
        Toast.fire({
          icon: 'success',
          title: '成功加入暫定菜單'
        })
        this.cartItems.push({
          ...data.data,
          Item: this.item
        })
        this.cartItemsArr.push(this.item.id)
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '暫時無法加入暫定菜單，請稍後再試'
        })
      }
    },
    async closeItem() {
      try {
        if (this.item.isInCart) {
          Toast.fire({
            icon: 'error',
            title: '請先移除從暫定菜單移除此項目，再進行封存'
          })
          return
        }
        const confirmText = this.item.isClosed ? '取消封存' : '封存'
        const result = await Confirm.fire({
          title: `確定要${confirmText}「${this.item.name}」嗎？`,
          confirmButtonText: `確定`
        })
        if (result.isConfirmed) {
          const itemId = this.item.id
          const { data, statusText } = await itemsAPI.changeClosed({ itemId })
          if (statusText !== 'OK') {
            throw new Error()
          }
          if (data.status === 'error') {
            Toast.fire({
              icon: 'error',
              title: data.message
            })
            return
          }
          this.item.isClosed = !this.item.isClosed
        }
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法改變項目狀態，請稍後再試'
        })
      }
    },
    deleteCartItemHandler(payload) {
      const { cartId } = payload
      this.item.isInCart = false
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== cartId)
    },
    toEditPage() {
      this.$router.push(`/items/${this.item.id}/edit`)
    }
  }
}
</script>

<style lang="scss">
.item-content {
  max-width: 1200px;
  margin: 20px auto 30px auto;
  font-size: 1.4rem;
  color: $dark-gray;
  h3 {
    margin: 10px 10px 10px 0;
    color: $font-green;
    font-weight: 500;
  }
  .title-closed {
    font-size: 1.5rem;
    font-weight: 700;
    color: $dark-red;
  }
  .item-section {
    padding: 10px 0;
    .item-subcategories-box {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding-top: 10px;
      span {
        padding: 0px 5px;
        margin: 2px;
        border: 1px solid $dark-gray;
        border-radius: 10px;
      }
    }
    &.one-line {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    img {
      padding-top: 10px;
      width: 100%;
      height: auto;
    }
  }
}
@media (min-width: 768px) {
  .item-content {
    margin-top: 100px;
    .item-section {
      padding-bottom: 20px;
    }
  }
}
</style>
