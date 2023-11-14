<script lang="ts">
	import toast, { Toaster } from "svelte-french-toast";
</script>



<svelte:head>
	<title>Chat Group</title>
</svelte:head>



<section class="flex flex-row">
	<div class="bg-[#120F13] hidden md:block w-[60%] h-screen md:pl-[35px] md:pt-[20px]">
		<div class="flex justify-items-start gap-2">
			<h1 class="text-white font-semibold text-[20px] leading-[1.2]">ChatGroup</h1>
			<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
				<path d="M8 9h8"></path>
				<path d="M8 13h6"></path>
				<path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
			</svg>
		</div>

		<div class="flex justify-start items-center h-full">
			<h1 id="phrase" class="text-[32px] font-bold text-white py-[20px]">Chat with yours friends in real time</h1>
		</div>
	</div>
	<div class="bg-[#000000] w-full md:w-[40%] h-screen md:pt-[44px] flex flex-col items-center justify-center">
		<h1 class="text-white text-[20px] leading-[1.2] md:text-[32px] md:leading-8 font-semibold">Get started</h1>
			<div class="flex flex-col md:flex-row gap-[15px] mt-[20px]">
				<a class="flex items-center justify-center outline-none text-white font-medium w-[355px] md:w-[214px] h-[42px] rounded-md bg-[#3C46FF] transition-colors duration-200 hover:bg-[#0000FF]" href="/auth">Log in</a>
				<a class="flex items-center justify-center outline-none text-white font-medium w-[355px] md:w-[214px] h-[42px] rounded-md bg-[#3C46FF] transition-colors duration-200 hover:bg-[#0000FF]" href="/auth">Sign up</a>
			</div>
	</div>
</section>

<Toaster/>



<style>

	#phrase{
		display: block;
		white-space: nowrap;
		border-right: 4px solid;
		width: 25ch;
		overflow: hidden;
		animation: typing 2s steps(25), blink .5s infinite step-end alternate;
	}

	@keyframes typing{
		from { width: 0 }
	}

	@keyframes blink{
		50% { border: transparent }
	}
</style>


