import axios from 'axios'

export default {
  request (method, url, data = null, headers = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!url) {
      console.error('API function call requires url argument')
      return
    }

    return axios({method: method, url: url, data: data, headers: headers})
  }
}
