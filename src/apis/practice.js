import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getItems() {
    return apiHelper.get('/practice')
  }
}
