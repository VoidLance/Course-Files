<?php $successMessage = flash('success'); ?>
// Starter note: This file handles rtials  > flash messages - straightforward on purpose.
<?php $errorMessage = flash('error'); ?>
<?php if ($successMessage !== null): ?>
    <div class="flash alert alert-success"><?= e($successMessage); ?></div>
<?php endif; ?>
<?php if ($errorMessage !== null): ?>
    <div class="flash alert alert-danger"><?= e($errorMessage); ?></div>
<?php endif; ?>
