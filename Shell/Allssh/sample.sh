#!/bin/sh
ssh_vmastat()
{
CPU=`/bin/ssh -n $line vmstat 1 3| tail -n 1 | awk '{print $13}'`
T=`/bin/ssh -n $line sensors | grep -e Physical | awk '{print $4}' `
#CPU=-1
#Use=`/bin/ssh -n $line vmstat 1 3| tail -n 1 | awk '{print $13}'` && CPU=$Use
/bin/echo $line $CPU $T
}

while read line
do
#sleep 5
ssh_vmastat ${line} ${i} &
sleep 4
done <HOST.dat