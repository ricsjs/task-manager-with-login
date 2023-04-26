import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAKHZXPwZSFceU69Rb2SXLi_Ed69AO4XM4",
  authDomain: "gerenciador-tarefas-854fe.firebaseapp.com",
  projectId: "gerenciador-tarefas-854fe",
  storageBucket: "gerenciador-tarefas-854fe.appspot.com",
  messagingSenderId: "395083441461",
  appId: "1:395083441461:web:607bd2471a9579df87187c",
  measurementId: "G-ES5CFDZ731"
};

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp)

  export { db, auth };
