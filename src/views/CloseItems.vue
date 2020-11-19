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
          <router-link to="/" class="title-link close-card-link active"
            >返回訓練項目</router-link
          >
        </div>
      </template>
    </PageTitle>
    <PracticeCards
      :ori-items-filter="items"
      :isCloseType="true"
      :is-items-loading="isLoading"
      @changeClosed="changeClosedHandler"
    />
  </main>
</template>
<script>
import Banner from '../components/Banner'
import PageTitle from '../components/PageTitle'
import ToTop from '../components/ToTop'
import PracticeCards from '../components/PracticeCards'
import itemsAPI from '../apis/items'
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
        'https://github.com/wanglala5131/practice-list-vue/blob/main/src/assets/img/index-page.jpg?raw=true',
      items: [], //PracticeCards要用到長度，所以預設為陣列
      isLoading: true
    }
  },
  created() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      try {
        const { data, statusText } = await itemsAPI.getCloseItems()
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.items = data.items
        this.isLoading = false
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
