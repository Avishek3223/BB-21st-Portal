class ApplicationController < ActionController::Base
	def encode_token(payload)
		JWT.encode(payload, 'quiz')
	end

	def decode_token(token)
		begin
			JWT.decode(token, 'quiz', true, algorithm: 'HS256')[0]["user_id"]
		rescue JWT::DecodeError
			nil
		end
	end

	def authorised_user(token)
		account_id = decode_token(token)
		if account_id != nil
			user = Account.find_by(id: account_id)
		else
			nil
		end
	end
end
