// 轮播图功能
var currentSlide = 0;
var slides = document.querySelectorAll('.slide');
var indicators = document.querySelectorAll('.indicator');
var slideInterval;

// 初始化轮播图
function initSlides() {
    // 设置初始位置
    for (var i = 0; i < slides.length; i++) {
        if (i === currentSlide) {
            addClass(slides[i], 'active');
        } else if (i === currentSlide - 1 || (currentSlide === 0 && i === slides.length - 1)) {
            addClass(slides[i], 'prev');
        } else {
            removeClass(slides[i], 'active');
            removeClass(slides[i], 'prev');
        }
    }
    
    // 启动自动轮播
    startSlideInterval();
}

// 显示指定轮播图
function showSlide(n) {
    // 移除所有轮播图的状态类
    for (var i = 0; i < slides.length; i++) {
        removeClass(slides[i], 'active');
        removeClass(slides[i], 'prev');
    }
    
    // 计算下一个和前一个轮播图的索引
    var nextSlide = (n + 1) % slides.length;
    var prevSlide = (n - 1 + slides.length) % slides.length;
    
    // 添加状态类
    addClass(slides[n], 'active');
    addClass(slides[prevSlide], 'prev');
    
    // 更新指示器
    for (var i = 0; i < indicators.length; i++) {
        if (i === n) {
            addClass(indicators[i], 'active');
        } else {
            removeClass(indicators[i], 'active');
        }
    }
    
    currentSlide = n;
}

// 下一张轮播图
function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
}

// 上一张轮播图
function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
}

// 开始自动轮播
function startSlideInterval() {
    // 清除现有计时器
    if (slideInterval) clearInterval(slideInterval);
    
    // 设置新的计时器（3秒间隔）
    slideInterval = setInterval(nextSlide, 3000);
}

// 鼠标悬停暂停轮播
var banner = document.querySelector('.banner');
if (banner.addEventListener) {
    banner.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    banner.addEventListener('mouseleave', function() {
        startSlideInterval();
    });
} else {
    // 兼容IE8及以下
    banner.attachEvent('onmouseenter', function() {
        clearInterval(slideInterval);
    });
    
    banner.attachEvent('onmouseleave', function() {
        startSlideInterval();
    });
}

// 指示器点击事件
for (var i = 0; i < indicators.length; i++) {
    (function(index) {
        if (indicators[i].addEventListener) {
            indicators[i].addEventListener('click', function() {
                showSlide(index);
                startSlideInterval(); // 点击后重启自动轮播
            });
        } else {
            // 兼容IE8及以下
            indicators[i].attachEvent('onclick', function() {
                showSlide(index);
                startSlideInterval();
            });
        }
    })(i);
}

// 左右按钮点击事件
var leftBtn = document.querySelector('.slide-btn-left');
var rightBtn = document.querySelector('.slide-btn-right');

if (leftBtn.addEventListener) {
    leftBtn.addEventListener('click', function() {
        prevSlide();
        startSlideInterval();
    });
} else {
    // 兼容IE8及以下
    leftBtn.attachEvent('onclick', function() {
        prevSlide();
        startSlideInterval();
    });
}

if (rightBtn.addEventListener) {
    rightBtn.addEventListener('click', function() {
        nextSlide();
        startSlideInterval();
    });
} else {
    // 兼容IE8及以下
    rightBtn.attachEvent('onclick', function() {
        nextSlide();
        startSlideInterval();
    });
}

// 辅助函数：添加类
function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    } else {
        // 兼容IE9及以下
        element.className += ' ' + className;
    }
}

// 辅助函数：移除类
function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    } else {
        // 兼容IE9及以下
        element.className = element.className.replace(
            new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '
        );
    }
}

// 初始化轮播图
initSlides();

// 师资切换
var tabs = document.querySelectorAll('.tab');
var teacherCards = document.querySelectorAll('.teacher-card');

for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', (function(index) {
        return function() {
            // 移除所有标签和卡片的active类
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove('active');
            }
            
            for (var j = 0; j < teacherCards.length; j++) {
                teacherCards[j].classList.remove('active');
            }
            
            // 添加当前标签和卡片的active类
            tabs[index].classList.add('active');
            teacherCards[index].classList.add('active');
        }
    })(i));
}

// 视频点击
var videoItems = document.querySelectorAll('.video-item');
for (var i = 0; i < videoItems.length; i++) {
    videoItems[i].addEventListener('click', function() {
        alert('视频全屏播放功能');
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
