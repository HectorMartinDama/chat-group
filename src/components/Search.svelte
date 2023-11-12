



<script lang="ts">
    import { afterUpdate, createEventDispatcher } from "svelte";

    export let searchValue: String='';
    export let ref= null;
    export let preValue: String= searchValue;

    const dispatch= createEventDispatcher();

    afterUpdate(() =>{
        if(searchValue.length > 0 && searchValue != preValue) dispatch("search", searchValue);
        if(searchValue.length === 0  && preValue.length != searchValue.length) dispatch("clear");
        preValue= searchValue;
    })
</script>



<div class='w-[272px]  mx-auto'>
    <div class="relative flex items-center w-full h-12 rounded-[8px] focus-within:shadow-lg bg-[#3C393F] overflow-hidden">
        <div class="grid place-items-center h-full w-12 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input bind:value={searchValue} bind:this={ref} autocomplete="off"
        class="peer h-full w-full outline-none text-sm -tracking-[0.49] text-white pr-2 bg-[#3C393F]"
        type="text"
        id="search"
        placeholder="Search something..." /> 
    </div>
</div>