<script lang="ts">
	import { artistToGenresStore, type ArtistToGenres } from '../stores';
	import { getArtists, getPlaylistTracks } from './api';

	import { fade } from 'svelte/transition';

	export let playlists: [{ name: string; id: string }];

	let selectedPlaylist: string;

	// Pagination options
	let itemLimitSize = 60;
	let offset = 0;

	const fadeOptions = {
		duration: 300,
	};

	// User clicks on a playlist
	const handlePlaylistClick = async (id: string) => {
		// Reset store
		artistToGenresStore.set([]);

		// Call API function to get tracks from playlist
		let playlistTracksResponse = await getPlaylistTracks(id, itemLimitSize, offset);

		// Get a set of artists from the retrieved playlist tracks
		let artists = getArtistSetFromPlaylistTracks(playlistTracksResponse);

		// Call API function to get more artist info
		let artistsResponse = await getArtists(artists);

		// Generate artists to genre mapping by using the retrieved artist info
		let artistToGenresList = generateArtistToGenreList(artistsResponse);

		// Update store
		artistToGenresStore.set(artistToGenresList);
	};

	// Takes a returned json response of playlist tracks and returns a set of strings containing artist IDs
	function getArtistSetFromPlaylistTracks(
		playlistTracks: any
	) {
		let artistIds = new Set<string>();
		playlistTracks.items.forEach(
			(trackInfo: { track: { artists: any[] } }) => {
				artistIds.add(trackInfo.track.artists[0].id)
		});

		return artistIds;
	}

	// Takes a returned json response of artist objects and returns a list of ArtistToGenre objects
	function generateArtistToGenreList(
		artists: any
	) {
		let atgList: ArtistToGenres[] = [];
		artists.artists.forEach(
			(artist: { name: string, id: string, genres: string[] }) => {
				if (artist.genres.length != 0) {
					const artistToAdd: ArtistToGenres = {
						Artist: artist.name,
						SpotifyId: artist.id,
						Genres: artist.genres,
					};						
					atgList = [...atgList, artistToAdd];
				}
			}
		);

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
		on:change={() => 
			handlePlaylistClick(selectedPlaylist)
		}
	>
		{#each playlists as { name, id }}
			{#if name != ''}
				<option value={id}>{name}</option>
			{/if}
		{/each}
	</select>
</div>
