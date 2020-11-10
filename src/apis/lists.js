import { apiHelper } from '../utils/helpers'

export default {
  submitCart({ updateItems, listName }) {
    return apiHelper.post('/lists', { updateItems, listName })
  }
}
