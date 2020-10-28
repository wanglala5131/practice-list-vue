import { apiHelper } from '../utils/helpers'

export default {
  getSubcategory() {
    return apiHelper.get('/setting/subcategories')
  }
}
