<template>
  <div class="cards-search" :class="{ list: searchPosition === 'listModal' }">
    <div class="container">
      <input
        type="checkbox"
        id="cards-search-toggle"
        class="cards-search-toggle"
        v-model="searchToggle"
      />
      <label for="cards-search-toggle" class="cards-search-toggle-label">{{
        searchToggle ? '收起篩選列' : '打開篩選列'
      }}</label>

      <div class="cards-search-form">
        <div v-show="isTypeLoading">
          <loading
            id="loading-box"
            :active.sync="isTypeLoading"
            :can-cancel="true"
            :is-full-page="false"
          ></loading>
        </div>
        <div v-show="!isTypeLoading">
          <div class="search-item">
            <input
              type="text"
              placeholder="搜尋關鍵字"
              id="keyword"
              class="keyword"
              name="keyword"
              v-model="keyword"
              @input="filterCards"
            />
          </div>
          <div class="search-item">
            <div class="search-item choice">
              <div class="search-star">
                <input
                  type="checkbox"
                  class="like"
                  name="like"
                  v-model="isLiked"
                  id="like"
                  @change="filterCards"
                />
                <label for="like">只顯示星號項目</label>
              </div>
              <div class="search-bullet">
                <input
                  type="checkbox"
                  class="bullet"
                  name="bullet"
                  v-model="isBullet"
                  id="bullet"
                  @change="changeBullet"
                />
                <label for="bullet" v-if="!searchPosition">不顯示圖片</label>
              </div>
            </div>
          </div>
          <div class="search-item category">
            <span for="category">運動類別</span>
            <select
              name="category"
              id="category"
              v-model="categorySelect"
              @change="filterSubcategory"
            >
              <option value="all" selected="selected">全部</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >{{ category.name }}</option
              >
            </select>
          </div>
          <div
            class="search-item subcategory"
            v-show="categorySelect !== 'all'"
          >
            <span>項目類型</span>
            <div class="subcategory-controller">
              <div class="subcategory-controller-item">
                <button
                  class="subcategory-controller-button"
                  @click.stop.prevent="clearSubcategory"
                >
                  全不選
                </button>
              </div>
              <div class="subcategory-controller-item">
                <button
                  class="subcategory-controller-button"
                  @click.stop.prevent="allSubcategory"
                >
                  全選
                </button>
              </div>
            </div>
            <div class="subcategory-items">
              <div
                class="check-item"
                v-for="subcategory in subcategoryFilter"
                :key="subcategory.id"
              >
                <input
                  type="checkbox"
                  class="subcategory"
                  :value="subcategory.id"
                  v-model="subcategorySelect"
                  :id="labelIndex(subcategory.id)"
                  @change="filterCards"
                />
                <label :for="labelIndex(subcategory.id)">{{
                  subcategory.name
                }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchBar',
  data() {
    return {
      items: [],
      itemsFilter: [],
      categories: [],
      subcategories: [],
      searchToggle: false,
      keyword: '',
      isLiked: false,
      isBullet: false,
      categorySelect: 'all', //使用者自己選擇的運動項目，預設是全部
      subcategorySelect: undefined, //若使用者進行沒有選擇，此項就不存在
      subcategoryFilter: undefined //根據category出現在篩選列的項目類型，若未選擇，此項就不存在
    }
  },
  props: {
    oriCategories: {
      type: Array
    },
    oriSubcategories: {
      type: Array
    },
    oriItems: {
      type: Array
    },
    oriItemsFilter: {
      type: Array
    },
    searchPosition: {
      type: String
    },
    isTypeLoading: {
      type: Boolean
    },
    oriIsBullet: {
      type: Boolean
    }
  },
  methods: {
    filterSubcategory() {
      //選擇全部
      if (this.categorySelect === 'all') {
        this.subcategorySelect = []
        this.subcategories.map(subcategory => {
          this.subcategorySelect.push(subcategory.id)
        })
      }
      //選擇其中一個category
      else {
        this.subcategorySelect = [] //先清空，避免更換運動類別時受到影響
        this.subcategoryFilter = this.subcategories.filter(
          subcategory => subcategory.CategoryId === this.categorySelect
        )
        this.allSubcategory()
      }
      this.filterCards()
    },
    labelIndex(id) {
      return `subcategory-${id}`
    },
    filterCards() {
      this.itemsFilter = this.items
      if (this.isLiked) {
        this.itemsFilter = this.itemsFilter.filter(item => item.isLiked)
      }
      if (this.keyword) {
        this.itemsFilter = this.itemsFilter.filter(item =>
          item.name.includes(this.keyword)
        )
      }
      if (this.subcategorySelect) {
        this.itemsFilter = this.itemsFilter.filter(item =>
          item.subcategoriesArr.some(id => this.subcategorySelect.includes(id))
        )
      }

      this.$emit('filterCards', this.itemsFilter)
    },
    //全不選
    clearSubcategory() {
      this.subcategorySelect = []
      this.itemsFilter = []
      this.filterCards()
    },
    //全選
    allSubcategory() {
      this.subcategorySelect = [] //先清空
      this.subcategories.map(subcategory => {
        if (subcategory.CategoryId === this.categorySelect) {
          this.subcategorySelect.push(subcategory.id)
          return
        }
        return
      })
      this.filterCards()
    },
    changeBullet() {
      this.$emit('changeBullet', this.isBullet)
    }
  },
  watch: {
    oriCategories(newValue) {
      this.categories = newValue
    },
    oriSubcategories(newValue) {
      this.subcategories = newValue
    },
    oriItems(newValue) {
      this.items = newValue
    },
    oriItemsFilter(newValue) {
      this.itemsFilter = newValue
    },
    oriIsBullet(newValue) {
      this.isBullet = newValue
    }
  }
}
</script>

