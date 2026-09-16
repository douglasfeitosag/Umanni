class InitialImportedPassword
  Result = Data.define(:success?, :error)

  def self.call(user:, password:, password_confirmation:)
    new(user:, password:, password_confirmation:).call
  end

  def initialize(user:, password:, password_confirmation:)
    @user = user
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    User.transaction do
      @user.reload(lock: true)
      return Result.new(success?: false, error: "credencial já configurada") if @user.password_digest.present?

      @user.password_required = true
      @user.assign_attributes(password: @password, password_confirmation: @password_confirmation)
      return Result.new(success?: false, error: @user.errors.full_messages.to_sentence) unless @user.save

      Result.new(success?: true, error: nil)
    end
  end
end
