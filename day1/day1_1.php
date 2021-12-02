<?php
// TODO: read in day1Input.csv
// TODO: loop through and add to counter if curr > prev

$file1 = "./day1Input.csv";
$lines = file($file1);
$totalInc = 0;

for ($x = 1; $x <= count($lines); $x++) {
    if ($lines[x] > $lines[x-1]) {
        $totalInc++;
    }
}

echo $totalInc;

?>