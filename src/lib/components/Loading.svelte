<script lang="ts">
	import {fade} from 'svelte/transition';
	let { args } = $props()
</script>

{#if args?.query}
	<div transition:fade class="bg-neutral p-3 rounded-box flex space-x-2 items-center mb-4">
		<span class="loading loading-ring loading-xs"></span>
		<span class="text-sm">Search the web for {args?.query}</span>
	</div>
{/if}
<div transition:fade class="grid sm:grid-cols-4 mb-4 gap-2 opacity-75">
	<div class="skeleton h-20 w-full"></div>
	<div class="skeleton h-20 w-full"></div>
	<div class="skeleton h-20 w-full"></div>
	<div class="skeleton h-20 w-full"></div>
</div>