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
    return apiHelper.patch(`/items/like/${itemId}`, null)
  },
  changeClosed({ itemId }) {
    return apiHelper.patch(`/items/${itemId}/close`, null)
  },
  addItem({ formData }) {
    return apiHelper.post('/items', formData)
  },
  putItem({ itemId, formData }) {
    return apiHelper.put(`/items/${itemId}`, formData)
  }
}
