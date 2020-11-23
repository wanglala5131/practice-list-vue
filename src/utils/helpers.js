import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://practice-list.herokuapp.com/api/practice'
//const baseURL = 'http://localhost:3000/api/practice'

export const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000
})
export const Confirm = Swal.mixin({
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonText: `取消`
})
