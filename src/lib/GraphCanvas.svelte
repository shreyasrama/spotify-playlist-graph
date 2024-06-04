<script>
	// @ts-nocheck

	import { selectedNodeStore } from '../stores';
	
	export let graph;

	// Use parent div for canvas dimensions
	let canvas;
	let width = document.getElementById('viz').clientWidth;
	let height = document.getElementById('viz').clientHeight;

	// Hovered node
	let hoveredNode = null;

	const Graph = ForceGraph()
      (document.getElementById('viz'))
	  	.graphData(graph);

	Graph
		.onNodeHover((node, prevNode) => {
			hoveredNode = node || null
		})

	Graph
	  	.width(width)
		.height(height)
		.nodeAutoColorBy('group')
		.nodeCanvasObject((node, ctx, globalScale) => {
          const label = node.id;
		  const fontSize = 16 * node.weight/4;

		  ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
		  ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);

		  const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
          node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint

		  node.__fontSize = fontSize
        })

		// For grabbing
        .nodePointerAreaPaint((node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
        })

		// Node click behaviour
		Graph
			.zoom(2)
			.onNodeClick(node => {
				// Update store
				let selectedNode = [{
					name: node.id,
					group: node.group == 1 ? "artist" : "genre",
					spotifyId: node.spotifyId != null ? node.spotifyId : ""
				}];
				selectedNodeStore.set(selectedNode);
				
				// Center/zoom on node
				Graph.centerAt(node.x, node.y, 1000);

				// Work out a value for the zoom factor (amount)
				const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
				let zoomAmount = clamp(60 / node.__fontSize, 3, 1000)

				Graph.zoom(zoomAmount, 2000);
			})

		// Forces
		//.d3Force('collide', d3.forceCollide(Graph.nodeRelSize()))
		//.d3Force('center', d3.forceCenter(0.00001))
		//.d3Force('charge', null)
		//.d3Force(('link').strength(0.1));
		.d3Force('x', d3.forceX(width / 2).strength(0.05))
      	.d3Force('y', d3.forceY(height / 2).strength(0.05))
		.d3Force('collide', d3.forceCollide(15))
		.d3Force('link').distance(link => {
			return link.target.weight * 10;
		});
</script>
