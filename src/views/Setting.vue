<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <PageTitle>
      <template v-slot:title>
        類別設定
      </template>
      <template v-slot:buttons>
        <div class="setting-links-wrapper">
          <router-link to="/setting/subcategories" class="title-link active"
            >項目類型</router-link
          >
          <router-link to="/setting/categories" class="title-link active"
            >運動類別</router-link
          >
        </div>
      </template>
    </PageTitle>
    <router-view></router-view>
  </main>
</template>

<script>
import Banner from '../components/Banner'
import PageTitle from '../components/PageTitle'
export default {
  name: 'setting',
  components: { Banner, PageTitle },
  data() {
    return {
      bannerImgURL: 'https://i.imgur.com/ch6XEJv.jpg'
    }
  }
}
</script>
