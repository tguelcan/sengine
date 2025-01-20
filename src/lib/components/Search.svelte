<script lang="ts">
	import { fade } from 'svelte/transition';
	import Loading from '$components/Loading.svelte';
	import Modal from  '$components/Modal.svelte'

	let { toolState, result, args } = $props();
	let showModal: string | null = $state(null);

	const filterImageItems = (i: object[], c: number = 4) => i.slice(0, c);
	const filterNewsItems = (i: object[], c: number = 4) => i.slice(0, c);
</script>

<Modal bind:showModal />
<li>
	{#if toolState === 'call'}
		<Loading {args} />
	{:else if result}
		<!-- Images -->
		<div class="collapse bg-neutral">
			<input type="checkbox" checked="{!!result?.images?.length}" />
			<div class="collapse-title text-xl font-medium">Images</div>
			<div class="collapse-content">
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{#each filterImageItems(result.images) as { url }, index}
						<button transition:fade={{delay: index * 100}} onclick={() => showModal = url}
								 class="duration-300 avatar group transition-all grayscale hover:grayscale-0">
							<div class="max-h-24 w-full rounded-box">
								<img src={url} alt="search" class="duration-300 group-hover:scale-105 transition-transform" />
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Websearch -->
		<div class="collapse bg-neutral mt-4">
			<input type="checkbox" checked="{!!result?.results?.length}" />
			<div class="collapse-title text-xl font-medium">Websearch</div>
			<div class="collapse-content">
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{#each filterNewsItems(result.results) as { title, url, content }, index}
						<div transition:fade={{delay: index * 100}}
								 class="text-xs space-y-1 flex flex-col justify-between p-2 bg-neutral rounded-box">
							<p>{title}</p>
							<div class="flex space-x-1">
								<div class="avatar">
									<div class="w-4 rounded-box">
										<img src={`https://www.google.com/s2/favicons?domain=${
                        new URL(url).hostname
                      }`}
												 alt={title} />
									</div>
								</div>
								<a class="truncate hover:underline" href={url} target="_blank">{new URL(url).hostname}</a>
							</div>
						</div>
					{/each}
				</div>
				<!-- Websearch answer -->
				<div class="prose my-2">
					<p>{result.answer}</p>
				</div>
			</div>
		</div>
	{/if}
</li>
