<template>
  <main>
    <BackgroundImg />
    <CardForm
      :ori-categories="categories"
      :ori-subcategories="subcategories"
      :ori-item="item"
      :is-processing="isProcessing"
      :is-loading="isLoading"
      @submitFile="submitFileHandler"
      >修改項目</CardForm
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
  name: 'EditItem',
  components: {
    BackgroundImg,
    CardForm
  },
  data() {
    return {
      isLoading: true,
      isProcessing: false,
      categories: [],
      subcategories: [],
      subcategoryFilter: [],
      item: {}
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchItem(id)
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
    async fetchItem(itemId) {
      try {
        const { data, statusText } = await itemsAPI.getItem({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          Toast.fire({
            icon: 'error',
            title: data.message
          })
        }
        const subcategoriesArr = []
        data.item.Subcategories.map(subcategory => {
          subcategoriesArr.push(subcategory.id)
        })
        this.item = { ...data.item, subcategoriesArr: subcategoriesArr }
        return
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得項目資料，請稍後再試'
        })
      }
    },
    async submitFileHandler(formData) {
      try {
        this.isProcessing = true
        const itemId = this.item.id
        const { data, statusText } = await itemsAPI.putItem({
          itemId,
          formData
        })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          Toast.fire({
            icon: 'error',
            title: data.message
          })
          this.$router.push(`/`)
        }
        Toast.fire({
          icon: 'success',
          title: '成功編輯項目，若資料無更新，請先重新整理確認是否成功'
        })
        const { updateItem } = data
        this.$router.push(`/items/${updateItem.id}`)
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '目前暫時無法編輯項目，請稍後再試'
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
