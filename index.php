<?php
ob_start();
require __DIR__ . '/vendor/drdplus/rules-skeleton/index.php';
$output = ob_get_clean();
if ($output && strpos($output, '<div class="o-norikovi">') !== false) {
    header('Cache-Control: public');
    header('Cache-Control: max-age=600');
}
echo $output;