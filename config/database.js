"use strict";
exports.__esModule = true;
var supabase_js_1 = require("@supabase/supabase-js");
// Create a single supabase client for interacting with your database
var supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '', {
    realtime: {
        params: {
            eventsPerSecond: 10
        }
    }
});
// Channel name can be any string.
// Create channels with the same name for both the broadcasting and receiving clients.
var channel = supabase.channel('room1');
channel.subscribe(function (status) {
    if (status === 'SUBSCRIBED') {
        // now you can start broadcasting cursor positions
        setInterval(function () {
            channel.send({
                type: 'broadcast',
                event: 'cursor-pos',
                payload: { x: Math.random(), y: Math.random() }
            });
            console.log(status);
        }, 100);
    }
});
exports["default"] = {};
