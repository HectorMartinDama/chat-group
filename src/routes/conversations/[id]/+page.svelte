

<script lang="ts">
	import Body from "../../../components/Body.svelte";
	import ChatInput from "../../../components/ChatInput.svelte";
	import InformationConversation from "../../../components/InformationConversation.svelte";

    export let data;

	console.log(data.conversation)
</script>




<InformationConversation conversation={data.conversation}/>
<div class="max-h-screen min-h-screen pt-[50px]">
	<Body initialMessages={data.messages} conversationId={data.params.id}/>
	<ChatInput conversationId={data.params.id}/>
</div>


