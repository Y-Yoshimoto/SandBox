#!/bin/sh
#qemu-img create -f qcow2 WebAP1.qcow2 5G
virt-install \
--name WebAP1 \
--ram=640 \
--disk path='/media/y-yoshimoto/KVM128G/webap1.qcow2',size=10,format=qcow2 \
--vcpus 1 \
--os-type linux \
--os-variant rhel7 \
--network network=default \
--graphics none \
--console pty,target_type=serial \
--location '/home/y-yoshimoto/Downloads/CentOS-7-x86_64-Minimal-1511.iso' \
--extra-args 'console=ttyS0,115200n8 serial'
