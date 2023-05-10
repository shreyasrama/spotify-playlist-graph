import { c as create_ssr_component, a as subscribe, b as each, e as escape, d as add_attribute, i as is_promise, n as noop, v as validate_component, f as set_store_value } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
import "d3-zoom";
const artistToGenreInit = [];
const artistToGenresStore = writable(artistToGenreInit);
const dataInit = { nodes: [], links: [] };
const dataStore = writable(dataInit);
const tokenStore = writable("");
const userStore = writable("");
const PUBLIC_SPOTIFY_API_URL = "https://api.spotify.com/v1";
let headers;
const apiUrl = PUBLIC_SPOTIFY_API_URL;
async function getPlaylists() {
  const response = await fetch(apiUrl.concat("/me/playlists?limit=10"), {
    method: "GET",
    headers
  });
  return response.json();
}
const SpotifyAuthorization = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_tokenStore;
  $$unsubscribe_tokenStore = subscribe(tokenStore, (value) => value);
  $$unsubscribe_tokenStore();
  return `${`<div class="login grid grid-rows-2 items-center gap-2 lg:grid-cols-2"><div class="flex flex-col items-center justify-center text-center"><h1>Spotify Playlist Graph</h1>
			<p>Visualise your playlists with a force-directed graph and see
				relationships between genres and your artists!
			</p>
			<p>To get started, login with your Spotify account.</p></div>
		<div class="flex items-center justify-center"><button class="z-10 h-12 w-52 rounded bg-green-500 text-white">LOGIN WITH SPOTIFY
			</button></div></div>`}`;
});
const PlaylistSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_artistToGenresStore;
  $$unsubscribe_artistToGenresStore = subscribe(artistToGenresStore, (value) => value);
  let { playlists } = $$props;
  if ($$props.playlists === void 0 && $$bindings.playlists && playlists !== void 0)
    $$bindings.playlists(playlists);
  $$unsubscribe_artistToGenresStore();
  return `<p class="p-4">Select one of your playlists to visualise:</p>
<div class="hidden lg:inline-block"><ul>${each(playlists, ({ name, id }) => {
    return `${name != "" ? `<li class="pl-4 pb-1.5"><button class="hover:text-blue-600">${escape(name)}</button>
				</li>` : ``}`;
  })}</ul></div>

<div class="inline-block pl-4 lg:hidden"><select>${each(playlists, ({ name, id }) => {
    return `${name != "" ? `<option${add_attribute("value", id, 0)}>${escape(name)}</option>` : ``}`;
  })}</select></div>`;
});
const PlaylistSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userStore, $$unsubscribe_userStore;
  $$unsubscribe_userStore = subscribe(userStore, (value) => $userStore = value);
  let playlistsResponse = [{ name: "", id: "" }];
  const loadPlaylists = async () => {
    const response = await getPlaylists();
    response.items.forEach((element) => {
      if (playlistsResponse != void 0) {
        playlistsResponse.push({ name: element.name, id: element.id });
      }
    });
    return playlistsResponse;
  };
  let promise = loadPlaylists();
  $$unsubscribe_userStore();
  return `<div class="sidebar-mobile lg:sidebar"><div class="hello p-4">${$userStore != "" ? `<p class="text-2xl">Hello, ${escape($userStore)}</p>` : ``}</div>

	<div class="playlists">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
			<p>Loading...</p>
		`;
    }
    return function() {
      return `
			${validate_component(PlaylistSelector, "PlaylistSelector").$$render($$result, { playlists: playlistsResponse }, {}, {})}
		`;
    }();
  }(promise)}</div></div>`;
});
const GraphCanvas_svelte_svelte_type_style_lang = "";
const css = {
  code: "canvas.svelte-1g7mleh{float:left}.tooltip.svelte-1g7mleh{position:absolute;background-color:grey}",
  map: null
};
const GraphCanvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { graph } = $$props;
  let canvas;
  document.getElementById("viz").clientWidth;
  document.getElementById("viz").clientHeight;
  let path = "";
  let tooltipStatus = "hidden";
  let tooltip = { x: 0, y: 0 };
  if ($$props.graph === void 0 && $$bindings.graph && graph !== void 0)
    $$bindings.graph(graph);
  $$result.css.add(css);
  graph.links.map((d) => Object.create(d));
  graph.nodes.map((d) => {
    d.size = Math.pow(graph.links.filter((link) => link.source == d.id || link.target == d.id).map((link) => link.value).reduce((a, b) => a + b), 2);
    return Object.create(d);
  });
  return `


