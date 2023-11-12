
<script lang="ts">
	import { onMount } from "svelte";
    import type { FullConversationType } from "../types";
    import { page } from "$app/stores";


    export let conversation: FullConversationType;

    //conversation.users.filter((user) => user.name != $page.data.session?.user?.name)[0].name ||



    onMount(() =>{
        let btnSidenav= document.querySelector('#btn');
        let container= document.querySelector('.container');
        let btnCloseSidenav= document.querySelector('.side-hide');    

    
        btnSidenav?.addEventListener('click', () =>{
            container.style.right= '0px';
        });

        btnCloseSidenav?.addEventListener('click', () =>{
            container.style.right= '-320px';
        });
            
        
    })
</script>



{#if conversation}
    <nav class="h-[65px]  w-full flex justify-between px-[78px] items-center bg-[#252329] shadow-[0px_4px_4px_0px_#00000040]">
        <div class="flex flex-row gap-[20px] items-center">
            <h1 class="text-[#E0E0E0] text-[16px] font-bold -tracking-[0.035em] uppercase">{conversation.name || conversation.users.filter(user => user.email != $page.data.session?.user?.email)[0].name }</h1>
            {#if conversation.isGroup}
                <span class="text-sm text-gray-500">({conversation.users.length} members)</span>
            {/if}
        </div>

        <button id="btn" class="{!conversation.isGroup ? 'hidden' : '' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                <path d="M12 9h.01"></path>
                <path d="M11 12h1v4h1"></path>
            </svg>
        </button>
    </nav>



    <section class="container">
        <div class="sidebar px-[27px]">
            <div class="side-hide mt-[25px]">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M18 6l-12 12"></path>
                    <path d="M6 6l12 12"></path>
                </svg>
            </div>
            <h2 class="my-[25px] text-center uppercase font-bold -tracking-[0.63px] text-[#E0E0E0] text-[18px]">{conversation.name}</h2>
            <p class="text-[#E0E0E0] -tracking-[0.63px] mb-[45px]">{conversation.description}</p>
            <h2 class="uppercase font-bold -tracking-[0.63px] text-[#E0E0E0] mb-[25px]">Members</h2>
            
            <div class="overflow-auto">
                {#each conversation.users as user}
                    <!-- USER BOX -->
                    <div class="h-[50px] w-full flex flex-row items-center mb-[32px] last:mb-[0px]">
                        {#if user.image}
                            <img src={user.image} alt="profile picture"  class="text-white h-[42px] rounded-[7px] mr-[28px]">
                        {:else}
                            <img src='\defaultProfile.jpg' alt="profile picture" class="text-white h-[42px] rounded-[7px] mr-[28px]">
                        {/if}
                        <p class="font-bold text-[#828282] -tracking-[0.63px]">{user.name}</p>
                    </div>
                {/each}     
            </div>
        </div>
    </section>
{/if}


<style>

    
    .container{
        display: flex;
        justify-content: flex-end;
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: auto;
        right: -300px;
        transition: all ease-in-out 300ms;
    }


    .sidebar{
        width: 300px;
        height: 100%;
        overflow: auto;
        background-color: #120F13;
    }

    .side-hide{
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
    }


  


</style>