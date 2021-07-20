#! /bin/sh

# 确保脚本抛出遇到的错误
set -e

method=${1:-"pull"} # 设置默认参数 注意 $1 的写法，:- 表示为空或未定义  只有 - 没有 : 表示判断没有定义

{ 
    git add -A
    git commit -m 'regular update'
    # 这里后面不要跟语句，否者这个模块的返回就是 true 就不会进入下面的模块执行
} || {
    echo '更改已commit 开始push'
    git push
    echo 'push 完成'
    exit 0
}


echo "commit 完成"
if [ method = "push" ]; then
    echo "git push"
    git push
else
    echo "git pull"
    git pull
fi

echo $method "完成"

exit 0