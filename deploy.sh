###
 # @Author: lance
 # @Date: 2021-01-25 15:27:03
 # @LastEditTime: 2021-01-25 15:44:21
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: /system_dev/deploy.sh
### 
#!/bin/bash
git pull 
npm run build
echo 'build finish'
docker rmi system_dev
docker build -t system_dev .
echo 'build images finish'
docker-compose up -d
echo 'all finished'
