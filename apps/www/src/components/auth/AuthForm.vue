<script setup lang="ts">
import Logo from '@/components/Logo.vue';

defineProps<{
    title: string;
    buttonText: string;
    loading?: boolean;
    showForgot?: boolean;
}>();

const emit = defineEmits<{
    (e: 'submit'): void;
}>();

const email = defineModel<string>('email');
const password = defineModel<string>('password');
const firstname = defineModel<string>('firstname', { default: undefined });
const lastname = defineModel<string>('lastname', { default: undefined });

const isSignUp = (): boolean => firstname.value !== undefined && lastname.value !== undefined;

const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        emit('submit');
    }
}
</script>

<template>
    <div class="container">
        <div class="logo-wrapper">
            <Logo format="png" size="180px" />
        </div>

        <div class="login-card">
            <div class="login-head">
                <h1>{{ title }}</h1>
            </div>

            <div class="box">
                <label for="email">Email address</label>
                <input v-model="email" @keypress="handleKeyPress" type="email" placeholder="user@example.com"
                    id="email">
                <p class="err">Invalid email address</p>
            </div>

            <div class="box">
                <label for="password">Password</label>
                <input v-model="password" @keypress="handleKeyPress" type="password" placeholder="••••••••"
                    id="password">
                <p class="err">Invalid password</p>
            </div>

            <template v-if="isSignUp()">
                <div class="box">
                    <label for="firstname">First name</label>
                    <input v-model="firstname" @keypress="handleKeyPress" type="text" placeholder="John" id="firstname">
                    <p class="err">First name is required</p>
                </div>

                <div class="box">
                    <label for="lastname">Last name</label>
                    <input v-model="lastname" @keypress="handleKeyPress" type="lastname" placeholder="Doe"
                        id="lastname">
                    <p class="err">Last name is required</p>
                </div>
            </template>

            <a v-if="showForgot" href="#" class="forgot">Forgot Password?</a>

            <button @click="$emit('submit')" class="login-btn" :disabled="loading">
                {{ loading ? 'Loading...' : buttonText }}
            </button>

            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #C6E5DF;
    width: 100%;
    min-height: 100vh;
    padding: 2rem 0rem;
    box-sizing: border-box;
    position: relative;
}

.logo-wrapper {
    display: none;
    margin-bottom: 2rem;
}

.login-card {
    display: flex;
    flex-direction: column;
    padding: 2.5rem 2rem;
    color: #000000;
    border-radius: 18px;
    width: 100%;
    max-width: 420px;
    box-sizing: border-box;
    background: transparent;
    box-shadow: none;
}

@media (min-width: 768px) {
    .logo-wrapper {
        display: block;
        position: absolute;
        top: 1rem;
        left: 1rem;
        margin-bottom: 0;
    }

    .login-card {
        background-color: #ffffff;
        box-shadow: -2px 6px 10px 4px rgba(0, 0, 0, 0.15);
    }
}

.login-head {
    margin-bottom: 2rem;
}

.login-head>h1 {
    margin: 0;
    text-align: center;
    font-family: "Glory", sans-serif;
    font-weight: 600;
    text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.30);
}

.box {
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
}

.box label {
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
    color: #1E1E1E;
    font-weight: 500;
}

.box input {
    border: 1px solid #B3B3B3;
    padding: 0.8rem;
    border-radius: 12px;
    color: #1E1E1E;
    background: transparent;
    outline: none;
    transition: 300ms;
    font-size: 1rem;
}

.box input:focus {
    border-color: #616161;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
}

.box>.err {
    text-align: start;
    margin-top: 0.4rem;
    color: #EC221F;
    font-size: 0.75rem;
    display: none;
}

.forgot {
    font-size: 0.85rem;
    color: #A57272;
    text-decoration: none;
    font-weight: bold;
    align-self: flex-start;
}

.login-btn {
    margin: 2rem 0 1.5rem 0;
    padding: 1rem;
    border-radius: 18px;
    background-color: #FED6E3;
    border: 0;
    cursor: pointer;
    font-family: "Glory", sans-serif;
    font-weight: 600;
    color: #4A4A4A;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 300ms ease;
}

.login-btn:hover:not(:disabled) {
    background-color: #ffbfd2;
    transform: translateY(-1px);
}

.login-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

:deep(p) {
    color: #A5A5A5;
    font-size: 0.85rem;
    text-align: center;
    font-weight: 500;
    margin: 0;
}

:deep(p a) {
    color: #616161;
    text-decoration: none;
    font-weight: bold;
}

@media (max-width: 380px) {
    .login-card {
        padding: 1.5rem 1.2rem;
    }
}
</style>