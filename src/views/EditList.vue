<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <PageTitle>
      <template v-slot:title>
        編輯菜單
      </template>
    </PageTitle>
    <ListItemTable
      :ori-list-items="editList"
      :ori-list-name="listName"
      :list-type="'EditList'"
      :is-loading="isLoading"
      @deleteListItem="deleteListItemHandler"
      @listitemTableToTop="listitemTableToTopHandler"
    />
  </main>
</template>

<script>
import Banner from '../components/Banner'
import PageTitle from '../components/PageTitle'
import ToTop from '../components/ToTop'
import ListItemTable from '../components/ListItemTable'
import listsAPI from '../apis/lists'
import { Toast } from '../utils/helpers'
export default {
  name: 'EditList',
  components: {
    Banner,
    PageTitle,
    ToTop,
    ListItemTable
  },
  data() {
    return {
      bannerImgURL:
        'https://cdn.pixabay.com/photo/2018/06/12/20/17/football-3471402_1280.jpg',
      list: [],
      listName: '',
      editList: [],
      isLoading: true
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchList(id)
  },
  methods: {
    async fetchList(id) {
      try {
        const { data, statusText } = await listsAPI.getList({ id })
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
        this.list = data
        this.listName = data.name
        this.editList = data.Items.map(item => ({
          id: item.id,
          Item: item,
          reps: item.ListItem.reps,
          remark: item.ListItem.remark
        }))
        this.isLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得菜單資料，請稍後再試'
        })
      }
    },
    deleteListItemHandler(payload) {
      this.editList = this.editList.filter(item => item.Item.id !== payload)
      this.list.Items = this.list.Items.filter(item => item.id !== payload)
    },
    listitemTableToTopHandler(payload) {
      this.list.Items.push(payload.item.Item)
      this.editList.push(payload.item)
    }
  }
}
</script>
