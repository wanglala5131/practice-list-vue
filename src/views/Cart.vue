<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <PageTitle>
      <template v-slot:title>
        暫定菜單
      </template>
    </PageTitle>
    <ListItemTable
      :ori-list-items="cartItems"
      :list-type="'cart'"
      :is-loading="isLoading"
      @deleteCartItem="deleteCartItemHandler"
    />
  </main>
</template>
<script>
import Banner from '../components/Banner'
import PageTitle from '../components/PageTitle'
import ToTop from '../components/ToTop'
import ListItemTable from '../components/ListItemTable'
import cartsAPI from '../apis/carts'
import { Toast } from '../utils/helpers'
export default {
  name: 'Cart',
  components: { Banner, PageTitle, ToTop, ListItemTable },
  data() {
    return {
      bannerImgURL:
        'https://cdn.pixabay.com/photo/2016/12/19/23/50/volleyball-1919440_1280.jpg',
      cartItems: [],
      isLoading: true
    }
  },
  created() {
    this.fetchCart()
  },
  methods: {
    async fetchCart() {
      try {
        const { data, statusText } = await cartsAPI.getCart()
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.cartItems = data
        this.isLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得暫定菜單的資料，請稍後再試'
        })
      }
    },
    deleteCartItemHandler(payload) {
      this.cartItems = this.cartItems.filter(
        cartItem => cartItem.id !== payload
      )
    }
  }
}
</script>
