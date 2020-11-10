<template>
  <main>
    <Banner :bannerImgURL="bannerImgURL" />
    <ToTop />
    <PageTitle>
      <template v-slot:title>
        已排菜單
      </template>
      <template v-slot:buttons>
        <div class="setting-links-wrapper">
          <router-link
            to="/lists?isUsed=false"
            class="title-link add-card-link"
          >
            未使用的清單
          </router-link>
          <router-link
            to="/lists?isUsed=true"
            class="title-link close-card-link"
          >
            已使用的清單
          </router-link>
        </div>
      </template>
    </PageTitle>
    <div class="lists-display">
      <input
        type="checkbox"
        id="open-toggle-switches"
        class="open-toggle-switches"
      />
      <label for="open-toggle-switches" class="open-toggle-switches-label"
        ><font-awesome-icon icon="cog"
      /></label>
      <div class="toggle-switches">
        <h3>請選擇要顯示的內容</h3>
        <div class="toggle-switch">
          <label>
            <input type="checkbox" v-model="openCategory" />
            <span class="btn-box">
              <span class="btn"></span>
            </span>
            <span class="btn-text">運動類別</span>
          </label>
        </div>
        <div class="toggle-switch">
          <label>
            <input type="checkbox" v-model="openSubcategory" />
            <span class="btn-box">
              <span class="btn"></span>
            </span>
            <span class="btn-text">項目類別</span>
          </label>
        </div>
        <div class="toggle-switch">
          <label>
            <input type="checkbox" v-model="openReps" />
            <span class="btn-box">
              <span class="btn"></span>
            </span>
            <span class="btn-text">項目組數</span>
          </label>
        </div>
      </div>
    </div>
    <div class="lists-search">
      <div class="container">
        <label>搜尋關鍵字：</label>
        <input type="text" placeholder="11/12、自主、小狗追球" />
      </div>
    </div>
    <div class="lists">
      <div class="container">
        <div class="list-wrapper">
          <h2>{{ isUsed ? '已使用的表單' : '未使用的表單' }}</h2>
          <div class="list" v-for="list in lists" :key="list.id">
            <input
              type="checkbox"
              :id="labelIndex(list.id, 'list-toggle-')"
              class="list-toggle-button"
            />
            <label
              :for="labelIndex(list.id, 'list-toggle-')"
              class="list-toggle-label"
            >
              {{ list.name }}
              <div class="buttons">
                <button class="list-link">刪除</button>
                <button
                  class="list-link"
                  v-if="!isUsed"
                  @click="gotoEdit(list.id)"
                >
                  編輯
                </button>
                <button class="list-done" :class="{ gotoend: !isUsed }">
                  {{ isUsed ? '退回' : '標示已使用' }}
                </button>
              </div>
            </label>
            <div class="list-content">
              <div class="list-item" v-for="item in list.Items" :key="item.id">
                <div class="list-items-type">
                  <span class="item-category" v-show="openCategory">{{
                    item.Category.name
                  }}</span>
                  <div class="item-subcategory" v-show="openSubcategory">
                    <span
                      v-for="subcategory in item.Subcategories"
                      :key="subcategory.id"
                      >{{ subcategory.name }}</span
                    >
                  </div>
                </div>
                <div class="list-item-text">
                  <span class="item-name"
                    ><router-link
                      :to="{ name: 'practice-item', params: { id: item.id } }"
                      >{{ item.name }}</router-link
                    ></span
                  >
                  <span class="item-reps" v-show="openReps">{{
                    item.ListItem.reps
                  }}</span>
                  <span class="item-remark">{{ item.ListItem.remark }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Banner from '../components/Banner'
import PageTitle from '../components/PageTitle'
import ToTop from '../components/ToTop'
import listsAPI from '../apis/lists'
import { Toast } from '../utils/helpers'
export default {
  name: 'Lists',
  components: {
    Banner,
    PageTitle,
    ToTop
  },
  data() {
    return {
      bannerImgURL:
        'https://cdn.pixabay.com/photo/2018/06/12/20/17/football-3471402_1280.jpg',
      openCategory: true,
      openSubcategory: true,
      openReps: true,
      lists: [],
      isUsed: false
    }
  },
  created() {
    let isUsed = this.$route.query.isUsed === 'false' ? false : true
    this.fetchLists({ isUsed })
  },
  methods: {
    async fetchLists({ isUsed }) {
      try {
        const { data } = await listsAPI.getLists({ isUsed })
        this.lists = data
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得菜單資料，請稍後再試'
        })
      }
    },
    labelIndex(id, front) {
      return front + id
    },
    //TODO: 記得做
    gotoEdit(id) {
      console.log(id)
    }
  },
  beforeRouteUpdate(to, from, next) {
    const oriIsUsed = to.query.isUsed
    const isUsed = oriIsUsed === 'false' ? false : true
    this.isUsed = isUsed
    this.fetchLists({ isUsed })
    next()
  }
}
</script>

