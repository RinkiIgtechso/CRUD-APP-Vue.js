<template>
    <div v-if="isDelete" class="modal-overlay" @click.self="closeModal()">
        <div class="modal" @click.stop>
            <div class="closeBtn"> <button @click="closeModal()">X</button></div>
            <p>Are you sure?</p>
            <div class="bttns">
                <button @click="deleteProduct()">Yes</button>
                <button @click="closeModal()">No</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useProductsStore } from "@/store";

export default {
  name: "DeleteModal",
  props: ['isDelete', 'index'],
  setup(props, { emit }) {
    const { fetchProducts, deleteProductById } = useProductsStore();

    const deleteProduct = async () => {
      try{
        const id = props.index;
        await deleteProductById(id);
        fetchProducts();
        closeModal();
      }catch(error){
        console.log(error);
      }
    }

    // Method to close the modal
    const closeModal = () => {
      emit('close');
    };

    return { closeModal, deleteProduct };
  },
};
</script>

<style scoped   >
.bttns{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap:15px;
}
.bttns>button{
    border: none;
    color: white;
    border-radius: 7px;
    font-weight: bold;
    padding: 12px 45px;
    cursor: pointer;
}
.bttns>button:first-child{
    background: teal;
}
.bttns>button:last-child{
    background: deeppink;
}

</style>