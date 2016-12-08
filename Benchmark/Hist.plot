reset
#グラフの出力先を設定 "フォント,サイズ"　画像サイズ(pdfはcm,pngはpixel)で指定
#set term pdf enhanced font "Helvetica,11" size 16cm,9cm
#set term png enhanced font "Helvetica,50" size 7680,2880
set term png enhanced font "Helvetica,20" size 1920,1200
set output "HistBox.png" #出力ファイル名

#カラーパレット
unset colorbox
#エメラルド色から青へのグラデーション
set palette define (0 "#f0f9e8",25 "#bae4bc",50 "#7bccc4",75 "#43a2ca",100 "#0868ac");
#set palette define (0 "#f0f9e8",25 "#bae4bc",50 "#7bccc4",75 "#43a2ca",100 "#0868ac");
#set palette define (-0.001 "#FF0000",0 "#f0f9e8",25 "#bae4bc",50 "#7bccc4",75 "#43a2ca",100 "#0868ac");
#黄から赤へのグラデーション
#set palette define (0 "#ffffb2",25 "#fecc5c",50 "#fd8d3c",75 "#f03b20",100 "#bd0026");
#赤から青(黄中間色)へのグラデーション
#set palette define (0 "#d7191c",25 "#fdae61",50 "#ffffbf",75 "#abd9e9",100 "#2c7bb6");
#赤から青(白中間色)へのグラデーション
#set palette define (0 "#ca0020",25 "#f4a582",50 "#f7f7f7",75 "#92c5de",100 "#0571b0");
#set y2r [0.777549:0.793257]
set style fill solid
#プロット
plot "Hist.dat" using 1:2:2\
with boxes lw 2 linecolor palette notitle,\
"Result.bat" using 1:1:2 with xerrorbars axes x1y2 lw 6 ps 3 lc rgb "#D93448"
set output