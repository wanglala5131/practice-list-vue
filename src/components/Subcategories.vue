<template>
  <main>
    <div class="setting-add-area">
      <div class="container">
        <h2>新增項目類型</h2>
        <input type="text" placeholder="填入類型名稱" v-model="newName" />
        <select name="add-select" id="add-select" v-model="newCategory">
          <option value="-1" hidden>選擇運動類別</option>
          <option
            :value="category.id"
            v-for="category in categories"
            :key="category.id"
            >{{ category.name }}</option
          >
        </select>
        <button @click.stop.prevent="addItem">新增</button>
      </div>
    </div>
    <div class="setting-table">
      <div class="container">
        <div class="setting-table-title">
          <h2>
            目前的項目類型
          </h2>
          <span class="setting-table-remind"
            >點兩下可編輯名稱，若此類型尚有項目正在使用，則無法改變運動類別
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
              @keyup.enter="submitItem()"
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
            <button @click.stop.prevent="deleteItem(subcategory.id)">
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
import { Toast } from '../utils/helpers'
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
      temEditCategory: -1
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
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得資料，請稍後再試'
        })
      }
    },
    isChangeable(items) {
      if (!items) {
        return false
      }
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
    deleteItem(id) {
      //要加判斷，如果card.length=0 才可刪除，如果沒有就要跳防呆
      //送API給後端刪除

      this.subCategories = this.subCategories.filter(
        subcategory => subcategory.id !== id
      )
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
        }
        this.subcategories.push(data)
      } catch (err) {
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
  max-width: 800px;
  padding: 60px 0 20px 0;
  h2 {
    margin-bottom: 20px;
  }
  input {
    width: 100%;
    margin-bottom: 10px;
    @extend .input-style;
    padding-top: 5px; //對齊旁邊的select
  }
  select {
    @extend .input-style;
    margin: 10px 10px 0 0px;
  }
  button {
    @extend .button-style;
    margin-top: 10px;
    border: 2px solid $white;
    color: $dark-gray;
    background-color: $gray;
    &:hover {
      border: 2px solid $dark-gray;
    }
  }
}
.setting-table {
  margin: 0 auto 50px auto;
  max-width: 800px;
  padding: 20px 0;
  .setting-table-title {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
  }
  .setting-table-remind {
    font-size: 1.2rem;
    padding: 5px;
    display: inline-block;
    color: $dark-gray;
  }
  .setting-item {
    background-color: $light-logo-green;
    padding: 0px 30px;
    border-radius: 20px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    .setting-item-text {
      flex-basis: 80%;
      font-size: 1.4rem;
      p {
        padding-left: 7px;
        padding-bottom: 2px;
      }
      input {
        @extend .input-style;
        width: 100%;
        display: none;
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
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        &:hover {
          color: $font-green;
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .setting-add-area {
    margin-top: 50px;
    display: flex;
    h2 {
      font-size: 1.8rem;
      margin-bottom: 20px;
    }
    input {
      width: 50%;
      flex-grow: 1;
    }
    select {
      margin: 10px 10px 0 10px;
    }
  }
  .setting-table {
    h2 {
      font-size: 1.8rem;
      margin-bottom: 10px;
    }
    .setting-item-category {
      margin-right: 20px;
    }
  }
}
</style>
