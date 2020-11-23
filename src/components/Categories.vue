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
        <h2>新增運動項目</h2>
        <input
          type="text"
          placeholder="填入運動項目"
          v-model="newName"
          @keyup.enter="addItem"
        />
        <button @click.stop.prevent="addItem" :disabled="isProcessing">
          {{ isProcessing ? '新增中' : '新增' }}
        </button>
      </div>
    </div>
    <div class="setting-table" v-show="!isLoading">
      <div class="container">
        <div class="setting-table-title">
          <h2>
            目前的運動項目
          </h2>
          <span class="setting-table-remind"
            >點兩下可編輯名稱，若此項目尚有類別正在使用，則無法刪除
          </span>
        </div>
        <div
          class="setting-item"
          v-for="category in categories"
          :key="category.id"
        >
          <div
            class="setting-item-text"
            :class="{ editing: editingItem.id === category.id }"
          >
            <p @dblclick="editItem(category)">{{ category.name }}</p>
            <input
              type="text"
              name="category"
              v-model="editingItem.name"
              @blur="submitItem()"
              @keyup.enter="$event.target.blur"
              v-input-focus="editingItem.id === category.id"
            />
          </div>
          <div class="setting-item-buttons">
            <button
              @click.stop.prevent="deleteItem(category)"
              v-if="!isChangeable(category.Subcategories)"
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
  name: 'categories',
  data() {
    return {
      newName: '',
      newCategory: -1,
      categories: [],
      editingItem: {},
      temEditingName: '',
      isProcessing: false,
      isLoading: true
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        const { data, statusText } = await settingAPI.getCategory()
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.categories = data
        this.isLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得資料，請稍後再試'
        })
      }
    },
    isChangeable(subcategories) {
      if (subcategories.length > 0) {
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
          const { data, statusText } = await settingAPI.putCategory({
            name: this.editingItem.name,
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
          this.categories = this.categories.map(category => {
            if (category.id === this.editingItem.id) {
              return this.editingItem
            }
            return category
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
    async deleteItem(item) {
      try {
        if (item.Subcategories.length > 0) {
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
          const { data, statusText } = await settingAPI.deleteCategory({
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
          this.categories = this.categories.filter(
            category => category.id !== item.id
          )
          Toast.fire({
            icon: 'success',
            title: '成功刪除項目類型'
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
        if (!this.newName) {
          Toast.fire({
            icon: 'error',
            title: '請填入名稱'
          })
          return
        }
        this.isProcessing = true
        const { data, statusText } = await settingAPI.addCategory({
          name: this.newName
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
        this.categories.push({ ...data, Subcategories: [] })
        Toast.fire({
          icon: 'success',
          title: '成功新增項目類型'
        })
        this.newName = ''
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
  h2 {
    margin-bottom: 20px;
  }
  input {
    @extend .input-style;
    margin: 0 10px 10px 0;
    padding-top: 5px;
    width: 100%;
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
    cursor: pointer;
    &:hover {
      border: 2px solid $dark-gray;
    }
    &:disabled {
      color: $gray;
      background-color: $light-gray;
      &:hover {
        border: 2px solid $white;
      }
    }
  }
}
.setting-table {
  margin: 0 auto 50px auto;
  padding: 20px 0;
  max-width: 800px;
  .setting-table-title {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
  }
  .setting-table-remind {
    display: inline-block;
    padding: 5px;
    font-size: 1.2rem;
    color: $dark-gray;
  }
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
    margin: 10px 0;
    height: 60px;
    background-color: $light-logo-green;
    border-radius: 20px;
    .setting-item-text {
      font-size: 1.4rem;
      p {
        padding: 0 0 2px 7px;
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
    .setting-item-buttons {
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
    display: flex;
    justify-content: center;
    padding-top: 60px;
    margin-top: 50px;
    h2 {
      margin-bottom: 20px;
      font-size: 1.8rem;
    }
    input {
      flex-grow: 1;
      width: 50%;
    }
  }
  .setting-table {
    h2 {
      margin-bottom: 10px;
      font-size: 1.8rem;
    }
  }
}
</style>
