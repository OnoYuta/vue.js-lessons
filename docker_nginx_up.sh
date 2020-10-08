#!/bin/bash

# 環境変数を外部ファイルから読み込む
. .env

# Ajax動作確認用nginxサーバを起動する
docker run --name ajax-tester -p 80:80 -v $PWD/$WORK_DIR:/usr/share/nginx/html -d nginx