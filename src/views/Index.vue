<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <CartSimple
      :ori-cart-items="cartItems"
      @deleteCartItem="deleteCartItemHandler"
    />
    <PageTitle>
      <template v-slot:title>
        訓練項目
      </template>
      <template v-slot:buttons>
        <div class="setting-links-wrapper">
          <a href="#" class="title-link add-card-link"
            ><font-awesome-icon icon="plus" />新增項目</a
          >
          <router-link
            to="/practice/items/close"
            class="title-link close-card-link"
            >查看封存項目</router-link
          >
        </div>
      </template>
    </PageTitle>
    <div class="cards-search">
      <div class="container">
        <input
          type="checkbox"
          id="cards-search-toggle"
          class="cards-search-toggle"
          v-model="searchToggle"
        />
        <label for="cards-search-toggle" class="cards-search-toggle-label">{{
          searchToggle ? '收起篩選列' : '打開篩選列'
        }}</label>
        <div class="cards-search-form">
          <div class="search-item">
            <input
              type="text"
              placeholder="搜尋關鍵字"
              id="keyword"
              class="keyword"
              name="keyword"
              v-model="keyword"
              @input="filterCards"
            />
          </div>
          <div class="search-item">
            <div class="search-item choice">
              <div class="search-star">
                <input
                  type="checkbox"
                  class="like"
                  name="like"
                  v-model="isLiked"
                  id="like"
                  @change="filterCards"
                />
                <label for="like">只顯示星號項目</label>
              </div>
            </div>
          </div>
          <div class="search-item category">
            <span for="category">運動類別</span>
            <select
              name="category"
              id="category"
              v-model="categorySelect"
              @change="filterSubcategory"
            >
              <option value="all" selected="selected">全部</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >{{ category.name }}</option
              >
            </select>
          </div>
          <div
            class="search-item subcategory"
            v-show="categorySelect !== 'all'"
          >
            <span>項目類型</span>
            <div class="subcategory-controller">
              <div class="subcategory-controller-item">
                <button
                  class="subcategory-controller-button"
                  @click.stop.prevent="clearSubcategory"
                >
                  全不選
                </button>
              </div>
              <div class="subcategory-controller-item">
                <button
                  class="subcategory-controller-button"
                  @click.stop.prevent="allSubcategory"
                >
                  全選
                </button>
              </div>
            </div>
            <div class="subcategory-items">
              <div
                class="check-item"
                v-for="subcategory in subcategoryFilter"
                :key="subcategory.id"
              >
                <input
                  type="checkbox"
                  class="subcategory"
                  :value="subcategory.id"
                  v-model="subcategorySelect"
                  :id="labelIndex(subcategory.id)"
                  @change="filterCards"
                />
                <label :for="labelIndex(subcategory.id)">{{
                  subcategory.name
                }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PracticeCards
      :ori-items-filter="itemsFilter"
      :isCloseType="false"
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
import settingAPI from '../apis/setting'
import practiceAPI from '../apis/practice'
import { Toast } from '../utils/helpers'
export default {
  name: 'Index',
  components: {
    Banner,
    PageTitle,
    ToTop,
    CartSimple,
    PracticeCards
  },
  data() {
    return {
      bannerImgURL:
        'https://c.pxhere.com/photos/d9/72/basketball_ball_hoop_tree_sport-1398290.jpg!d',
      items: undefined,
      itemsFilter: [], //篩選出來的結果 ，不設成undefined是因為在PracticeCard裡會判別length
      cartItems: undefined,
      cartItemsArr: undefined,
      categories: undefined,
      subcategories: undefined,
      searchToggle: false,
      keyword: '',
      isLiked: false,
      categorySelect: 'all', //使用者自己選擇的運動項目，預設是全部
      subcategorySelect: undefined, //使用者自己選擇的項目類型
      subcategoryFilter: undefined, //根據category出現在篩選列的項目類型
      defaultImgURL: 'https://i.imgur.com/3XaSsJX.png' //記得刪
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
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得運動項目與項目種類資料，請稍後再試'
        })
      }
    },
    async fetchItems() {
      try {
        const { data, statusText } = await practiceAPI.getItems()
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
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得項目資料，請稍後再試'
        })
      }
    },
    filterSubcategory() {
      //選擇全部
      if (this.categorySelect === 'all') {
        this.subcategorySelect = []
        this.subcategories.map(subcategory => {
          this.subcategorySelect.push(subcategory.id)
        })
      }
      //選擇其中一個category
      else {
        this.subcategorySelect = [] //先清空，避免更換運動類別時受到影響
        this.subcategoryFilter = this.subcategories.filter(
          subcategory => subcategory.CategoryId === this.categorySelect
        )
        this.allSubcategory()
      }
      this.filterCards()
    },
    filterCards() {
      this.itemsFilter = this.items
      if (this.isLiked) {
        this.itemsFilter = this.itemsFilter.filter(item => item.isLiked)
      }
      if (this.keyword) {
        this.itemsFilter = this.itemsFilter.filter(item =>
          item.name.includes(this.keyword)
        )
      }
      if (this.subcategorySelect) {
        this.itemsFilter = this.itemsFilter.filter(item =>
          item.subcategoriesArr.some(id => this.subcategorySelect.includes(id))
        )
      }
    },
    labelIndex(id) {
      return `subcategory-${id}`
    },
    //全不選
    clearSubcategory() {
      this.subcategorySelect = []
      this.itemsFilter = []
    },
    //全選
    allSubcategory() {
      this.subcategorySelect = [] //先清空
      this.subcategories.map(subcategory => {
        if (subcategory.CategoryId === this.categorySelect) {
          this.subcategorySelect.push(subcategory.id)
          return
        }
        return
      })
      this.itemsFilter = [] //先清空
      this.items.map(item => {
        if (this.subcategorySelect.includes(item.id)) {
          this.itemsFilter.push(item)
        }
      })
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
    }
  }
}
</script>

