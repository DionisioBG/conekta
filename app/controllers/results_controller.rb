class ResultsController < ApplicationController

before_action :authenticate_user!

def index
@results = current_user.results.all
end

def show
@result = current_user.results.find(params[:id])
end

def new
@result = Result.new
end

def create
@result = current_user.results.new(results_params)
		if	@result.save
		redirect_to @result

	else render :new
	end
end

def destroy
@result = current_user.results.find(params[:id])
@result.destroy
redirect_to results_path
end

def nil.+ other; other end

def edit
end

def update
@result = Result.find(params[:id])	
	if @result.update(res_params)
		redirect_to @result
	else 
		render :edit
end
end

private

def results_params
params.require(:result).permit(
:sexo,
:meses,
:objetivo,
:grasa,
:nivel,
:ritmo,
:meta,
:menu,
:kilos,
:egrasa,
:edad,
:fmin,
:cestado,
:cnivel,
)
end

def res_params
params.require(:result).permit(	
:c1e, :c1a, :c1g,
:c2e, :c2a, :c2g,
:c3e, :c3a, :c3g,
:c4e, :c4a, :c4g,
:c5e, :c5a, :c5g,
:c6e, :c6a, :c6g,
:c7e, :c7a, :c7g,
:c8e, :c8a, :c8g,
:c9e, :c9a, :c9g,
:c10e, :c10a, :c10g,
:c11e, :c11a, :c11g,
:c12e, :c12a, :c12g,
:c13e, :c13a, :c13g,
:c14e, :c14a, :c14g,
:c15e, :c15a, :c15g,
:c16e, :c16a, :c16g,
:c17e, :c17a, :c17g,
:c18e, :c18a, :c18g,
:c19e, :c19a, :c19g,
:c20e, :c20a, :c20g,
:c21e, :c21a, :c21g,
:c22e, :c22a, :c22g,
:c23e, :c23a, :c23g,
:c24e, :c24a, :c24g,
:c25e, :c25a, :c25g,
:c26e, :c26a, :c26g,
:c27e, :c27a, :c27g,
:c28e, :c28a, :c28g,
:c29e, :c29a, :c29g,
:c30e, :c30a, :c30g,
)
end

end