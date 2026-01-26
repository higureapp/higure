<script setup lang="ts">
import { ref } from 'vue';
import { useSignUpMutation } from '../../gql_generated/graphql';
import { useLocalStore } from '@/stores/local-store';
import AuthForm from '@/components/auth/AuthForm.vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth-store';


const email = ref<string>('');
const password = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');

const { mutate: signUp, loading, error } = useSignUpMutation()
const { setItem: setToken } = useLocalStore();

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
    try {
        const result = await authStore.register({
            email: email.value,
            password: password.value,
            firstname: firstName.value,
            lastname: lastName.value
        })

        if (result) {
            email.value = ''
            password.value = ''
            firstName.value = ''
            lastName.value = ''
            router.push('/')
        }
    } catch (err) {
        console.error('Error', err)
    }
}

</script>

<template>
    <AuthForm v-model:email="email" v-model:password="password" v-model:firstname="firstName"
        v-model:lastname="lastName" title="Sign up" button-text="Register to Higure" :loading="loading"
        @submit="handleSubmit">
        <template #footer>
            <p>Already have account? <RouterLink class="link" to="/signin">Sign in now</RouterLink>
            </p>
        </template>
    </AuthForm>
</template>

<style scoped></style>