<style lang="scss">
//search
.cards-search {
  padding: 30px 0;
  color: $dark-gray;
  font-size: 1.1rem;
  .cards-search-toggle {
    display: none;
    &:checked ~ .cards-search-toggle-label {
      border-radius: 4px 4px 0 0;
    }
    &:checked ~ .cards-search-form {
      display: block;
    }
  }
  .cards-search-toggle-label {
    display: block;
    padding: 5px;
    background-color: $logo-green;
    border-radius: 4px;
    text-align: center;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .cards-search-form {
    display: none;
    padding: 5px 20px;
    border: 3px solid $logo-green;
    h2 {
      display: none;
    }
    .search-item {
      margin: 10px 0;
      .keyword {
        padding: 6px 5px 3px 5px;
        width: 100%;
        border-radius: 3px;
        border: 1.5px solid $logo-green;
        font-size: 1rem;
        color: $font-green;
      }
      input[type='checkbox'] {
        display: none;
        ~ label {
          padding: 0 5px;
          border: 1px solid $light-gray;
          border-radius: 10px;
          color: $font-gray;
        }
        &:checked ~ label {
          border: 1px solid $logo-green;
          color: $font-green;
        }
      }
      &.choice {
        display: flex;
        div {
          margin: 2px;
        }
      }
      &.category {
        display: flex;
        align-items: center;
        select {
          padding: 3px;
          margin-left: 10px;
          width: 20%;
          min-width: 100px;
          border: 1px solid $logo-green;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      }
      &.subcategory {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 10px;
        .subcategory-controller {
          display: flex;
          .subcategory-controller-item {
            display: flex;
            align-items: center;
            margin-right: 5px;
            .subcategory-controller-button {
              background-color: $logo-green;
              border-radius: 15px;
              color: $light-gray;
              letter-spacing: 1px;
              font-size: 0.9rem;
              &:hover {
                background-color: $logo-green;
                color: $white;
              }
            }
          }
        }
        .subcategory-items {
          grid-column: 1/3;
          display: flex;
          flex-wrap: wrap;
          .check-item {
            margin: 5px;
          }
        }
      }
    }
  }
}
//在list modal的情況下
.cards-search {
  &.list {
    padding: 10px 0 20px 0;
    .container {
      width: 90%;
    }
    label {
      margin: 0;
    }
  }
}
@media (min-width: 768px) {
  //search
  .cards-search {
    padding-top: 110px;
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .cards-search-toggle-label {
      width: 700px;
      padding: 10px;
    }
    .cards-search-form {
      width: 50%;
      width: 700px;
      border-radius: 0 0 10px 10px;
      padding: 10px 30px 0px 30px;
      //color: $logo-green;
      h2 {
        display: block;
        padding-bottom: 20px;
        font-size: 1.5rem;
        letter-spacing: 2px;
        text-align: center;
      }
      span {
        letter-spacing: 1px;
        font-size: 1.2rem;
      }
      .search-item {
        margin: 15px 0;
      }
    }
  }
  //在list modal的情況下
  .cards-search {
    &.list {
      padding: 20px 0 30px 0;
      .cards-search-toggle-label,
      .cards-search-form {
        width: 90%;
      }
    }
  }
}
</style>
