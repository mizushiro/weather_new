 const newWeather = (function() {
    const callLayer = function() {
        const btnLayer = document.querySelectorAll('[data-layer]');
        const closeLayer = (e) => {
            const targetElem = e.target;
            const targetLayer = targetElem.closest('.layer_section');
            targetLayer.classList.remove('showing');

            // while (!targetElem.classList.contains('layer_section')) {
            //     targetElem = targetElem.parentNode;
            //     if (targetElem.nodeName == 'BODY') {
            //         targetElem = null;
            //         return;
            //     }
            // }
            // targetElem.classList.remove('showing');
        }
        const openLayer = (e) => {
            const _this = e.currentTarget;
            const targetId = _this.dataset.layer;
            const targetSwitch = _this.dataset.switch;



            if (targetSwitch) {
                const switchBtns = document.querySelectorAll('button[data-switch="'+ targetSwitch +'"]');
                const openLayer = document.querySelector('.layer_section.showing[data-switch="'+ targetSwitch +'"]');
                openLayer?.classList.remove('showing');
                for (const item of switchBtns) {
                    item.classList.remove('active');
                }
                _this.classList.add('active');
            }

            const targetLayer = document.querySelector('#' + targetId);
            targetLayer.classList.add('showing');
                
            if ((targetLayer).classList.contains('.layer-area')) {
                document.querySelector('html, body').classList.add('scroll-off');
            }

            const btnLayerClose = targetLayer.querySelector('.btn_layer-close');
            btnLayerClose?.addEventListener('click', closeLayer)
        }

        for (let i = 0; i < btnLayer.length; i++) {
            btnLayer[i].addEventListener('click', openLayer);
        }
    };
    return {
        callLayer: callLayer,
    }
})();



document.addEventListener('DOMContentLoaded', function () {
     //layerpopup
     newWeather.callLayer();

    UI.exe.toggle = new ToggleUI({
        scope: document.querySelector('body')
    });
    
    //CALLBACK
    UI.callback.setting1 = (result) => {
        console.log('callback', result);
        
    }

    const headerAct = () => {
        const dep1s = document.querySelectorAll('.header-right-dep1-item');
        const wraps = document.querySelectorAll('.header-right-dep1');
        let timer = null;
        const actHide = (e) => {
            const _this = e.currentTarget;
            const _on = document.querySelector('.header-right-dep1[data-state="on"]');
            timer = setTimeout(() => {
                _on ? _on.dataset.state = 'off' : '';
            }, 100);
        }
        const actHover = (e) => {
            const _this = e.currentTarget;
            const _wrap = _this.closest('.header-right-dep1');
            const _dep2 = _wrap.querySelector('.header-right-dep2-wrap');
            const actLeaver = () => {
                _dep2.removeEventListener('mouseleave', actLeaver);
                _dep2.removeEventListener('mouseover', actHideCancel);
                _wrap.dataset.state = 'off';
            }

            const actHideCancel = () => {
                clearTimeout(timer);
            }
            _dep2.addEventListener('mouseover', actHideCancel);
            _dep2.addEventListener('mouseleave', actLeaver);
            _wrap.dataset.state = 'on';
        }
        for (const item of dep1s) {
            item.addEventListener('mouseover', actHover);
            item.addEventListener('mouseleave', actHide);
        }

        UI.exe.toggleHeader = new ToggleUI({
            scope: document.querySelector('header')
        });
    }
    
    //header 공통영역
    UI.parts.include({
        dataId: 'header',
        src: 'header.html',
        type: 'HTML',
        insert: false,
        callback: headerAct
    });
    //footer 공통영역
    UI.parts.include({
        dataId: 'footer',
        src: 'footer.html',
        type: 'HTML',
        insert: false,
        callback:(v) => {
            // 메인배너
            const mainBanner = () => {
                const main_swiper = document.querySelector('.footer-banner-swiper[data-id="main-banner"]');
                const main_swiper_items = main_swiper.querySelectorAll('.swiper-slide');
                const main_swiper_control = main_swiper.querySelector('.btn-swiper-control');
                main_swiper.setAttribute('aria-label', '배너 광고');
                main_swiper.setAttribute('tabindex', '0');
                UI.exe.swiperMainBanner = new Swiper('.footer-banner-swiper', {
                    slidesPerView: "auto",
                    spaceBetween: 28,
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    a11y: {
                        prevSlideMessage: '이전 배너',
                        nextSlideMessage: '다음 배너',
                        slideLabelMessage: '총 {{slidesLength}}장의 배너 중 {{index}}번 배너 입니다.',
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                });
                UI.exe.swiperMainBanner.switchPlayStop = (e) => {
                    const that = e.currentTarget;
                    const id = that.dataset.id;
                    const state = that.dataset.state;
                    console.log(that);
                    if (state === 'stop') {
                        UI.exe.swiperMainBanner.autoplay.stop();
                        that.dataset.state = 'play';
                        that.setAttribute('aria-label','배너 광고 재생');
                    } else if (state === 'play') {
                        UI.exe.swiperMainBanner.autoplay.start();
                        that.dataset.state = 'stop';
                        that.setAttribute('aria-label','배너 광고 멈춤');
                    }
                }
                main_swiper.addEventListener('focus', UI.exe.swiperMainBanner.autoplay.stop);
                main_swiper_control.addEventListener('click',  UI.exe.swiperMainBanner.switchPlayStop);
            }
            mainBanner();
        }
    });
    
    
 }, false);
