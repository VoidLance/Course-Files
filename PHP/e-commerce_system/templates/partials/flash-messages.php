<?php $successMessage = flash('success'); ?>
// Flash messages view. Mostly HTML, with just enough PHP to stay useful.
<?php $errorMessage = flash('error'); ?>
<?php if ($successMessage !== null): ?>
    <div class="flash alert alert-success"><?= e($successMessage); ?></div>
<?php endif; ?>
<?php if ($errorMessage !== null): ?>
    <div class="flash alert alert-danger"><?= e($errorMessage); ?></div>
<?php endif; ?>
