<script lang="ts">
	import { goto } from "$app/navigation";
	import type { User } from "@prisma/client";
    import { onMount } from "svelte";
    import type { AutocompleteOption } from '@skeletonlabs/skeleton';
    import { Autocomplete , InputChip } from '@skeletonlabs/skeleton';
    import toast, { Toaster } from 'svelte-french-toast';

                
    export let users: User[];

    let invalidForm;
    let inputChip = '';
    let channelName: String; let channelDescription: String;
    let dialog: HTMLDialogElement;

    
    let inputChipList: string[] = [];
    const flavorOptions: AutocompleteOption<User>[] = [];


    const createChannel= async () =>{
        return await fetch('/api/conversations', { 
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ isGroup: true, members: inputChipList, description: channelDescription, name: channelName })
        }).then(() => { dialog.close(), goto('/conversations') });
    };


    const createChannelToast= () =>{
       toast.promise(createChannel(), {
        loading: 'Saving',
        success: 'Channel created!',
        error: 'Error to create the channel'
       }, { position: 'top-right', duration: 4000 });
    }


    function onFlavorSelection(event: CustomEvent<AutocompleteOption<string>>): void {
        inputChipList= [...inputChipList, event.detail.value];
        inputChip= '';
    }

    onMount(async () =>{
        dialog= document.querySelector('#createChannel');
        await users.forEach(user =>{
            flavorOptions.push({ label: user.name, value: user.id });
        });
    });
</script>







<dialog id="createChannel" class="md:w-[656px] bg-[#120F13] rounded-[24px] px-[60px] py-[34px]">
   
    <form on:submit|preventDefault={createChannelToast} method="POST" enctype="multipart/form-data">

        <header class="flex flex-row justify-between mb-[20px]">
            <h3 class="uppercase text-[#F2F2F2] font-bold -tracking-[0.63px]">new channel</h3>
            <button on:click={() => dialog.close()} class="text-[white]">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M18 6l-12 12"></path>
                    <path d="M6 6l12 12"></path>
                 </svg>
            </button>
        </header>

        <article>
            <input bind:value={channelName} type="text" name="name" required placeholder="Channel name *" class="md:w-[500px] mb-[20px] md:h-[48px] bg-[#3C393F] rounded-[8px] outline-none text-[#828282] md:pl-[16px] -tracking-[0.63px]">
            <textarea bind:value={channelDescription} placeholder="Channel description *" required name="description" id="" cols="30" rows="10" class="md:w-[500px] md:h-[116px] bg-[#3C393F] rounded-[8px] outline-none resize-none text-[#828282] md:pl-[16px] md:pt-[12.5px] -tracking-[0.63px] mb-[20px]"></textarea>
               
    
            <InputChip class="md:w-[500px] pl-[16px] outline-none bg-[#3C393F] border-none text-[#828282]"  bind:input={inputChip} bind:value={inputChipList} whitelist={flavorOptions}  name="chips" placeholder="Search user..." />
            
            <div class="flex items-center justify-center">
                <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto mb-[20px] mt-[20px] bg-[#2b3655]" tabindex="-1">
                    <Autocomplete 
                        bind:input={inputChip}
                        options={flavorOptions}
                        denylist={inputChipList}
                        on:selection={onFlavorSelection}
                       
                    />
                </div>

            </div>
        </article>
     
        <footer class="flex justify-end">
            <menu>
                <button autofocus type="reset" on:click={() => dialog.close()} class="mr-[20px] w-[99px] h-[40px] bg-[#3c393f] rounded-[8px] text-[#F2F2F2]">Cancel</button>
                <button type="submit" class="md:h-[40px] md:w-[99px] rounded-[8px] transition-colors duration-200 bg-[#3C46FF] hover:bg-[#0000FF] text-[#F2F2F2]">Save</button>
            </menu>
        </footer>
    </form>
</dialog>

<button class="bg-[#252329] h-[32px] w-[32px] flex items-center justify-center rounded-[8px]" on:click={() => dialog.showModal()}>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 5l0 14"></path>
        <path d="M5 12l14 0"></path>
     </svg>
</button>




<style>

    @keyframes scale-down{to{transform:scale(.75)}}


    dialog{
        z-index: 50;
        margin: auto;
        inset: 0;
        position: fixed;
        overflow: hidden;
        transition: opacity .5s cubic-bezier(.25,0,.3,1);
        animation: scale-down .5s cubic-bezier(.25,0,.3,1);
        animation-timing-function: cubic-bezier(.5,-.5,.1,1.5);
    }


  

    @keyframes slide-in-up{
        0%{transform:translateY(100%)}
    }

    @keyframes slide-out-down{
        to{transform:translateY(100%)}
    }



    dialog[open] {
        animation: slide-in-up .5s cubic-bezier(.25,0,.3,1) forwards;
    }
    

  
    
    dialog:not([open]) {
        pointer-events: none;
        opacity: 0;
     
    }

  
    dialog::backdrop{
        background: rgba(18, 15, 19, 0.50);
        transition: color .5s ease;
    }

   

  




  

</style>