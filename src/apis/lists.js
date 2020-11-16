import { apiHelper } from '../utils/helpers'

export default {
  submitCart({ updateItems, listName }) {
    return apiHelper.post('/lists', { updateItems, listName })
  },
  getLists({ isUsed }) {
    const searchParams = new URLSearchParams({ isUsed })
    return apiHelper.get(`/lists?${searchParams.toString()}`)
  },
  getList({ id }) {
    return apiHelper.get(`lists/${id}`)
  },
  changeListStatus({ id }) {
    return apiHelper.patch(`/lists/${id}`, null)
  },
  deleteList({ id }) {
    return apiHelper.delete(`/lists/${id}`)
  },
  putList({ updateItems, listName, id }) {
    return apiHelper.put(`/lists/${id}`, { updateItems, listName })
  },
  deleteListItem({ id, itemId }) {
    return apiHelper.delete(`/lists/${id}/${itemId}`)
  },
  addItemToList({ ListId, ItemId }) {
    return apiHelper.post(`/lists/${ListId}/additem`, { ItemId })
  }
}
