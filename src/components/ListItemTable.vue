<template>
  <div class="temlist">
    <div class="container">
      <form action="">
        <div class="temlist-name">
          <label for="temlist-name-input" class="temlist-name-label"
            >清單名稱*：</label
          >
          <input
            type="text"
            placeholder="填入清單名稱"
            id="temlist-name-input"
            v-model="temlistName"
          />
        </div>
        <p>請打開項目填入組數以及排列項目順序(拖曳)</p>
        <draggable class="temlist-items" v-model="listItem">
          <transition-group>
            <div
              class="temlist-item flip-list"
              v-for="ele in listItem"
              :key="ele.order"
            >
              <div class="temlist-item-header">
                <div class="temlist-item-info">
                  <div class="temlist-item-type">
                    <span class="temlist-item-category">{{
                      ele.item.Item.Category.name
                    }}</span>
                    <div class="temlist-item-subcategory">
                      <span
                        v-for="subcategory in ele.item.Item.Subcategories"
                        :key="subcategory.id"
                        >{{ subcategory.name }}</span
                      >
                    </div>
                  </div>
                  <a href="#" class="temlist-item-name">{{
                    ele.item.Item.name
                  }}</a>
                </div>
                <button
                  class="cart-simple-button"
                  @click.stop.prevent="deleteCartItem(ele.item.id)"
                >
                  &times;
                </button>
                <label
                  :for="labelIndex(ele.item.id, 'temlist-item-')"
                  class="temlist-footer-toggle-label"
                  ><font-awesome-icon icon="chevron-down"
                /></label>
              </div>
              <input
                type="checkbox"
                :id="labelIndex(ele.item.id, 'temlist-item-')"
              />
              <div class="temlist-footer">
                <div class="temlist-item-reps">
                  <label
                    :for="labelIndex(ele.item.id, 'temlist-reps-label-')"
                    class="temlist-reps-label"
                    >組數*：</label
                  >
                  <input
                    type="text"
                    :id="labelIndex(ele.item.id, 'temlist-reps-label-')"
                    class="temlist-reps-input"
                    placeholder="e.g.三組各10次、持續5分鐘"
                  />
                </div>
                <div class="temlist-item-remark">
                  <label
                    :for="labelIndex(ele.item.id, 'temlist-remark-label-')"
                    class="temlist-remark-label"
                    >備註：</label
                  >
                  <input
                    type="text"
                    class="temlist-remark-input"
                    :id="labelIndex(ele.item.id, 'temlist-remark-label-')"
                  />
                </div>
              </div>
            </div>
          </transition-group>
        </draggable>
        <div class="temlist-buttons">
          <button class="temlist-save-btn">儲存</button>
          <button class="temlist-submit-btn" @click.stop.prevent="console">
            送出清單
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { Toast } from '../utils/helpers'
import cartsAPI from '../apis/carts'
export default {
  name: 'ListItemTable',
  components: {
    draggable
  },
  props: {
    oriListItem: {
      type: Array
    }
  },
  data() {
    return {
      listItem: [],
      temlistName: ''
    }
  },
  methods: {
    labelIndex(id, front) {
      return front + id
    },
    async deleteCartItem(cartId) {
      try {
        const { statusText } = await cartsAPI.deleteCartItem({
          cartId
        })
        if (statusText !== 'OK') {
          throw new Error()
        }
        Toast.fire({
          icon: 'success',
          title: '已成功刪除項目'
        })
        this.$emit('deleteCartItem', cartId)
      } catch (err) {
        Toast.fire({
          icon: 'success',
          title: '目前無法刪除暫定清單的項目，請稍後再試'
        })
      }
    }
  },
  watch: {
    oriListItem(newValue) {
      this.listItem = newValue.map((item, index) => {
        return { item, order: index }
      })
    }
  }
}
</script>

<style lang="scss">
.temlist {
  margin: 0 auto 80px auto;
  width: 100%;
  max-width: 900px;
  padding: 0 10px;
  font-size: 1.4rem;
  input {
    width: 100%;
    @extend .input-style;
  }
  label {
    display: inline-block;
    margin: 10px 10px 10px 0;
  }
  input[type='checkbox'] {
    display: none;
    &:checked ~ .temlist-footer {
      height: auto;
      transform: scale(1, 1);
      transition: transform 0.2s ease-out;
    }
  }
  h2 {
    padding: 10px 0;
  }
  p {
    padding-bottom: 10px;
    color: $dark-gray;
  }
}
.temlist-name {
  margin: 20px 0 40px 0;
}
.temlist-item {
  margin: 10px 0;
  .temlist-item-header {
    border-radius: 10px;
    background-color: $light-logo-green;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    .cart-simple-button {
      font-size: 2.5rem;
      margin-right: 10px;
      color: $dark-red;
      cursor: pointer;
      &:hover {
        color: $red;
        text-shadow: 0px 2px 2px (rgba(0, 0, 0, 0.2));
      }
    }
    .temlist-footer-toggle-label {
      cursor: pointer;
      font-size: 1.5rem;
      &:hover {
        color: $font-green;
      }
    }
    .temlist-item-info {
      flex-grow: 1;
      a {
        font-size: 1.4rem;
        font-weight: 700;
        color: $op-black;
      }
    }
    .temlist-item-type {
      display: flex;
      align-items: center;
      margin-bottom: 2px;
      .temlist-item-category {
        font-weight: 700;
        font-size: 1.4rem;
        margin-right: 10px;
        color: $font-green;
        letter-spacing: 1px;
      }
      .temlist-item-subcategory {
        span {
          display: inline-block;
          padding: 0px 2px;
          border: 1px solid $dark-gray;
          border-radius: 10px;
          color: $dark-gray;
          margin: 0 1px 3px 1px;
          font-size: 0.8em;
        }
      }
    }
  }
  .temlist-footer {
    height: 0;
    transform: scale(1, 0);
    transform-origin: top;
    transition: none;
    padding: 0 30px;
    .temlist-item-remark {
      padding-bottom: 10px;
    }
  }
}
.temlist-buttons {
  border-top: 2px solid $gray;
  margin-top: 30px;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  button {
    @extend .button-style;
    font-size: 1.3rem;
    &.temlist-submit-btn {
      background-color: $logo-green;
      border: 2px solid $dark-green;
    }
    &.temlist-save-btn {
      border: 2px solid $dark-gray;
    }
    &:hover {
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
    }
  }
}
@media (min-width: 768px) {
  .temlist {
    margin-top: 170px;
  }
  .temlist-item {
    .temlist-item-info {
      display: flex;
      align-items: center;
      padding-left: 10px;
      .temlist-item-name {
        order: -1;
        margin-right: 20px;
        flex-basis: 50%;
      }
    }
    .temlist-footer-toggle-label {
      margin: 0 10px 0 0;
    }
  }
}
</style>
