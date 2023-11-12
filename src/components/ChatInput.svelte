
<script lang="ts">
    import { CldUploadButton } from 'svelte-cloudinary';

    export let conversationId: String;
    let inputValue: String;



    const sendMessage= async () => {
        const response= await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ message: inputValue.trim(), conversationId })
        });
        if(response.ok) inputValue= ''; // clean the form when the message send ok
    }

    const handleUpload= async (result: any) =>{
        fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify( { image: result?.info?.secure_url, conversationId } )
        });
    }

</script>


<div class="flex justify-center items-center pt-[50px]">
    <CldUploadButton class="pr-[12px]" options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="chat-app-sveltekit" />

    <form on:submit|preventDefault={sendMessage}>
        <input class="rounded-[12px] text-[#FFFFFF] bg-[#3C393F] outline-none h-[52px] w-[350px] pl-[17px] md:w-[969px]" type="text" bind:value={inputValue} placeholder="Type a message here" required>
    </form>
</div>