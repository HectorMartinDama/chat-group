<script>
     import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";

</script>


<Menu class="bg-[#252329]">
    <MenuButton> 
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M6 9l6 6l6 -6"></path>
        </svg> 
    </MenuButton>
    <MenuItems>
      <MenuItem let:active>
        <a href="/account-settings" class:active>Account settings</a>
      </MenuItem>
      <MenuItem let:active>
        <a href="/documentation" class:active>Documentation</a>
      </MenuItem>
      <MenuItem disabled>
        <span class="disabled">Invite a friend (coming soon!)</span>
      </MenuItem>
    </MenuItems>
  </Menu>

