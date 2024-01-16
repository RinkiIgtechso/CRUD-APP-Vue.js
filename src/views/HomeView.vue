<template>
  <div class="homepage">
    <div class="addProduct">
      <div>
        <input type="text" placeholder="Search...." v-model="searchVal" @input="searchProduct">
        <select name="filter" id="filter" v-model="priceFilter" @input="applyFilter">
          <option value="">Filter for price</option>
          <option value="Increase">Increase</option>
          <option value="Decrease">Decrease</option>
        </select>
      </div>
      <button @click="editModals"><span>+</span> Add Product</button>
    </div>
    <div class="home" >
      <div class="card" v-for="product in filteredProducts" :key="product.id">
        <div>
          <img :src="product.image" :alt="product.name" />
        </div>
        <p><b>{{product.name}}</b></p>
        <p>{{product.title}}</p>
        <div class="pricing">
          <p>${{product.price}}</p>
          <p>{{product.discount}}% discount</p>
        </div>
        <div class="pricing bttns">
          <button @click="openModal(product.id)">Edit</button>
          <button @click="deleteModal(product.id)">Delete</button>
        </div>
      </div>
      <Modal :isOpen="isModalOpen" @close="closeModal" :index="selectedModalIndex" />
      <DeleteModal :isDelete="isDelete" @close="closeModal" :index="selectedModalIndex" />
      <AddModal :isEdit="isEdit" @close="closeModal" />
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import AddModal from "../components/AddModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
import { useProductsStore } from "@/store";


export default {
  name: 'HomeView',
  components:{
    Modal,
    AddModal,
    DeleteModal
  },
  data(){
    const { fetchProducts, fetchProductById } = useProductsStore();
    return{
      isModalOpen: false,
      selectedModalIndex: null,
      isDelete: false,
      isEdit: false,
      fetchProducts,
      fetchProductById,
      priceFilter: '',
      searchVal: '',
      fetchedProducts: []
    }
  },
  computed: {
    filteredProducts() {
      if(this.searchVal){
        const searchTerm = this.searchVal.toLowerCase();
        return this.fetchedProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.title.toLowerCase().includes(searchTerm)
        );
      }else{
        return this.fetchedProducts;
      }
    },
  },
  mounted(){
    this.fetchProducts(); 
    this.fetchData();
  },
  methods: {
    async fetchData(){
      this.fetchedProducts = await useProductsStore().fetchProducts();
    },
    openModal(index) {
      this.selectedModalIndex = index;
      this.isModalOpen = true;
      this.setBodyOverflowHidden(true);
    },
    editModals(){
      this.isEdit = true;
      this.setBodyOverflowHidden(true);
    },
    deleteModal(index){
      this.isDelete = true;
      this.selectedModalIndex = index;
      this.setBodyOverflowHidden(true);
    },
    closeModal() {
      this.isModalOpen = false;
      this.isDelete = false;
      this.isEdit = false;
      this.setBodyOverflowHidden(false);
    },
    setBodyOverflowHidden(isHidden){
      console.log(isHidden)
      const body = document.body;
      if (isHidden) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'visible';
      }
    },
    async searchProduct(){
      const searchTerm = this.searchVal.toLowerCase();
      if (searchTerm === '') {
        // If search term is empty, revert to the original fetched products
        this.filteredProducts = this.fetchedProducts;
      } else {
        // Filter the products based on the search term
        this.filteredProducts = this.fetchedProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.title.toLowerCase().includes(searchTerm)
        );
      }
    },
    async applyFilter(event){
      const filter = event.target.value;
      if(filter==="Increase"){
        this.filteredProducts = this.fetchedProducts.sort((a, b)=>{return Number(a.price) - Number(b.price)});
      }else if(filter==="Decrease"){
        this.filteredProducts = this.fetchedProducts.sort((a, b)=>{return Number(b.price) - Number(a.price)});
      }else{
        this.filteredProducts = this.fetchedProducts;
      }
    }
  },
}
</script>

<style scoped>
img{
  width: -webkit-fill-available;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  height: 190px;
  width: 250px;
}
.homepage{
  margin: 4rem;
}
.home{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.card{
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  padding: 18px;
}

.pricing{
  display: flex;
  justify-content: space-between;
  line-height: 0px;
  font-size: 0.95rem;
}
.card>p:nth-child(2){
  font-size: 0.95rem;
}
.card>p:nth-child(3){
  font-size: 0.7rem;
}
.bttns>button{
  padding: 0.5rem 1rem;
  text-align: center;
  border-radius: 5px;
  border:none;
  font-weight: bold;
  background: transparent;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
}
.bttns>button:hover{
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
}
.bttns>button:first-child{
  border: 2px solid deeppink;
  color: deeppink;
}
.bttns>button:last-child{
  border: 2px solid teal;
  color: teal;
}
input[type='text']{
  outline: none;
  height: 15px;
  border-radius: 7px;
}
.addProduct{
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}
.addProduct>button{
  padding: 0px 15px;
  border: 2px solid teal;
  background-color: transparent;
  color: teal;
  font-weight: 800;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
}
.addProduct>button>span{
  font-size: 1.2rem;
}
select{
  border: 2px solid teal;
  border-radius: 7px;
  height: 39px;
  margin-left: 9px;
  padding: 0px 11px;
  color: teal;
  font-weight: 800;
}
</style>
