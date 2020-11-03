<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <PageTitle>
      <template v-slot:title> {{ item.name }} </template>
      <template v-slot:buttons>
        <div class="setting-links-wrapper">
          <router-link to="/practice" class="title-link item-goback-btn"
            >回前頁</router-link
          >
          <button
            class="title-link item-star-btn active"
            @click.stop.prevent="changeLike"
          >
            {{ item.isLiked ? '移除星號' : '加上星號' }}
          </button>
          <button class="title-link item-edit-btn active">編輯</button>
          <button
            class="title-link item-close-btn"
            :class="{ active: !item.isInCart }"
            @click.stop.prevent="addToCart"
            :disabled="item.isInCart"
          >
            {{ item.isInCart ? '已加入暫定清單' : '加到暫定清單中' }}
          </button>
          <button
            class="title-link item-close-btn"
            :class="{ active: !item.isInCart }"
            :disabled="item.isInCart"
          >
            封存
          </button>
          <button class="title-link item-delete-btn">永久刪除</button>
        </div>
      </template>
    </PageTitle>
    <div class="item-content">
      <div class="container">
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
import { Toast } from '../utils/helpers'
import practiceAPI from '../apis/practice'
import cartAPI from '../apis/carts'
export default {
  name: 'PracticeItem',
  components: {
    Banner,
    PageTitle,
    ToTop
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
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchItem(id)
  },
  methods: {
    async fetchItem(itemId) {
      try {
        const { data, statusText } = await practiceAPI.getItem({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          this.$router.push('/')
          Toast.fire({
            icon: 'error',
            title: '無法取得項目資料，返回首頁'
          })
        }
        this.item = {
          ...data.item,
          isInCart: data.cartItemsArr.includes(data.item.id)
        }
        this.cartItems = data.cartItems
        this.cartItemsArr = data.cartItemsArr
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
        const { statusText } = await practiceAPI.changeLike({ itemId })
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
        const { data, statusText } = await cartAPI.addToCart({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          Toast.fire({
            icon: 'error',
            title: data.message
          })
        }
        this.item.isInCart = true
        Toast.fire({
          icon: 'success',
          title: '成功加入暫定清單'
        })
        this.cartItems.push({
          ...data.data,
          Item: this.item
        })
        this.cartItemsArr.push(this.item.id)
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '暫時無法加入暫定清單，請稍後再試'
        })
      }
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
    color: $font-green;
    font-weight: 500;
    margin: 10px 10px 10px 0;
  }
  .item-section {
    padding: 10px 0;
    .item-subcategories-box {
      width: 100%;
      padding-top: 10px;
      display: flex;
      flex-wrap: wrap;
      span {
        border: 1px solid $dark-gray;
        border-radius: 10px;
        padding: 0px 5px;
        margin: 2px;
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
