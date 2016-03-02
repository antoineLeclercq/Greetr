;(function (global, $) {
    
    // `new` an object
    var Greetr = function (firstName, lastName, language) {
        // avoids the need to use new for the user
        return new Greetr.init(firstName, lastName, language);
    };
    
    // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es', 'fr'];
    
    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        fr: 'Bonjour'
    };
    
    // foral greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        fr: 'Salutation'
    };
    
    // logger messages
    var logMessages = {
        en: 'Logged In',
        es: 'Inicio session',
        fr: 'Connecté'
    };
    
    // protorype holds methods (to save memory space)
    Greetr.prototype = {
        
        // `this` refers to the calling object at execution time
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function () {
            // check language is valid by using the outer reference to `supportedLangs` (externally inaccessible cause IIFE) within the closure
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        
        // retrieve message from object by referring to properties using []
        greeting: function () {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function () {
            return formalGreetings[this.language] + ' ' + this.fullName();
        },
        
        // chainable methods returning their own object
        greet: function (formal) {
            var msg;
            
            // if undefined or null, coerced to false
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            if (console) {
                console.log(msg)
            }
            
            // this refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            // makes the method chainable
            return this;
        },
        
        setLang: function (lang) {
            // set to new language
            this.language = lang;
            
            // validate the new language
            this.validate();
            
            // makes the method chainable
            return this;
        },
        
        greetHtml: function (selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';
            }
            
            // store greeting in msg depending on formal
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            // inject message in the chosen place in DOM
            $(selector).html(msg);
            
            // makes the method chainable
            return this;
        }
    };

    //Function constructor automatically returning the object created by `new`
    Greetr.init = function (firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    };
    
    // sets Greetr.init's prototype to point to Greeter's prototype
    Greetr.init.prototype = Greetr.prototype;
    
    // attach Greetr to the global object and provide a shorthand `$G`
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));