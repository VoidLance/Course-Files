<?php require $rootPath . '/templates/partials/header.php'; ?>
// Index view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4">
    <h1 class="h3 mb-3">User Management</h1>
    <div class="table-responsive">
        <table class="table table-striped align-middle">
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
            <tbody>
            <?php foreach ($users as $user): ?>
                <tr>
                    <td><?= (int) $user['user_id']; ?></td>
                    <td><?= e($user['first_name'] . ' ' . $user['last_name']); ?></td>
                    <td><?= e($user['email']); ?></td>
                    <td><?= e($user['role']); ?></td>
                    <td><?= e($user['status']); ?></td>
                    <td><a class="btn btn-sm btn-outline-primary" href="show.php?id=<?= (int) $user['user_id']; ?>">View</a></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
