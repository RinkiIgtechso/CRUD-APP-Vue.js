<template>
  <div class="homepage">
    <div class="addProduct"><button @click="editModals"><span>+</span> Add Product</button></div>
    <div class="home" >
      <div class="card" v-for="product in products" :key="product.name">
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
      fetchProductById
    }
  },
  computed: {
    products(){
      return useProductsStore().products;
    }
  },
  mounted(){
    this.fetchProducts();
  },
  methods: {
    openModal(index) {
      this.selectedModalIndex = index;
      this.isModalOpen = true;
    },
    editModals(){
      this.isEdit = true;
    },
    deleteModal(index){
      this.isDelete = true;
      this.selectedModalIndex = index;
    },
    closeModal() {
      this.isModalOpen = false;
      this.isDelete = false;
      this.isEdit = false;
    },
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
.addProduct{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2.5rem;
}
.addProduct>button{
  padding: 10px 15px;
  border: 2px solid teal;
  background-color: transparent;
  color: teal;
  font-weight: bold;
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
</style>
