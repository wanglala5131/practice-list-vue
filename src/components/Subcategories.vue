<template>
  <main>
    <div class="setting-add-area">
      <div v-show="isLoading">
        <loading
          id="loading-box"
          :active.sync="isLoading"
          :can-cancel="true"
        ></loading>
      </div>
      <div class="container" v-show="!isLoading">
        <h2>新增項目類型</h2>
        <input
          type="text"
          placeholder="填入類型名稱"
          v-model="newName"
          @keyup.enter="addItem"
        />
        <select name="add-select" id="add-select" v-model="newCategory">
          <option value="-1" hidden>選擇運動類別</option>
          <option
            :value="category.id"
            v-for="category in categories"
            :key="category.id"
            >{{ category.name }}</option
          >
        </select>
        <button @click.stop.prevent="addItem" :disabled="isProcessing">
          {{ isProcessing ? '新增中' : '新增' }}
        </button>
      </div>
    </div>
    <div class="setting-table" v-show="!isLoading">
      <div class="container">
        <div class="setting-table-title">
          <h2>
            目前的項目類型
          </h2>
          <span class="setting-table-remind"
            >點兩下可編輯名稱，若尚有項目正在使用，則無法改變運動類別與刪除
          </span>
        </div>
        <div
          class="setting-item"
          v-for="subcategory in subcategories"
          :key="subcategory.id"
        >
          <div
            class="setting-item-text"
            :class="{ editing: editingItem.id === subcategory.id }"
          >
            <p @dblclick="editItem(subcategory)">{{ subcategory.name }}</p>
            <input
              type="text"
              name="subcategory"
              v-model="editingItem.name"
              @blur="submitItem()"
              @keyup.enter="$event.target.blur"
              v-input-focus="editingItem.id === subcategory.id"
            />
          </div>
          <div class="setting-item-category">
            <select
              name="edit-select"
              id="edit-select"
              v-model="subcategory.CategoryId"
              @change="changeCategory(subcategory)"
              :disabled="isChangeable(subcategory.Items)"
            >
              <option
                :value="category.id"
                v-for="category in categories"
                :key="category.id"
                >{{ category.name }}</option
              >
            </select>
          </div>
          <div class="setting-item-buttons">
            <button
              @click.stop.prevent="deleteItem(subcategory)"
              v-if="!isChangeable(subcategory.Items)"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import settingAPI from '../apis/setting'
import { Toast, Confirm } from '../utils/helpers'
export default {
  name: 'subcategories',
  data() {
    return {
      newName: '',
      newCategory: -1,
      subcategories: [],
      categories: [],
      editingItem: {},
      editOriName: '',
      temEditingName: '',
      temEditCategory: -1,
      isProcessing: false,
      isLoading: true
    }
  },
  created() {
    this.fetchSubcategories()
  },
  methods: {
    async fetchSubcategories() {
      try {
        const { data, statusText } = await settingAPI.getSubcategory()
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.subcategories = data.subcategories.map(subcategory => ({
          ...subcategory,
          oriCategoryId: subcategory.CategoryId
        }))
        this.categories = data.categories
        this.isLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得資料，請稍後再試'
        })
      }
    },
    isChangeable(items) {
      if (items.length > 0) {
        return true
      } else {
        return false
      }
    },
    editItem(item) {
      this.editingItem = { ...item }
      this.temEditingName = item.name
    },
    async submitItem() {
      try {
        if (this.editingItem.name !== this.temEditingName) {
          if (!this.editingItem.name) {
            Toast.fire({
              icon: 'error',
              title: '名稱不可空白'
            })
            return
          }
          const value = { name: this.editingItem.name }
          const { data, statusText } = await settingAPI.putSubcategory({
            value,
            id: this.editingItem.id
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
          this.subcategories = this.subcategories.map(subcategory => {
            if (subcategory.id === this.editingItem.id) {
              return this.editingItem
            }
            return subcategory
          })
          Toast.fire({
            icon: 'success',
            title: '成功修改名稱'
          })
        }
        this.editingItem = {}
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法修改名稱，請稍後再試'
        })
      }
    },
    async changeCategory(item) {
      try {
        if (item.Items.length > 0) {
          for (let subcategory of this.subcategories) {
            if (subcategory.id === item.id) {
              subcategory.CategoryId = subcategory.oriCategoryId
            }
          }
          Toast.fire({
            icon: 'error',
            title: '此類型仍有項目正在使用，無法修改運動類別唷！'
          })
          return
        }
        const value = { CategoryId: item.CategoryId }
        const { data, statusText } = await settingAPI.putSubcategory({
          value,
          id: item.id
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
          title: '成功修改運動類別'
        })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法修改運動類別，請稍後再試'
        })
      }
    },
    async deleteItem(item) {
      try {
        if (item.Items.length > 0) {
          Toast.fire({
            icon: 'error',
            title: '此類型尚有項目正在使用，無法刪除'
          })
        }
        const result = await Confirm.fire({
          title: `確定要刪除「${item.name}」嗎？`,
          confirmButtonText: `刪除`
        })
        if (result.isConfirmed) {
          const { data, statusText } = await settingAPI.deleteSubcategory({
            id: item.id
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
          this.subcategories = this.subcategories.filter(
            subcategory => subcategory.id !== item.id
          )
          Toast.fire({
            icon: 'success',
            title: '成功刪除項目類別'
          })
        }
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法刪除此項目類型，請稍後再試'
        })
      }
    },
    async addItem() {
      try {
        if (!this.newName || this.newCategory < 0) {
          Toast.fire({
            icon: 'error',
            title: '請填入名稱與選擇運動類型'
          })
          return
        }
        const name = this.newName
        const CategoryId = this.newCategory
        this.isProcessing = true
        const { data, statusText } = await settingAPI.addSubcategory({
          name,
          CategoryId
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
        this.subcategories.push({ ...data, Items: [] })
        Toast.fire({
          icon: 'success',
          title: '成功新增項目類別'
        })
        this.newName = ''
        this.newCategory = -1
        this.isProcessing = false
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '目前無法新增項目類型，請稍後再試'
        })
      }
    }
  },
  directives: {
    'input-focus': function(el) {
      el.focus()
    }
  }
}
</script>

