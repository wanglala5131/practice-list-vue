<template>
  <div class="container card-form-container">
    <form class="card-form" @submit.stop.prevent="submitFile">
      <h2 class="form-title">
        <slot></slot>
      </h2>
      <div>
        <loading
          id="loading-box"
          :active.sync="isLoading"
          :can-cancel="true"
          :opacity="opacity"
        ></loading>
      </div>
      <div class="form-content" v-show="!isLoading">
        <div class="form-item form-name">
          <label for="name">項目名稱*：</label>
          <input
            type="text"
            name="name"
            id="name"
            v-model="item.name"
            required
          />
        </div>
        <div class="form-item form-category">
          <label for="category">運動種類*：</label>
          <select
            name="CategoryId"
            id="category"
            class="category"
            v-model="item.CategoryId"
            required
            @change="filterSubcategory"
          >
            <option value="-1" hidden disabled>請選擇</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
              >{{ category.name }}</option
            >
          </select>
        </div>
        <div class="form-item form-subcategory">
          <p>運動類別*：</p>
          <div class="form-subcategory-wrapper">
            <div
              class="subcategory-box"
              v-for="subcategory in subcategoryFilter"
              :key="subcategory.id"
            >
              <input
                type="checkbox"
                :id="labelIndex(subcategory.id)"
                v-model="item.subcategoriesArr"
                :value="subcategory.id"
                name="subcategoriesArr"
              />
              <label :for="labelIndex(subcategory.id)">{{
                subcategory.name
              }}</label>
            </div>
          </div>
        </div>
        <div class="form-item form-limit">
          <label for="limit">限制：</label>
          <input type="text" name="limit" id="limit" v-model="item.limit" />
        </div>
        <div class="form-item form-description">
          <label for="description">項目描述：</label>
          <textarea
            name="description"
            id="description"
            v-model="item.description"
          ></textarea>
        </div>
        <div class="form-item form-image">
          <p for="image">相關圖片：</p>
          <input
            type="file"
            @change="fileChangeHandler"
            name="image"
            ref="inputFile"
          />
          <div class="form-item-image">
            <img :src="item.image" alt="image" v-show="item.image" />
          </div>
        </div>
      </div>
      <div class="form-buttons" v-show="!isLoading">
        <router-link to="/" class="form-button go-back-button">
          回前頁
        </router-link>
        <button
          type="submit"
          class="form-button card-submit-button"
          :disabled="isProcessing"
        >
          {{ isProcessing ? '送出中' : '送出' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast, Confirm } from '../utils/helpers'
export default {
  name: 'CardForm',
  data() {
    return {
      opacity: 0,
      subcategoryFilter: [],
      item: {
        image: '',
        CategoryId: -1
      },
      categories: [],
      subcategories: []
    }
  },
  props: {
    oriCategories: {
      type: Array
    },
    oriSubcategories: {
      type: Array
    },
    oriItem: {
      type: Object
    },
    isProcessing: {
      type: Boolean
    },
    isLoading: {
      type: Boolean
    }
  },
  methods: {
    filterSubcategory() {
      this.item.subcategoriesArr = []
      this.subcategoryFilter = this.subcategories.filter(
        subcategory => subcategory.CategoryId === this.item.CategoryId
      )
    },
    labelIndex(id) {
      return `subcategory-${id}`
    },
    fileChangeHandler(e) {
      const files = e.target.files
      if (files[0].type !== 'image/jpeg') {
        Toast.fire({
          icon: 'error',
          title: '只能傳圖片唷！'
        })
        this.item.image = ''
        this.$refs.inputFile.value = ''
        return
      }
      if (!files.length) {
        this.item.image = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        console.log(imageURL)
        this.item.image = imageURL
      }
    },
    submitFile(e) {
      if (
        !this.item.name ||
        this.item.CategoryId < 0 ||
        this.item.subcategoriesArr.length === 0
      ) {
        Toast.fire({
          icon: 'error',
          title: '必填欄位要記得填哦！'
        })
        return
      }
      const form = e.target
      const formData = new FormData(form)
      Confirm.fire({
        title: `確定要送出了嗎？若有上傳圖片會花較久時間，請見諒`,
        confirmButtonText: `送出`
      }).then(result => {
        if (result.isConfirmed) {
          this.$emit('submitFile', formData)
        }
      })
    }
  },
  watch: {
    oriCategories(newValue) {
      this.categories = newValue
    },
    oriSubcategories(newValue) {
      this.subcategories = newValue
      //如果subcategories比item晚進來，就跑下面if
      if (this.subcategoryFilter.length === 0 && this.item.CategoryId !== -1) {
        this.subcategoryFilter = newValue.filter(
          subcategory => subcategory.CategoryId === this.oriItem.CategoryId
        )
      }
    },
    oriItem(newValue) {
      this.item = newValue
      //如果items比subcategories晚進來，就跑下面if
      if (
        this.subcategoryFilter.length === 0 &&
        this.subcategories.length !== 0
      ) {
        this.subcategoryFilter = this.subcategories.filter(
          subcategory => subcategory.CategoryId === this.oriItem.CategoryId
        )
      }
    }
  }
}
</script>

<style lang="scss">
.card-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  #loading-box {
    margin-top: 10px;
  }
}
.card-form {
  margin: 90px auto 40px auto;
  padding: 10px 20px;
  background-color: $light-logo-green;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  h2 {
    border-bottom: 2px solid $dark-gray;
    padding: 20px 0 30px 5px;
    font-weight: 700;
    letter-spacing: 2px;
    text-align: center;
    color: $dark-gray;
  }
  .form-content {
    padding: 0 10px;
  }
  .form-item {
    padding: 20px 0;
    border-bottom: 1px solid $gray;
    font-size: 1.3rem;
    input[type='text'] {
      margin-top: 10px;
      margin-bottom: 10px;
      width: 100%;
      @extend .input-style;
    }
    select {
      @extend .input-style;
    }
    input[type='checkbox'] {
      display: none;
      ~ label {
        padding: 0 3px;
        margin: 3px;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        color: rgba(0, 0, 0, 0.2);
        line-height: 2;
      }
      &:checked ~ label {
        border: 2px solid $dark-green;
        color: $dark-green;
      }
    }
    input[type='file'] {
      border-radius: 5px;
      font-size: 1.2rem;
    }
    .form-subcategory-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin: 10px;
    }
    textarea {
      margin: 10px 0;
      width: 100%;
      height: 100px;
      font-size: 1.2rem;
      line-height: 1.4;
      resize: none;
      @extend .input-style;
    }
    input[type='file'] {
      margin: 10px 0;
    }
    .form-item-image {
      margin: 10px 0;
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
  .form-buttons {
    display: flex;
    justify-content: space-around;
    padding: 20px 10px 10px 10px;
    .form-button {
      @extend .button-style;
      color: $black;
      font-size: 1.3rem;
      &.go-back-button {
        border: 2px solid $gray;
        &:hover {
          border: 2px solid $dark-gray;
        }
      }
      &.card-submit-button {
        border: 2px solid $logo-green;
        background-color: $logo-green;
        &:hover {
          border: 2px solid $dark-green;
        }
        &:disabled {
          cursor: default;
          background-color: $gray;
          border: 2px solid $gray;
          &:hover {
            border: 2px solid $gray;
          }
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .card-form {
    max-width: 700px;
    background-color: $op-white;
    .form-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      .form-subcategory,
      .form-limit,
      .form-description,
      .form-image {
        grid-column: 1/3;
      }
      .form-name {
        padding-right: 30px;
      }
      .form-category {
        label {
          display: block;
        }
        select {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
