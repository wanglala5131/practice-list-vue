<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <CartSimple
      :ori-cart-items="cartItems"
      @deleteCartItem="deleteCartItemHandler"
      v-if="!isItemsLoading"
    />
    <PageTitle>
      <template v-slot:title>
        訓練項目
      </template>
      <template v-slot:buttons>
        <div class="setting-links-wrapper">
          <router-link
            to="/items/create"
            class="title-link add-card-link active"
            ><font-awesome-icon icon="plus" />新增項目</router-link
          >
          <router-link
            to="/items/close"
            class="title-link close-card-link active"
            >查看封存項目</router-link
          >
        </div>
      </template>
    </PageTitle>
    <searchBar
      :ori-categories="categories"
      :ori-subcategories="subcategories"
      :ori-items="items"
      :ori-items-filter="itemsFilter"
      :is-type-loading="isTypeLoading"
      @filterCards="filterCardsHandler"
    />
    <PracticeCards
      :ori-items-filter="itemsFilter"
      :isCloseType="false"
      :is-items-loading="isItemsLoading"
      @addToCart="addToCartHandler"
      @changeLike="changeLikeHandler"
      @changeClosed="changeClosedHandler"
    />
  </main>
</template>

<script>
import Banner from '../components/Banner'
import PageTitle from '../components/PageTitle'
import ToTop from '../components/ToTop'
import CartSimple from '../components/CartSimple'
import PracticeCards from '../components/PracticeCards'
import searchBar from '../components/searchBar'
import settingAPI from '../apis/setting'
import itemsAPI from '../apis/items'
import { Toast } from '../utils/helpers'
export default {
  name: 'Index',
  components: {
    Banner,
    PageTitle,
    ToTop,
    CartSimple,
    PracticeCards,
    searchBar
  },
  data() {
    return {
      isItemsLoading: true,
      isTypeLoading: true,
      bannerImgURL:
        'https://c.pxhere.com/photos/d9/72/basketball_ball_hoop_tree_sport-1398290.jpg!d',
      items: undefined,
      itemsFilter: [],
      cartItems: undefined,
      cartItemsArr: undefined,
      categories: undefined,
      subcategories: undefined
    }
  },
  created() {
    this.fetchType()
    this.fetchItems()
  },
  methods: {
    async fetchType() {
      try {
        const { data, statusText } = await settingAPI.getSubcategory()
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.subcategories = data.subcategories
        this.categories = data.categories
        this.isTypeLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得運動項目與項目種類資料，請稍後再試'
        })
      }
    },
    async fetchItems() {
      try {
        const { data, statusText } = await itemsAPI.getItems()
        if (statusText !== 'OK') {
          throw new Error()
        }
        //加上項目類型的id array和是否出現在cart
        const items = data.items.map(item => {
          const subcategoriesArr = []
          for (let subcategory of item.Subcategories) {
            subcategoriesArr.push(subcategory.id)
          }
          return {
            ...item,
            isInCart: data.cartItemsArr.includes(item.id),
            subcategoriesArr: subcategoriesArr
          }
        })
        this.items = items
        this.itemsFilter = items
        this.cartItems = data.cartItems
        this.cartItemsArr = data.cartItemsArr
        this.isItemsLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得項目資料，請稍後再試'
        })
      }
    },
    addToCartHandler(payload) {
      const { cartItem, itemId } = payload
      this.cartItems.push(cartItem)
      this.items.map(item => {
        if (item.id === itemId) {
          item.isInCart = true
        }
      })
      this.itemsFilter.map(item => {
        if (item.id === itemId) {
          item.isInCart = true
        }
      })
    },
    changeLikeHandler(payload) {
      this.items.map(item => {
        if (item.id === payload) {
          if (item.isLiked) {
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
          item.isLiked = !item.isLiked
        }
      })
    },
    deleteCartItemHandler(payload) {
      const { cartId, itemId } = payload
      this.items.map(item => {
        if (item.id === itemId) {
          item.isInCart = false
        }
      })
      this.itemsFilter.map(item => {
        if (item.id === itemId) {
          item.isInCart = false
        }
      })
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== cartId)
    },
    changeClosedHandler(payload) {
      this.items = this.items.filter(item => item.id !== payload)
      this.itemsFilter = this.itemsFilter.filter(item => item.id !== payload)
    },
    filterCardsHandler(payload) {
      this.itemsFilter = payload
    }
  }
}
</script>
