# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160728174257) do

  create_table "results", force: :cascade do |t|
    t.string   "sexo"
    t.string   "meses"
    t.string   "objetivo"
    t.string   "grasa"
    t.string   "nivel"
    t.decimal  "ritmo"
    t.decimal  "meta"
    t.string   "menu"
    t.decimal  "kilos"
    t.decimal  "egrasa"
    t.integer  "edad"
    t.integer  "fmin"
    t.string   "cestado"
    t.string   "cnivel"
    t.integer  "c1e"
    t.integer  "c1a"
    t.integer  "c1g"
    t.integer  "c2e"
    t.integer  "c2a"
    t.integer  "c2g"
    t.integer  "c3e"
    t.integer  "c3a"
    t.integer  "c3g"
    t.integer  "c4e"
    t.integer  "c4a"
    t.integer  "c4g"
    t.integer  "c5e"
    t.integer  "c5a"
    t.integer  "c5g"
    t.integer  "c6e"
    t.integer  "c6a"
    t.integer  "c6g"
    t.integer  "c7e"
    t.integer  "c7a"
    t.integer  "c7g"
    t.integer  "c8e"
    t.integer  "c8a"
    t.integer  "c8g"
    t.integer  "c9e"
    t.integer  "c9a"
    t.integer  "c9g"
    t.integer  "c10e"
    t.integer  "c10a"
    t.integer  "c10g"
    t.integer  "c11e"
    t.integer  "c11a"
    t.integer  "c11g"
    t.integer  "c12e"
    t.integer  "c12a"
    t.integer  "c12g"
    t.integer  "c13e"
    t.integer  "c13a"
    t.integer  "c13g"
    t.integer  "c14e"
    t.integer  "c14a"
    t.integer  "c14g"
    t.integer  "c15e"
    t.integer  "c15a"
    t.integer  "c15g"
    t.integer  "c16e"
    t.integer  "c16a"
    t.integer  "c16g"
    t.integer  "c17e"
    t.integer  "c17a"
    t.integer  "c17g"
    t.integer  "c18e"
    t.integer  "c18a"
    t.integer  "c18g"
    t.integer  "c19e"
    t.integer  "c19a"
    t.integer  "c19g"
    t.integer  "c20e"
    t.integer  "c20a"
    t.integer  "c20g"
    t.integer  "c21e"
    t.integer  "c21a"
    t.integer  "c21g"
    t.integer  "c22e"
    t.integer  "c22a"
    t.integer  "c22g"
    t.integer  "c23e"
    t.integer  "c23a"
    t.integer  "c23g"
    t.integer  "c24e"
    t.integer  "c24a"
    t.integer  "c24g"
    t.integer  "c25e"
    t.integer  "c25a"
    t.integer  "c25g"
    t.integer  "c26e"
    t.integer  "c26a"
    t.integer  "c26g"
    t.integer  "c27e"
    t.integer  "c27a"
    t.integer  "c27g"
    t.integer  "c28e"
    t.integer  "c28a"
    t.integer  "c28g"
    t.integer  "c29e"
    t.integer  "c29a"
    t.integer  "c29g"
    t.integer  "c30e"
    t.integer  "c30a"
    t.integer  "c30g"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "results", ["user_id"], name: "index_results_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name"
    t.string   "permission_level"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
