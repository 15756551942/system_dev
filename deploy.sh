###
 # @Author: lance
 # @Date: 2021-01-25 15:27:03
 # @LastEditTime: 2021-01-25 15:37:47
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: /system_dev/deploy.sh
### 
#!/bin/bash
git pull 
npm run build
echo 'build finish'
docker build -t razzil-front .
echo 'build images finish'
docker-compose up -d
echo 'all finished'
