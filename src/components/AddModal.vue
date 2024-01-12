<template>
    <div v-if="isEdit" class="modal-overlay" @click.self="closeModal()">
        <div class="modal" @click.stop>
            <div class="closeBtn"> <button @click="closeModal()">X</button></div>
            <p>Edit the product details</p>
            <div>
                <form @submit.prevent="onSubmit">
                    <input type="text" placeholder="Enter URL of image" v-model="product.image" required >
                    <input type="text" placeholder="Enter the name" v-model="product.name" required >
                    <input type="text" placeholder="Enter the title" v-model="product.title" required >
                    <input type="text" placeholder="Enter the price" v-model="product.price" required >
                    <input type="number" placeholder="Enter the discount" v-model="product.discount" required >
                    <input type="submit" value="SUBMIT" >
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useProductsStore } from "@/store";

export default {
  name: "AddModal",
  props: [ 'isEdit' ],
  setup(props, { emit }) {
    const { fetchProducts, addProduct } = useProductsStore();

    // Use ref for product to enable two-way data binding
    const product = ref({
      image: '',
      name: '',
      title: '',
      price: '',
      discount: '',
    });

    // submit the data
    const onSubmit = async () => {
        try{
            const data = {...product.value}
            await addProduct(data);
            await fetchProducts();
            closeModal();
        }catch(error){
            console.log(error);
        }
    }

    // Method to close the modal
    const closeModal = () => {
      emit('close');
    };

    return { product, onSubmit, closeModal };
  },
};
</script>

<style scoped   >
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