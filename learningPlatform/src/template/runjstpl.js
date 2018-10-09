define(function(require,exports,module){
    var tpl = '<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
      '<meta http-equiv="content-type" content="text/html; charset=UTF-8">'+
      '<title></title>'+
    
      '{{if csslib}}'+
        '{{csslib}}'+
      '{{/if}}'+
      '{{if jslib}}'+
        '{{jslib}}'+
      '{{/if}}'+
      '{{if css}}'+
          '<style type="text/css">'+
            '{{css}}'+
          '</style>'+
      '{{/if}}'+
     
    '</head>'+
    '<body>'+
      '{{html}}'+
     '{{if js}}'+
      '<script type="text/javascript"> \n'+
          '{{js}} '+
      '</script> \n'+ 
       '{{/if}}'+  
    '</body>'+
    '</html>';
    module.id = "abcd";
    module.exports = tpl;
    });