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
        <p><strong>Services:</strong> {{ lead.services }}</p>
        <p><small>{{ new Date(lead.createdAt).toLocaleString() }}</small></p>
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
</script>
