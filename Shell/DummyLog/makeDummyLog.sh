#!/bin/bash
#making Dummy log
start=20160101
end=20160105
day=$start
until [ "$day" == "$end" ];do
    echo "$day"
    filename=secure-"$day"
    echo "This is Dummylog at $day" > "$filename"
    touch -d "$day" "$filename"
    day=`/bin/date -d "$day 1day" "+%Y%m%d"`
done
