import { apiHelper } from '../utils/helpers'

export default {
  getCart() {
    return apiHelper.get('/cart')
  }
}
