import { apiHelper } from '../utils/helpers'

export default {
  signIn({ email, password }) {
    return apiHelper.post('/signin', {
      email,
      password
    })
  },
  signUp({ name, email, password, confirmPassword }) {
    return apiHelper.post('/signup', {
      name,
      email,
      password,
      confirmPassword
    })
  }
}
