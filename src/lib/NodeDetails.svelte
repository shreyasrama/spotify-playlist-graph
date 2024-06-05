<script lang="ts">
    import back_icon from "$lib/assets/back_icon.svg"
	import { selectedNodeStore } from "../stores";

    export let nodeDetails;
</script>

<div class="sidebar-mobile lg:sidebar lg:inline-block">
    <img 
        class="w-10 mx-3 mt-3 cursor-pointer" 
        src="{back_icon}" 
        alt=""
        on:click={() => selectedNodeStore.set([])}
        on:keypress
    >
    <p class="px-4 pt-4 text-4xl line">{nodeDetails[0].name}</p>
    <p class="p-4 opacity-50">{nodeDetails[0].group}</p>
</div>
