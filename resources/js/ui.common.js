 var newWeather = (function() {
         var callLayer = function() {
             var btnLayer = document.querySelectorAll('[data-layer]');
             for (var i = 0; i < btnLayer.length; i++) {
                 btnLayer[i].addEventListener('click', function(e) {
                     var targetId = this.dataset.layer;
                     var targetLayer = document.querySelector('#' + targetId);
                     targetLayer.classList.add('showing');
                     console.log($(targetLayer));
                     if ($(targetLayer).is('.layer-area')) {
                         $('html, body').addClass('scroll-off');
                     }
                 });
             }
             var btnLayerClose = document.querySelectorAll('.layer_section .btn_layer-close');
             for (var i = 0; i < btnLayerClose.length; i++) {
                 btnLayerClose[i].addEventListener('click', function(e) {
                     var targetElem = e.target;
                     while (!targetElem.classList.contains('layer_section')) {
                         targetElem = targetElem.parentNode;
                         if (targetElem.nodeName == 'BODY') {
                             targetElem = null;
                             return;
                         }
                     }
                     targetElem.classList.remove('showing');
                 })
             }
         };
         return {
             callLayer: callLayer,
         }
     }
 )();
 document.addEventListener('DOMContentLoaded', function () {
     //layerpopup
     newWeather.callLayer();
 }, false);
