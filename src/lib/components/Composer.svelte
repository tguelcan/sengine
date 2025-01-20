<script lang="ts">
	import { SendHorizonal } from 'lucide-svelte';


	export let input;
	export let isLoading;
	export let handleSubmit;
	export let remaning = 0;
	export let maxlength = 0;
</script>

<!-- Workaround: https://github.com/vercel/ai/issues/3454#issuecomment-2599683080 -->
<svelte:options runes={false} />

<form on:submit={handleSubmit} class="sticky bottom-4 w-full max-w-2xl mx-auto z-20">
	<label class="input input-bordered flex items-center gap-2 rounded-full">
		<input type="text" {maxlength}
					 class="grow" placeholder="Ask" disabled={$isLoading} bind:value={$input} />
		<button type="submit" class="group">
			{#if $isLoading}
				<span class="loading loading-spinner loading-md"></span>
			{:else}
				<SendHorizonal strokeWidth="1.25" class="text-neutral-content/75 transition-colors group-hover:text-white/75" />
			{/if}
		</button>
	</label>
	<div class="label">
		<span class="label-text-alt text-neutral-content">{maxlength - $input.length}</span>
			<span class="label-text-alt text-neutral-content">
				<span class="countdown"><span style="--value:{remaning};"></span>
			</span>
			questions left
		</span>
	</div>
</form>