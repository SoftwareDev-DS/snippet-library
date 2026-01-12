// composables/useSnippets.ts
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'

// 1. Definiere das Interface (Ersatz für deine Angular-Klasse)
interface Snippet {
  id?: string;
  title?: string;
  code?: string;
  import?: string;
  art?: string;
  description?: string;
}

export const useSnippets = () => {
  const { $db } = useNuxtApp()
  
  // 2. Hier sagen wir TS: Das ist ein Array von Snippets!
  const snippets = ref<Snippet[]>([]) 
  const loading = ref(true)

  // fetchAvailableSnippets Ersatz (Echtzeit-Update!)
  const fetchSnippets = () => {
    const colRef = collection($db, 'snippets')
    
    // onSnapshot ist wie snapshotChanges().subscribe()
    onSnapshot(colRef, (snapshot) => {
      // 3. Mappe die Daten und caste sie als Snippet[]
      snippets.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Snippet[]
      
      loading.value = false
    })
  }

  // create Ersatz
  const addSnippet = async (snippet: Snippet) => {
    const colRef = collection($db, 'snippets')
    return await addDoc(colRef, snippet)
  }

  // delete Ersatz (falls du ihn brauchst)
  const removeSnippet = async (id: string) => {
    const docRef = doc($db, 'snippets', id)
    return await deleteDoc(docRef)
  }

  return {
    snippets,
    loading,
    fetchSnippets,
    addSnippet,
    removeSnippet
  }
}