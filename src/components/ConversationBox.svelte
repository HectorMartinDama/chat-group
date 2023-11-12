<script lang="ts">
    import { format } from 'date-fns';
    import { page } from '$app/stores'; 
    import type { FullConversationType } from "../types";
    export let conversation: FullConversationType;   


    let conversationIdParam= $page.url.pathname.split('/')[2];
    $: if(conversationIdParam) conversationIdParam= $page.url.pathname.split('/')[2]; // si cambia de url actualizo la conversacion seleccionada

    const profileImgGroup= (groupName: String) =>{
        let name= '';
        groupName.split(' ').forEach((word: String, i: number) =>{
            if(i <= 1) name += word.split('')[0].toUpperCase();
        })
        return name;
    }
</script>



<div class="{conversationIdParam === conversation.id ? 'bg-[#343541]' : ''}  overflow-hidden  min-h-[60px]  h-[60px] max-h-[60px] md:pl-[10px] flex justify-between  transition-colors duration-200  hover:bg-[#343541] rounded-[8px]">
    <a class="flex items-center w-screen" href="/conversations/{conversation.id}">
        {#if conversation.isGroup}
            <div class="md:pr-[10px]">
                <!-- PROFILE IMAGE OF GROUPS -->
                <div class="min-h-[42px] min-w-[42px] h-[42px] w-[42px] flex items-center justify-center rounded-[8px] bg-[#252329]">
                    <span class="text-lg font-semibold text-white">{profileImgGroup(conversation.name)}</span>
                </div>
            </div>
          

            {#if conversation.messages.length >= 1}
                <div class="flex flex-col justify-between truncate w-[200px] overflow-hidden">
                    <span class="text-white truncate overflow-hidden">{conversation.name}</span>
                    <div class="flex flex-row">
                        <span class="text-sm text-[#828282]">{conversation.messages[conversation.messages.length - 1].sender.name}:</span>
                        <span class="text-sm text-[#828282] truncate overflow-hidden">{conversation.messages[conversation.messages.length - 1].body}</span>

                    </div>
                </div>
            {:else}
                <span class="text-white">{conversation.name}</span>
            {/if}
        {:else}
            <!-- PROFILE IMAGE -->
            <div class="md:pr-[10px]">
                {#if conversation.users.filter(user => user.email != $page.data.session?.user?.email)[0].image}
                    <img class="min-h-[42px] min-w-[42px] w-[42px] h-[42px] rounded-[8px]" src="{conversation.users.filter(user => user.email != $page.data.session?.user?.email)[0].image}" alt="">
                {:else}
                    <img class="min-h-[42px] min-w-[42px] w-[42px] h-[42px] rounded-[8px]" src="\defaultProfile.jpg" alt="profile image"> 
                {/if}
            </div>
            {#if conversation.messages.length >= 1}
                <div class="flex flex-row justify-between overflow-hidden w-[200px]">
                    <div class="flex flex-col">
                        <span class="text-white truncate overflow-hidden">{conversation.users.filter(user => user.email != $page.data.session?.user?.email)[0].name}</span>
                        {#if conversation.messages[conversation.messages.length - 1].image}
                            <span class="text-[#828282] -tracking-[0.49px] text-sm">Image</span>
                        {:else if conversation.messages[conversation.messages.length - 1].body}
                            <span class="text-[#828282] -tracking-[0.49px] text-sm w-[200px] truncate overflow-hidden">{conversation.messages[conversation.messages.length - 1].body}</span>
                        {/if}
                    </div>
                    <span class="text-[#828282] text-[12px] -tracking-[0.49px]">{format(new Date(conversation.messages[conversation.messages.length - 1].createdAt), 'p')}</span>
                </div>
            {:else}
            <div class="flex flex-col">
                <span class="text-white truncate">{conversation.users.filter(user => user.email != $page.data.session?.user?.email)[0].name}</span>
                <span class="text-[#828282] -tracking-[0.49px] text-sm">Start conversation</span>
            </div>
            {/if}
        {/if}
    </a>
</div>