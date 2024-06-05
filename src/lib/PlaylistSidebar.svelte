<script lang="ts">
	import { selectedNodeStore, userStore } from '../stores';
	import { getPlaylists } from './api';
	import { fade } from 'svelte/transition';
	import NodeDetails from './NodeDetails.svelte';
	import PlaylistSelector from './PlaylistSelector.svelte';

	const fadeOptions = {
		duration: 300
	};

	let playlistsResponse: [{ name: string; id: string }] = [
		{ name: '', id: '' },
	];

	// Load the user's playlist
	const loadPlaylists = async () => {
		const response = await getPlaylists();
		response.items.forEach((element: any) => {
			if (playlistsResponse != undefined) {
				playlistsResponse.push({ name: element.name, id: element.id });
			}
		});
		return playlistsResponse;
	};
	let promise = loadPlaylists();
</script>

<div class="sidebar-mobile lg:sidebar">
	<div class="playlists container">
		{#await promise}
			<p>Loading...</p>
		{:then}
			{#if $selectedNodeStore.length > 0}
			<div transition:fade={fadeOptions}>
				<NodeDetails nodeDetails={$selectedNodeStore}/>
			</div>
			{:else}
			<div transition:fade={fadeOptions}>
				<div class="hello p-4">
					{#if $userStore != ''}
						<p class="text-2xl">Hello, {$userStore}</p>
					{/if}
				</div>
				<PlaylistSelector playlists={playlistsResponse} />
			</div>
			{/if}
		{/await}
	</div>
</div>

<style>
	.container { display: grid; }
	.container > * { grid-area: 1 / 1; }
</style>
