<?php
\error_reporting(-1);
if ((!empty($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] === '127.0.0.1') || PHP_SAPI === 'cli') {
    \ini_set('display_errors', '1');
} else {
    \ini_set('display_errors', '0');
}
require_once __DIR__ . '/../vendor/autoload.php';

$filesToPageNumbers = [];
$expectedNonDigitSectionHrefs = ['../konec'];
$expectedNonDigitSectionNames = ['KONEC'];
$autoriBaseName = basename(__DIR__ . '/../web/autori/autoři.html');

$htmlFiles = glob(__DIR__ . '/../web/*/*.html', GLOB_NOSORT | GLOB_MARK);
foreach ($htmlFiles ?: [] as $htmlFile) {
    if (!is_file($htmlFile)) {
        continue;
    }
    $baseName = basename($htmlFile);
    if ($baseName === $autoriBaseName) {
        continue;
    }
    $originalContent = file_get_contents($htmlFile);
    $originalDocument = new \Granam\WebContentBuilder\HtmlDocument(
        <<<HTML
<!DOCTYPE html>
<html lang="cs">
<body>
$originalContent
</body>
</html>
HTML
    );
    $anchors = $originalDocument->getElementsByTagName('a');
    foreach ($anchors as $anchor) {
        $href = (string)$anchor->getAttribute('href');
        if (!preg_match('~^[.]{2}/\d+$~', $href) && !in_array($href, $expectedNonDigitSectionHrefs, true)) {
            trigger_error(sprintf("Strange href, expected something like '../123', got '$href'"), E_USER_ERROR);
            continue;
        }
        $sectionNumber = trim((string)$anchor->prop_get_innerText());
        if (!preg_match('~^\d+$~', $sectionNumber) && !in_array($sectionNumber, $expectedNonDigitSectionNames)) {
            trigger_error(sprintf("Strange section number in a link text, expected something like '123', got '$sectionNumber'"), E_USER_ERROR);
            continue;
        }
        $filesToPageNumbers[$href] = $sectionNumber;
    }
}