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
                const openLayer = document.querySelector('.layer_section.showing[data-switch="'+ targetSwitch +'"]');
                openLayer?.classList.remove('showing');
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
    

 }, false);
