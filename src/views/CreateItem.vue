<template>
  <main>
    <BackgroundImg />
    <div>
      <loading :active.sync="isProcessing"></loading>
    </div>
    <CardForm
      :ori-categories="categories"
      :ori-subcategories="subcategories"
      :is-loading="isLoading"
      :is-processing="isProcessing"
      @submitFile="submitFileHandler"
      >新增項目</CardForm
    >
  </main>
</template>

<script>
import BackgroundImg from '../components/BackgroundImg'
import CardForm from '../components/CardForm'
import settingAPI from '../apis/setting'
import itemsAPI from '../apis/items'
import { Toast } from '../utils/helpers'
export default {
  name: 'CreateItem',
  components: {
    BackgroundImg,
    CardForm
  },
  data() {
    return {
      isProcessing: false,
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
          title: '目前無法取得運動項目與運動類別，請稍後再試'
        })
      }
    },
    async submitFileHandler(formData) {
      try {
        this.isProcessing = true
        const { data, statusText } = await itemsAPI.addItem({ formData })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          Toast.fire({
            icon: 'error',
            title: data.message
          })
          this.isProcessing = false
          return
        }
        Toast.fire({
          icon: 'success',
          title: '成功建立項目'
        })
        this.$router.push(`/items/${data.newItem.id}`)
      } catch (err) {
        this.isProcessing = false
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
  @include pad {
    display: block;
  }
}
</style>
