<template>
  <div>
    <nav class="p-4 bg-indigo-600 text-white mb-4">
      <router-link to="/" class="mr-4 hover:bg-indigo-700 py-2 px-4 rounded-md">Register Lead</router-link>
      <router-link to="/leads" class="hover:bg-indigo-700 py-2 px-4 rounded-md">View Leads</router-link>
    </nav>
    <router-view />
  </div>
</template>