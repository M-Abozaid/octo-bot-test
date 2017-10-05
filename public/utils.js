function getImageSize(img, callback) {
    // Function used to get the size of the image before the image is actually fully loaded
    // so that we can correct the scroll even befor the image is actually fully loaded
    var $img = $(img);

    var wait = setInterval(function() {
        var w = $img[0].naturalWidth,
            h = $img[0].naturalHeight;
        if (w && h) {
            clearInterval(wait);
            callback.apply(this, [w, h]);
        }
    }, 30);
}

// Utility function for getting the parameters from the url
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

// Initialize click handlers for sidebar
function initializeClickHandlers(){
    $('.left .person').mousedown(function(){
        if ($(this).hasClass('.active')) {
            return false;
        } else {
            var findChat = $(this).attr('data-chat');
            var personName = $(this).find('.name').text();
            $('.right .top .name').html(personName);
            $('.chat').removeClass('active-chat');
            $('.left .person').removeClass('active');
            $(this).addClass('active');
            $('.chat[data-chat = '+findChat+']').addClass('active-chat');
            $($('.chats')[0]).scrollTop($('.chats')[0].scrollHeight)
        }
    });
}




// Select a chat from the left page without clicking
function selectChat(chat, name) {
    $('.chat[data-chat='+chat+']').addClass('active-chat');
    $('.person[data-chat='+chat+']').addClass('active');
    $('.right .name').text(name)
}

// Update time of the last chat as shown on the sidebar
function updateChatTime(time, bot_id) {
    elem = $($('.person[data-chat='+bot_id+']>.time')[0])
    hours = time.getHours()
    minutes = time.getMinutes()
    elem.text(hours + ':' + minutes)
}

// Update the preview mesage shown in the sidebar
function updatePreviewMessage(message, bot_id) {
    elem = $($('.person[data-chat='+bot_id+']>.preview')[0])
    elem.text(message)
}




// Display user message
function displayUserMessage(message, bot_id) {
    var elem = $($('.chat[data-chat='+bot_id+']')[0])
    html_str =
              '<div class="bubble me">'+
              message+
              '</div>'
    elem.append(html_str)
    $($('.chats')[0]).scrollTop($('.chats')[0].scrollHeight)
    updateChatTime(new Date(), bot_id)
    updatePreviewMessage(message, bot_id)
}

// Display bot message
function displayBotMessage(type, message, bot_id) {
    var elem = $($('.chat[data-chat='+bot_id+']')[0])
    if( type === 'text'){
        html_str =
            '<div class="bubble you">'+
                message+
            '</div>'
    }
    else if( type === 'image' ){
        html_str =
            '<div class="bubble you">'+
                '<img class="image-bubble" src="'+message+'" style="width:100%">'+
            '</div>'
    }
    elem.append(html_str)
    $($('.chats')[0]).scrollTop($('.chats')[0].scrollHeight)
    if(type === 'image'){
        // make sure scroll is fixed after the image has been loaded
        getImageSize($('.image-bubble').last(), function(width, height) {
            // $($(".chats")[0]).stop();
            $($('.chats')[0]).scrollTop($('.chats')[0].scrollHeight)
        });
    }
    updateChatTime(new Date(), bot_id)
    updatePreviewMessage(message, bot_id)
    $('#user-input').focus()
}

// disable hamburger button
function disableBotSwitcher(){
    // $($('.hamburger-button')[0]).css('display', 'none');
    $($('.hamburger-button')[0]).remove()  // Kill em
}

// Handle the open and close
function hanburgerOnclick(){
    $($('.hamburger-button')[0]).click(function(e){
        $('.left').css('display', 'block');
        return false;
    });
    $('body').click(function(){
        if($($('.hamburger-button')[0]).css('display') == 'inline-block'){
            $('.left').css('display', 'none');
        }
    });
}