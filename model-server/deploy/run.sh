#!/bin/bash

echo "flask starting..."

gunicorn -w 8 -b 127.0.0.1:5001 main:app >run.log&   # 启动flask服务器