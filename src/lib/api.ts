import { PUBLIC_SPOTIFY_API_URL } from '$env/static/public';

let headers: { Accept: string; 'Content-Type': string; Authorization: string };
const apiUrl = PUBLIC_SPOTIFY_API_URL;

export function setHeaders(accessToken: string) {
	headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: 'Bearer '.concat(accessToken),
	};
}

export const getMe = async () => {
	const response = await fetch(apiUrl.concat('/me'), {
		method: 'GET',
		headers: headers,
	});

	return response.json();
};

export async function getPlaylists() {
	const response = await fetch(apiUrl.concat('/me/playlists?limit=10'), {
		method: 'GET',
		headers: headers,
	});

	return response.json();
}

export async function getPlaylistTracks(playlistId: string) {
	let response;
	if (playlistId) {
		response = await fetch(
			apiUrl.concat('/playlists/', playlistId, '/tracks'),
			{
				method: 'GET',
				headers: headers,
			}
		);
	}

	return response?.json();
}

export async function getArtists(artistIds: string[]) {
	const queryParam = artistIds.join(',');
	const response = await fetch(apiUrl.concat('/artists?ids=', queryParam), {
		method: 'GET',
		headers: headers,
	});

	return response.json();
}
