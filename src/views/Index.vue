<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <CartSimple />
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
  </main>
</template>

<script>
import Banner from '../components/Banner'
import PageTitle from '../components/PageTitle'
import ToTop from '../components/ToTop'
import CartSimple from '../components/CartSimple'
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
        'https://c.pxhere.com/photos/d9/72/basketball_ball_hoop_tree_sport-1398290.jpg!d'
    }
  }
}
</script>
