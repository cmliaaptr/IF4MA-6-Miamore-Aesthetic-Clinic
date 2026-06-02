<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Treatment;

$count = Treatment::count();
$first = Treatment::first();
echo "count={$count}\n";
if ($first) {
    echo json_encode($first->toArray(), JSON_PRETTY_PRINT) . "\n";
}
