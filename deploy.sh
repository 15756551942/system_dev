###
 # @Author: lance
 # @Date: 2021-01-25 15:27:03
 # @LastEditTime: 2021-01-25 15:32:49
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: /system_dev/deploy.sh
### 
#!/bin/bash
git pull 
npm run build
docker build -t razzil-front .
docker-compose up -d
