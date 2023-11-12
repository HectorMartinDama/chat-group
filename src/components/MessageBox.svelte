<script lang="ts">
    import type { FullMessageType } from "../types";
    import { page } from '$app/stores';
    import { format } from 'date-fns';
    import { messageSend } from "$lib/dateService";




    export let lastMessage: Boolean;
    export let data: FullMessageType;
    export let key: String;
</script>



<div class="{ $page.data.session?.user?.email === data.sender.email ? 'bg-[#2E3035]' : 'bg-transparent'} w-[320px] md:w-[969px]  min-h-[62px] break-words rounded-[12px] flex flex-row justify-start">
    {#if data.sender.image}
        <img class="rounded-[7px] h-[42px] w-[42px] mr-[28px]" src="{data.sender.image}" alt="profile image of {data.sender.name}">
    {:else}
        <img class="rounded-[7px] h-[42px] w-[42px] mr-[28px]" src="\defaultProfile.jpg" alt="profile image of {data.sender.name}">
    {/if}
    <div>
        <div class="flex flex-row pb-[11px]">
            <p class="text-[#828282] -tracking-[0.63px] font-bold pr-[14px]">{data.sender.name}</p>
            <p class="text-[#828282] text-[14px] -tracking-[0.49px]">{messageSend(data.createdAt)} at {format(new Date(data.createdAt), 'p')}</p>
        </div>
     
        <p class="text-[#E0E0E0] -tracking-[0.63px] overflow-hidden">{data.body}</p>
        
    </div>
</div>