<template>
  <main>
    <button
      class="temlist-submit-btn"
      v-if="listType !== 'cart'"
      @click.stop.prevent="openModal"
    >
      添加項目
    </button>
    <transition name="fade">
      <div class="add-item-box" v-show="showModal">
        <div class="add-item-modal" @click.stop.prevent="openModal"></div>
        <div class="add-item-content">
          <div class="add-item-close" @click.stop.prevent="openModal">
            &times;
          </div>
          <div class="add-item-to-top" @click.stop.prevent="toTop">
            <font-awesome-icon icon="arrow-up" />
          </div>
          <h2 class="add-item-title">添加項目</h2>
          <div class="add-item-content-box">
            <searchBar
              :search-position="'listModal'"
              :ori-categories="categories"
              :ori-subcategories="subcategories"
              :ori-items="items"
              :ori-items-filter="itemsFilter"
              :is-type-loading="isTypeLoading"
              @filterCards="filterCardsHandler"
            />
            <div v-show="isItemsLoading">
              <loading
                id="loading-box"
                :active.sync="isItemsLoading"
                :can-cancel="true"
              ></loading>
            </div>
            <div class="add-item-cards" v-show="!isItemsLoading">
              <div class="add-item-card" v-for="item in items" :key="item.id">
                <div class="add-card-info">
                  <span class="add-card-name">
                    {{ item.name }}
                  </span>
                  <div class="add-card-type">
                    <span class="add-card-category">
                      {{ item.Category.name }}
                    </span>
                    <div class="add-card-subcategories">
                      <span
                        v-for="subcategory in item.Subcategories"
                        :key="subcategory.id"
                        >{{ subcategory.name }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="add-card-buttons">
                  <button
                    @click.stop.prevent="addItemToList(item)"
                    :disabled="item.isInList"
                  >
                    {{ item.isInList ? '已有' : '添加' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </main>
</template>
<script>
import itemsAPI from '../apis/items'
import settingAPI from '../apis/setting'
import listsAPI from '../apis/lists'
import searchBar from '../components/searchBar'
import { Toast } from '../utils/helpers'
export default {
  name: 'addItemModal',
  components: {
    searchBar
  },
  props: {
    listType: {
      type: String
    },
    oriListItems: {
      type: Array
    }
  },
  data() {
    return {
      showModal: false,
      //下面undefined表示未取得資料，打開modal時會進行fetch
      items: undefined,
      itemsFilter: [],
      categories: undefined,
      subcategories: undefined,
      listItemsArr: [],
      isItemsLoading: true,
      isTypeLoading: true
    }
  },
  methods: {
    openModal() {
      if (!this.items) {
        this.fetchItems()
      }
      if (!this.categories || !this.subcategories) {
        this.fetchType()
      }
      this.showModal = !this.showModal
    },
    async fetchType() {
      try {
        const { data, statusText } = await settingAPI.getSubcategory()
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.subcategories = data.subcategories
        this.categories = data.categories
        this.isTypeLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得運動項目與項目種類資料，請稍後再試'
        })
      }
    },
    async fetchItems() {
      try {
        const { data, statusText } = await itemsAPI.getItems()
        if (statusText !== 'OK') {
          throw new Error()
        }

        const items = data.items.map(item => {
          const subcategoriesArr = []
          for (let subcategory of item.Subcategories) {
            subcategoriesArr.push(subcategory.id)
          }
          return {
            ...item,
            isInList: this.listItemsArr.includes(item.id),
            subcategoriesArr: subcategoriesArr
          }
        })
        this.items = items
        this.itemsFilter = items
        this.isItemsLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得練習項目，請稍後再試'
        })
      }
    },
    async addItemToList(item) {
      try {
        if (item.isInList) {
          Toast.fire({
            icon: 'error',
            title: '已在菜單中，無法添加'
          })
          return
        }
        if (this.listItemsArr.length >= 20) {
          Toast.fire({
            icon: 'error',
            title: '菜單已達20項上限'
          })
          return
        }
        const ListId = this.$route.params.id
        const ItemId = item.id
        const { data, statusText } = await listsAPI.addItemToList({
          ListId,
          ItemId
        })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          Toast.fire({
            icon: 'error',
            title: data.message
          })
        }
        for (let curItem of this.items) {
          if (curItem.id === item.id) {
            curItem.isInList = true
          }
          break
        }
        for (let curItem of this.itemsFilter) {
          if (curItem.id === item.id) {
            curItem.isInList = true
            break
          }
        }
        const ListItem = {
          id: data.id,
          ListId: Number(this.$route.params.id),
          ItemId: item.id,
          Item: {
            ...item,
            Listitem: data
          },
          remark: '',
          reps: ''
        }
        Toast.fire({
          icon: 'success',
          title: `已成功添加「${item.name}」`
        })
        this.$emit('addItemToList', { item: ListItem })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法添加項目，請稍後再試'
        })
      }
    },
    toTop() {
      const cards = document.querySelector('.add-item-cards')
      cards.scrollTo({
        top: 0,
        behavior: 'smooth' //立即:instant
      })
    },
    filterCardsHandler(payload) {
      this.itemsFilter = payload
    }
  },
  watch: {
    oriListItems(newValue) {
      this.listItemsArr = []
      this.listItems = newValue.map(item => {
        this.listItemsArr.push(item.Item.id)
      })
      //刪除時，重新渲染一次modal裡的item
      if (this.items) {
        const items = this.items.map(item => {
          const subcategoriesArr = []
          for (let subcategory of item.Subcategories) {
            subcategoriesArr.push(subcategory.id)
          }
          return {
            ...item,
            isInList: this.listItemsArr.includes(item.id),
            subcategoriesArr: subcategoriesArr
          }
        })
        this.items = items
        this.itemsFilter = items
      }
    }
  }
}
</script>

<style lang="scss">
.add-item-box,
.add-item-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.add-item-box {
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-item-modal {
  z-index: -10;
  background-color: $op-light-black;
}
.add-item-content {
  position: relative;
  margin: 50px 20px;
  padding: 10px;
  width: 80%;
  max-width: 800px;
  height: 80%;
  border-radius: 3px;
  background-color: $white;
  .add-item-close {
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 2rem;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      color: $logo-green;
    }
  }
  .add-item-to-top {
    position: absolute;
    left: 15px;
    cursor: pointer;
    .svg-inline--fa {
      font-size: 25px;
    }
  }
  .add-item-title {
    text-align: center;
    color: $logo-green;
  }
  .add-item-cards {
    margin: 0 auto;
    padding: 15px;
    width: 95%;
    overflow-y: auto;
    @extend .scroll-style;
    font-size: 1rem;
    .add-item-card {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: $light-gray;
      .add-card-info {
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 18px 0 15px 15px;
        .add-card-name {
          margin-bottom: 5px;
          font-size: 1.3rem;
          font-weight: 700;
        }
        .add-card-type {
          display: flex;
          padding-top: 1px;
          .add-card-category {
            padding: 0 5px;
            font-size: 1.3rem;
            font-weight: 500;
            color: $font-green;
          }
          .add-card-subcategories {
            padding: 2px;
            span {
              display: inline-block;
              margin: 1px;
              padding: 0 2px;
              border: 1px solid $dark-gray;
              border-radius: 8px;
              font-size: 1rem;
              color: $dark-gray;
              white-space: nowrap;
            }
          }
        }
      }
      .add-card-buttons {
        padding: 10px;
        button {
          background-color: $dark-yellow;
          white-space: nowrap;
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media (min-width: 768px) {
  .add-item-content {
    .add-item-cards {
      width: 85%;
    }
  }
}
</style>
