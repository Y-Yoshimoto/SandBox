# KVM

## virshコマンド

仮想マシンの一覧表示
```bash
virsh list --all
```
仮想マシンの起動
```bash
virsh start CentOS7
virsh start CentOS7　--console #同時にコンソール接続
```
仮想マシンの停止
```bash
virsh shutdown CentOS7
virsh destroy CentOS7 #強制終了
```

仮想マシンの自動起動
```bash
virsh autostart CentOS7
virsh autostart --disable CentOS7 #解除
```

仮想マシンへの接続
```bash
virsh console CentOS7
```
