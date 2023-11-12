

<script lang="ts">
      import type { ActionData } from './$types'
      export let form: ActionData;
</script>


<div class="h-screen flex items-center justify-center">
    <div class="w-[320px]" >
      <header>
        {#if form?.user}
            <div class="bg-[#FFF0F0] rounded-[6px] border border-[#FDD8D8] mb-[50px] py-[20px] flex flex-col justify-center items-center">
                <p class="text-[red] text-sm">You have an account created with this email</p>
                <a href="/auth">Login with your account?</a>
            </div>
        {/if}
  
        <h1 class="text-center text-[32px] font-bold mb-[40px]">Welcome back</h1>
      </header>
      <form class="w-[320px]" action="?/register" method="post">
        <input class="border border-[grey] pl-[20px] h-[52px] w-[320px] outline-none rounded-[6px] mb-[18px]" type="text" name="name" id="" required placeholder="Name">
        <input class="border border-[grey] pl-[20px] h-[52px] w-[320px] outline-none rounded-[6px] mb-[18px]"  type="email" name="email" id="" required placeholder="Email address">
        <input class="border border-[grey] pl-[20px] h-[52px] w-[320px] outline-none rounded-[6px] mb-[18px]"  type="password" name="password" id="" required placeholder="Password">
        <button class="h-[52px] w-[320px] text-white rounded-[6px] bg-[blue] mb-[18px]" type="submit">Continue</button>
        <p class="text-center mb-[18px]">Have a account? <a href="/auth">Login?</a></p>
      </form>
    </div>
</div>

    