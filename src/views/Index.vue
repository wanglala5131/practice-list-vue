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
        <a href="#" class="add-card-link"
          ><font-awesome-icon icon="plus" />新增項目</a
        >
        <a href="#" class="close-card-link">查看封存項目</a>
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
    <div class="cards">
      <div class="container">
        <div class="cards-wrapper">
          <div class="card" v-for="item in itemsFilter" :key="item.id">
            <div class="card-header">
              <a href="#" class="card-link"></a>
              <span class="card-category">{{ item.Category.name }}</span>
              <div
                class="card-star"
                :class="{ active: item.isLiked }"
                @click.stop.prevent="changeLike(item.id)"
              >
                <font-awesome-icon icon="star" />
              </div>
              <img
                :src="item.image ? item.image : defaultImgURL"
                alt="card-img"
              />
              <div class="card-title">
                <h3>{{ item.name }}</h3>
                <div class="card-sub-categories">
                  <span
                    v-for="subcategory in item.Subcategories"
                    :key="subcategory.id"
                    >{{ subcategory.name }}</span
                  >
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button class="card-close-button">封存</button>
              <button class="card-edit-button">編輯</button>
              <button
                class="card-cart-button"
                :class="{ active: !item.isInCart }"
                @click.stop.prevent="addToCart(item)"
                :disabled="item.isInCart"
              >
                {{ item.isInCart ? '已加入暫定清單' : '加到暫定清單中' }}
              </button>
            </div>
          </div>
          <div class="no-card" v-if="!itemsFilter">
            <h2>找不到符合的練習項目</h2>
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
import settingAPI from '../apis/setting'
import practiceAPI from '../apis/practice'
import cartAPI from '../apis/carts'
import { Toast } from '../utils/helpers'
export default {
  name: 'Index',
  components: {
    Banner,
    PageTitle,
    ToTop,
    CartSimple
  },
  data() {
    return {
      bannerImgURL:
        'https://c.pxhere.com/photos/d9/72/basketball_ball_hoop_tree_sport-1398290.jpg!d',
      items: undefined,
      itemsFilter: undefined, //篩選出來的結果
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
      defaultImgURL: 'https://i.imgur.com/3XaSsJX.png'
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
    },
    async addToCart(item) {
      try {
        const itemId = item.id
        const { data, statusText } = await cartAPI.addToCart({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.items.map(item => {
          if (item.id === itemId) {
            item.isInCart = true
          }
        })
        Toast.fire({
          icon: 'success',
          title: '已成功加入暫定清單'
        })
        this.cartItems.push({
          ...data,
          Item: item
        })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法加入暫定清單，請稍後再試'
        })
      }
    },
    async changeLike(itemId) {
      try {
        const { statusText } = await practiceAPI.changeLike({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.items.map(item => {
          if (item.id === itemId) {
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
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法修改項目星號，請稍後再試'
        })
      }
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
    }
  }
}
</script>

<style lang="scss">
//search
.cards-search {
  padding-top: 30px;
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
.cards {
  width: 100%;
}
.cards-wrapper {
  margin-top: 30px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1.5rem;
  justify-content: center;
}
.no-card {
  h2 {
    text-align: center;
  }
}
.card {
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.3);
  }
  .card-category,
  .card-link,
  .card-star {
    position: absolute;
  }
  .card-link {
    z-index: 20;
    width: 100%;
    height: 100%;
  }
  .card-star {
    z-index: 40;
    top: 0;
    right: 0px;
    padding: 0px 5px 5px 5px;
    font-size: 1.5rem;
    cursor: pointer;
    &.active {
      color: $star-yellow;
    }
    &:hover {
      animation: swing ease-in-out 0.5s;
    }
  }
  .card-category {
    top: 5px;
    left: 5px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1px 10px;
    border-radius: 20px;
    font-size: 1.1rem;
    color: $light-gray;
    border: 2px solid rgba(0, 0, 0, 0.6);
    font-weight: 500;
  }
  .card-header {
    display: block;
    height: 200px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px 5px 0 0;
    }
  }
  .card-title {
    position: absolute;
    bottom: 0;
    padding: 18px 0 8px 0;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-image: linear-gradient(
      transparent,
      rgba(255, 255, 255, 0.9) 10%
    );
    h3 {
      margin-bottom: 10px;
      font-weight: 700;
      text-align: center;
      color: $dark-green;
      line-height: 1.2;
      letter-spacing: 1px;
    }
    .card-sub-categories {
      display: flex;
      justify-content: center;
      span {
        border: 1px solid $dark-green;
        border-radius: 10px;
        color: $dark-green;
        padding: 0 5px;
        margin: 0 1px;
      }
    }
  }
  .card-footer {
    border-top: 4px solid $op-black;
    display: grid;
    grid-template-columns: 1fr 1fr 3fr;
    grid-template-rows: auto;
    button {
      padding: 10px;
      font-weight: 700;
      cursor: pointer;
      font-size: 1rem;
    }
    .card-close-button {
      border-radius: 0 0 0 5px;
    }
    .card-close-button,
    .card-edit-button {
      background-color: $yellow;
      &:hover {
        background-color: $dark-yellow;
      }
    }

    .card-cart-button {
      background-color: $light-logo-green;
      border-radius: 0 0 5px 0;
      cursor: default;
      &.active:hover {
        cursor: pointer;
        background-color: $logo-green;
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