<canvas class="svelte-1g7mleh"${add_attribute("this", canvas, 0)}></canvas>


<div class="tooltip svelte-1g7mleh" style="${"visibility: " + escape(tooltipStatus, true) + "; top: " + escape(tooltip.y + 10, true) + "px; left: " + escape(tooltip.x + 10, true) + "px; border-radius: 15px;"}"><p style="padding: 10px; color: white;">${escape(path)}</p>
</div>`;
});
const PlaylistGraph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $dataStore, $$unsubscribe_dataStore;
  $$unsubscribe_dataStore = subscribe(dataStore, (value) => $dataStore = value);
  let { artistToGenresData } = $$props;
  const genreSet = /* @__PURE__ */ new Set();
  const artistSet = /* @__PURE__ */ new Set();
  let data = { nodes: [], links: [] };
  artistToGenresData.forEach((artistToGenres) => {
    if (!artistSet.has(artistToGenres.Artist)) {
      artistSet.add(artistToGenres.Artist);
      let artistNode = {
        id: artistToGenres.Artist,
        group: 1,
        weight: 2
      };
      data.nodes.push(artistNode);
      artistToGenres.Genres.forEach((genre) => {
        if (!genreSet.has(genre)) {
          genreSet.add(genre);
          let genreNode = { id: genre, group: 2, weight: 1 };
          data.nodes.push(genreNode);
        } else {
          let nodeToUpdate = data.nodes.find((value) => value.id === genre);
          if (nodeToUpdate !== void 0) {
            var index = data.nodes.indexOf(nodeToUpdate);
            if (index !== -1) {
              nodeToUpdate.weight = nodeToUpdate.weight + 1;
              data.nodes[index] = nodeToUpdate;
            }
          }
        }
        let newLink = {
          source: artistToGenres.Artist,
          target: genre,
          value: 1
        };
        data.links.push(newLink);
      });
    }
  });
  set_store_value(dataStore, $dataStore = data, $dataStore);
  if ($$props.artistToGenresData === void 0 && $$bindings.artistToGenresData && artistToGenresData !== void 0)
    $$bindings.artistToGenresData(artistToGenresData);
  $$unsubscribe_dataStore();
  return `${validate_component(GraphCanvas, "GraphCanvas").$$render($$result, { graph: data }, {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tokenStore, $$unsubscribe_tokenStore;
  let $artistToGenresStore, $$unsubscribe_artistToGenresStore;
  $$unsubscribe_tokenStore = subscribe(tokenStore, (value) => $tokenStore = value);
  $$unsubscribe_artistToGenresStore = subscribe(artistToGenresStore, (value) => $artistToGenresStore = value);
  $$unsubscribe_tokenStore();
  $$unsubscribe_artistToGenresStore();
  return `<div class="main-mobile lg:main"><div class="header"></div>

	${$tokenStore ? `${validate_component(PlaylistSidebar, "PlaylistSidebar").$$render($$result, {}, {}, {})}` : `${validate_component(SpotifyAuthorization, "SpotifyAuthorization").$$render($$result, {}, {}, {})}`}

	
	<div class="viz-mobile lg:viz" id="viz">${$artistToGenresStore.length > 0 ? `${validate_component(PlaylistGraph, "PlaylistGraph").$$render($$result, { artistToGenresData: $artistToGenresStore }, {}, {})}` : ``}</div>

	<div class="footer"></div></div>`;
});
export {
  Page as default
};
