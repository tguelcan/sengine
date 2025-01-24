<script lang="ts">
	import { useChat } from '@ai-sdk/svelte';
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	// Components
	import Composer from '$components/Composer.svelte';
	import Suggestions from '$components/Suggestions.svelte';
	import Search from '$components/Search.svelte';
	import Welcome from '$components/Welcome.svelte';
	import User from '$components/User.svelte';
	import Assistant from '$components/Assistant.svelte';

	let suggestions = [{
		value: 'Electromobility in Germany',
		emoji: '⚡'
	}, {
		value: 'Current elections around the world',
		emoji: '✏️'
	}, {
		value: 'What is artificial intelligence?',
		emoji: '🤖'
	}, {
		value: 'Tips for a birthday present',
		emoji: '🎁'
	}];

	const { input, handleSubmit, messages, isLoading } = useChat();

	export let data: PageData;

	let elemChat: HTMLElement;
	const scrollChatBottom = (behavior?: ScrollBehavior): void => {
		window?.scrollTo({ top: elemChat?.scrollHeight, behavior });
	};

	// Scroll down on new message
	messages.subscribe(_e => {
		browser && scrollChatBottom('smooth');
	});

	// Update remaning credits
	isLoading.subscribe((e) => {
		if (e) {
			invalidateAll();
		}
	});

</script>

<!-- Workaround: https://github.com/vercel/ai/issues/3454#issuecomment-2599683080 -->
<svelte:options runes={false} />
<div class="my-auto h-full">
	<ul class="container max-w-2xl mt-2" bind:this={elemChat}>
		<!-- User Answer -->
		{#each $messages as { role, content, toolInvocations }}
			{#if role === 'user'}
				<User {content} />
			{/if}
			{#if role === 'assistant'}
				<Assistant {content} />
			{/if}
			{#if toolInvocations}
				{#each toolInvocations as { state, toolName, result, args }}
					{#if toolName === 'Search'}
						<Search toolState={state} {result} {args} />
					{/if}
					{#if toolName === 'Suggestions' && result}
						<div class="collapse bg-neutral mb-4">
							<input type="checkbox" checked="{!!result?.length}" />
							<div class="collapse-title text-xl font-medium">Possible follow-up questions</div>
							<div class="collapse-content">
								<Suggestions suggestions={result} {input} {handleSubmit} {isLoading} />
							</div>
						</div>
					{/if}
				{/each}
			{/if}

		{/each}
	</ul>
	<Welcome show={!$messages?.length} />
	<Composer {input} {handleSubmit} {isLoading} remaning={data?.remaning} maxlength={data?.maxlength} />
	{#if !$messages?.length}
		<Suggestions {input} {handleSubmit} {isLoading} {suggestions} className="mt-4" />
	{/if}
</div>