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
        const actHover = (e) => {
            const _this = e.currentTarget;
            const _wrap = _this.closest('.header-right-dep1');
            const _dep2 = _wrap.querySelector('.header-right-dep2-wrap');
            const actLeaver = () => {
                _dep2.removeEventListener('mouseleave', actLeaver);
                _wrap.dataset.state = 'off';
            }

            for (const item of wraps) {
                item.dataset.state = 'off';
            }
            
            _dep2.addEventListener('mouseleave', actLeaver);
            _wrap.dataset.state = 'on';
        }
        for (const item of dep1s) {
            item.addEventListener('mouseover', actHover);
        }
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
    });
    
    
 }, false);
