<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal()">
        <div class="modal" @click.stop>
            <div class="closeBtn"><button @click="closeModal()">X</button></div>
            <p>Edit the product details</p>
            <div>
                <form @submit.prevent="onSubmit">
                    <input type="text" v-model="product.image">
                    <input type="text" v-model="product.name">
                    <input type="text" v-model="product.title">
                    <input type="text" v-model="product.price">
                    <input type="number" v-model="product.discount">
                    <input type="submit" value="SUBMIT">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useProductsStore } from "@/store";

export default {
  name: "Modal",
  props: ['isOpen', 'index'],
  setup(props, { emit }) {
    const { fetchProducts, fetchProductById, updateProduct } = useProductsStore();

    // Use ref for product to enable two-way data binding
    const product = ref({
      image: '',
      name: '',
      title: '',
      price: '',
      discount: '',
    });

    // Watch for changes in props.isOpen
    watch(
      () => props.isOpen,
      async (newIsOpen, oldIsOpen) => {
        if (newIsOpen) {
          await fetchProductDetails();
        }
      }
    );

    // Fetch product details when the modal opens
    const fetchProductDetails = async () => {
      try {
        const id = props.index; // Assuming index is the product ID
        await fetchProductById(id);
        // Use the fetched data to update the ref
        const currentProduct = useProductsStore().product;
        product.value = {
          image: currentProduct.image || '',
          name: currentProduct.name || '',
          title: currentProduct.title || '',
          price: currentProduct.price || '',
          discount: currentProduct.discount || '',
        };
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    // Method to update product details
    const onSubmit = async () => {
      try {
        const id = props.index; // Assuming index is the product ID
        const updatedData = { ...product.value };
        await updateProduct(id, updatedData);
        fetchProducts();
        closeModal();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };

    // Method to close the modal
    const closeModal = () => {
      emit('close');
    };

    return { product, onSubmit, closeModal };
  },
};
</script>

<style >
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent gray background */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Modal styles */
.modal {
    background: white;
    border-radius: 5px;
    padding: 30px 39px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    min-width: 15%;
    max-height: 85%;
    overflow-y: auto;
    position: relative;
}

.modal>p{
    font-weight: bold;
}

form{
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 15px;
}

input[type='text'], input[type='number']{
    height: 9px;
    border-radius: 5px;
    border: 2px solid teal;
    padding: 10px 15px;    
}
input[type='submit']{
    background: teal;
    color: white;
    font-weight: bold;
    padding: 10px 0px;
    border-radius: 5px;
    border: none;
}
.closeBtn{
    display: flex;
    justify-content: end;
    position:absolute;
    top: 15px;
    right: 23px;
}
.closeBtn>button{
    background: transparent;
    color: teal;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
}
</style>