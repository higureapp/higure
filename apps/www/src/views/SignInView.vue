<script setup lang="ts">
import { ref } from 'vue';
import { useSignInMutation } from '../../gql_generated/graphql';


const email = ref<string>('');
const password = ref<string>('');

const { mutate: signIn, loading, error } = useSignInMutation()

const handleSubmit = async () => {
    try {
        const result = await signIn({
            input: {
                email: email.value,
                password: password.value
            }
        })

        if (result?.data) {
            email.value = ''
            password.value = ''
        }
    } catch (err) {
        console.error('Errore durante la creazione:', err)
    }
}
</script>

<template>
    <div class="container">
        <div class="login-card">
            <div class="login-head">
                <h1>Sign in</h1>
            </div>
            <div class="box">
                <label for="email">Email address</label>
                <input v-model="email" type="email" placeholder="user@example.com" name="email" id="email">
                <p class="err">Invalid email address</p>
            </div>
            <div class="box">
                <label for="password">Password</label>
                <input v-model="password" type="password" placeholder="mySecretPassword12!" name="password"
                    id="password">
                <p class="err">Invalid email address</p>
            </div>
            <a href="#" class="forgot">Forgot Password?</a>
            <button @click="handleSubmit" class="login-btn">Login to Higure</button>
            <p>Don't have account? <a href="#">Sign up now</a></p>
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
    width: 100vw;
    height: 100vh;
}

.login-card {
    display: flex;
    background: #ffffff;
    flex-direction: column;
    padding: 3rem 4rem;
    color: #000000;
    border-radius: 18px;
    width: 15%;
    box-shadow: -2px 6px 10px 4px rgba(0, 0, 0, 0.15);
}

.login-head {
    height: 5rem;
}

.login-head>h1 {
    text-align: center;
    font-family: "Glory", sans-serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    text-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.15);
    text-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.30);
}

.box {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
}

.box input {
    border: 1px solid #B3B3B3;
    padding: 0.5rem;
    border-radius: 12px;
    color: #1E1E1E;
    background: transparent;
    outline: none;
    transition: 300ms;
}

.box input:focus {
    outline: 1px solid #616161;
    transition: 300ms;
}

.box label {
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
    color: #1E1E1E;
}

.box>.err {
    text-align: start;
    margin-top: 0.3rem;
    color: #EC221F;
    transition: 300ms;
    display: none;
}

.login-btn {
    margin: 1rem 0;
    padding: 0.9rem 0;
    border-radius: 18px;
    background-color: #FED6E3;
    border: 0;
    cursor: pointer;
    box-shadow: 0px 6px 10px 4px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.30);
    transform: translateY(-2px);
    transition: 300ms;
    color: #4a4a4abd;

    font-family: "Glory", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
}

.login-btn:hover {
    transform: translateY(2px);
    background-color: #ffbfd2;
    transition: 300ms;
}

.forgot {
    font-size: 0.9rem;
    color: #A57272;
    text-decoration: none;
    transition: 300ms;
    font-weight: bold;
}

.forgot:hover {
    opacity: 75%;
    transition: 300ms;
}

p {
    color: #A5A5A5;
    font-size: 0.8rem;
    text-align: center;
    font-weight: bold;
}

p>a {
    color: #616161;
}
</style>