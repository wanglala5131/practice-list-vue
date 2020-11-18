<template>
  <div class="cards" :class="{ close: isCloseType }">
    <div>
      <loading
        id="loading-box"
        :active.sync="isItemsLoading"
        :can-cancel="true"
      ></loading>
    </div>
    <div class="container" v-show="!isItemsLoading">
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
              @click.stop.prevent="
                changeClosed(item.id, item.isClosed, item.name)
              "
            >
              {{ isCloseType ? '取消封存' : '封存' }}
            </button>
            <button
              class="card-edit-button active"
              @click.stop.prevent="toEditPage(item.id)"
            >
              編輯
            </button>
            <button
              class="card-cart-button"
              :class="{ active: !item.isInCart }"
              @click.stop.prevent="addToCart(item)"
              :disabled="item.isInCart"
              v-if="!isCloseType"
            >
              {{ item.isInCart ? '已加入暫定菜單' : '加到暫定菜單中' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartsAPI from '../apis/carts'
import itemsAPI from '../apis/items'
import { Toast } from '../utils/helpers'
import { Confirm } from '../utils/helpers'
export default {
  name: 'PracticeCards',
  props: {
    oriItemsFilter: {
      type: Array
    },
    isCloseType: {
      type: Boolean
    },
    isItemsLoading: {
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
        const { data, statusText } = await cartsAPI.addToCart({ itemId })
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
          title: '已成功加入暫定菜單'
        })
        const cartItem = {
          ...data.data,
          Item: item
        }
        this.$emit('addToCart', { cartItem, itemId })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法加入暫定菜單，請稍後再試'
        })
      }
    },
    async changeLike(itemId) {
      try {
        const { data, statusText } = await itemsAPI.changeLike({ itemId })
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
        this.$emit('changeLike', itemId)
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法修改項目星號，請稍後再試'
        })
      }
    },
    async changeClosed(itemId, isClosed, name) {
      try {
        const confirmText = isClosed ? '取消封存' : '封存'
        const result = await Confirm.fire({
          title: `要${confirmText}「${name}」嗎？`,
          confirmButtonText: `確定`
        })
        if (result.isConfirmed) {
          const { data, statusText } = await itemsAPI.changeClosed({ itemId })
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
          this.$emit('changeClosed', itemId)
        }
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '目前無法改變項目狀態，請稍後再試'
        })
      }
    },
    toEditPage(id) {
      this.$router.push(`/items/${id}/edit`)
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
    padding-top: 25px;
  }
}
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1.5rem;
  justify-content: center;
  margin: 30px 0 80px 0;
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
    padding: 1px 10px;
    background-color: rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    font-size: 1.1rem;
    color: $light-gray;
    font-weight: 500;
  }
  .card-header {
    display: block;
    position: relative;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px 5px 0 0;
    }
  }
  .card-title {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    padding: 18px 0 8px 0;
    width: 100%;
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
        padding: 0 5px;
        margin: 0 1px;
        border: 1px solid $dark-green;
        border-radius: 10px;
        color: $dark-green;
      }
    }
  }
  .card-footer {
    display: grid;
    grid-template-columns: 1fr 1fr 3fr;
    grid-template-rows: auto;
    border-top: 4px solid $op-black;
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
@media (min-width: 768px) {
  .cards {
    width: 100%;
    &.close {
      //用在closeItem page
      padding-top: 115px;
    }
  }
}
</style>
