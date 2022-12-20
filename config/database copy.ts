import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { FIRESTORE_CONFIG } from './model'

class Firestore {
  config:FIRESTORE_CONFIG
  protected firebase = firebase
  protected firestore = firebase.firestore

  constructor() {
    
    this.config = {
      apiKey: 'AIzaSyC9lr6hq6S6Z_U-eVFCIsk8CpiRXB9ntPY',
      authDomain: 'midyear-machine-237222.firebaseapp.com',
      databaseURL: 'https://midyear-machine-237222.firebaseio.com',
      projectId: 'midyear-machine-237222',
      storageBucket: 'midyear-machine-237222.appspot.com',
      messagingSenderId: '627837662753',
      appId: '1:627837662753:web:fd1c7db9586cf011a95560',
      measurementId: 'G-6NX0HBR146'
    }
  }

  connect () {
    this.firebase.initializeApp(this.config);
    return this.firebase.firestore()
  }
}

export default Firestore

// inserir dados
// db.collection("rooms")
//   .doc()
//   .set({
//     birthday: "January 1",
//     createdAt: firebase.firestore.FieldValue.serverTimestamp()
//   }
//   )

// Get a register by id
// db.collection('rooms').doc('alice').get()
// .then((snapshot) => {
//   console.log(snapshot.data());
  
//   // snapshot.forEach((doc) => {
//   //   console.log(doc.id, '=>', doc.data());
//   // });
// })
// .catch((err) => {
//   console.log('Error getting documents', err);
// });


// get with where
// let citiesRef = db.collection('cities');
// let query = citiesRef.where('capital', '==', true).get()
//   .then(snapshot => {
//     if (snapshot.empty) {
//       console.log('No matching documents.');
//       return;
//     }

//     snapshot.forEach(doc => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch(err => {
//     console.log('Error getting documents', err);
//   });


// other where
// let stateQuery = citiesRef.where('state', '==', 'CA');
// let populationQuery = citiesRef.where('population', '<', 1000000);
// let nameQuery = citiesRef.where('name', '>=', 'San Francisco');


// with arrays 
// let westCoastCities = citiesRef.where('regions', 'array-contains', 'west_coast');

// composes
// citiesRef.where('state', '==', 'CO').where('name', '==', 'Denver');
// citiesRef.where('state', '==', 'CA').where('population', '<', 1000000);
