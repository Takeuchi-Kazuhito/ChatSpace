class ChangeContentOfMessages < ActiveRecord::Migration[5.0]
  def self.up
    change_column :messages, :content, :string, :default => ""
  end

  def self.down
    change_column :messages, :content, :string
  end
end
