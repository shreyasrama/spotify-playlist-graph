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

    <div class="flex flex-col gap-4 px-4 pt-2">
        {#if nodeDetails[0].group == "genre"}
            <p>
                {nodeDetails[0].name} at 
                <a 
                    class="underline decoration-dotted"
                    href="https://everynoise.com/research.cgi?mode=genre&name={nodeDetails[0].name}"
                    target="_blank"
                >
                    Every Noise At Once
                </a>
            </p>

            <p>
                {nodeDetails[0].name} at 
                <a 
                    class="underline decoration-dotted"
                    href="https://musicalyst.com/genre/{nodeDetails[0].name.replace(/\s+/g, "-")}"
                    target="_blank"
                >
                    Musicalyst
                </a>
            </p>
        {/if}

        {#if nodeDetails[0].group == "artist"}
            <p>
                {nodeDetails[0].name} at 
                <a 
                    class="underline decoration-dotted"
                    href="https://everynoise.com/artistprofile.cgi?id={nodeDetails[0].spotifyId}"
                    target="_blank"
                >
                    Every Noise At Once
                </a>
            </p>
        {/if}
    </div>
</div>
