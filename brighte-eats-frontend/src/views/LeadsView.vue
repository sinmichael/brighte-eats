<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Registered Leads</h1>

    <div v-if="loading">Loading leads...</div>
    <div v-else-if="error">Error loading leads: {{ error.message }}</div>

    <ul v-else>
      <li v-for="lead in leads" :key="lead.id" class="text-gray-700 max-w-md mt-10 bg-white shadow-md rounded-lg p-6">
        <p><strong>Name:</strong> {{ lead.name }}</p>
        <p><strong>Email:</strong> {{ lead.email }}</p>
        <p><strong>Mobile:</strong> {{ lead.mobile }}</p>
        <p><strong>Postcode:</strong> {{ lead.postcode }}</p>
        <p><strong>Services:</strong></p>
        <div class="flex flex-wrap gap-2 mt-1">
          <span
            v-for="(service, index) in lead.services"
            :key="index"
            class="px-3 py-1 text-sm rounded-full text-white"
            :class="getServiceColor(service)"
          >
            {{ service }}
          </span>
        </div>
        <p class="mt-4 text-sm text-gray-500">
          {{ new Date(lead.createdAt).toLocaleString() }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'

const GET_LEADS = gql`
  query GetLeads {
    leads {
      id
      name
      email
      mobile
      postcode
      services
      createdAt
    }
  }
`

const { result, loading, error } = useQuery(GET_LEADS)

const leads = computed(() => result.value?.leads ?? [])

const getServiceColor = (service: string) => {
  switch (service.toLowerCase()) {
    case 'delivery':
      return 'bg-blue-600';
    case 'pick-up':
      return 'bg-green-600';
    case 'payment':
      return 'bg-red-600';
    default:
      return 'bg-gray-600';
  }
}
</script>
