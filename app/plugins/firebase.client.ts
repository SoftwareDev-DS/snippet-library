import { initializeApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'

declare module '#app' {
    interface NuxtApp {
        $db: Firestore
    }
}

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyDdWslNrdHj3CCwXP9_3u5MOGjxRZzHH-s",
        authDomain: "snippet-library-final.firebaseapp.com",
        projectId: "snippet-library-final",
        storageBucket: "snippet-library-final.appspot.com",
        messagingSenderId: "983761366085",
        appId: "1:983761366085:web:f5b7e351b91458f1fa072c"
    }
    // --------------------------------

    const app = initializeApp(firebaseConfig)

    const db = getFirestore(app)

    return {
        provide: {
            db
        }
    }
})