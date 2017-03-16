class Result < ActiveRecord::Base

belongs_to :user
validates :sexo, presence: true
validates :meses, presence: true
validates :objetivo, presence: true
validates :grasa, presence: true
validates :nivel, presence: true
validates :ritmo, presence: true
validates :meta, presence: true
validates :menu, presence: true
validates :kilos, presence: true
validates :egrasa, presence: true
validates :edad, presence: true
validates :fmin, presence: true
validates :cestado, presence: true
validates :cnivel, presence: true
	
end
