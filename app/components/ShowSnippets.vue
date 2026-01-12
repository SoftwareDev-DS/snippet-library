<template>
    <div class="snippets-container max-w-5xl mx-auto p-6">
        <div class="mb-10 flex justify-center">
            <div class="relative w-full max-w-lg">
                <input v-model="searchText" type="text" placeholder="Nach Snippet suchen..."
                    class="w-full bg-[#1a1a2e] border border-zinc-700 rounded-xl px-6 py-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all shadow-lg" />
                <span class="absolute right-4 top-4 text-zinc-500">🔍</span>
            </div>
        </div>

        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
            <p class="text-zinc-500 font-mono text-sm uppercase tracking-widest">Verbindung wird hergestellt...</p>
        </div>

        <div v-else class="space-y-4">
            <div v-for="(tutorial, index) in filteredSnippets" :key="tutorial.id"
                class="border-glow-subtle rounded-xl overflow-hidden bg-[#111]">
                <div class="flex items-center bg-[#111] hover:bg-white/5 transition-colors group/row">
                    <button @click="toggleSnippet(index)"
                        class="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-pink-500">{{ tutorial.title }}</h3>
                            <p class="text-zinc-400 text-sm mt-1">{{ tutorial.description }}</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <span
                                class="px-3 py-1 bg-blue-900/30 text-blue-400 border border-blue-500/30 rounded-md text-xs font-mono uppercase">
                                {{ tutorial.art }}
                            </span>
                        </div>
                    </button>

                    <button @click.stop="onDelete(tutorial)"
                        class="p-4 mr-2 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover/row:opacity-100"
                        title="Snippet löschen">
                        <Icon name="uil:trash-alt" size="24" />
                    </button>

                    <div @click="toggleSnippet(index)" class="p-6 cursor-pointer">
                        <span :class="{ 'rotate-180': openIndex === index }"
                            class="inline-block transition-transform duration-300 text-zinc-600">
                            ▼
                        </span>
                    </div>
                </div>

                <div v-show="openIndex === index" class="p-6 border-t border-zinc-800 bg-black/50 transition-all">
                    <div v-if="tutorial.import" class="mb-4">
                        <p class="text-xs text-zinc-500 mb-1 font-mono uppercase">Imports:</p>
                        <code
                            class="text-blue-300 text-sm bg-blue-900/10 px-2 py-1 rounded">{{ tutorial.import }}</code>
                    </div>

                    <div class="relative group">
                        <textarea readonly rows="10"
                            class="w-full bg-zinc-900/50 text-green-400 p-4 font-mono text-sm rounded-lg border border-zinc-800 focus:outline-none custom-scrollbar"
                            :value="tutorial.code"></textarea>

                        <button @click="copyCode(tutorial.code)" class="customBtn absolute top-4 right-4 shadow-lg">
                            Copy
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="filteredSnippets.length === 0"
                class="text-center py-20 border border-dashed border-zinc-800 rounded-xl">
                <p class="text-zinc-600 font-mono">Keine Snippets gefunden.</p>
            </div>
        </div>

        <div class="fixed bottom-8 right-8 z-[100]">
            <NuxtLink to="/create-snippet"
                class="group relative flex items-center justify-center w-16 h-16 bg-black rounded-full transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <div
                    class="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-spin-slow blur-[2px]">
                </div>
                <span class="relative z-10 text-white text-4xl font-light pb-1">+</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
// Nutzt das Composable useSnippets.ts
const { snippets, loading, fetchSnippets, removeSnippet } = useSnippets()

const searchText = ref('')
const openIndex = ref(null)

onMounted(() => {
    fetchSnippets()
})

const filteredSnippets = computed(() => {
    if (!searchText.value) return snippets.value
    const term = searchText.value.toLowerCase()
    return snippets.value.filter(t =>
        t.title?.toLowerCase().includes(term) ||
        t.art?.toLowerCase().includes(term) ||
        t.description?.toLowerCase().includes(term)
    )
})

const toggleSnippet = (index) => {
    openIndex.value = openIndex.value === index ? null : index
}

const copyCode = (code) => {
    if (!code) return
    navigator.clipboard.writeText(code)
    alert("Code kopiert! 🚀")
}

// NEUE LÖSCH FUNKTION
const onDelete = async (snippet) => {
    const isConfirmed = confirm(`Bist du sicher, dass du "${snippet.title}" löschen willst?`)

    if (isConfirmed && snippet.id) {
        try {
            await removeSnippet(snippet.id)
            // Optional: Ein kleiner Toast oder Alert
        } catch (e) {
            alert("Fehler beim Löschen!")
        }
    }
}
</script>

<style scoped>
@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 3s linear infinite;
}

.customBtn {
    background-color: #000;
    color: #0088ff;
    border: 1px solid #0088ff;
    padding: 6px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.8rem;
    font-weight: bold;
}

.customBtn:hover {
    color: #ff00c3;
    border-color: #ff00c3;
    box-shadow: 0 0 15px rgba(255, 0, 195, 0.4);
}

.border-glow-subtle {
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.4s ease;
}

.border-glow-subtle:hover {
    border: 1px solid rgba(236, 72, 153, 0.4);
}

.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #0a0a0a;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #222;
    border-radius: 10px;
}
</style>