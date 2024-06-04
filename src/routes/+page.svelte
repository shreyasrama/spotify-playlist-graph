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
	import { artistToGenresStore, selectedNodeStore, tokenStore } from '../stores';
	import { get } from 'svelte/store';

	import SpotifyAuthorization from '../lib/SpotifyAuthorization.svelte';
	import PlaylistSidebar from '$lib/PlaylistSidebar.svelte';
	import PlaylistGraph from '$lib/PlaylistGraph.svelte';
	import NodeDetails from '$lib/NodeDetails.svelte';
</script>

<div class="main-mobile lg:main">
	<!-- TODO: implement -->
	<div class="header" />

	<!-- Sidebar section -->
	{#if $tokenStore}
		<PlaylistSidebar />
	{:else}
		<SpotifyAuthorization />
	{/if}

	<!-- Visualisation section -->
	<div class="viz-mobile lg:viz" id="viz">
		{#if $artistToGenresStore.length > 0}
			<PlaylistGraph artistToGenresData={$artistToGenresStore} />
		{/if}
	</div>

	<!-- TODO: implement -->
	<div class="footer" />
</div>
