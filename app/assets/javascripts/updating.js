$(function(){

  function buildHTML(message){

    var messageImage = ""
    if(message.image === undefined){
      messageImage = `<img class="lower-message__image" src="${ message.image }">`
    }

    var html =   `<div class="main__body--messages-list" data-message-id=${ message.messageId }>
                    <div class="main__body--message clearfix">
                      <div class="main__body--message-name">
                        ${ message.name }
                      </div>
                      <div class="main__body--message-time">
                        ${ message.created_at }
                      </div>
                      <div class="main__body--message-body">
                          <p class="lower-message__content">
                            ${ message.content }
                          </p>
                          ${ messageImage }
                      </div>
                    </div>
                  </div>`

    return html;
  }


  $(function(){
    setInterval(update, 5000);
  })


  function update(){
    var lastMessageId = $('.main__body--messages-list:last').attr('data-message-id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: lastMessageId },
      dataType: 'json'
    })
    .done(function(data){
      data.forEach(function(message){
        var html = buildHTML(message);
        $('.main__body').append(html);
        $('.main__body').animate({scrollTop:$('.main__body')[0].scrollHeight});
      });
    })
    .fail(function(data) {
      alert('error');
    });
  };
});