<style lang="scss">
.setting-add-area {
  margin: 0 auto;
  padding: 30px 0 20px 0;
  max-width: 800px;
  @include pad {
    display: flex;
    justify-content: center;
    padding-top: 60px;
    margin-top: 50px;
  }
  h2 {
    margin-bottom: 20px;
    @include pad {
      margin-bottom: 20px;
      font-size: 1.8rem;
    }
  }
  input {
    @extend .input-style;
    width: 100%;
    margin-bottom: 10px;
    padding-top: 5px; //對齊旁邊的select
    @include pad {
      flex-grow: 1;
      width: 50%;
    }
  }
  select {
    @extend .input-style;
    margin: 10px 10px 0 0px;
    @include pad {
      margin: 10px 10px 0 10px;
    }
  }
  button {
    @extend .button-style;
    margin-top: 10px;
    border: 2px solid $white;
    background-color: $gray;
    color: $dark-gray;
    cursor: pointer;
    &:hover {
      border: 2px solid $dark-gray;
    }
    &:disabled {
      background-color: $light-gray;
      color: $gray;
      &:hover {
        border: 2px solid $white;
      }
    }
  }
}
.setting-table {
  margin: 0 auto 50px auto;
  padding: 20px 0 40px 0;
  max-width: 800px;
  .setting-table-title {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
  }
  .setting-table-remind {
    display: inline-block;
    padding: 5px;
    font-size: 1.2rem;
    color: $dark-gray;
  }
  .setting-item {
    display: flex;
    align-items: center;
    padding: 0px 30px;
    margin: 10px 0;
    background-color: $light-logo-green;
    border-radius: 20px;
    .setting-item-text {
      flex-basis: 80%;
      font-size: 1.4rem;
      p {
        padding: 0 7px 2px 0;
      }
      input {
        @extend .input-style;
        display: none;
        width: 100%;
        font-size: 1.4rem;
      }
      &.editing {
        p {
          display: none;
        }
        input {
          display: block;
        }
      }
    }
    .setting-item-category {
      flex-basis: 15%;
      select {
        @extend .input-style;
        margin: 15px 10px;
        max-width: 80px;
      }
    }
    .setting-item-buttons {
      flex-basis: 5%;

      button {
        padding: 0;
        font-size: 2rem;
        cursor: pointer;
        &:hover {
          color: $font-green;
        }
      }
    }
  }
  h2 {
    margin-bottom: 10px;
    @include pad {
      font-size: 1.8rem;
    }
  }
  .setting-item-category {
    @include pad {
      margin-right: 20px;
    }
  }
}
</style>
