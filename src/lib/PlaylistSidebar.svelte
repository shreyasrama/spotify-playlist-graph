<script lang="ts">
	import { selectedNodeStore, userStore } from '../stores';
	import { getPlaylists } from './api';
	import NodeDetails from './NodeDetails.svelte';
	import PlaylistSelector from './PlaylistSelector.svelte';

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
	<div class="playlists">
		{#await promise}
			<p>Loading...</p>
		{:then}
			{#if $selectedNodeStore.length > 0}
				<NodeDetails nodeDetails={$selectedNodeStore}/>
			{:else}
				<div class="hello p-4">
					{#if $userStore != ''}
						<p class="text-2xl">Hello, {$userStore}</p>
					{/if}
				</div>
				<PlaylistSelector playlists={playlistsResponse} />
			{/if}
		{/await}
	</div>
</div>
