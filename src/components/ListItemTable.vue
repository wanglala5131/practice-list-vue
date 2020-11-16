<template>
  <div class="temlist">
    <div class="container">
      <form action="">
        <div class="temlist-name">
          <label for="temlist-name-input" class="temlist-name-label"
            >菜單名稱*：</label
          >
          <input
            type="text"
            placeholder="填入菜單名稱"
            id="temlist-name-input"
            v-model="temlistName"
          />
        </div>
        <p>請打開項目填入組數以及排列項目順序(拖曳)</p>
        <draggable class="temlist-items" v-model="listItems">
          <transition-group>
            <div
              class="temlist-item flip-list"
              v-for="ele in listItems"
              :key="ele.order"
            >
              <div class="temlist-item-header">
                <div class="temlist-item-info">
                  <div class="temlist-item-type">
                    <span class="temlist-item-category">{{
                      ele.item.Item.Category.name
                    }}</span>
                    <div class="temlist-item-subcategory">
                      <span
                        v-for="subcategory in ele.item.Item.Subcategories"
                        :key="subcategory.id"
                        >{{ subcategory.name }}</span
                      >
                    </div>
                  </div>
                  <router-link
                    :to="{
                      name: 'practice-item',
                      params: { id: ele.item.Item.id }
                    }"
                    class="temlist-item-name"
                    >{{ ele.item.Item.name }}</router-link
                  >
                </div>
                <button
                  class="cart-simple-button"
                  @click.stop.prevent="deleteCartItem(ele.item)"
                >
                  &times;
                </button>
                <label
                  :for="labelIndex(ele.item.id, 'temlist-item-')"
                  class="temlist-footer-toggle-label"
                  ><font-awesome-icon icon="chevron-down"
                /></label>
              </div>
              <input
                type="checkbox"
                :id="labelIndex(ele.item.id, 'temlist-item-')"
              />
              <div class="temlist-footer">
                <div class="temlist-item-reps">
                  <label
                    :for="labelIndex(ele.item.id, 'temlist-reps-label-')"
                    class="temlist-reps-label"
                    >組數：</label
                  >
                  <input
                    type="text"
                    :id="labelIndex(ele.item.id, 'temlist-reps-label-')"
                    class="temlist-reps-input"
                    placeholder="e.g.三組各10次、持續5分鐘"
                    v-model="ele.item.reps"
                  />
                </div>
                <div class="temlist-item-remark">
                  <label
                    :for="labelIndex(ele.item.id, 'temlist-remark-label-')"
                    class="temlist-remark-label"
                    >備註：</label
                  >
                  <input
                    type="text"
                    class="temlist-remark-input"
                    :id="labelIndex(ele.item.id, 'temlist-remark-label-')"
                    v-model="ele.item.remark"
                  />
                </div>
              </div>
            </div>
          </transition-group>
        </draggable>
        <div class="temlist-buttons">
          <button
            class="temlist-save-btn"
            @click.stop.prevent="saveList"
            :disabled="isProcessing"
          >
            {{ saveText }}
          </button>
          <button
            class="temlist-submit-btn"
            @click.stop.prevent="submitList"
            v-if="listType === 'cart'"
            :disabled="isProcessing"
          >
            {{ submitText }}
          </button>
          <addItemModal
            :listType="listType"
            :ori-list-items="oriListItems"
            @addItemToList="addItemToListHandler"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import addItemModal from '../components/addItemModal'
