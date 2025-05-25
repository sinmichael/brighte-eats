<template>
  <div class="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Register Lead</h2>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Mobile</label>
        <input
          v-model="form.mobile"
          type="text"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Postcode</label>
        <input
          v-model="form.postcode"
          type="text"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Services</label>
          <input type="checkbox" id="delivery" value="delivery" v-model="form.services" />
          <label for="delivery" class="text-gray-700 ml-1 mr-4">Delivery</label>

          <input type="checkbox" id="pick-up" value="pick-up" v-model="form.services" />
          <label for="pick-up" class="text-gray-700 ml-1 mr-4">Pick-Up</label>

          <input type="checkbox" id="payment" value="payment" v-model="form.services" />
          <label for="payment" class="text-gray-700 ml-1 mr-4">Payment</label>
      </div>
      <button
        type="submit"
        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </form>
    <p v-if="successMessage" class="mt-4 text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const REGISTER_MUTATION = gql`
  mutation RegisterLead($input: RegisterLeadInput!) {
    register(input: $input) {
      id
      name
      email
      mobile
      postcode
      services
    }
  }
`

const form = ref({
  name: '',
  email: '',
  mobile: '',
  postcode: '',
  services: [],
});

const successMessage = ref('');
const errorMessage = ref('');

const { mutate: registerLead, onDone, onError } = useMutation(REGISTER_MUTATION);

onDone(() => {
  successMessage.value = 'Lead registered successfully!';
  errorMessage.value = '';
  form.value = {
    name: '',
    email: '',
    mobile: '',
    postcode: '',
    services: [],
  };
});

onError((err) => {
  errorMessage.value = 'Error: ' + err.message;
  successMessage.value = '';
});

function onSubmit() {
  registerLead({ input: form.value });
}
</script>
