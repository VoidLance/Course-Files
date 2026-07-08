<?php require $rootPath . '/templates/partials/header.php'; ?>
// Addresses view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 m-0">Addresses</h1>
        <a class="btn btn-primary" href="<?= e(base_url('account/address-create.php')); ?>">Add Address</a>
    </div>
    <?php if ($addresses === []): ?>
        <p class="mb-0">No addresses saved yet.</p>
    <?php else: ?>
        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead><tr><th>Label</th><th>Recipient</th><th>City</th><th>Type</th><th></th></tr></thead>
                <tbody>
                <?php foreach ($addresses as $address): ?>
                    <tr>
                        <td><?= e($address['label']); ?></td>
                        <td><?= e($address['recipient_name']); ?></td>
                        <td><?= e($address['city']); ?></td>
                        <td><?= e($address['address_type']); ?></td>
                        <td class="text-end">
                            <a class="btn btn-sm btn-outline-primary" href="<?= e(base_url('account/address-edit.php?id=' . (int) $address['address_id'])); ?>">Edit</a>
                            <form method="POST" action="<?= e(base_url('account/address-delete.php')); ?>" class="d-inline">
                                <?= csrf_field(); ?>
                                <input type="hidden" name="address_id" value="<?= (int) $address['address_id']; ?>">
                                <button class="btn btn-sm btn-outline-danger" type="submit">Delete</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
