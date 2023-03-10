<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div id="settings">
	<div class="message">
		<p>Scan this QR code with your phone and enter the code below</p>
	</div>
	<img src={data.url} alt="QR Code" />
	<form action="" method="post">
		<label for="code">Code:</label>
		<input type="text" name="code" id="code" />
		{#if data.error}
			<p class="error">{data.error}</p>
		{/if}
		<button type="submit">Submit</button>
	</form>
</div>

<style>
	.error {
		color: red;
		font-style: italic;
	}
</style>
