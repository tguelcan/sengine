<script lang="ts">
	export let input;
	export let isLoading;
	export let handleSubmit;

	export let suggestions, className;

	const sendQuestion = (value: string) => {
		$input = value;
		handleSubmit();
	}
</script>

<!-- Workaround: https://github.com/vercel/ai/issues/3454#issuecomment-2599683080 -->
<svelte:options runes={false} />

<li class="flex flex-wrap gap-2 max-w-2xl w-full mx-auto {className}">
	{#each suggestions as { value, emoji }}
		<button on:click={() => sendQuestion(value)} class="btn btn-neutral btn-block sm:w-auto" disabled="{$isLoading}">{emoji} {value}</button>
	{/each}
</li>