<script setup></script>

<template>
  <header class="bg-white shadow-sm fixed top-0 left-0 w-full z-50 py-4 px-10">
    <div class="mx-full flex items-center justify-between">
      <div class="flex items-center gap-3 h-8">
        <img
          src="/src/resources/images/globetrekker.png"
          alt="Globe Trekker Logo"
          class="w-40 rounded-lg object-cover"
        />
      </div>
      <nav class="flex gap-6" aria-label="Main navigation">
        <ul class="flex gap-6 m-0 p-0 list-none">
          <li>
            <router-link
              to="/"
              class="hover:text-primary font-medium transition-colors"
              :class="{
                'text-primary underline decoration-secondary underline-offset-4':
                  $route.path === '/',
              }"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link
              to="/destinations"
              class="hover:text-primary font-medium transition-colors"
              :class="{
                'text-primary underline decoration-secondary underline-offset-4':
                  $route.path === '/destinations',
              }"
            >
              Destinations
            </router-link>
          </li>

          <li>
            <a href="#booking" class="text-body hover:text-primary font-medium transition-colors"
              >Bookings</a
            >
          </li>
          <li>
            <a href="#footer" class="text-body hover:text-primary font-medium transition-colors"
              >Contact</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="min-h-[92vh]">
    <router-view />
  </main>

  <footer id="footer" class="bottom-20 left-0 w-full z-50 bg-secondary text-white py-6 px-10">
    <div class="container mx-auto flex flex-wrap items-center justify-between gap-2">
      <p class="text-sm m-0">GlobeTrekker</p>
      <p class="text-sm m-0">Technical Exam of Harvey Aya-ay</p>
    </div>
  </footer>
</template>

<style scoped></style>