import { Toast } from '../utils/helpers'
import { Confirm } from '../utils/helpers'
import cartsAPI from '../apis/carts'
import listsAPI from '../apis/lists'
export default {
  name: 'ListItemTable',
  components: {
    draggable,
    addItemModal
  },
  props: {
    oriListItems: {
      type: Array
    },
    oriListName: {
      type: String
    },
    listType: {
      type: String
    }
  },
  created() {
    this.fetchTemListName()
    this.fetchSaveText()
  },
  data() {
    return {
      listItems: [],
      temlistName: '',
      isProcessing: false,
      saveText: '',
      submitText: '送出菜單'
    }
  },
  methods: {
    fetchTemListName() {
      if (this.listType === 'cart') {
        const oriTemListName = JSON.parse(localStorage.getItem('temListName'))
        this.temlistName = oriTemListName
        return
      }
    },
    fetchSaveText() {
      if (this.listType === 'cart') {
        this.saveText = '儲存菜單名稱/項目資料'
      } else {
        this.saveText = '更新菜單名稱/項目資料'
      }
    },
    labelIndex(id, front) {
      return front + id
    },
    async deleteCartItem(item) {
      try {
        //暫定菜單
        if (this.listType === 'cart') {
          const result = await Confirm.fire({
            title: `確定要刪除「${item.Item.name}」嗎？`,
            confirmButtonText: `刪除`
          })
          if (result.isConfirmed) {
            const cartId = item.id
            const { statusText } = await cartsAPI.deleteCartItem({
              cartId
            })
            if (statusText !== 'OK') {
              throw new Error()
            }
            this.$emit('deleteCartItem', cartId)
            Toast.fire({
              icon: 'success',
              title: '已成功刪除項目'
            })
          }
        } else {
          //編輯已定菜單
          if (this.listItems.length <= 3) {
            Toast.fire({
              icon: 'error',
              title: '無法刪除，菜單項目至少要三項'
            })
            return
          }
          const result = await Confirm.fire({
            title: `確定要刪除「${item.Item.name}」嗎？`,
            confirmButtonText: `刪除`
          })
          if (result.isConfirmed) {
            const itemId = item.Item.id
            const id = this.$route.params.id
            const { data, statusText } = await listsAPI.deleteListItem({
              id,
              itemId
            })
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
            this.listItems = this.listItems.filter(
              item => item.item.ItemId !== itemId
            )
            this.$emit('deleteListItem', itemId)
            Toast.fire({
              icon: 'success',
              title: '已成功刪除項目'
            })
          }
        }
      } catch (err) {
        Toast.fire({
          icon: 'success',
          title: '目前無法刪除暫定菜單的項目，請稍後再試'
        })
      }
    },
    //只有暫定菜單才有這個方法
    async submitList() {
      try {
        if (this.listItems.length < 3) {
          Toast.fire({
            icon: 'error',
            title: '暫定菜單的項目必須至少 3 項唷！'
          })
          return
        }
        if (!this.temlistName) {
          Toast.fire({
            icon: 'error',
            title: '請輸入菜單名稱'
          })
          return
        }
        const result = await Confirm.fire({
          title: '確定要送出菜單了？',
          confirmButtonText: `送出`
        })
        if (result.isConfirmed) {
          this.isProcessing = true
          this.submitText = '送出中'
          let updateItems = this.listItems.map(ele => ({
            ItemId: ele.item.ItemId,
            remark: ele.item.remark,
            reps: ele.item.reps
          }))
          const { data, statusText } = await listsAPI.submitCart({
            updateItems,
            listName: this.temlistName
          })
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
            title: '成功送出菜單，跳轉至菜單頁面'
          })
          localStorage.removeItem('temListName')
          this.$router.push('/lists?isUsed=false')
        }
      } catch (err) {
        this.isProcessing = false
        this.submitText = '送出菜單'
        Toast.fire({
          icon: 'error',
          title: '目前無法送出菜單，請稍後再試'
        })
      }
    },
    async saveList() {
      try {
        let sortCount = 0
        let updateItems = []
        this.isProcessing = true

        this.listItems.map(ele => {
          updateItems.push({
            ItemId: ele.item.Item.id,
            sort: sortCount,
            remark: ele.item.remark,
            reps: ele.item.reps
          })
          sortCount++
        })
        if (this.listType === 'cart') {
          this.saveText = '儲存中'
          localStorage.setItem('temListName', JSON.stringify(this.temlistName))
          const { statusText } = await cartsAPI.putCartItem({ updateItems })
          if (statusText !== 'OK') {
            throw new Error()
          }
          Toast.fire({
            icon: 'success',
            title: '成功儲存菜單'
          })
        } else {
          this.saveText = '更新中'
          const { id } = this.$route.params
          const { statusText } = await listsAPI.putList({
            updateItems,
            listName: this.temlistName,
            id
          })
          if (statusText !== 'OK') {
            throw new Error()
          }
          Toast.fire({
            icon: 'success',
            title: '成功更新菜單'
          })
          this.$router.push('/lists')
        }
        this.isProcessing = false
        this.fetchSaveText()
      } catch (err) {
        this.isProcessing = false
        this.fetchSaveText()
        Toast.fire({
          icon: 'error',
          title: '目前無法儲存菜單，請稍後再試'
        })
      }
    },
    addItemToListHandler(payload) {
      const item = {
        item: payload.item,
        order: this.listItems.length
      }
      this.listItems.push(item)
      this.$emit('listitemTableToTop', item)
    }
  },
  watch: {
    oriListItems(newValue) {
      this.listItems = newValue.map((item, index) => {
        return { item, order: index }
      })
    },
    oriListName(newValue) {
      this.temlistName = newValue
    }
  }
}
</script>

