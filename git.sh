#! /bin/sh

# 确保脚本抛出遇到的错误
set -e

{
    git pull
} || {
    git add -A
    git commit -m 'regular update'
    # 这里后面不要跟语句，否者这个模块的返回就是 true 就不会进入下面的模块执行
    git pull
}

git add -A
git commit -m 'regular update'
git push

exit 0