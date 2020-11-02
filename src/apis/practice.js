import { apiHelper } from '../utils/helpers'

export default {
  getItems() {
    return apiHelper.get('/')
  },
  getCloseItem() {
    return apiHelper.get('/items/close')
  },
  changeLike({ itemId }) {
    return apiHelper.put(`/items/like/${itemId}`, null)
  }
}
