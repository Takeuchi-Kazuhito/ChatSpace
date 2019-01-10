$(function(){

  function buildHTML(data){

    var messageImage = ""
    if(data.image === undefined){
      messageImage = `<img class="lower-message__image" src="${ data.image }">`
    }


    var html =   `<div class="main__body--messages-list" data-message-id=${ data.messageId }>
                    <div class="main__body--message clearfix">
                      <div class="main__body--message-name">
                        ${ data.name }
                      </div>
                      <div class="main__body--message-time">
                        ${ data.created_at }
                      </div>
                      <div class="main__body--message-body">
                          <p class="lower-message__content">
                            ${ data.content }
                          </p>
                          ${ messageImage }
                      </div>
                    </div>
                  </div>`


    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__body').append(html)
      var element = document.getElementById('new_message');
      element.reset();
      $('.main__footer-body-submit').prop('disabled', false);
      $('.main__body').animate({scrollTop:$('.main__body')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  })
})
