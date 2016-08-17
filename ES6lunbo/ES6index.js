window.addEventListener('load', function() {
    let box = document.querySelectorAll('.box')[0],
        item = document.querySelectorAll('.item'),
        liList = document.querySelectorAll('li'),
        leftButton = document.querySelectorAll('.left')[0],
        rightButton = document.querySelectorAll('.right')[0];
    let itemWidth = item[0].offsetWidth;
    box.style.width = itemWidth * item.length + 'px';
    let num = 1;
    //选择li并转化为数组
    let ArrayliList = Array.from(liList);
    /*下面的点变换样式*/
    function liActiveChange(obj) {
        for (let li of ArrayliList) {
            li.classList.remove('active');
        }
        obj.classList.add('active');
    }
    /*定义一个回调函数，当运动执行完成后执行回调*/
    function animate(obj, way, time, callback) {
        obj.style.transitionDuration = `${time/1000}s`;
        obj.style.transform = way;
        if (callback) {
            setTimeout(callback, time);
        }
    }
    /*定义运动以及点击右边按钮*/
    let flag = true;

    function translate() {
        if (flag) {
            flag = false;
            num++;
            if (num >= item.length - 1) {
                animate(box, `translate(-${itemWidth*num}px,0)`, 1000, function() {
                    box.style.transitionDuration = '';
                    box.style.transform = `translate(-800px,0)`;
                    flag = true;
                });
                num = 1;
            } else {
                animate(box, `translate(-${itemWidth*num}px,0)`, 1000, function() {
                    flag = true;
                });
            }
        }
        liActiveChange(liList[num - 1]);
    }

    /*定义左边的按钮运动*/
    function leftTranslate() {
        if (flag) {
            flag = false;
            num--;
            if (num <= 0) {
                animate(box, `translate(-${itemWidth*num}px,0)`, 1000, function() {
                    box.style.transitionDuration = '';
                    box.style.transform = `translate(-${itemWidth*(item.length-2)}px,0)`;
                    flag = true;
                });
                num = item.length - 2;
            } else {
                animate(box, `translate(-${itemWidth*num}px,0)`, 1000, function() {
                    flag = true;
                });
            }
        }
        liActiveChange(liList[num - 1]);
    }
    let move = setInterval(translate, 3000);
    /*鼠标事件*/
    for (let li of ArrayliList) {
        /*mouseenter*/
        li.addEventListener('mouseenter', function() {
            clearInterval(move);
            if (flag) {
                flag = false;
                liActiveChange(this);
                let thisIndex = ArrayliList.findIndex((n) => n == this);
                if (thisIndex >= item.length - 1) {
                    animate(box, `translate(-${itemWidth*(thisIndex+1)}px,0)`, 1000, function() {
                        box.style.transitionDuration = '';
                        box.style.transform = `translate(-800px,0)`;
                        flag = true;
                    });
                    num = 0;
                } else {
                    animate(box, `translate(-${itemWidth*(thisIndex+1)}px,0)`, 1000, function() {
                        flag = true;
                    });
                }
                num = thisIndex + 1;
            }
        }, false);
        /*mouseleave*/
        li.addEventListener('mouseleave', function() {
            clearInterval(move);
            move = setInterval(translate, 3000);
        }, false);
    }
    /*左右按钮click，mouse*/
    /*mouseenter/leave*/
    rightButton.addEventListener('mouseenter', function() {
        clearInterval(move);
    }, false);
    rightButton.addEventListener('mouseleave', function() {
        move = setInterval(translate, 3000);
    }, false);
    leftButton.addEventListener('mouseenter', function() {
        clearInterval(move);
    }, false);
    leftButton.addEventListener('mouseleave', function() {
        move = setInterval(translate, 3000);
    }, false);
    /*click*/
    rightButton.addEventListener('click', function(e) {
        e.stopPropagation();
        translate();
    }, false);
    leftButton.addEventListener('click', function(e) {
        e.stopPropagation();
        leftTranslate();
    }, false);
}, false);
