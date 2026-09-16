#!/bin/bash
set -e
if [ -f /etc/centos-release ] && grep -q " 7" /etc/centos-release; then
  sed -i 's/mirror.centos.org/vault.centos.org/g' /etc/yum.repos.d/CentOS-*.repo 2>/dev/null || true
  sed -i 's/^#.*baseurl=http/baseurl=http/g' /etc/yum.repos.d/CentOS-*.repo 2>/dev/null || true
  sed -i 's/^mirrorlist=http/#mirrorlist=http/g' /etc/yum.repos.d/CentOS-*.repo 2>/dev/null || true
fi
if command -v setenforce >/dev/null 2>&1; then
  setenforce 0 2>/dev/null || true
fi
if [ -f /etc/selinux/config ]; then
  sed -i 's/^SELINUX=enforcing/SELINUX=permissive/' /etc/selinux/config 2>/dev/null || true
fi
if ! grep -q "8.8.8.8" /etc/resolv.conf 2>/dev/null; then
  echo "nameserver 8.8.8.8" >> /etc/resolv.conf 2>/dev/null || true
fi
SWAP_EXISTS=$(swapon --show 2>/dev/null | wc -l)
if [ "$SWAP_EXISTS" -le 1 ]; then
  if command -v fallocate >/dev/null 2>&1; then
    fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  else
    dd if=/dev/zero of=/swapfile bs=1M count=2048
  fi
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  if ! grep -q '/swapfile' /etc/fstab; then
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
  fi
fi
if command -v sysctl >/dev/null 2>&1; then
  sysctl -w vm.overcommit_memory=1 >/dev/null 2>&1 || true
  sysctl -w vm.swappiness=10 >/dev/null 2>&1 || true
fi
if command -v firewall-cmd >/dev/null 2>&1; then
  firewall-cmd --permanent --zone=public --add-service=http >/dev/null 2>&1 || true
  firewall-cmd --permanent --zone=public --add-service=https >/dev/null 2>&1 || true
  firewall-cmd --permanent --zone=public --add-port=9000/tcp >/dev/null 2>&1 || true
  firewall-cmd --reload >/dev/null 2>&1 || true
elif command -v ufw >/dev/null 2>&1; then
  ufw allow 80/tcp >/dev/null 2>&1 || true
  ufw allow 443/tcp >/dev/null 2>&1 || true
  ufw allow 9000/tcp >/dev/null 2>&1 || true
fi
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com/ | sh
  systemctl enable --now docker
fi
if ! docker compose version >/dev/null 2>&1; then
  if command -v yum >/dev/null 2>&1; then
    yum install -y docker-compose-plugin 2>/dev/null || true
  elif command -v apt-get >/dev/null 2>&1; then
    apt-get update && apt-get install -y docker-compose-plugin 2>/dev/null || true
  fi
fi
docker compose build --parallel=false
docker compose up -d
docker compose ps