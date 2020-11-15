<template>
  <div class="cards-search">
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
        <div class="search-item subcategory" v-show="categorySelect !== 'all'">
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
</template>

<script>
export default {
  name: 'searchBar'
}
</script>

<style lang="scss">
//search
.cards-search {
  padding: 30px 0 20px 0;
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
    text-align: center;
    font-weight: 500;
    padding: 5px;
    background-color: $logo-green;
    border-radius: 4px;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .cards-search-form {
    display: none;
    border: 3px solid $logo-green;
    padding: 5px 20px;
    h2 {
      display: none;
    }
    .search-item {
      margin: 10px 0;
      .keyword {
        width: 100%;
        padding: 6px 5px 3px 5px;
        font-size: 1rem;
        border-radius: 3px;
        border: 1.5px solid $logo-green;
        color: $font-green;
      }
      input[type='checkbox'] {
        display: none;
        ~ label {
          border: 1px solid $light-gray;
          border-radius: 10px;
          padding: 0 5px;
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
          font-size: 0.9rem;
          width: 20%;
          padding: 3px;
          margin-left: 10px;
          border: 1px solid $logo-green;
          border-radius: 4px;
          min-width: 100px;
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
              font-size: 0.9rem;
              background-color: $logo-green;
              border-radius: 15px;
              color: $light-gray;
              letter-spacing: 1px;
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
@media (min-width: 768px) {
  //search
  .cards-search {
    padding-top: 120px;
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
}
</style>
