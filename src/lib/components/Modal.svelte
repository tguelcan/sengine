<script lang="ts">
	import {clickOutside} from '$utils'

	let { showModal = $bindable() } = $props();

	const keydown = ({ key }) => {
		if (key === 'Escape') {
			showModal = null;
		}
	}
</script>

<svelte:window
	on:keydown={keydown}
/>

<dialog id="my_modal_3" class="modal" class:modal-open="{showModal}">
	<div class="modal-box" use:clickOutside onclick_outside={() => showModal = null}>
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-neutral absolute right-2 top-2" onclick={()=> showModal = null}>✕</button>
		</form>
		<img src={showModal} alt="modal" class="max-h-80 mx-auto">
	</div>
</dialog>