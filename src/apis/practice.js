import { apiHelper } from '../utils/helpers'

export default {
  getItems() {
    return apiHelper.get('/')
  }
}
