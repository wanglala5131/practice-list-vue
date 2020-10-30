import { apiHelper } from '../utils/helpers'

export default {
  getCart() {
    return apiHelper.get('/cart')
  },
  addToCart({ itemId }) {
    return apiHelper.post(`/cart/${itemId}`, null)
  }
}
