<template>
    <div class="fixed top-4 left-0 w-full flex justify-center z-50">
        <nav
            class="px-6 py-3 rounded-full border border-zinc-800 bg-[#161625]/90 backdrop-blur-xl flex items-center gap-6 shadow-2xl shadow-black">

            <NuxtLink to="/" class="text-zinc-400 font-medium transition-all duration-300 hover:text-white"
                active-class="text-blue-400">
                Home
            </NuxtLink>

            <div class="w-[1px] h-4 bg-zinc-700"></div>

            <NuxtLink to="/create-snippet"
                class="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold hover:scale-110 transition-transform">
                + new snippet
            </NuxtLink>

            <NuxtLink to="/snippets" class="text-zinc-400 font-medium transition-all duration-300 hover:text-white"
                active-class="text-blue-400">
                Snippets
            </NuxtLink>

        </nav>
    </div>
</template>

<style scoped>
.nav-link {
    @apply text-zinc-400 font-medium transition-all duration-300 hover:text-white relative pb-1;
}

/* Ein kleiner animierter Strich unter den Links beim Hover */
.nav-link::after {
    content: '';
    @apply absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300;
}

.nav-link:hover::after {
    @apply w-full;
}

.router-link-active:not(button) {
    @apply text-blue-400;
}
</style>