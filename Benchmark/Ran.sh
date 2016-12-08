#!/bin/sh
NOW_TIME=`date "+%M%S"`
gcc main.c -lMT -lm -fopenmp -O3 -o $NOW_TIME.out
time ./$NOW_TIME.out
rm $NOW_TIME.out
gnuplot <<EOF
    load "Hist.plot"
EOF
