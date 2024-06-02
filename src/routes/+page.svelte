<svelte:head>
    <script src="//unpkg.com/force-graph"></script>
	<script src="//unpkg.com/d3-force"></script>
	<script src="//unpkg.com/d3-quadtree"></script>

	<style type="text/css">
		.graph-tooltip {
			display: none;
		}
	</style>
</svelte:head>

<script>
	import { artistToGenresStore, tokenStore } from '../stores';

	import SpotifyAuthorization from '../lib/SpotifyAuthorization.svelte';
	import PlaylistSidebar from '$lib/PlaylistSidebar.svelte';
	import PlaylistGraph from '$lib/PlaylistGraph.svelte';
</script>

<div class="main-mobile lg:main">
	<div class="header" />

	{#if $tokenStore}
		<PlaylistSidebar />
	{:else}
		<SpotifyAuthorization />
	{/if}

	<!-- Generate graph -->
	<div class="viz-mobile lg:viz" id="viz">
		{#if $artistToGenresStore.length > 0}
			<PlaylistGraph artistToGenresData={$artistToGenresStore} />
		{/if}
	</div>

	<div class="footer" />
</div>
