import { apiHelper } from '../utils/helpers'

export default {
  getItems() {
    return apiHelper.get('/')
  },
  getCloseItems() {
    return apiHelper.get('/items/close')
  },
  getItem({ itemId }) {
    return apiHelper.get(`/items/${itemId}`)
  },
  changeLike({ itemId }) {
    return apiHelper.put(`/items/like/${itemId}`, null)
  },
  changeClosed({ itemId }) {
    return apiHelper.put(`/items/${itemId}/close`, null)
  },
  closeItem({ itemId }) {
    return apiHelper.put(`/items/${itemId}/close`, null)
  },
  addItem({ formData }) {
    return apiHelper.post('/items', formData)
  }
}