<style lang="scss">
.lists-display {
  z-index: 20;
  position: fixed;
  top: 0;
  .open-toggle-switches-label {
    position: fixed;
    z-index: 30;
    display: inline-block;
    margin-top: 75px;
    margin-left: 10px;
    svg {
      font-size: 2rem;
      color: $font-green;
      cursor: pointer;
      text-shadow: rgba(255, 255, 255, 0.2) 0px 2px 3px;
      &:hover {
        text-shadow: rgba(255, 255, 255, 0.4) 0px 2px 3px;
      }
    }
  }
  .toggle-switches {
    z-index: 20;
    position: fixed;
    width: 100%;
    transform: scale(0, 1);
    transform-origin: left;
    transition: transform 0.2s ease-out;
    margin: 60px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 350px;
    font-size: 1.4rem;
    padding: 10px 0;
    background-color: $white;
    border-bottom: 3px solid $font-gray;
    .toggle-switch {
      margin: 10px 0;
      label {
        display: flex;
        justify-content: center;
        align-items: center;
        .btn-box {
          margin-top: 2px;
        }
      }
    }
    h3 {
      margin: 10px 0px 10px 10px;
      text-align: center;
      border-bottom: 3px solid $gray;
      padding-bottom: 20px;
    }
  }
  //toggle-btn
  .btn-box {
    display: inline-block;
    width: 40px;
    height: 20px;
    border-radius: 100px;
    background-color: #ccc;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #aaa;
  }
  input[type='checkbox'] {
    display: none;
    &:checked {
      //被點就往右移
      ~ .btn-box {
        background-color: $light-logo-green;
        .btn {
          margin-left: 20px;
          background-color: $logo-green;
        }
      }
    }
    &.open-toggle-switches:checked ~ .toggle-switches {
      transform: scale(1, 1);
    }
  }
}
.lists-search {
  width: 100%;
  max-width: 900px;
  margin: 20px auto 0 auto;
  label {
    font-size: 1.1rem;
    color: $font-green;
  }
  input {
    @extend .input-style;
    width: 100%;
    max-width: 400px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
.lists {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  h2 {
    margin: 20px 0;
  }
  .list {
    height: auto;
    margin-bottom: 30px;
  }
  .list-toggle-button {
    display: none;
    &:checked ~ .list-content {
      transform: scale(1, 1);
      height: auto;
      transition: transform 0.2s ease;
    }
    &:checked ~ .list-toggle-label {
      border-radius: 10px 10px 0 0;
    }
  }
  .list-toggle-label {
    cursor: pointer;
    width: 100%;
    background-color: $dark-green;
    padding: 10px 20px;
    border-radius: 10px;
    color: $white;
    letter-spacing: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    .buttons {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    button {
      cursor: pointer;
      display: inline-block;
      background-color: $light-logo-green;
      @extend .button-style;
      font-size: 1.2rem;
      color: $op-black;
      margin: 3px;
      &.list-done {
        background-color: $red;
      }
      &.gotoend {
        background-color: $dark-yellow;
      }
    }
  }
  .list-content {
    height: 0; //list會有高度撐起來，需要這個
    transform: scale(1, 0);
    transform-origin: top;
    transition: none;
    background-color: $light-logo-green;
    border-radius: 0 0 10px 10px;
    padding: 0 10px;
    .list-item {
      padding: 20px;
      border-bottom: 3px solid $logo-green;
      &:last-child {
        border-bottom: none;
      }
      .list-items-type {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .item-category {
          font-weight: 700;
          font-size: 1.2rem;
          margin-right: 10px;
          color: $font-green;
          letter-spacing: 1px;
        }
        .item-subcategory {
          span {
            display: inline-block;
            padding: 0px 3px;
            border: 1px solid $dark-gray;
            border-radius: 10px;
            color: $dark-gray;
            margin: 1px;
            font-size: 1rem;
          }
        }
      }
      .list-item-text {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        grid-gap: 5px;
        align-items: center;
        .item-name {
          font-size: 1.3rem;
          font-weight: 700;
          a {
            color: $op-black;
          }
        }
        .item-reps {
          font-size: 1.2rem;
        }
        .item-remark {
          font-size: 1.1rem;
          grid-column: 1/3;
          color: $dark-gray;
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .lists-display {
    .open-toggle-switches-label {
      margin-left: 20px;
    }
    .toggle-switches {
      width: 30%;
      border-radius: 0px 10px 10px 0px;
      background-color: $op-black;
      border-bottom: none;
      h3,
      label {
        color: $white;
      }
      h3 {
        margin: 10px 0px 10px 10px;
        text-align: center;
        border-bottom: 1px solid $white;
        padding-bottom: 20px;
      }
    }
  }
  .lists-links {
    margin-left: 50px;
    a {
      background-color: $op-black;
    }
  }
  .lists-search {
    margin-top: 110px;
    label {
      font-size: 1.3rem;
    }
  }
  .lists {
    h2 {
      font-size: 1.8rem;
    }
    label.list-toggle-label {
      font-size: 1.5rem;
    }
    .list-content {
      padding: 0 20px;
      .list-item {
        .list-items-type {
          .lsit-category {
            font-size: 1.3rem;
          }
          .list-subcategory {
            font-size: 1.1rem;
          }
        }
        .list-item-text {
          grid-template-columns: auto auto auto;
          grid-template-rows: auto;
          .item-name {
            font-size: 1.5rem;
          }
          .item-remark {
            grid-column: 3/4;
          }
        }
      }
    }
  }
}
</style>
