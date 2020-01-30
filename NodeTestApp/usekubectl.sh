#!/bin/bash
docker build -t hello-node:v1 .
kubectl run hello-node --image=hello-node:v1 --replicas=3 --port=8080 --image-pull-policy=Never
kubectl get deployments
kubectl expose deployment hello-node --type=LoadBalancer
kubectl get services