var $iframe,$newiframe,disableKeyZoom,disableWheelZoom;function sendMsg(e){"use strict";chrome.runtime.sendMessage(e)}function injectFrame(e){"use strict";var o=e.base64PDF;delete e.base64PDF;var t="message="+encodeURIComponent(JSON.stringify(e));e.base64PDF=o,0===($iframe=$("#__acrobatDialog__")).length?($iframe=$("<iframe>").attr("id","__acrobatDialog__").css({border:"0px","z-index":2147483647,position:"fixed",top:"-5px",right:"80px",width:"265px",height:"450px",display:"block",margin:"auto"}).attr("src",chrome.extension.getURL("data/js/frame.html")+"?"+t).appendTo("html"),$(document).on("keydown",disableKeyZoom),$(document).on("mousewheel",disableWheelZoom)):e.trefoilClick&&($(document).off("keydown",disableKeyZoom),$(document).off("mousewheel",disableWheelZoom),delete e.trefoilClick,$iframe.remove())}function injectPersistFrame(e){var o=e.base64PDF;delete e.base64PDF;var t="message="+encodeURIComponent(JSON.stringify(e));e.base64PDF=o,0===($newiframe=$("#__acrobatNewDialog__")).length?($newiframe=$("<iframe>").attr("id","__acrobatNewDialog__").css({border:"0px",position:"fixed",top:"100px",right:"12px",width:"205px",height:"350px",display:"block",margin:"auto"}).attr("src",chrome.extension.getURL("data/js/frameUI.html")+"?"+t).appendTo("html"),$(document).on("keydown",disableKeyZoom),$(document).on("mousewheel",disableWheelZoom)):e.trefoilClick&&($(document).off("keydown",disableKeyZoom),$(document).off("mousewheel",disableWheelZoom),delete e.trefoilClick,$iframe.remove())}function handler(e){"use strict";if("dismiss"===e.content_op)if(delete e.content_op,1==e.trefoilUI||1==e.trefoilClick){if(delete e.trefoilUI,$iframe)return $(document).off("keydown",disableKeyZoom),$(document).off("mousewheel",disableWheelZoom),$iframe.remove(),void($iframe=null)}else if(1==e.newUI&&(delete e.newUI,$newiframe))return $(document).off("keydown",disableKeyZoom),$(document).off("mousewheel",disableWheelZoom),$newiframe.remove(),void($newiframe=null);return e.panel_op&&(1==e.trefoilClick||1==e.trefoilUI?(delete e.trefoilUI,delete e.newUI,injectFrame(e)):1==e.newUI||1==e.persist?(delete e.newUI,delete e.trefoilUI,injectPersistFrame(e)):injectFrame(e)),!1}disableKeyZoom=function(e){"use strict";e.ctrlKey&&-1!==[187,189,107,109].indexOf(e.keyCode)&&e.preventDefault()},disableWheelZoom=function(e){"use strict";e.ctrlKey&&e.preventDefault()},chrome.runtime.onMessage.addListener(handler),$(document).ready(function(e){"use strict";var o=$("embed");0<o.length&&"application/pdf"===o.attr("type")?sendMsg({main_op:"pdf-menu",is_pdf:!0,url:document.location.href,persist:!0}):sendMsg({main_op:"html-startup",url:document.location.href})});