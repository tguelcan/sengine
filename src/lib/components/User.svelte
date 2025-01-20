<script lang="ts">
	import { fade } from 'svelte/transition';
	import { CircleUserRound } from 'lucide-svelte';

	let { content }: { content: string } = $props();
</script>

<li transition:fade class="bg-neutral flex items-start space-x-2 p-4 rounded-box sticky top-4 z-20 mb-2">
	<CircleUserRound strokeWidth="1.25" size="20" class="shrink-0" />
	<p class="text-sm leading-snug text-balance">{content}</p>
</li>