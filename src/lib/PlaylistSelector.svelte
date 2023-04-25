<script lang="ts">
	import { artistToGenresStore, type ArtistToGenres } from '../stores';
	import { getArtists, getPlaylistTracks } from './api';

	import { fade } from 'svelte/transition';

	export let playlists: [{ name: string; id: string }];

	let selectedPlaylist: string;

	const fadeOptions = {
		duration: 300,
	};

	// User clicks on a playlist
	const handlePlaylistClick = async (id: string) => {
		let playlistTracks = await getPlaylistTracks(id);

		// Get artists from playlist tracks
		let artists: string[] = [];
		const maxArraySize = 50;
		artistToGenresStore.set([]);
		playlistTracks.items.forEach((trackInfo: { track: { artists: any[] } }) => {
			trackInfo.track.artists.forEach((artist) => {
				artists.push(artist.id);
			});
		});

		// Populate the store with artist and genre data
		let artistToGenreList: ArtistToGenres[] = [];
		for (let i = 0; i < artists.length; i += maxArraySize) {
			const chunkOfArtists = artists.slice(i, i + maxArraySize);
			const chunkOfArtistsInfo = getArtists(chunkOfArtists);
			processArtistChunk(chunkOfArtistsInfo).then((value) => {
				artistToGenreList.concat(...artistToGenreList, value);
			});
		}
		$artistToGenresStore = artistToGenreList;
	};

	// We can get a max of 50 artists from one API call at a time, so process that chunk of 50
	async function processArtistChunk(
		artistInfo: Promise<any>
	): Promise<ArtistToGenres[]> {
		let atgList: ArtistToGenres[] = [];
		artistInfo.then((artistArray) => {
			artistArray.artists.forEach(
				(artist: { name: string; genres: string[] }) => {
					if (artist.genres.length != 0) {
						const artistToAdd: ArtistToGenres = {
							Artist: artist.name,
							Genres: artist.genres,
						};
						$artistToGenresStore = [...$artistToGenresStore, artistToAdd];
						atgList.push(artistToAdd);
					}
				}
			);
		});
		return atgList;
	}
</script>

<p class="p-4">Select one of your playlists to visualise:</p>
<div class="hidden lg:inline-block">
	<ul>
		{#each playlists as { name, id }}
			{#if name != ''}
				<li class="pl-4 pb-1.5" transition:fade={fadeOptions}>
					<button
						class="hover:text-blue-600"
						on:click={() => handlePlaylistClick(id)}
					>
						{name}
					</button>
				</li>
			{/if}
		{/each}
	</ul>
</div>

<div class="inline-block pl-4 lg:hidden">
	<select
		bind:value={selectedPlaylist}
		on:change={() => handlePlaylistClick(selectedPlaylist)}
	>
		{#each playlists as { name, id }}
			{#if name != ''}
				<option value={id}>{name}</option>
			{/if}
		{/each}
	</select>
</div>
