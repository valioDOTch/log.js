//simple override
// usage: console.log('inside coolFunc',this,arguments);
//
// for the log history, type the following on the console
//      console.log.history
// for the error history, type the following on the console
//      console.error.history
//
// code based on http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/ (license: public domain)
(function(){
    var stdLog = (this.console && console.log);
    console.log = function(){
        console.log.history = console.log.history || [];   // store logs to an array for reference
        console.log.history.push(arguments);
        if(stdLog){
            stdLog( Array.prototype.slice.call(arguments) );
        }
    };

    //similar overriding as above
    var stdError = (this.console && console.error);
    console.log = function(){
        console.log.history = console.log.history || [];   // store logs to an array for reference
        console.log.history.push(arguments);
        if(stdLog){
            stdLog( Array.prototype.slice.call(arguments) );
        }
    };

})();