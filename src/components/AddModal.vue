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
