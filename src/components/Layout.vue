<template>
    <nav v-if="isAuthenticated">
      <router-link to="/home">Home</router-link> 
      <router-link to="/calc">Calculator</router-link>
      <router-link to="/math-quiz">math-quiz</router-link>
      <div class="logout" @click="logout">Logout</div>
    </nav>
    <router-view/>
    <!-- <div v-if="isAuthenticated" class="footer">Footer</div> -->
</template>

<script>
import { useProductsStore } from '@/store';

export default{
    name: "Layout",
    setup() {
        const useProducts = useProductsStore();
        return { useProducts };
    }, 
    computed: {
        isAuthenticated(){
            return useProductsStore().isAuthenticated;
        }
    },
    methods: {
        logout() {
            this.useProducts.logout();
            this.$router.push('/');
        },
    },
}
</script>

<style>
    body{
        margin: 0 !important;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    nav{
        box-shadow: rgba(0, 0, 0, 0.15) 0px 1.95px 2.6px;
        padding: 1.7rem;
        display: flex;
        justify-content: end;
        gap: 2rem;
        font-size:1.2rem;
        font-weight: bold;
        color:teal;
    }
    a{
        text-decoration: none;
        color:teal;
    }
    .logout{
        cursor: pointer;
    }
    .footer{
        padding: 2rem;
        text-align: center;
        font-size: 1.2rem;
        background-color: teal;
        color: white;
    }
</style>  