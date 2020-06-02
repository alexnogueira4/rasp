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
      apiKey: process.env.FIRESTORE_API_KEY,
      authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
      databaseURL: process.env.FIRESTORE_DATABASE_URL,
      projectId: process.env.FIRESTORE_PROJECT_ID,
      storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIRESTORE_MESSAGING_SENSER_ID,
      appId: process.env.FIRESTORE_APP_ID,
      measurementId: process.env.FIRESTORE_MEASUREMENT_ID
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
