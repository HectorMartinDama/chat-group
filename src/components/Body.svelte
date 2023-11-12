<script lang="ts">
	import { onMount } from "svelte";
    import type { FullMessageType } from "../types/index";
	import MessageBox from "./MessageBox.svelte";
    import { pusherClient } from "$lib/pusherClient";
    import { page } from '$app/stores';
    import { format } from 'date-fns';
    import { messageSend } from "$lib/dateService";

    let currentImage='';
    let dialog: HTMLDialogElement; let btnCloseDialog: HTMLButtonElement;
    let timeLine: HTMLDivElement;
    export let conversationId: string;
    export let initialMessages: FullMessageType[];



    // si cambia de conversacion me subcribo de nuevosx
    $: if(conversationId){
        pusherClient.subscribe(conversationId);
    }

    const getElements= () =>{
        dialog= document.querySelector('#previewImage');
        btnCloseDialog= document.querySelector('#closeModal');


        btnCloseDialog.addEventListener('click', () =>{
            dialog.addEventListener('animationend', closeModal);
            dialog.classList.add('hide');
        });
    }

    const openDialog= (image: string) =>{
        getElements();
        currentImage= image;
        dialog.showModal();        
    }


    const closeModal= () => {
        dialog.close();
        dialog.classList.remove('hide');
        dialog.removeEventListener('animationend', closeModal);
    }



   
    
    onMount(() =>{    
        dialog= document.querySelector('#previewImage');
        btnCloseDialog= document.querySelector('#closeModal');
        timeLine= document.querySelector('#timeLine');





        function closeModal() {
            dialog.close();
            dialog.classList.remove('hide');
            dialog.removeEventListener('animationend', closeModal);
        }

        btnCloseDialog.addEventListener('click', () =>{
            dialog.addEventListener('animationend', closeModal);
            dialog.classList.add('hide');
        });
        
        pusherClient.subscribe(conversationId);

        const messageHandler= async (message: FullMessageType) =>{
           const response= await fetch(`/api/conversations/${conversationId}/seen`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ conversationId })
            });
            console.log(await response.ok)
            console.log(message);
            initialMessages= [...initialMessages, message];
            return [...initialMessages, message];
        }

        pusherClient.bind('message:new', data =>{
            initialMessages= [...initialMessages, data];            
        });

        return () =>{ // cuando el componente desaparece del dom
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('message:new');
        }
    });

</script>

<div class="flex flex-col items-center overflow-y-auto gap-[50px] h-full bg-[#252329]">
    {#if initialMessages}
        {#each initialMessages as message, i}
            {#if message.image}

                <div class="{ $page.data.session?.user?.email === message.sender.email ? 'bg-[#2E3035]' : 'bg-transparent'} w-[320px] md:w-[969px]  min-h-[62px] break-words rounded-[12px] flex flex-row justify-start">
                    {#if message.sender.image}
                        <img class="rounded-[7px] h-[42px] w-[42px] mr-[28px]" src="{message.sender.image}" alt="profile image of {message.sender.name}">
                    {:else}
                        <img class="rounded-[7px] h-[42px] w-[42px] mr-[28px]" src="\defaultProfile.jpg" alt="profile image of {message.sender.name}">
                    {/if}

                   
                    <div class="z-[1]">
                        <div class="flex flex-row pb-[11px]">
                            <p class="text-[#828282] -tracking-[0.63px] font-bold pr-[14px]">{message.sender.name}</p>
                            <p class="text-[#828282] text-[14px] -tracking-[0.49px]">{messageSend(message.createdAt)} at {format(new Date(message.createdAt), 'p')}</p>
                        </div> 
                        <img class="cursor-pointer h-[288px] z-[2]" src="{message.image}" alt="" on:click={() => openDialog(message.image)}>
                    </div>
                       
                    
                </div>


                <dialog id="previewImage" class="bg-[url({currentImage})] object-cover w-[75%] h-[75%] ">
                    <header class="flex sticky top-0 justify-between bg-[#252329] md:px-[30px] md:py-[5px]">
                        <a target="_blank" href="{currentImage}" class="text-gray-400 transition-colors duration-200 hover:underline hover:text-white">Open in Browser</a>
                        <button id="closeModal">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M18 6l-12 12"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        </button>
                    </header>

                    <img src="{currentImage}" alt="">
                </dialog>
            {:else}
              
                <MessageBox lastMessage={i === initialMessages.length - 1} data={message} key={message.id}/>
                <!-- TIME LINE -->
                <!-- {#if i <=initialMessages.length - 2 && message.createdAt.getDate() !== initialMessages[i + 1].createdAt.getDate()}
                    <div class="flex items-center w-[320px] md:w-[969px]">
                        <div class="grow border-b border-[#828282]"></div>
                        <span class="shrink md:px-[20px] pb-1 text-[#828282]  text-[12px]">{format(new Date(message.createdAt), 'MMMM d, yyyy')}</span>
                        <div class="grow border-b border-[#828282]"></div>
                    </div>
                {/if} -->
            {/if}
        {/each}
    {/if}    
</div>
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