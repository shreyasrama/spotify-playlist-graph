<script>
	import { artistToGenresStore, tokenStore } from '../stores';

	import SpotifyAuthorization from '../lib/SpotifyAuthorization.svelte';
	import PlaylistSidebar from '$lib/PlaylistSidebar.svelte';
	import PlaylistGraph from '$lib/PlaylistGraph.svelte';
</script>

<div class="main">
	<div class="header" />

	{#if $tokenStore}
		<PlaylistSidebar />
	{:else}
		<SpotifyAuthorization />
	{/if}

	<!-- Generate graph -->
	<div class="viz" id="viz">
		{#if $artistToGenresStore.length > 0}
			<PlaylistGraph artistToGenresData={$artistToGenresStore} />
		{/if}
	</div>

	<div class="footer" />
</div>
