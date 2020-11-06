import { apiHelper } from '../utils/helpers'

export default {
  getSubcategory() {
    return apiHelper.get('/setting/subcategories')
  },
  putSubcategory({ value, id }) {
    return apiHelper.put(`/setting/subcategories/${id}`, { value })
  }
}
