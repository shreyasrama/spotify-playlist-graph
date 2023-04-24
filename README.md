# spotify-playlist-graph

Built with Svelte, TypeScript, and Tailwind. Scaffolded with [create-o7-app](https://github.com/ottomated/create-o7-app).

## Development
The following ([public](https://learn.svelte.dev/tutorial/env-static-public)) environment variables need to be set:

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
    - Logout button
- Add footer
- Responsive (review Tailwind docs)
    - d3 touch events
    - Tablet breakpoint
    - Phone breakpoint
- Review accessibility guidelines and remediate
- i18n proof of concept
- Better anims when awaiting promises
- Bugs/glitches:
    - Stop the SpotifyAuthorization component from appearing for a split second post-callback
- Clean up console.logs
- Set up Svelte Adapter for target platform
