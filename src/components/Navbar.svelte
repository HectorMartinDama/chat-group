<script lang="ts">
    import type { User } from '@prisma/client';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores'; 
    import { signOut } from '@auth/sveltekit/client';
    import CreateChannel from './createChannel.svelte';
	import Search from './Search.svelte';

    export let users: User[];
    let term: String;

    const getUsers= async () =>{
       return await fetch('/api/users').then(res => res.json());
    }

    const createConversation= async(user: User) =>{
        const response=  await fetch('api/conversations', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ userId: user.id })
        });
        const conversation= await response.json();
        if(response.ok) goto(`/conversations/${conversation.id}`);
    }

    const searchUsers= async () =>{
        users= await getUsers();
        users= users.filter((user) => user.name?.toLocaleLowerCase()?.includes(term.toLowerCase()));
    }

    const clearUsers= async () => {
        users= await getUsers();
        term= '';
    }


  
    
    
</script>

<!-- <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none  hover:bg-gray-700focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
       <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
 </button>
  -->
 <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-[300px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full overflow-y-auto bg-[#120f13]">
       <div class="px-5 flex justify-between items-center h-[65px] shadow-[0px_4px_4px_0px_#00000040]">
           <h3 class="text-[#E0E0E0] text-[18px] font-bold leading-[25px] -tracking-[0.035em]">Users</h3>
            <!-- Modal para crear un canal -->
            <CreateChannel {users}/>
       </div>

       <div class="flex flex-col h-[calc(100%-60px)] justify-between">
           <Search bind:searchValue={term} on:search={searchUsers} on:clear={clearUsers}/>
           <ul class="py-5 px-4 space-y-2 font-medium">
                {#if users.length >= 1}
                    {#each users as user}
                    <div class="h-[60px] max-h-[60px] overflow-hidden truncate flex justify-between transition-colors duration-200  hover:bg-[#343541] rounded-[8px]">
                        <a on:click={createConversation(user)} class="flex items-center w-screen cursor-pointer">
                                <!-- Imagen de perfil -->
                                <div class="mx-[10px]">
                                    {#if user.image}
                                        <img class="h-[42px] rounded-[8px]" src={user.image} alt="image profile of {user.name}">
                                    {:else}
                                        <img class="h-[42px] rounded-[8px]" src="\defaultProfile.jpg" alt="profile image of {user.name}"> 
                                    {/if}
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-[#BDBDBD] -tracking-[0.63px]">{user.name}</span>
                                </div>
                                
                            
                        </a>
                    </div>
                    {/each}
                {:else}
                    <div class="flex flex-col items-center justify-center h-full gap-[15px]">
                        <h1 class="text-[#E0E0E0] text-lg">User or users not found</h1>
                        <button on:click={() => clearUsers()} class="text-white bg-[#3C46FF] transition-colors duration-200 hover:bg-[#0000FF] rounded-[8px] md:h-[30px] md:w-[80px]">View all</button>
                    </div>
                {/if}
             
         
             
                 
           
             
             
           </ul>
    
         
            <!-- Profile Menu -->
           <div class="dropup">
                
           

           
            
            
            <button class="flex w-full h-[75px] transitions-colors duration-200 bg-[#0B090C] hover:bg-[#343541] items-center justify-around" id="dropdup-btn">
                {#if $page.data.session?.user?.image}
                    <img class="h-[42px] w-[42px] rounded-[7px]" src={$page.data.session?.user?.image} alt="profile image">
                {:else}
                    <img class="h-[42px] w-[42px] rounded-[7px]" src='public/defaultProfile.jpg' alt="profile image">
                {/if}
                <p class="text-[#BDBDBD] -tracking-[0.63px]">{$page.data.session?.user?.name}</p> 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6 9l6 6l6 -6"></path>
                </svg>
            </button>

              

                <div class="dropup-content px-[10.5px] py-[10.5px]">
                    <a  href="" class="text-[white] pl-[11px] gap-[15px] h-[44px] w-full rounded-[8px] transitions-colors duration-200 hover:bg-[#3C393F] text-center items-center inline-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                         </svg>
                        My profile
                    </a>
                    <a href="" class="text-[white] pl-[11px] mt-[10px] gap-[15px] h-[44px] w-full rounded-[8px] transitions-colors duration-200 hover:bg-[#3C393F] text-center items-center inline-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                         </svg>
                        Setting
                    </a>
                    <hr class="h-[1px] my-[15px]">

                    <button on:click={() => signOut({callbackUrl: '/'})} class="h-[44px] pl-[11px] w-full text-center items-center inline-flex gap-[15px] text-[#EB5757] -tracking-[0.42px] transitions-colors duration-200 hover:bg-[#3C393F] rounded-[8px]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M9 12h12l-3 -3"></path>
                            <path d="M18 15l3 -3"></path>
                         </svg>
                        Logout
                    </button>
                </div>
           </div>

         
                 

 </aside>



 <style>
   

    .dropup{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dropup-content{
        display: flex;
        flex-direction: column;
       
       
        border-radius: 12px;
        position: absolute;
        background-color: #252329;
        border: 1px solid #3C393F;
        width: 90%;
        bottom: 80px;
        opacity: 0;
        visibility: hidden;
        display: block;
        transform: translateY(10px);
        transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
    }

   .dropup > #dropdup-btn:focus + .dropup-content{
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
        transition: opacity 150ms ease-out, transform 150ms ease-in-out;
   }

 </style>