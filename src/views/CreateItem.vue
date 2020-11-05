<template>
  <main v-show="!isLoading">
    <BackgroundImg />
    <CardForm
      :categories="categories"
      :subcategories="subcategories"
      @submitFile="submitFileHandler"
    />
  </main>
</template>

<script>
import BackgroundImg from '../components/BackgroundImg'
import CardForm from '../components/CardForm'
import settingAPI from '../apis/setting'
import practiceAPI from '../apis/practice'
import { Toast } from '../utils/helpers'
export default {
  name: 'CreateItem',
  components: {
    BackgroundImg,
    CardForm
  },
  data() {
    return {
      isLoading: true,
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
        this.isLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得運動項目與運動類型，請稍後再試'
        })
      }
    },
    async submitFileHandler(formData) {
      try {
        const { data, statusText } = await practiceAPI.addItem({ formData })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          Toast.fire({
            icon: 'error',
            title: data.message
          })
          return
        }
        Toast.fire({
          icon: 'success',
          title: '成功建立項目'
        })
        this.$router.push(`/practice/items/${data.newItem.id}`)
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前暫時無法新增項目，請稍後再試'
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
