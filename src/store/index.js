// src/store/modules/products.js
import { defineStore } from 'pinia';
import axios from "axios";

export const useProductsStore = defineStore('products', {
  state: () => ({
    isAuthenticated: false,
    products: [],
    product: {}
  }),
  actions: {
    login(){
      this.isAuthenticated = true;
    },
    logout(){
      this.isAuthenticated = false;
    },
    async fetchProducts() {
      try {
        let res = await axios.get("http://localhost:3000/products");
        let data = res.data;
        this.products = data;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProductById(id) {
      try {
        let res = await axios.get(`http://localhost:3000/products/${id}`);
        let data = res.data;
        this.product = data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct(id, data){
      try {
        let res = await axios.put(`http://localhost:3000/products/${id}`, data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProductById(id){
      try {
        let res = await axios.delete(`http://localhost:3000/products/${id}`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async addProduct(data){
      try {
        let res = await axios.post('http://localhost:3000/products', data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  },
});
