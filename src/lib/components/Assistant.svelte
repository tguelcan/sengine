<script lang="ts">
	import { fade } from 'svelte/transition';
	import { marked } from 'marked';

	let { content }: { content: string } = $props();
</script>

<li transition:fade class="flex items-start space-x-1 px-4 pb-4">
	<div class="prose !max-w-none mt-2">{@html marked(content)}</div>
</li>