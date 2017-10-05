exports.handler = (event, context, callback) => {
    
        // VIEW DOCS HERE:  https://github.com/MotionAI/nodejs-samples
    
        /* "event" object contains payload from Motion AI
            {
                "from":"string", // the end-user's identifier (may be FB ID, email address, Slack username etc, depends on bot type)
                "session":"string", // a unique session identifier
                "botId":"string", // the Motion AI ID of the bot
                "botType":"string", // the type of bot this is (FB, Slack etc)
                "customPayload":"string", // a developer-defined payload for carrying information
                "moduleId":"string", // the current Motion AI Module ID
                "moduleNickname":"string", // the current Motion AI Module's nickname
                "inResponseTo":"string", // the Motion AI module that directed the conversation flow to this module
                "reply":"string", // the end-user's reply that led to this module
                "result":"string" // any extracted data from the prior module, if applicable,
                "replyHistory":"object" // an object containing the current session's conversation messages
                "nlpData":"object" // stringified NLP data object parsed from a user's message to your bot if NLP engine is enabled
                "customVars":"string" // stringified object containing any existing customVars for current session
                "fbUserData":"string" // for Messenger bots only - stringified object containing user's meta data - first name, last name, and id
                "attachedMedia":"string" // for Messenger bots only - stringified object containing attachment data from the user
            }
        */
    var h = event.replyHistory;
    var j = JSON.parse(h);
    
    var template = '595c810e579624129f65b7a3' //default vars;
    var temptype = 'Publisher';
    var org = 'Organization Here';
    var send = 'Logged In User';
    var email = 'bryan@bryanwills.com';
    var name = 'Default Name';
    
    for (item in j) {
        console.log("j[item]: " + j[item]['extractedData']);
        //if its a publisher ---
        if (j[item]['id'] == 1040019) {
            template = '595c810e579624129f65b7a3';
            temptype = 'Publisher';
            email = j[item]['extractedData'];
            console.log("Pub email ---> " + j[item]['extractedData']);
        }
        if (j[item]['id'] == 1040030) {
            name = j[item]['extractedData'];
            console.log("Pub name ---> " + j[item]['extractedData']);
        }
        //if its an advertiser ---
        if (j[item]['id'] == 1040016) {
            var template = '5991ecfe627a82211ce26b64';
            temptype = 'Advertiser';
            email = j[item]['extractedData'];
            console.log("Advertiser email ---> " + j[item]['extractedData']);
        }
        if (j[item]['id'] == 1040018) {
            name = j[item]['extractedData'];
            console.log("Advertiser name ---> " + j[item]['extractedData']);
        }
        //if its a designer ---
        if (j[item]['id'] == 1040020) {
            var template = '5991ed67627a82211ce26b6a';
            temptype = 'Designer';
            email = j[item]['extractedData'];
            console.log("Designer email ---> " + j[item]['extractedData']);
        }
        if (j[item]['id'] == 1040028) {
            name = j[item]['extractedData'];
            console.log("Designer name ---> " + j[item]['extractedData']);
        }
    }
    
    var token = template;
    var params = {
        toEmail: email,
        dynamicFields: {
               sender: send,
               organization_name: org,
               name: name
        }
    };
      
    // POST TO AMPL API (This should be to Octorev that manages the invitation/account updates) ----    
    var request = require('request');
    request.post('http://beta.ampl.info/api/message/send-email/' + token, {form:params});
        
        // this is the object we will return to Motion AI in the callback
        var responseJSON = {
            "response": '<div style="margin:-10px 100px 10px 0;">[img]https://www.assetdock.com/amp-app/media-lib/2iddm87ygy.png[/img]</div><b>TYPE: </b>' + temptype + '<br/><b>TO: </b>' + name + '<br/><b>EMAIL: </b><a href="mailto:' + email + '">' + email + '</a>', // what the bot will respond with
           // "response": '<span style="color:#57c7d4; font-size:13px; display:block; margin-right:70px; margin-bottom:-10px; text-transform:uppercase; font-weight:bold;">' + temptype + ' Invite Sent</span><br/><b>TO: </b>' + name + '<br/><b>EMAIL: </b>' + email, // what the bot will respond with
            "continue": true, // "true" will result in Motion AI continuing the flow based on connections, whie "false" will make Motion AI hit this module again when the user replies
            "customPayload": "", // OPTIONAL: working data to examine in future calls to this function to keep track of state
            "quickReplies": null, // OPTIONAL: a JSON string array containing suggested/quick replies to display to the user .. i.e., ["Hello","World"]
           // "cards": [
        // Card 1
     //   {
     //     cardTitle: null, // Card Title
     //     cardSubtitle: null, // Card Subtitle
     //     cardImage: 'https://www.assetdock.com/amp-app/media-lib/e7p3i1n0at.png', // Source URL for image
     //     cardLink: null // Click through URL
          //buttons: [{
          //  buttonText: 'LAUNCH OCTOREV', // Button Call to Action
          //  buttonType: 'url', // either 'url' or 'module'
         //   target:  'http://dev.octorev.net/'// Text to send to bot, or URL
         // }]
     //   }
    //],
    // OPTIONAL: a cards JSON object to display a carousel to the user (see docs)
            "customVars": null, // OPTIONAL: an object or stringified object with key-value pairs to set custom variables eg: {"key":"value"} or '{"key":"value"}'
            "nextModule": null // OPTIONAL: the ID of a module to follow this Node JS module
        }
        // callback to return data to Motion AI (must exist, or bot will not work)
        callback(null, responseJSON);
    };