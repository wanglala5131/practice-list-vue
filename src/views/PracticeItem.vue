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
          <a href="#" class="title-link item-edit-btn">編輯項目</a>
          <a href="#" class="title-link item-close-btn">加入暫定清單</a>
          <a href="#" class="title-link item-close-btn">封存項目</a>
          <a href="#" class="title-link item-delete-btn">永久刪除</a>
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
      cartItems: undefined,
      cartItemsArr: undefined,
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
        this.item = data.item
        this.cartItems = data.cartItems
        this.cartItemsArr = data.cartItemsArr
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前暫時無法取得項目資料，請稍後再試'
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
