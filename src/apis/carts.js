import { apiHelper } from '../utils/helpers'

export default {
  getCart() {
    return apiHelper.get('/cart')
  },
  addToCart({ itemId }) {
    return apiHelper.post(`/cart/${itemId}`, null)
  },
  deleteCartItem({ cartId }) {
    return apiHelper.delete(`/cart/${cartId}`)
  },
  putCartItem({ updateItems }) {
    return apiHelper.put('/cart/edit', { updateItems })
  },
  submitCart({ updateItems, name }) {
    return apiHelper.post('/lists', { updateItems, name })
  }
}
