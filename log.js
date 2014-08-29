// usage: console.log('inside coolFunc',this,arguments);
//
// for the log history, type the following on the console
//      console.log.history
// for the error history, type the following on the console
//      console.error.history
//
// code based on http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/ (license: public domain)
(function(){
    var isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
    var isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
    var std = {};
    std.begin = new Date(); //begin time measure with reference point (just the difference to when this script was loaded)
    std.log = (console && console.log);
    console.style={}; //this is just empty by default; undefined properties => no style application
    console.setStyle = function(funcname,style){ console.style[funcname]=style; };
    console.getAptTime=function(){
        var appTime = ((new Date())-std.begin);
        appTime = (new Date(Math.floor(appTime/1000)).toUTCString().split(" ")[4])+"."+Math.floor(appTime%1000);
    };
    console.log = function(){
        var stack = (new Error()).stack.split("\n").slice(2).join("\n"); //throw away reference to this function
        console.log.history.push({arguments:arguments,appTime:console.getAptTime(),time:new Date(),stack:stack});
        if (std.log){
            var append = "";
            if(isChrome || isFirefox){
                Array.prototype.push.call(arguments,"\n\t");
                Array.prototype.push.call(arguments,stack.split("\n")[0]);
            }
            std.log.apply(console, Array.prototype.slice.call(arguments));
        }
    };
    console.log.history = console.log.history || [];   // store logs to an array for reference

    console.logWithStyle = function(){
        var stack = (new Error()).stack.split("\n").slice(3).join("\n"); //throw away reference to this function
        console.log.history.push({arguments:arguments,appTime:console.getAptTime(),time:new Date(),stack:stack});
        if (std.log){
            var append = "";
            if(isChrome || isFirefox){
                std.log.apply(console, ["%c"+Array.prototype.slice.call(arguments).join("\t"),console.style.log,"\n\t",stack.split("\n")[0]]);
            }
            std.log.apply(console, Array.prototype.slice.call(arguments));
        }
    };



    std.error = (console && console.error);
    console.error = function(){
        var stack = (new Error()).stack.split("\n").slice(2).join("\n"); //throw away reference to this function
        console.error.history.push({arguments:arguments,appTime:(now-std.begin),time:now,stack:stack});
        if(std.error){
            std.error.call(console, Array.prototype.slice.call(arguments));
        }

        console.error.history = console.error.history || [];   // store error to an array for reference
        var stack = (new Error()).stack.split("\n").slice(2).join("\n"); //throw away reference to this function
        console.log.history.push({arguments:arguments,appTime:console.getAptTime(),time:new Date(),stack:stack});
        if (std.log){
            var append = "";
            if(isChrome || isFirefox){
                Array.prototype.push.call(arguments,"\n\t");
                Array.prototype.push.call(arguments,stack.split("\n")[0]);
            }
            std.log.apply(console, Array.prototype.slice.call(arguments));
        }
    };
    console.error.history = console.error.history || [];   // store errors to an array for reference
})();