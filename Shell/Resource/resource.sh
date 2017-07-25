#!/bin/bash
# 17/05/19 00:34:36,r,b,swpd,free,buff,cache,si,so,bi,bo,in,cs,us,sy,id,wa,st
vmstat -n 1 | awk '{print strftime("%y/%m/%d %H:%M:%S") "," $1 "," $2 "," $3 "," $4 "," $5 "," $6 "," $7 "," $8 "," $9 "," $10 "," $11 "," $12 "," $13 "," $14 "," $15 "," $16 "," $17}'