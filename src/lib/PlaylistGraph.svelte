<script lang="ts">
	import {
		type ArtistToGenres,
		type Node,
		type Link,
		dataStore,
	} from '../stores';
	import GraphCanvas from './GraphCanvas.svelte';

	// Elements are artists to an array of genres
	export let artistToGenresData: ArtistToGenres[];

	const genreSet = new Set<string>();
	const artistSet = new Set<string>();

	let data: { nodes: Node[]; links: Link[] } = { nodes: [], links: [] };
	artistToGenresData.forEach((artistToGenres) => {
		if (!artistSet.has(artistToGenres.Artist)) {
			// Add to set and push artist node
			artistSet.add(artistToGenres.Artist);
			let artistNode = { id: artistToGenres.Artist, group: 1, weight: 2 };
			data.nodes.push(artistNode);

			artistToGenres.Genres.forEach((genre) => {
				if (!genreSet.has(genre)) {
					// Add to set and push genre node
					genreSet.add(genre);
					let genreNode = { id: genre, group: 2, weight: 1 };
					data.nodes.push(genreNode);
				} else {
					// This is a shared genre, so increase the current artist weighting
					let nodeToUpdate = data.nodes.find((value) => value.id === genre);
					if (nodeToUpdate !== undefined) {
						var index = data.nodes.indexOf(nodeToUpdate);
						if (index !== -1) {
							nodeToUpdate.weight = nodeToUpdate.weight + 1;
							data.nodes[index] = nodeToUpdate;
						}
					}
				}

				// Create link between artist and genre
				let newLink = {
					source: artistToGenres.Artist,
					target: genre,
					value: 1,
				};
				data.links.push(newLink);
			});
		}
	});
	$dataStore = data;
</script>

<GraphCanvas graph={data} />
