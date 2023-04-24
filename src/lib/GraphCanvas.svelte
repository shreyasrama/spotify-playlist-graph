<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { zoom, zoomIdentity } from 'd3-zoom';
	import { schemeCategory10 } from 'd3-scale-chromatic';
	import { select, selectAll } from 'd3-selection';
	import { drag } from 'd3-drag';
	import {
		forceSimulation,
		forceLink,
		forceManyBody,
		forceCenter,
		forceX,
		forceY,
	} from 'd3-force';

	let d3 = {
		zoom,
		zoomIdentity,
		scaleLinear,
		scaleOrdinal,
		schemeCategory10,
		select,
		selectAll,
		drag,
		forceSimulation,
		forceLink,
		forceManyBody,
		forceCenter,
		forceX,
		forceY,
	};

	export let graph;

	// Use parent div for canvas dimensions
	let canvas;
	let width = document.getElementById('viz').clientWidth;
	let height = document.getElementById('viz').clientHeight;
	let activeNode = false;

	// Set up our core data as reactive statements
	$: links = graph.links.map((d) => Object.create(d));
	$: nodes = graph.nodes.map((d) => {
		d.size = Math.pow(
			graph.links
				.filter((link) => link.source == d.id || link.target == d.id)
				.map((link) => link.value)
				.reduce((a, b) => a + b),
			2
		);

		return Object.create(d);
	});

	let transform = d3.zoomIdentity;
	let simulation, context;
	let dpi = 1;
	onMount(() => {
		console.log('Mounting graph');
		dpi = window.devicePixelRatio || 1;
		context = canvas.getContext('2d');
		resize();

		simulation = d3
			// New simulation on nodes (no forces at this point)
			.forceSimulation(nodes)

			// Set up link force and relate it to our links object
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d) => d.id) // should maybe of form: artist -> genre
					.distance(150)
			)

			// Set up charge force - default parameters
			.force('charge', d3.forceManyBody())

			// Set up centering force
			.force('center', d3.forceCenter(width / 2, height / 2))

			// Gravity-like strength params
			.force('x', d3.forceX(width / 2).strength(0.00001))
			.force('y', d3.forceY(height / 2).strength(0.00001))

			// Update simulation on ticks
			.on('tick', simulationUpdate);

		d3.select(context.canvas).on('click', () => {
			if (activeNode) {
				console.log(activeNode);
			}
		});

		d3.select(canvas)
			.call(
				d3
					.drag()
					.container(canvas)
					.subject(dragSubject)
					.on('start', dragStarted)
					.on('drag', dragged)
					.on('end', dragEnded)
			)
			.call(
				d3
					.zoom()
					.scaleExtent([1 / 4, 4])
					.on('zoom', zoomed)
			);
	});

	function simulationUpdate() {
		context.save();
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.translate(transform.x, transform.y);
		context.scale(transform.k, transform.k);

		links.forEach((d) => {
			context.beginPath();
			context.moveTo(d.source.x, d.source.y);
			context.lineTo(d.target.x, d.target.y);
			context.globalAlpha = 0.3;
			context.strokeStyle = '#999';
			context.lineWidth = Math.cbrt(d.value) / 2;
			context.stroke();
			context.globalAlpha = 1;
		});

		nodes.forEach((d, i) => {
			context.beginPath();
			const radius = d.weight * 10;
			context.arc(d.x, d.y, radius / 5, 0, 2 * Math.PI);
			context.strokeStyle = 'transparent';
			context.lineWidth = 1.5;
			context.stroke();

			if (
				d.group == 1
					? (context.fillStyle = '#0C7BDC')
					: (context.fillStyle = '#FFC20A')
			);
			context.fill();

			context.fillText(d.id, d.x + radius / 5 + 5, d.y + 5);
		});
		context.restore();
	}

	function zoomed(currentEvent) {
		transform = currentEvent.transform;
		simulationUpdate();
	}

	function dragSubject(currentEvent) {
		// Find the dragged node and apply movement
		console.log(currentEvent);
		const node = simulation.find(
			transform.invertX(currentEvent.x * dpi),
			transform.invertY(currentEvent.y * dpi),
			20 // need to calculate this
		);
		if (node) {
			node.x = transform.applyX(node.x);
			node.y = transform.applyY(node.y);
		}

		return node;
	}

	function dragStarted(currentEvent) {
		if (!currentEvent.active) simulation.alphaTarget(0.1).restart();
		currentEvent.subject.fx = transform.invertX(currentEvent.subject.x);
		currentEvent.subject.fy = transform.invertY(currentEvent.subject.y);
	}

	function dragged(currentEvent) {
		currentEvent.subject.fx = transform.invertX(currentEvent.x);
		currentEvent.subject.fy = transform.invertY(currentEvent.y);
	}

	function dragEnded(currentEvent) {
		if (!currentEvent.active) simulation.alphaTarget(0);
		currentEvent.subject.fx = null;
		currentEvent.subject.fy = null;
	}

	function resize() {
		({ width, height } = canvas);
	}

	function fitToContainer(node) {
		dpi = window.devicePixelRatio || 1;
		// Make it visually fill the positioned parent
		node.style.width = '100%';
		node.style.height = '100%';
		// ...then set the internal size to match
		node.width = node.offsetWidth * dpi;
		node.height = node.offsetHeight * dpi;
		width = node.offsetWidth * dpi;
		height = node.offsetHeight * dpi;
	}

	// Tooltip functionality, not in use yet
	let path = '';
	let tooltipStatus = 'hidden';
	let tooltip = { x: 0, y: 0 };
	function handleMouseMove(e) {
		path = e.target.getAttribute('value');
		tooltipStatus = 'visible';
		tooltip.x = e.clientX;
		tooltip.y = e.clientY;
	}

	function handleMouseOut(e) {
		tooltipStatus = 'hidden';
	}
</script>

<svelte:window on:resize={resize} />

<!-- Chart Canvas -->
<canvas use:fitToContainer bind:this={canvas} />

<!-- Tooltip -->
<div
	class="tooltip"
	style="
	visibility: {tooltipStatus};
	top: {tooltip.y + 10}px;
	left: {tooltip.x + 10}px;
	border-radius: 15px;
	"
>
	<p style="padding: 10px; color: white;">{path}</p>
</div>

<style>
	canvas {
		float: left;
	}

	.tooltip {
		position: absolute;
		background-color: grey;
	}
</style>
