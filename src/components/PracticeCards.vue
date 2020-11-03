<template>
  <div class="cards" :class="{ close: isCloseType }">
    <div class="container">
      <h2 class="cards-num">共有 {{ oriItemsFilter.length }} 個結果</h2>
      <div class="cards-wrapper">
        <div class="card" v-for="item in itemsFilter" :key="item.id">
          <div class="card-header">
            <router-link
              :to="{ name: 'practice-item', params: { id: item.id } }"
              class="card-link"
            ></router-link>
            <span class="card-category">{{ item.Category.name }}</span>
            <div
              class="card-star"
              :class="{ active: item.isLiked }"
              @click.stop.prevent="changeLike(item.id)"
              v-if="!isCloseType"
            >
              <font-awesome-icon icon="star" />
            </div>
            <img
              :src="item.image ? item.image : defaultImgURL"
              alt="card-img"
            />
            <div class="card-title">
              <h3>{{ item.name }}</h3>
              <div class="card-sub-categories">
                <span
                  v-for="subcategory in item.Subcategories"
                  :key="subcategory.id"
                  >{{ subcategory.name }}</span
                >
              </div>
            </div>
          </div>
          <div class="card-footer" :class="{ close: isCloseType }">
            <button
              class="card-close-button"
              :disabled="item.isInCart"
              :class="{ active: !item.isInCart }"
              @click.stop.prevent="changeClosed(item.id)"
            >
              {{ isCloseType ? '取消封存' : '封存' }}
            </button>
            <button class="card-edit-button active">編輯</button>
            <button
              class="card-cart-button"
              :class="{ active: !item.isInCart }"
              @click.stop.prevent="addToCart(item)"
              :disabled="item.isInCart"
              v-if="!isCloseType"
            >
              {{ item.isInCart ? '已加入暫定清單' : '加到暫定清單中' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartAPI from '../apis/carts'
import practiceAPI from '../apis/practice'
import { Toast } from '../utils/helpers'
export default {
  name: 'PracticeCards',
  props: {
    oriItemsFilter: {
      type: Array
    },
    isCloseType: {
      type: Boolean
    }
  },
  data() {
    return {
      itemsFilter: this.oriItemsFilter,
      defaultImgURL: 'https://i.imgur.com/3XaSsJX.png'
    }
  },
  methods: {
    async addToCart(item) {
      try {
        const itemId = item.id
        const { data, statusText } = await cartAPI.addToCart({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '已成功加入暫定清單'
        })
        const cartItem = {
          ...data.data,
          Item: item
        }
        this.$emit('addToCart', { cartItem, itemId })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法加入暫定清單，請稍後再試'
        })
      }
    },
    async changeLike(itemId) {
      try {
        const { data, statusText } = await practiceAPI.changeLike({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.$emit('changeLike', itemId)
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法修改項目星號，請稍後再試'
        })
      }
    },
    async changeClosed(itemId) {
      try {
        const { data, statusText } = await practiceAPI.changeClosed({ itemId })
        if (statusText !== 'OK') {
          throw new Error()
        }
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.$emit('changeClosed', itemId)
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法改變項目狀態，請稍後再試'
        })
      }
    }
  },
  watch: {
    oriItemsFilter(newValue) {
      this.itemsFilter = [...newValue]
    }
  }
}
</script>

<style lang="scss">
.cards-num {
  text-align: center;
}

.cards {
  width: 100%;
  &.close {
    //用在closeItem page
    padding-top: 115px;
  }
}
.cards-wrapper {
  margin-top: 30px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1.5rem;
  justify-content: center;
}
.no-card {
  h2 {
    margin-top: 20px;
    text-align: center;
  }
}
.card {
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.3);
  }
  .card-category,
  .card-link,
  .card-star {
    position: absolute;
  }
  .card-link {
    z-index: 20;
    width: 100%;
    height: 100%;
  }
  .card-star {
    z-index: 40;
    top: 0;
    right: 0px;
    padding: 0px 5px 5px 5px;
    font-size: 1.5rem;
    cursor: pointer;
    &.active {
      color: $star-yellow;
    }
    &:hover {
      animation: swing ease-in-out 0.5s;
    }
  }
  .card-category {
    top: 5px;
    left: 5px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1px 10px;
    border-radius: 20px;
    font-size: 1.1rem;
    color: $light-gray;
    border: 2px solid rgba(0, 0, 0, 0.6);
    font-weight: 500;
  }
  .card-header {
    display: block;
    height: 200px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px 5px 0 0;
    }
  }
  .card-title {
    position: absolute;
    bottom: 0;
    padding: 18px 0 8px 0;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-image: linear-gradient(
      transparent,
      rgba(255, 255, 255, 0.9) 10%
    );
    h3 {
      margin-bottom: 10px;
      font-weight: 700;
      text-align: center;
      color: $dark-green;
      line-height: 1.2;
      letter-spacing: 1px;
    }
    .card-sub-categories {
      display: flex;
      justify-content: center;
      span {
        border: 1px solid $dark-green;
        border-radius: 10px;
        color: $dark-green;
        padding: 0 5px;
        margin: 0 1px;
      }
    }
  }
  .card-footer {
    border-top: 4px solid $op-black;
    display: grid;
    grid-template-columns: 1fr 1fr 3fr;
    grid-template-rows: auto;
    &.close {
      grid-template-columns: 1fr 1fr;
    }
    button {
      padding: 10px;
      font-weight: 700;
      font-size: 1rem;
    }
    .card-close-button {
      border-radius: 0 0 0 5px;
    }
    .card-close-button,
    .card-edit-button {
      background-color: $yellow;
      &.active:hover {
        background-color: $dark-yellow;
        cursor: pointer;
      }
    }

    .card-cart-button {
      background-color: $light-logo-green;
      border-radius: 0 0 5px 0;
      &.active:hover {
        background-color: $logo-green;
        cursor: pointer;
      }
    }
  }
}
</style>
