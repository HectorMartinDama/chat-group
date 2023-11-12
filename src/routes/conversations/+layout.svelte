<script>
	import ConversationsList from "../../components/ConversationsList.svelte";
	import InformationConversation from "../../components/InformationConversation.svelte";
    export let data;

    console.log(data.users)
</script>





<ConversationsList users={data.users} conversations={data.conversations}/>

<main class="md:ml-[300px] bg-[#252329]">
    <slot/>
</main>