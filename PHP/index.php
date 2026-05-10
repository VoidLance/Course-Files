<?php

declare(strict_types=1);

$rootPath = __DIR__;
$rootName = basename($rootPath);

# URL-encode each path segment so links stay safe and still keep folder slashes.
function toUrlPath(string $relativePath): string
{
    $segments = explode('/', str_replace('\\', '/', $relativePath));
    $encoded = array_map(static fn(string $segment): string => rawurlencode($segment), $segments);

    return implode('/', $encoded);
}

# Build directory branches in the tree one segment at a time.
function addDirectoryToTree(array &$tree, string $relativePath): void
{
    $parts = array_values(array_filter(explode('/', $relativePath), static fn(string $part): bool => $part !== ''));
    $node = &$tree;
    $currentPath = '';

    foreach ($parts as $part) {
        $currentPath = $currentPath === '' ? $part : $currentPath . '/' . $part;

        if (!isset($node['dirs'][$part])) {
            $node['dirs'][$part] = [
                'name' => $part,
                'path' => $currentPath,
                'dirs' => [],
                'files' => [],
            ];
        }

        $node = &$node['dirs'][$part];
    }
}

# Add any file type to the tree. No file gets left behind.
function addFileToTree(array &$tree, string $relativePath): void
{
    $parts = array_values(array_filter(explode('/', $relativePath), static fn(string $part): bool => $part !== ''));
    $fileName = array_pop($parts);

    if ($fileName === null) {
        return;
    }

    $node = &$tree;
    $currentPath = '';

    foreach ($parts as $part) {
        $currentPath = $currentPath === '' ? $part : $currentPath . '/' . $part;

        if (!isset($node['dirs'][$part])) {
            $node['dirs'][$part] = [
                'name' => $part,
                'path' => $currentPath,
                'dirs' => [],
                'files' => [],
            ];
        }

        $node = &$node['dirs'][$part];
    }

    $filePath = count($parts) > 0 ? implode('/', $parts) . '/' . $fileName : $fileName;
    $node['files'][] = [
        'name' => $fileName,
        'path' => $filePath,
    ];
}

# Keep sorting natural so file_2 appears before file_10.
function sortTree(array &$node): void
{
    if (!empty($node['dirs'])) {
        uksort($node['dirs'], 'strnatcasecmp');
        foreach ($node['dirs'] as &$childNode) {
            sortTree($childNode);
        }
        unset($childNode);
    }

    if (!empty($node['files'])) {
        usort(
            $node['files'],
            static fn(array $left, array $right): int => strnatcasecmp($left['name'], $right['name'])
        );
    }
}

# Render nested folders/files as an expandable tree.
function renderTree(array $node, bool $expand = false): void
{
    foreach ($node['dirs'] as $dirNode) {
        $hasChildren = !empty($dirNode['dirs']) || !empty($dirNode['files']);
        echo '<li class="tree-node tree-dir">';
        echo '<details' . ($expand ? ' open' : '') . '>';
        echo '<summary>';
        echo '<span class="folder-name">' . htmlspecialchars($dirNode['name'], ENT_QUOTES, 'UTF-8') . '/</span>';
        echo '</summary>';

        if ($hasChildren) {
            echo '<ul>';
            renderTree($dirNode);
            echo '</ul>';
        }

        echo '</details>';
        echo '</li>';
    }

    foreach ($node['files'] as $fileNode) {
        echo '<li class="tree-node tree-file">';
        echo '<a href="' . htmlspecialchars(toUrlPath($fileNode['path']), ENT_QUOTES, 'UTF-8') . '">';
        echo htmlspecialchars($fileNode['name'], ENT_QUOTES, 'UTF-8');
        echo '</a>';
        echo '</li>';
    }
}

$tree = [
    'name' => $rootName,
    'path' => '',
    'dirs' => [],
    'files' => [],
];

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($rootPath, FilesystemIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);

foreach ($iterator as $item) {
    $fullPath = $item->getPathname();
    $relativePath = ltrim(str_replace($rootPath, '', $fullPath), DIRECTORY_SEPARATOR);
    $relativePath = str_replace('\\', '/', $relativePath);

    if ($relativePath === '' || $relativePath === 'index.php') {
        continue;
    }

    if ($item->isDir()) {
        addDirectoryToTree($tree, $relativePath);
        continue;
    }

    # Include all files so everything under PHP/ stays reachable from this page.
    addFileToTree($tree, $relativePath);
}

sortTree($tree);
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo htmlspecialchars($rootName, ENT_QUOTES, 'UTF-8'); ?> Directory Index</title>
    <style>
        body {
            margin: 1.25rem;
            font-family: "Courier New", Courier, monospace;
            line-height: 1.4;
            color: #111;
            background: #fff;
        }

        h1 {
            margin-top: 0;
            margin-bottom: 0.25rem;
            font-size: 1.25rem;
        }

        p {
            margin-top: 0.35rem;
        }

        h2 {
            margin-top: 1rem;
            margin-bottom: 0.35rem;
            font-size: 1rem;
        }

        .tree-root,
        .tree-root ul {
            list-style: square;
            margin: 0;
            padding-left: 1.1rem;
        }

        .tree-root {
            padding-left: 0;
        }

        .tree-node {
            margin: 0.15rem 0;
        }

        summary {
            cursor: pointer;
            user-select: none;
            font-weight: 600;
        }

        .folder-name {
            margin-left: 0.2rem;
        }

        a {
            color: #0033aa;
            text-decoration: underline;
        }

        a:hover {
            color: #001f66;
        }

        .empty {
            color: #444;
            font-style: italic;
        }

        code {
            background: #f7f7f7;
            border: 1px solid #ccc;
            padding: 0.05rem 0.2rem;
        }

        .divider {
            margin: 0.75rem 0;
            border: 0;
            border-top: 1px dashed #bbb;
        }
    </style>
</head>
<body>
    <h1><?php echo htmlspecialchars($rootName, ENT_QUOTES, 'UTF-8'); ?> index</h1>
    <p>Plain directory listing for everything inside this PHP root.</p>
    <hr class="divider">

    <h2>File tree</h2>
    <?php if (!empty($tree['dirs']) || !empty($tree['files'])): ?>
        <ul class="tree-root">
            <?php renderTree($tree, true); ?>
        </ul>
    <?php else: ?>
        <p class="empty">No directories or files found.</p>
    <?php endif; ?>

    <hr class="divider">
    <p><small>Refresh to pick up adds/removes.</small></p>
</body>
</html>
