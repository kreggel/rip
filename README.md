REST in peace (RIP)
=========

REST in peace (our basics for building our REST APIs) 

## Installation

  npm install kreggel-rip --save

## Usage

    var rip = require('rip');
    var authAPI = rip.api('auth', 1);
    authAPI.register ('/', require ('routes/welcome'));
    authAPI.register ('/status', require ('routes/status'));
    authAPI.startup({print: true});

    rip.defaultErrorHandler();    

