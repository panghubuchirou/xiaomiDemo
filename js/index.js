window.onload = function () {

    //下面代码的功能是 在输入框获取焦点的时候 去给两个定位给的元素设置none隐藏 反之失去焦点的时候再显示
    (function () {

        let topSearch = document.querySelector('.top_nav .top_search input[type=search]');
        let divS = document.querySelectorAll('.top_nav .top_search div');

        topSearch.onfocus = function () {
            divS.forEach(function (element, index) {
                divS[index].classList.add('none');
            })
        }
        topSearch.onblur = function () {
            divS.forEach(function (element, index) {
                divS[index].classList.remove('none');
            })

        }
    })();


    //    下面代码用来实现 小米闪购倒计时  不推荐使用定时器 会有误差
    (function () {
        // 获取dom对象
        var emTimes = document.querySelectorAll('.shanGou .row .row_left em')
        // console.log(emTimes[0].innerText);
        // 生成定时器
        var timer = setInterval(function () {
            // 定时器大致逻辑为 每秒运行一次，使用第三位去判断后面每一次的值的变化 但是我的会有bug（关于字符串拼接和转换的问题）
            emTimes[2].innerText--;
            // 用三元来实现 01 02 效果
            emTimes[2].innerText = emTimes[2].innerText < 10 ? '0' + emTimes[2].innerText : emTimes[2].innerText;
            // console.log(emTimes[2].innerText);
            if (emTimes[2].innerText == '0-1') {
                emTimes[2].innerText = 59;
                emTimes[1].innerText--;
                // 用三元来实现 01 02 效果
                emTimes[1].innerText = emTimes[1].innerText < 10 ? '0' + emTimes[1].innerText : emTimes[1].innerText;
                if (emTimes[1].innerText == '0-1') {
                    emTimes[1].innerText = 59;
                    emTimes[0].innerText--;
                    // 用三元来实现 01 02 效果
                    emTimes[0].innerText = emTimes[0].innerText < 10 ? '0' + emTimes[0].innerText : emTimes[0].innerText;
                    // 判断所有时间的饿值都为我们最后结束的下一秒的数据 我们就清除定时器
                    if (emTimes[0].innerText == '0-1' && emTimes[1].innerText == '59' && emTimes[2].innerText == '59') {
                        console.log(emTimes);
                        // 清除定时器
                        clearInterval(timer);
                        // 因为我写的这个demo有严重的bug 所以最后清除定时器以后我们再需要把 所有的数据清零
                        for (var i = 0; i < emTimes.length; i++) {
                            emTimes[i].innerText = '00';
                        }
                    }
                }
            }
        }, 1000);

        // 根据当前时间改变闪购的时间
        let date = new Date();
        let changeTime = document.querySelector('.shanGou .row .row_left .change_time');
        console.log(changeTime);
        changeTime.innerHTML = date.getHours() + ':00&nbsp;场';
        console.log(date.getHours());

    })();


    // 实现回到顶部
    (function () {
        let a = document.querySelector('.toTop ul li:last-child>a');
        const a2 = document.querySelector('.small ul li:last-child>a');
        let li = document.querySelector('.toTop ul li:last-child');
        const li2 = document.querySelector('.small ul li:last-child')

        let myTimer = null;
        //页面监听scroll事件，当发生scroll事件时就进行判断，是否需要让a标签显示
        window.myScroll = function () {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            console.log(scrollTop);
            //如果大于500px，则让a标签显示
            if (scrollTop > 500) {
                li.classList.remove('none');
                li2.classList.remove('none');
            } else {
                li.classList.add('none');
                li2.classList.add('none');
            }
        }
        window.addEventListener("scroll", function () {
            //获取scroll的滚动值
            myScroll();
        });

        //a标签点击事件，回到页面顶部
        a.onclick = function () {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            let speed = 200; //定义一个速度，即每隔30毫秒走多少px
            myTimer = setInterval(function () {

                document.documentElement.scrollTop = document.documentElement.scrollTop - speed;
                //如果scroll的滚动值为0，也就是到达了页面顶部，需要停止定时器
                if (document.documentElement.scrollTop <= 0) {
                    clearInterval(myTimer)
                }
            }, 30)
        }
        a2.onclick = function () {
            a.onclick.call(a2);
        }
    })();


    // 实现功能 : 小米闪购 下面轮播图
    (function () {

        let ul = document.querySelector('.shanGou .row ul');
        let btns = document.querySelectorAll('.shanGou .top span');

        let timer = null;
        var flag = true;
        timerAuto();

        ul.onmouseover = function () {
            clearInterval(timer);
        }

        // 避免鼠标太快 多次启动定时器 每次都先清楚定时器
        ul.onmouseout = function () {
            clearInterval(timer);
            timerAuto();
        }
        btns.forEach(function (element, index) {
            element.onclick = function () {
                btnFun();
            }
        })

        //封装 按钮
        function btnFun() {
            if (flag) {
                ul.style.left = '-738px';
                flag = false;
            } else {
                ul.style.left = '248px';
                flag = true;
            }
        }

        // 封装定时器
        function timerAuto() {
            timer = setInterval(function () {
                if (flag) {
                    ul.style.left = '-738px';
                    flag = false;
                    // console.log(flag);
                } else {
                    ul.style.left = '248px';
                    flag = true;
                    // console.log(flag);
                }

            }, 3000);
        }



    })();


    // 功能为: 列表item放上 显示隐藏商品盒子
    // 不要问我为什么这样做 现在不想改了
    (function () {
        var list = document.querySelectorAll('.banner_list .list li');
        var target = document.querySelector('.banner_list #item');
        var txts = document.querySelectorAll('.banner_list #item ul li a ')
        let len = list.length;

        // 不放数组里了 费劲难修改
        let str1 = '<img src="./upload/item_active.webp" alt=""> Redmi K30 4G';
        let str2 = '<img src="./upload/dianshi.webp" alt=""> 小米大电视机';
        let str3 = '<img src="./upload/bijiben.png" alt=""> 小米笔记本 13.3';
        let str4 = '<img src="./upload/saodijiqiren.jpg" alt=""> 扫地机器人';
        let str5 = '<img src="./upload/shiyingbiao.webp" alt=""> 石英表';
        let str6 = '<img src="./upload/luyouqi.webp" alt=""> 小米路由器';
        let str7 = '<img src="./upload/yidongdianyuan.jpg" alt=""> 移动电源';
        let str8 = '<img src="./upload/ertongbaowenbei.jpg" alt=""> 儿童保温杯';
        let str9 = '<img src="./upload/lanyayinxiang.jpg" alt=""> 蓝牙音箱';
        let str10 = '<img src="./upload/xiaobeibao.webp" alt=""> 小背包';

        // 根据不同item 替换不同的数据
        function repTxt(val) {
            for (var i = 0; i < txts.length; i++) {
                txts[i].innerHTML = val;
            }
        }

        // 封装 显示隐藏方法
        function rem() {
            target.classList.toggle('none');
        }


        // 绑定事件
        for (var i = 0; i < len; i++) {
            // 他给标记上
            list[i].i = i + 1;
            // 绑定鼠标放上
            list[i].onmouseover = function () {

                switch (this.i) {
                    case 1:
                        rem();
                        repTxt(str1);
                        break;
                    case 2:
                        rem();
                        repTxt(str2);
                        break;
                    case 3:
                        rem();
                        repTxt(str3);
                        break;
                    case 4:
                        rem();
                        repTxt(str4);
                        break;
                    case 5:
                        rem();
                        repTxt(str5);
                        break;
                    case 6:
                        rem();
                        repTxt(str6);
                        break;
                    case 7:
                        rem();
                        repTxt(str7);
                        break;
                    case 8:
                        rem();
                        repTxt(str8);
                        break;
                    case 9:
                        rem();
                        repTxt(str9);
                        break;
                    case 10:
                        rem();
                        repTxt(str10);
                        break;
                }
            }

            list[i].onmouseout = function () {

                switch (this.i) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        rem();
                        break;
                }
            }
        }

    })();



    // 功能: 小米手机 下拉框
    (function () {
        const navList = document.querySelectorAll('.top_nav .nav ul>li');
        const navMenu = document.getElementById('nav_menu');
        // console.log(navMenu);
        let len = navList.length - 2;
        for (let j = 0; j < len; j++) {
            navList[j].onmouseover = function () {
                navMenu.style.height = '230px';
            }

            navList[j].onmouseout = function () {
                navMenu.style.height = '0px';
            }
        }
        //做动画的 手机盒子
        navMenu.onmouseover = function () {
            navMenu.style.height = '230px';
        }
        navMenu.onmouseout = function () {
            navMenu.style.height = '0px';
        }
    })();


    //功能 下载app 下拉显示 设置类名 通过js控制 
    //  和 右侧 固定定位的 二维码APP
    (function () {
        let i = document.querySelector('header .left .download i');
        let li = document.querySelector('header .left .download');
        let em = document.querySelector('.toTop li.APP i>em');
        let App = document.querySelector('.toTop li.APP');

        li.onmouseover = function () {
            i.classList.add('down_active');
        }
        li.onmouseout = function () {
            i.classList.remove('down_active');
        }

        App.onmouseover = function () {
            em.classList.add('down_active');
            em.parentNode.classList.remove('none');
        }
        App.onmouseout = function () {
            em.classList.remove('down_active');
            em.parentNode.classList.add('none');
        }
    }());

    //下面 内容位监听窗口变化
    (function () {
        // 获取回到顶部固定盒子
        const fixedBox = document.querySelector('.toTop');
        const smallBox = document.querySelector('.small');
        // 窗口监听
        window.onresize = function () {
            //浏览器窗口变化后需要做的事情
            // 获取窗口宽度
            let width = document.documentElement.offsetWidth;
            console.log(width);
            if (width <= 1230) {
                fixedBox.classList.add('none');
                smallBox.classList.remove('none');
                myScroll();
            } else {
                fixedBox.classList.remove('none');
                smallBox.classList.add('none');
                myScroll();
            }

        }
    }());

}








// 顶部购物车 鼠标放上 弹框 + 按照购物车数据 显示商品或 为空
// 在这里使用 js而不使用 a 标签的原因是: 商品数据需要判断
// (function () {
//     var shopCar = document.querySelector('header .right li.last em');
//     var a = document.querySelector('header .right li.last a');
//     var inputs = document.querySelectorAll('.top_nav .top_search input');
//     let timer = null;
//     // console.log(shopCar);
//     shopCar.style.height = '0';
//     a.onmouseover = function () {
//         shopCar.style.height = '90px';
//         // 我在这里控制了里面数据出现的时间,让它显得更加合理
//         timer = setTimeout(function () {
//             // 这里还可以判断数据 去选择显示为空还是显示商品
//             shopCar.innerText = '购物车中还没有商品，赶紧选购吧！'
//         }, 200)
//     }
//     a.onmouseout = function () {
//         shopCar.style.height = '0';
//         // 也为了在瞬间放上以后,定时器还未执行的时候 所以在离开的瞬间就清楚定时器,避免出现字体留在盒子中的bug
//         clearTimeout(timer);
//         shopCar.innerText = '';
//     }
// })();