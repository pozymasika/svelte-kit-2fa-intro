<script>
	/**
	 * @type {import('./$types').PageData}
	 */
	export let data;
</script>

<div id="otp">
	{#if data.error}
		<div class="error">
			<p>Wrong Code!</p>
		</div>
	{/if}
	<form action="" method="post">
		<label for="code">OTP code:</label>
		<input type="text" name="code" id="code" />
		<button type="submit">Submit</button>
	</form>
</div>
