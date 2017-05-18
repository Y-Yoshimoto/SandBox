#!/bin/bash
# making Dummy log
# 日付の形式は4,5,13行目を編集する
start=20160101
end=20160105
day=$start
mkdir LogFiles
until [ "$day" == "$end" ];do
    echo "$day"
    filename=secure-"$day"
    echo "This is Dummylog at $day" > "$filename"
    touch -d "$day" "$filename"
    day=`/bin/date -d "$day 1day" "+%Y%m%d"`
    # cp -p "$filename" ./makeLogFile/
    mv "$filename" ./makeLogFile/
done
