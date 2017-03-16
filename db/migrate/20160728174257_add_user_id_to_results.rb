class AddUserIdToResults < ActiveRecord::Migration
  def change
    add_reference :results, :user, index: true
    add_foreign_key :results, :users
  end
end