<style lang="scss">
//search
.cards-search {
  padding: 30px 0 20px 0;
  color: $dark-gray;
  font-size: 1.1rem;
  .cards-search-toggle {
    display: none;
    &:checked ~ .cards-search-toggle-label {
      border-radius: 4px 4px 0 0;
    }
    &:checked ~ .cards-search-form {
      display: block;
    }
  }
  .cards-search-toggle-label {
    display: block;
    text-align: center;
    font-weight: 500;
    padding: 5px;
    background-color: $logo-green;
    border-radius: 4px;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .cards-search-form {
    display: none;
    border: 3px solid $logo-green;
    padding: 5px 20px;
    h2 {
      display: none;
    }
    .search-item {
      margin: 10px 0;
      .keyword {
        width: 100%;
        padding: 6px 5px 3px 5px;
        font-size: 1rem;
        border-radius: 3px;
        border: 1.5px solid $logo-green;
        color: $font-green;
      }
      input[type='checkbox'] {
        display: none;
        ~ label {
          border: 1px solid $light-gray;
          border-radius: 10px;
          padding: 0 5px;
          color: $font-gray;
        }
        &:checked ~ label {
          border: 1px solid $logo-green;
          color: $font-green;
        }
      }
      &.choice {
        display: flex;
        div {
          margin: 2px;
        }
      }
      &.category {
        display: flex;
        align-items: center;
        select {
          font-size: 0.9rem;
          width: 20%;
          padding: 3px;
          margin-left: 10px;
          border: 1px solid $logo-green;
          border-radius: 4px;
          min-width: 100px;
        }
      }
      &.subcategory {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 10px;
        .subcategory-controller {
          display: flex;
          .subcategory-controller-item {
            display: flex;
            align-items: center;
            margin-right: 5px;
            .subcategory-controller-button {
              font-size: 0.9rem;
              background-color: $logo-green;
              border-radius: 15px;
              color: $light-gray;
              letter-spacing: 1px;
              &:hover {
                background-color: $logo-green;
                color: $white;
              }
            }
          }
        }
        .subcategory-items {
          grid-column: 1/3;
          display: flex;
          flex-wrap: wrap;
          .check-item {
            margin: 5px;
          }
        }
      }
    }
  }
}
@media (min-width: 768px) {
  //search
  .cards-search {
    padding-top: 120px;
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .cards-search-toggle-label {
      width: 700px;
      padding: 10px;
    }
    .cards-search-form {
      width: 50%;
      width: 700px;
      border-radius: 0 0 10px 10px;
      padding: 10px 30px 0px 30px;
      //color: $logo-green;
      h2 {
        display: block;
        padding-bottom: 20px;
        font-size: 1.5rem;
        letter-spacing: 2px;
        text-align: center;
      }
      span {
        letter-spacing: 1px;
        font-size: 1.2rem;
      }
      .search-item {
        margin: 15px 0;
      }
    }
  }
}
</style>
