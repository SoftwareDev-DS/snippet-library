<template>
    <div class="submit-form min-h-screen bg-[#0f0f1a] text-white p-4">
        <div class="widthContainer mx-auto p-8 rounded-2xl relative border-glow">

            <div v-if="!submitted">
                <h2 class="text-2xl font-bold mb-6 font-monospace text-pink-500">Neues Snippet</h2>

                <div class="form-group mb-4">
                    <label for="title">Name</label>
                    <input v-model="tutorial.title" type="text" id="title" class="form-control"
                        placeholder="Snippet Name..." />
                </div>

                <div class="form-group mb-4">
                    <label for="import">Imports</label>
                    <input v-model="tutorial.import" type="text" id="import" class="form-control"
                        placeholder="z.B. import { ... }" />
                </div>

                <div class="form-group mb-4">
                    <label for="description">Beschreibung</label>
                    <textarea v-model="tutorial.description" id="description" class="form-control" rows="3"></textarea>
                </div>

                <div class="form-group mb-4 w-full md:w-1/4">
                    <label for="art">Art</label>
                    <select v-model="tutorial.art" id="art"
                        class="form-control bg-black text-white cursor-pointer hover:border-blue-500 transition-colors">
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="typescript">TypeScript</option>
                        <option value="function">Function</option>
                    </select>
                </div>

                <div class="form-group mb-6">
                    <label for="code">Code</label>
                    <textarea v-model="tutorial.code" id="code" class="form-control font-mono bg-zinc-900"
                        rows="10"></textarea>
                </div>

                <div class="flex gap-4">
                    <button @click="saveTutorial" class="glow-on-hover">Erstellen</button>
                    <NuxtLink to="/snippets" class="glow-on-hover flex items-center justify-center">Abbrechen
                    </NuxtLink>
                </div>
            </div>

            <div v-else class="text-center py-10">
                <h4 class="text-3xl font-bold mb-6">Erfolgreich erstellt!</h4>
                <div class="flex flex-col gap-4 items-center">
                    <button class="myBtn bg-pink-600 px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                        @click="newTutorial">Weiteres Snippet
                        erstellen</button>
                    <NuxtLink to="/snippets" class="text-blue-400 underline">Zurück zur Übersicht</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 1. Importiere das Composable
const { addSnippet } = useSnippets()

const tutorial = reactive({
    title: '',
    import: '',
    description: '',
    art: 'HTML',
    code: ''
})

const submitted = ref(false)

// 2. Die Speicher-Logik mit Firebase verknüpfen
const saveTutorial = async () => {
    // Validierung: Nicht speichern, wenn Titel oder Code leer sind
    if (!tutorial.title || !tutorial.code) {
        alert('Bitte Titel und Code ausfüllen!')
        return
    }

    try {
        console.log('Sende an Firebase:', tutorial)

        // Hier rufen wir die Funktion aus useSnippets.ts auf
        await addSnippet({ ...tutorial })

        submitted.value = true
    } catch (error) {
        console.error('Fehler beim Speichern:', error)
        alert('Fehler beim Speichern in Firebase!')
    }
}

const newTutorial = () => {
    submitted.value = false
    Object.assign(tutorial, {
        title: '',
        import: '',
        description: '',
        art: 'HTML',
        code: ''
    })
}
</script>

<style scoped>
/* Dein bestehendes CSS bleibt unverändert */
.widthContainer {
    max-width: 800px;
    background-color: #111;
    border: 2px solid transparent;
    position: relative;
    background-image: conic-gradient(from var(--border-angle), #213, #112 50%, #213),
        conic-gradient(from var(--border-angle), transparent 20%, #00bbff, #ff00f7);
    background-size: calc(100% - 6px) calc(100% - 6px), cover;
    background-position: center center;
    background-repeat: no-repeat;
    animation: bg-spin 3s linear infinite;
}

@property --border-angle {
    syntax: "<angle>";
    inherits: true;
    initial-value: 0turn;
}

@keyframes bg-spin {
    to {
        --border-angle: 1turn;
    }
}

.form-control {
    width: 100%;
    padding: 12px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    color: white;
    outline: none;
}

.form-control:focus {
    border-color: #00bbff;
}

label {
    display: block;
    margin-bottom: 8px;
    font-family: monospace;
    color: #ccc;
}

.glow-on-hover {
    width: 220px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% {
        background-position: 0 0;
    }

    50% {
        background-position: 400% 0;
    }

    100% {
        background-position: 0 0;
    }
}
</style>