import { apiHelper } from '../utils/helpers'

export default {
  getItems() {
    return apiHelper.get('/')
  },
  changeLike({ itemId }) {
    return apiHelper.put(`/items/like/${itemId}`, null)
  }
}
