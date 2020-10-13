<?php
\error_reporting(-1);
if ((!empty($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] === '127.0.0.1') || PHP_SAPI === 'cli') {
    \ini_set('display_errors', '1');
} else {
    \ini_set('display_errors', '0');
}
$documentRoot = $documentRoot ?? (PHP_SAPI !== 'cli' ? \rtrim(\dirname($_SERVER['SCRIPT_FILENAME']), '\/') : \getcwd());

/** @noinspection PhpIncludeInspection */
require_once $documentRoot . '/vendor/autoload.php';

$originalContent = file_get_contents(__DIR__ . '/web/original/index.html');
preg_match_all('~"calibre_link-(?<index>\d+)"~', $originalContent, $matches);
$maxIndex = (int)max($matches['index']);
$originalDocument = new \Granam\WebContentBuilder\HtmlDocument($originalContent);
for ($index = 1, $element = null; $index <= $maxIndex; $index++) {
    $element = $originalDocument->getElementById('calibre_link-' . $index);
    if (!$element) {
        continue;
    }
    if (!$element->classList->contains('calibre')) {
        continue;
    }
    $outerHtml = $element->prop_get_outerHTML();
    $indexDirName = sprintf(__DIR__ . '/web/%d', $index);
    mkdir($indexDirName, 0777, true);
    file_put_contents("$indexDirName/$index.html", $outerHtml);
}
