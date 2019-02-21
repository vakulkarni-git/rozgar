import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCXS1xOsKn5eIImDo77agrp_jQT0dp7VKw',
  authDomain: 'rozgar-6df19.firebaseapp.com',
  databaseURL: 'https://rozgar-6df19.firebaseio.com',
  projectId: 'rozgar-6df19',
  storageBucket: '',
  messagingSenderId: '15682470475'
}

firebase.initializeApp(config)

const database = firebase.database()
const storage = firebase.storage()

export {
  database,
  storage
}
