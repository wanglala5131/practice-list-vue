<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <PageTitle>
      <template v-slot:title>
        小狗追球
      </template>
      <template v-slot:buttons>
        <div class="setting-links-wrapper">
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
          <span>排球</span>
        </div>
        <div class="item-section">
          <h3>項目類型：</h3>
          <div class="item-subcategories-box">
            <span>體力</span>
            <span>腿力</span>
            <span>什麼哩哩哩</span>
          </div>
        </div>
        <div class="item-section">
          <h3>描述：</h3>
          <p>
            就是教練拋球球員一直跑啦！一直跑一直跑這個項目豪~~累~~喔~~，主要還是練體力的啦
          </p>
        </div>
        <div class="item-section">
          <h3>相關圖片：</h3>
          <div class="item-img">
            <img src="https://i.imgur.com/hLqomma.jpg" alt="" />
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
        'https://image.freepik.com/free-photo/exercise-weights-iron-dumbbell-with-extra-plates_1423-223.jpg'
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
