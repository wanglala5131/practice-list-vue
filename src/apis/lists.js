import { apiHelper } from '../utils/helpers'

export default {
  submitCart({ updateItems, listName }) {
    return apiHelper.post('/lists', { updateItems, listName })
  },
  getLists({ isUsed }) {
    const searchParams = new URLSearchParams({ isUsed })
    return apiHelper.get(`/lists?${searchParams.toString()}`)
  },
  changeListStatus({ id }) {
    return apiHelper.patch(`/lists/${id}`, null)
  },
  deleteList({ id }) {
    return apiHelper.delete(`/lists/${id}`)
  }
}
