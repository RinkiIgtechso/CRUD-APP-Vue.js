<template>
    <div class="login">
        <div class="form-section">
            <form @submit.prevent="login">
                <div class="input-box">
                    <label for="email">Email:</label><br/>
                    <input id="email" type="email" placeholder="Enter Email" v-model="email">
                </div>
                <div class="input-box">
                    <label for="password">Password:</label><br/>
                    <input id="password" type="password" placeholder="Enter Password" v-model="password">
                </div>
                <button :disabled="!email && !password" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import { useProductsStore } from '@/store';

export default {
    name: "Login",
    setup() {
        const useProducts = useProductsStore();
        return { useProducts };
    },  
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        async login() {
            this.useProducts.login();
            this.$router.push("/home");
        },
    },
}
</script>
  
<style scoped>
    .login{
        margin-top: 9rem;
    }
    .heading{
        font-size: 1.5rem;
        font-weight: bold;
        color: teal;
        text-align: center;
    }
    .form-section{
        width:350px;
        margin:auto;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 12px;
        padding: 34px 27px;
        margin-top: 20px;
    }
    .input-box{
        text-align: left;
        line-height: 25px;
        margin-bottom:17px;
    }
    label{
        font-weight: bold;
    }
    input{
        width:100%;
        box-sizing: border-box;
        padding: 5px 0px 5px 11px;
        border-radius:5px;
        border: 1px solid teal;
        height: 35px;
        font-size: 0.9rem;
        outline: none;
    }
    button{
        padding: 10px 15px;
        border:none;
        background: teal;
        color: white;
        border-radius: 5px;
        font-weight: bold;
        font-size:0.9rem;
        cursor:pointer;
    }
</style>