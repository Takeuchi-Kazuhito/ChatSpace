json.array! @new_messages do |message|
  json.content  message.content
  json.image  message.image
  json.created_at  message.created_at.strftime( "%Y/%m/%d %H:%M" )
  json.name  message.user.name
  json.messageId  message.id
end
