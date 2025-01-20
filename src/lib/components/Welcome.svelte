<script lang="ts">
	let { show } = $props();
</script>

{#if show}
	<div class="text-center my-10">
		<h1 class="bg-gradient-to-r from-white to-white/10 inline-block text-transparent bg-clip-text py-2">What would you
			like to know?</h1>
	</div>
{/if}