<?php
\error_reporting(-1);
if ((!empty($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] === '127.0.0.1') || PHP_SAPI === 'cli') {
    \ini_set('display_errors', '1');
    error_reporting(-1);
} else {
    \ini_set('display_errors', '0');
}
require_once __DIR__ . '/../vendor/autoload.php';

$errors = [];

$dirs = glob(__DIR__ . '/../web/*', GLOB_ONLYDIR);
$dirsBaseNames = array_map('basename', $dirs);
$numericDirs = array_filter($dirsBaseNames, static function (string $dirBaseName) {
    return preg_match('~^\d+$~', $dirBaseName);
});

for ($count = count($numericDirs), $i = 1; $i <= $count; $i++) {
    if (!in_array((string)$i, $numericDirs, true)) {
        $errors[] = sprintf("Missing dir '%d'", $i);
        continue;
    }
}

$renamed = [];

foreach ($dirs as $dir) {
    $folders = glob($dir . '/*');
    if (count($folders) !== 1) {
        $errors[] = sprintf("Only a single file expected in every dir. Got %d files in %s", count($folders), $dir);
        continue;
    }
    $folder = reset($folders);
    if (!is_file($folder)) {
        $errors[] = sprintf("Only files expected in every dir. Got %s in %s", $folder, $dir);
        continue;
    }
    if (!preg_match('~[.](?<extension>[^.]+)$~', $folder, $matches)) {
        $errors[] = sprintf("Only files with an extension expected in every dir. Got %s in %s", $folder, $dir);
        continue;
    }
    $extension = $matches['extension'];
    $fileBaseNameWithoutExtension = basename($folder, '.' . $extension);
    $dirBaseName = basename($dir);
    if ($dirBaseName === $fileBaseNameWithoutExtension) {
        continue; // already done
    }
    $fileNewName = $dir . '/' . $dirBaseName . '.' . $extension;
    $result = exec(sprintf('mv %s %s 2>&1', $folder, $fileNewName), $output, $returnCode);
    if ($returnCode !== 0) {
        $errors[] = sprintf("Can not rename %s to %s (%s\n---\n%s)", $folder, $fileNewName, $result, implode("\n", $output));
        continue;
    }
    $renamed[] = sprintf("Renamed %s to %s", $folder, $fileNewName);
}

print_r($errors);
print_r($renamed);