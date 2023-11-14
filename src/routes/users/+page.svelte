


<script>
	import Navbar from '../../components/Navbar.svelte';
    export let data;
</script>



<svelte:head>
    <title>Chat Group - Users</title>
</svelte:head>

<div class="bg-[#252329] md:ml-[300px] min-h-screen flex justify-center items-center">
    <h1 class="text-2xl text-[white]"><strong>Select a user to start new conversation</strong></h1>
</div>

<Navbar users={data.users}/>
