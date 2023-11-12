


<script lang="ts">
	import { Modal } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";


    let dialog: HTMLDialogElement; let btnClose: HTMLButtonElement;
    export let image: string;
    let currentImage: string='';


    $: if(image) console.log('ha cambiado la imagen', image)

    const openDialog= () =>{
        currentImage= image;
        dialog.showModal();
    }




    onMount(async () =>{
        dialog= document.querySelector('#previewImage');
        btnClose= document.querySelector('#closeModal');

        function closeModal() {
            dialog.close();
            dialog.classList.remove('hide');
            dialog.removeEventListener('animationend', closeModal);
        }

        btnClose.addEventListener('click', () =>{
            dialog.addEventListener('animationend', closeModal);
            dialog.classList.add('hide');
        });
    });
</script>




<dialog id="previewImage" class="bg-[url({currentImage})] object-cover w-[75%] h-[75%] ">

    <header class="flex justify-end">
        <button id="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
             </svg>
        </button>
    </header>

    <img src="{currentImage}" alt="">

    <footer class="flex justify-end items-end bg-[red]">
        <a target="_blank" href="{currentImage}">Open in browser</a>
    </footer>
</dialog>





<img class="object-contain cursor-pointer h-[288px] z-40" src="{image}" alt="" on:click={() => openDialog()}>



<style>
    dialog[open]{
        opacity: 0;
        animation: zoom .3s ease-in-out forwards;
    }

    dialog.hide[open]{
        animation: zoomOut .3s ease-in-out forwards;
    }

    @keyframes zoom {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes zoomOut {
        0% {
        transform: scale(1);
        opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }

    dialog::backdrop{
        background: rgba(18, 15, 19, 0.9);
        transition: color .5s ease;
    }
</style>