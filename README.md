# spotify-playlist-graph

spotify-playlist-graph is a web app that creates a d3.js, draggable, force-directed graph of one of your Spotify 
playlists linking all the different genres and artists. It can help with discovering new genres and music based on what 
you already like.

Built with SvelteKit, TypeScript, and Tailwind. Scaffolded with [create-o7-app](https://github.com/ottomated/create-o7-app).

## Development
The following ([public](https://learn.svelte.dev/tutorial/env-static-public)) environment variables need to be set
(usually via a `.env` file):

    PUBLIC_SPOTIFY_CLIENT_ID=
    PUBLIC_REDIRECT_URI=
    PUBLIC_SPOTIFY_AUTHORIZATION_ENDPOINT=https://accounts.spotify.com/authorize
    PUBLIC_SPOTIFY_TOKEN_ENDPOINT=https://accounts.spotify.com/api/token
    PUBLIC_SPOTIFY_API_URL=https://api.spotify.com/v1

Start the dev server:

    pnpm dev

Start the Tailwind server:

    npx tailwindcss -i ./src/app.css -o ./dist/output.css --watch

## TODOs (not in priority order)
- Style login screen
    - Proper centering
    - Add some info about d3/force-directed graphs
    - Revolving/rotating/3D force-directed graph in background?
- Style playlist selector
- Style visualisation
    - Placeholder (maybe re-use background from login screen?) with text on what to do
- Add header
    - spotify-playlist-graph heading
- Add footer
    - copyright, feedback
- Responsive (review Tailwind docs)
    - d3 touch events
    - Header/footer
    - resize on viewport changes?
- Review accessibility guidelines and remediate
- i18n proof of concept
- Better anims when awaiting promises


## Scratch

For a genre
-> Links, ENAO: https://everynoise.com/research.cgi?mode=genre&name=devon%20indie
-> Musicalyst: https://musicalyst.com/genre/veracruz-indie
-> Top artists
    -> Follower number
    -> Genre list

For an artist
-> Links, ENAO: https://everynoise.com/artistprofile.cgi?id=4Z8W4fKeB5YxbusRsdQVPb
-> Other genres
