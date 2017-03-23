#!/bin/bash
while read line;do
    ipHost=($line)
    echo ${ipHost[1]}
    ssh -n root@${ipHost[0]} date
    date
done <HOST.dat
