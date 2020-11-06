<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <PageTitle>
      <template v-slot:title>
        已封存的項目
      </template>
      <template v-slot:buttons>
        <div class="setting-links-wrapper">
          <router-link to="/" class="title-link close-card-link"
            >返回訓練項目</router-link
          >
        </div>
      </template>
    </PageTitle>
    <PracticeCards
      :ori-items-filter="items"
      :isCloseType="true"
      @changeClosed="changeClosedHandler"
    />
  </main>
</template>
<script>
import Banner from '../components/Banner'
import PageTitle from '../components/PageTitle'
import ToTop from '../components/ToTop'
import PracticeCards from '../components/PracticeCards'
import practiceAPI from '../apis/practice'
import { Toast } from '../utils/helpers'
export default {
  name: 'CloseItem',
  components: {
    Banner,
    PageTitle,
    ToTop,
    PracticeCards
  },
  data() {
    return {
      bannerImgURL:
        'https://c.pxhere.com/photos/d9/72/basketball_ball_hoop_tree_sport-1398290.jpg!d',
      items: [] //PracticeCards要用到長度，所以預設為陣列
    }
  },
  created() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      try {
        const { data, statusText } = await practiceAPI.getCloseItems()
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.items = data.items
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得已封存的項目，請稍後再試'
        })
      }
    },
    changeClosedHandler(payload) {
      this.items = this.items.filter(item => item.id !== payload)
    }
  }
}
</script>
