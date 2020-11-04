<template>
  <div class="container card-form-container">
    <form action="" class="card-form">
      <h2 class="form-title">
        新增項目
      </h2>
      <div class="form-content">
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
            name="category"
            id="category"
            class="category"
            v-model="item.CategoryId"
            required
            @change="filterSubcategory"
          >
            <option value="-1" hidden>請選擇</option>
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
                v-model="item.subCategories"
                :value="subcategory.id"
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
          <label for="description">項目描述*：</label>
          <textarea
            name="description"
            id="description"
            v-model="item.description"
            required
          ></textarea>
        </div>
        <div class="form-item form-image">
          <p for="image">相關圖片：</p>
          <input type="file" @change="fileChangeHandler" />
          <div class="form-item-image">
            <img :src="item.image" alt="image" v-show="item.image" />
          </div>
        </div>
      </div>
      <div class="form-buttons">
        <button @click.stop.prevent="console" class="go-back-button">
          回前頁
        </button>
        <button @click.stop.prevent="submit" class="card-submit-button">
          送出
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CardForm',
  data() {
    return {
      categories: [],
      subCategories: [],
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
  }
}
</script>

<style lang="scss">
.card-form-container {
  padding-top: 20px;
}
.card-form {
  margin: 90px auto 40px auto;
  background-color: $light-logo-green;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  h2 {
    color: $dark-gray;
    border-bottom: 2px solid $dark-gray;
    padding: 20px 0 30px 5px;
    font-weight: 700;
    letter-spacing: 2px;
    text-align: center;
  }
  .form-content {
    padding: 0 10px;
  }
  .form-item {
    font-size: 1.3rem;
    padding: 20px 0;
    border-bottom: 1px solid $gray;
    input[type='text'] {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      @extend .input-style;
    }
    select {
      @extend .input-style;
    }
    input[type='checkbox'] {
      display: none;
      ~ label {
        border: 2px solid rgba(0, 0, 0, 0.2);
        color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 0 3px;
        margin: 3px;
        line-height: 2;
      }
      &:checked ~ label {
        border: 2px solid $dark-green;
        color: $dark-green;
      }
    }
    input[type='file'] {
      font-size: 1.2rem;
      border-radius: 5px;
    }
    .form-subcategory-wrapper {
      margin: 10px;
      display: flex;
      flex-wrap: wrap;
    }
    textarea {
      width: 100%;
      height: 100px;
      resize: none;
      margin: 10px 0;
      font-size: 1.2rem;
      line-height: 1.4;
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
    padding: 10px;
    padding-top: 20px;
    button {
      @extend .button-style;
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
      }
    }
  }
}
@media (min-width: 768px) {
  .card-form {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
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
