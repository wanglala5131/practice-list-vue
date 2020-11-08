import { apiHelper } from '../utils/helpers'

export default {
  getSubcategory() {
    return apiHelper.get('/setting/subcategories')
  },
  putSubcategory({ value, id }) {
    return apiHelper.put(`/setting/subcategories/${id}`, { value })
  },
  addSubcategory({ name, CategoryId }) {
    return apiHelper.post('setting/subcategories', { name, CategoryId })
  },
  deleteSubcategory({ id }) {
    return apiHelper.delete(`setting/subcategories/${id}`)
  },
  getCategory() {
    return apiHelper.get('/setting/categories')
  },
  addCategory({ name }) {
    return apiHelper.post('setting/categories', { name })
  }
}
