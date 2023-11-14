<script>
	import ConversationsList from "../../components/ConversationsList.svelte";
    export let data;

    console.log(data.users)
</script>



<svelte:head>
    <title>Chat Group - Conversations</title>
</svelte:head>

<ConversationsList users={data.users} conversations={data.conversations}/>

<main class="md:ml-[300px] bg-[#252329]">
    <slot/>
</main>