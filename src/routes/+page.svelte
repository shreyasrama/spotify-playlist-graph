<script>
	import { artistToGenresStore, tokenStore } from '../stores';

	import SpotifyAuthorization from '$lib/SpotifyAuthorization.svelte';
	import PlaylistSidebar from '$lib/PlaylistSidebar.svelte';
	import PlaylistGraph from '$lib/PlaylistGraph.svelte';
</script>

<div class="lg:main grid h-screen w-screen grid-rows-[auto_1fr] gap-[5px]">
	{#if $tokenStore}
		<PlaylistSidebar />
	{:else}
		<SpotifyAuthorization />
	{/if}

	<!-- Generate graph -->
	<div class="lg:viz col-start-1 col-end-1 row-start-2 row-end-2" id="viz">
		{#if $artistToGenresStore.length > 0}
			<PlaylistGraph artistToGenresData={$artistToGenresStore} />
		{/if}
	</div>
</div>
