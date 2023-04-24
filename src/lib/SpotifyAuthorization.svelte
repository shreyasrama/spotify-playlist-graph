<script lang="ts">
	import {
		PUBLIC_SPOTIFY_CLIENT_ID,
		PUBLIC_REDIRECT_URI,
		PUBLIC_SPOTIFY_AUTHORIZATION_ENDPOINT,
	} from '$env/static/public';

	import { tokenStore, userStore } from '../stores';
	import { setHeaders, getMe } from './api';

	import { onMount } from 'svelte';

	const clientId = PUBLIC_SPOTIFY_CLIENT_ID;
	const redirectUri = PUBLIC_REDIRECT_URI;
	const authorizationEndpoint = PUBLIC_SPOTIFY_AUTHORIZATION_ENDPOINT;
	const scopes = 'playlist-read-private';

	// Implicit grant flow
	// https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/
	// TODO: use state query param
	const requestAuthorization = () => {
		window.location.href = `${authorizationEndpoint}
?client_id=${clientId}
&redirect_uri=${redirectUri}
&scope=${scopes}
&response_type=token&show_dialog=true`;
	};

	let authed = false;

	onMount(async () => {
		// Callback occurred, set access token in store
		if (window.location.hash) {
			let hash = window.location.hash.split('#access_token=')[1];
			let accessToken = hash?.split('&')[0];
			tokenStore.set(accessToken);
		}

		// Check store
		if ($tokenStore) {
			setHeaders($tokenStore);
			// Test token validity with API call
			const me = getMe();
			me.then((value) => {
				if (value.error) {
					window.location.replace(
						window.location.protocol + '//' + window.location.host.concat('/')
					);
				} else {
					authed = true;
					userStore.set(value.display_name);
				}
			});
		} else {
			console.log('Token does not exist in store');
		}
	});
</script>

{#if !authed}
	<div class="login grid grid-cols-2 items-center gap-2">
		<div class="inline-block">
			<h1>Spotify Playlist Graph</h1>
			<p>
				Visualise your playlists with a force-directed graph and see
				relationships between genres and your artists!
			</p>
			<p>To get started, login with your Spotify account.</p>
		</div>
		<button
			on:click|once={requestAuthorization}
			class="z-10 h-12 w-52 rounded bg-green-500 text-white"
		>
			LOGIN WITH SPOTIFY
		</button>
	</div>
{/if}