<style lang="scss">
.temlist {
  margin: 0 auto 80px auto;
  width: 100%;
  max-width: 900px;
  padding: 0 10px;
  font-size: 1.4rem;
  input {
    width: 100%;
    @extend .input-style;
  }
  label {
    display: inline-block;
    margin: 10px 10px 10px 0;
  }
  input[type='checkbox'] {
    display: none;
    &:checked ~ .temlist-footer {
      height: auto;
      transform: scale(1, 1);
      transition: transform 0.2s ease-out;
    }
  }
  h2 {
    padding: 10px 0;
  }
  p {
    padding-bottom: 10px;
    color: $dark-gray;
  }
}
.temlist-name {
  margin: 20px 0 40px 0;
}
.temlist-item {
  margin: 10px 0;
  .temlist-item-header {
    border-radius: 10px;
    background-color: $light-logo-green;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    .cart-simple-button {
      font-size: 2.5rem;
      margin-right: 10px;
      color: $dark-red;
      cursor: pointer;
      &:hover {
        color: $red;
        text-shadow: 0px 2px 2px (rgba(0, 0, 0, 0.2));
      }
    }
    .temlist-footer-toggle-label {
      cursor: pointer;
      font-size: 1.5rem;
      &:hover {
        color: $font-green;
      }
    }
    .temlist-item-info {
      flex-grow: 1;
      a {
        font-size: 1.4rem;
        font-weight: 700;
        color: $op-black;
      }
    }
    .temlist-item-type {
      display: flex;
      align-items: center;
      margin-bottom: 2px;
      .temlist-item-category {
        font-weight: 700;
        font-size: 1.4rem;
        margin-right: 10px;
        color: $font-green;
        letter-spacing: 1px;
      }
      .temlist-item-subcategory {
        span {
          display: inline-block;
          padding: 0px 2px;
          border: 1px solid $dark-gray;
          border-radius: 10px;
          color: $dark-gray;
          margin: 0 1px 3px 1px;
          font-size: 0.8em;
        }
      }
    }
  }
  .temlist-footer {
    height: 0;
    transform: scale(1, 0);
    transform-origin: top;
    transition: none;
    padding: 0 30px;
    .temlist-item-remark {
      padding-bottom: 10px;
    }
  }
}
.temlist-buttons {
  border-top: 2px solid $gray;
  margin-top: 30px;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  button {
    @extend .button-style;
    font-size: 1.3rem;
    margin: 3px;
    &.temlist-submit-btn {
      background-color: $logo-green;
      border: 2px solid $dark-green;
    }
    &.temlist-save-btn {
      border: 2px solid $dark-gray;
    }
    &:hover {
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
    }
    &:disabled {
      border-color: $gray;
      &:hover {
        box-shadow: none;
      }
    }
  }
}
@media (min-width: 768px) {
  .temlist {
    margin-top: 170px;
  }
  .temlist-item {
    .temlist-item-info {
      display: flex;
      align-items: center;
      padding-left: 10px;
      .temlist-item-name {
        order: -1;
        margin-right: 20px;
        flex-basis: 50%;
      }
    }
    .temlist-footer-toggle-label {
      margin: 0 10px 0 0;
    }
  }
}
</style>
