#!/bin/bash

echo "flask starting..."

source ~/.bash_profile   # 导入PATH变量
gunicorn -w 4 -b 127.0.0.1:5001 main:app   # 启动flask服务器