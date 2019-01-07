$(function(){

  function buildHTML(data){

    var imageA = ""
    if(data.image === undefined){
      imageA = `<img class="lower-message__image" src="${ data.image }">`
    }


    var html =   `<div class="main__body--messages-list">
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
                          ${ imageA }
                      </div>
                    </div>
                  </div>`


    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.main__footer-body-message').val('')
      $('.main__footer-body-submit').prop('disabled', false);
      $('.main__body').animate({scrollTop:$('.main__body')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  })
})
