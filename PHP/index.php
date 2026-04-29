<?php

declare(strict_types=1);

$rootPath = __DIR__;
$rootName = basename($rootPath);

/**
 * Encode each path segment so links are safe while preserving slashes.
 */
function toUrlPath(string $relativePath): string
{
    $segments = explode('/', str_replace('\\', '/', $relativePath));
    $encoded = array_map(static fn(string $segment): string => rawurlencode($segment), $segments);

    return implode('/', $encoded);
}

/**
 * Add a directory path to the tree structure.
 */
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

/**
 * Add a PHP file path to the tree structure.
 */
function addPhpFileToTree(array &$tree, string $relativePath): void
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

/**
 * Sort tree nodes naturally for readable output.
 */
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

/**
 * Render nested expandable tree nodes.
 */
function renderTree(array $node, bool $expand = false): void
{
    foreach ($node['dirs'] as $dirNode) {
        $hasChildren = !empty($dirNode['dirs']) || !empty($dirNode['files']);
        echo '<li class="tree-node tree-dir">';
        echo '<details' . ($expand ? ' open' : '') . '>';
        echo '<summary>';
        echo '<a href="' . htmlspecialchars(toUrlPath($dirNode['path']), ENT_QUOTES, 'UTF-8') . '/">';
        echo htmlspecialchars($dirNode['name'], ENT_QUOTES, 'UTF-8') . '/';
        echo '</a>';
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

    if (strtolower(pathinfo($relativePath, PATHINFO_EXTENSION)) === 'php') {
        addPhpFileToTree($tree, $relativePath);
    }
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
        :root {
            color-scheme: light;
            --bg: #f8fafc;
            --card: #ffffff;
            --text: #0f172a;
            --muted: #475569;
            --border: #e2e8f0;
            --link: #0f766e;
            --link-hover: #115e59;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            color: var(--text);
            background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
        }

        .wrap {
            max-width: 900px;
            margin: 2rem auto;
            padding: 0 1rem 2rem;
        }

        .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.25rem;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
        }

        h1 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
        }

        p {
            margin-top: 0;
            color: var(--muted);
        }

        h2 {
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            font-size: 1.1rem;
        }

        ul {
            margin: 0;
            padding-left: 1.2rem;
            line-height: 1.7;
        }

        .tree-root,
        .tree-root ul {
            list-style: none;
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
        }

        summary::marker {
            color: #334155;
        }

        summary a {
            margin-left: 0.2rem;
        }

        a {
            color: var(--link);
            text-decoration: none;
        }

        a:hover {
            color: var(--link-hover);
            text-decoration: underline;
        }

        .empty {
            color: var(--muted);
            font-style: italic;
        }

        code {
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 0.1rem 0.35rem;
        }
    </style>
</head>
<body>
<div class="wrap">
    <div class="card">
        <h1><?php echo htmlspecialchars($rootName, ENT_QUOTES, 'UTF-8'); ?> index</h1>
        <p>Auto-generated expandable tree for directories and PHP files in this root.</p>

        <h2>File tree</h2>
        <?php if (!empty($tree['dirs']) || !empty($tree['files'])): ?>
            <ul class="tree-root">
                <?php renderTree($tree, true); ?>
            </ul>
        <?php else: ?>
            <p class="empty">No directories or PHP files found.</p>
        <?php endif; ?>

        <p><small>Refresh this page to see updates after adding/removing files.</small></p>
    </div>
</div>
</body>
</html>
