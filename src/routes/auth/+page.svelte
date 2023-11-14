<script lang="ts">
    import { signIn } from '@auth/sveltekit/client';
    let email: String; let password: String;
</script>




<div class="h-screen bg-[#120F13] flex items-center justify-center">
  <div class="w-[320px]" >
    <header>
      <h1 class="text-center text-[20px] md:text-[32px] font-bold mb-[40px] text-white">Welcome back</h1>
    </header>
    <form class="w-[320px]" on:submit={() => signIn('credentials', { email: email, password: password, redirect: '/users' })}>
      <input bind:value={email} class="border border-[grey] pl-[20px] h-[52px] w-[320px] outline-none rounded-[6px] mb-[18px]"  type="email" name="email" id="" required placeholder="Email address">
      <input bind:value={password} autocomplete="off" class="border border-[grey] pl-[20px] h-[52px] w-[320px] outline-none rounded-[6px] mb-[18px]"  type="password" name="password" id="" required placeholder="Password">
      <button class="h-[52px] w-[320px] text-white rounded-[6px] bg-[#3C46FF] transition-colors duration-200 hover:bg-[#0000FF] mb-[18px]" type="submit">Continue</button>
      <p class="text-center mb-[18px] text-white">Don't have an account? <a href="/auth/register">Sign Up?</a></p>
    </form>
  
    <div class="flex flex-col gap-[10px]">
      
      <button on:click={() => signIn("google", { callbackUrl: '/users' })} class="transition-colors duration-200 hover:bg-[#E5E5E5] h-[52px] rounded-[6px] border-[grey] border text-center inline-flex items-center pl-[15px] gap-[15px] text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
       </svg>
        Continue with Google
      </button>
      <button on:click={() => signIn("github", { callbackUrl: '/users' })} class="transition-colors duration-200 hover:bg-[#E5E5E5] h-[52px] rounded-[6px] border-[grey] border text-center inline-flex items-center pl-[15px] gap-[15px] text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" stroke-width="0" fill="currentColor"></path>
       </svg>
        Continue with Github
      </button>
    </div>
  </div>

</div>
