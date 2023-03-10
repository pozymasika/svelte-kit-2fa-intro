<script>
	/**
	 * @type {import('./$types').PageData}
	 */
	export let data;
</script>

<div id="register">
	<h1>Login</h1>
	{#if data.error}
		<div class="error">
			<p>Wrong username/password</p>
		</div>
	{/if}
	<form action="" method="post">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />
		<label for="password">Password</label>
		<input type="password" name="password" id="password" />
		<button type="submit">Login</button>
	</form>
</div>
