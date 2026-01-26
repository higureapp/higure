<script setup lang="ts">
import { ref } from 'vue';
import { useSignInMutation } from '../../gql_generated/graphql';
import { useLocalStore } from '@/stores/local-store';
import AuthForm from '@/components/auth/AuthForm.vue';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'vue-router';


const email = ref<string>('');
const password = ref<string>('');

const { mutate: signIn, loading, error } = useSignInMutation()
const { setItem: setToken } = useLocalStore();

const router = useRouter();

const authStore = useAuthStore();

const handleSubmit = async () => {
    try {
        const result = await authStore.login(email.value, password.value);

        if (result) {
            email.value = ''
            password.value = ''
            router.push('/')
        }
    } catch (err) {
        console.error('Error', err)
    }
}

</script>

<template>
    <AuthForm v-model:email="email" v-model:password="password" title="Sign in" button-text="Login to Higure"
        :loading="loading" show-forgot @submit="handleSubmit">
        <template #footer>
            <p>Don't have account? <RouterLink class="link" to="/signup">Sign up now</RouterLink></p>
        </template>
    </AuthForm>
</template>

<style scoped></style>