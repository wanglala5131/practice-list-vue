<template>
  <main>
    <BackgroundImg />
    <CardForm :categories="categories" :subcategories="subcategories" />
  </main>
</template>

<script>
import BackgroundImg from '../components/BackgroundImg'
import CardForm from '../components/CardForm'
import settingAPI from '../apis/setting'
import { Toast } from '../utils/helpers'
export default {
  name: 'CreateItem',
  components: {
    BackgroundImg,
    CardForm
  },
  data() {
    return {
      categories: [],
      subcategories: [],
      subcategoryFilter: [],
      item: {
        name: '',
        limit: '',
        description: '',
        image: '',
        CategoryId: -1,
        subCategories: [],
        subcategoriesArr: []
      }
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        const { data, statusText } = await settingAPI.getSubcategory()
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.categories = data.categories
        this.subcategories = data.subcategories
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得運動項目與運動類型，請稍後再試'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bg-img {
  display: none;
}
@media (min-width: 768px) {
  .bg-img {
    display: block;
  }
}
</style>
