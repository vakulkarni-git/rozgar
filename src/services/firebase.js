import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyD-8-x2EfBRZgeJo0D8AKYxtwKGv3cBxe0',
  authDomain: 'rojgar-1c7c3.firebaseapp.com',
  databaseURL: 'https://rojgar-1c7c3.firebaseio.com',
  projectId: 'rojgar-1c7c3',
  storageBucket: 'rojgar-1c7c3.appspot.com',
  messagingSenderId: '541814921855'
}

firebase.initializeApp(config)

const database = firebase.database()
const storage = firebase.storage()

export {
  database,
  storage
}
