<?php
\error_reporting(-1);
if ((!empty($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] === '127.0.0.1') || PHP_SAPI === 'cli') {
    \ini_set('display_errors', '1');
    error_reporting(-1);
} else {
    \ini_set('display_errors', '0');
}
require_once __DIR__ . '/../vendor/autoload.php';

$hrefsToSectionNumbers = [];
$expectedNonDigitSectionHrefs = ['../konec'];
$expectedNonDigitSectionNames = ['KONEC'];
$autoriHtmlFileBaseName = basename(__DIR__ . '/../web/autori/autoři.html');
$errors = [];

$folders = scandir(__DIR__ . '/../web', SCANDIR_SORT_ASCENDING);
$dirs = array_filter($folders, static function (string $folder) {
    return !preg_match('~([.]html|^[.]{1,2})$~', $folder);
});

$htmlFiles = glob(__DIR__ . '/../web/*/*.html', GLOB_NOSORT | GLOB_MARK);
foreach ($htmlFiles ?: [] as $htmlFile) {
    if (!is_file($htmlFile)) {
        continue;
    }
    $htmlFileBaseName = basename($htmlFile);
    if ($htmlFileBaseName === $autoriHtmlFileBaseName) { // TODO a co konec?
        continue;
    }
    ob_start();
    include $htmlFile;
    $originalContent = ob_get_clean();
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
        if (!in_array(basename($href), $dirs, true)) {
            $errors[] = sprintf("Href '%s' from file '%s' is pointing to unknown dir", $href, $htmlFileBaseName);
            continue;
        }
        if (!preg_match('~^[.]{2}/\d+$~', $href) && !in_array($href, $expectedNonDigitSectionHrefs, true)) {
            $errors[] = sprintf("Strange href, expected something like '../123', got '%s'", $href);
            continue;
        }
        $sectionNumber = trim((string)$anchor->prop_get_innerText());
        if (!preg_match('~^\d+$~', $sectionNumber) && !in_array($sectionNumber, $expectedNonDigitSectionNames)) {
            $errors[] = sprintf("Strange section number in a link text, expected something like '123', got '%s'", $sectionNumber);
            continue;
        }
        if (!array_key_exists($href, $hrefsToSectionNumbers)) {
            $hrefsToSectionNumbers[$href] = $sectionNumber;
        } elseif ($hrefsToSectionNumbers[$href] !== $sectionNumber) {
            $errors[] = sprintf("Href '%s' is already pointing to '%s' and now is pointing to '%s'?", $href, $hrefsToSectionNumbers[$href], $sectionNumber);
            continue;
        }
    }
}

$autoriDirBaseName = basename(__DIR__ . '/../web/autori');
$zacatekDirBaseName = basename(__DIR__ . '/../web/zacatek');
$konecDirBaseName = basename(__DIR__ . '/../web/konec');
$travelingNumbers = ['329', '404', '500', '533', '651', '771', '812', '862', '876', '911', '952', '1004', '1011', '1021', '1029'];
$strangeNumbers = ['336', '617', '712', '848', '908', '959', '1026'];

$dirsFromHrefs = array_map('basename', array_keys($hrefsToSectionNumbers));

$unusedDirs = array_diff(
    $dirs,
    $dirsFromHrefs,
    array_merge(
        [$autoriDirBaseName, $zacatekDirBaseName, $konecDirBaseName],
        $travelingNumbers,
        $strangeNumbers
    )
);

if ($unusedDirs) {
    sort($unusedDirs);
    $errors[] = sprintf("There are unused dirs: '%s'", implode(',', $unusedDirs));
}

if ($errors) {
    trigger_error(implode("\n", $errors), E_USER_ERROR);
}
