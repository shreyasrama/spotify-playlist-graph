<script lang="ts">
	import { fade } from "svelte/transition";

    export let nodeDetails;

    const fadeOptions = {
        delay: 400,
		duration: 300
	};
</script>

<div class="sidebar-mobile lg:sidebar lg:inline-block" transition:fade={fadeOptions}>
    <p class="px-4 pt-4 text-4xl line">{nodeDetails[0].name}</p>
    <p class="p-4 opacity-50">{nodeDetails[0].group}</p>
</div>
