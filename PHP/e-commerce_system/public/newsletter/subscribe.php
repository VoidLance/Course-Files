<?php

declare(strict_types=1);
// Starter note: This file handles etter  > subscribe - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$ok = $newsletterController->subscribe((string) ($_POST['email'] ?? ''));
	flash($ok ? 'success' : 'error', $ok ? 'Subscribed to newsletter.' : 'Please provide a valid email.');
	redirect((string) ($_SERVER['HTTP_REFERER'] ?? base_url('products/catalog.php')));
}

$pageTitle = 'Newsletter Subscription';
require $rootPath . '/templates/partials/header.php';
?>
<section class="card p-4 mx-auto" style="max-width: 560px;">
	<h1 class="h3 mb-3">Newsletter Subscription</h1>
	<form method="POST" novalidate>
		<?= csrf_field(); ?>
		<div class="mb-3">
			<label class="form-label" for="email">Email</label>
			<input class="form-control" id="email" type="email" name="email" required>
		</div>
		<button class="btn btn-primary" type="submit">Subscribe</button>
	</form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
