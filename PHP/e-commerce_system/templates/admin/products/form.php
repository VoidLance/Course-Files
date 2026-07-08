<?php require $rootPath . '/templates/partials/header.php'; ?>
// Form view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4">
    <h1 class="h3 mb-3"><?= e($pageTitle ?? 'Product Form'); ?></h1>
    <form method="POST" class="row g-3" novalidate>
        <?= csrf_field(); ?>
        <div class="col-md-4"><label class="form-label">SKU</label><input class="form-control" name="sku" required value="<?= e($product['sku'] ?? ''); ?>"></div>
        <div class="col-md-8"><label class="form-label">Product name</label><input class="form-control" name="product_name" required value="<?= e($product['product_name'] ?? ''); ?>"></div>
        <div class="col-md-4"><label class="form-label">Category</label><select class="form-select" name="category_id"><option value="">None</option><?php foreach ($categories as $category): ?><option value="<?= (int) $category['category_id']; ?>" <?= ((int) ($product['category_id'] ?? 0) === (int) $category['category_id']) ? 'selected' : ''; ?>><?= e($category['category_name']); ?></option><?php endforeach; ?></select></div>
        <div class="col-md-4"><label class="form-label">Price</label><input class="form-control" name="price" type="number" step="0.01" min="0" required value="<?= e((string) ($product['price'] ?? '0.00')); ?>"></div>
        <div class="col-md-4"><label class="form-label">Stock</label><input class="form-control" name="stock_quantity" type="number" min="0" required value="<?= e((string) ($product['stock_quantity'] ?? '0')); ?>"></div>
        <div class="col-12"><label class="form-label">Image URL</label><input class="form-control" name="image_url" value="<?= e($product['image_url'] ?? ''); ?>"></div>
        <div class="col-12"><label class="form-label">Description</label><textarea class="form-control" name="description" rows="4"><?= e($product['description'] ?? ''); ?></textarea></div>
        <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" id="featured" name="featured" value="1" <?= !empty($product['featured']) ? 'checked' : ''; ?>><label class="form-check-label" for="featured">Featured</label></div></div>
        <div class="col-md-3"><div class="form-check"><input class="form-check-input" type="checkbox" id="is_active" name="is_active" value="1" <?= !isset($product['is_active']) || !empty($product['is_active']) ? 'checked' : ''; ?>><label class="form-check-label" for="is_active">Active</label></div></div>
        <div class="col-12"><button class="btn btn-primary" type="submit">Save Product</button></div>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
