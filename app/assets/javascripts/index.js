$(function() {
  function appendName(user) {
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                 </div>`
    $("#user-search-result").append(html);
  }

  function appendNoName(user) {
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                 </div>`
    $("#user-search-result").append(html);
  }


  function appendNameToMember(userId, name) {
    var html =  `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${userId}>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn remove' data-user-id=${userId} data-user-name=${name}>削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }

  function appendNameToList(userId, name) {
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add add" data-user-id=${userId} data-user-name=${name}>追加</a>
                 </div>`
    $("#user-search-result").append(html);
  }


  $("#user-search-field").on("keyup", function() {
    var name = $(this).val();
    var groupId = $('.chat__group_id').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: name, group_id: groupId },
      dataType: 'json'
    })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendName(user);
          })
        }
        else {
           appendNoName("一致するユーザーは存在しません");
        }


      })
      .fail(function() {
        alert('error');
      })
  });


  $(document).on("click", ".add", function () {
    $(this).parent().remove()
    var userId = $(this).attr("data-user-id");
    var name = $(this).prev().text();

    appendNameToMember(userId, name);
  });


  $(document).on("click", ".remove", function () {
    $(this).parent().remove()
    var userId = $(this).attr("data-user-id");
    var name = $(this).prev().text();

    appendNameToList(userId, name);
  });

});
