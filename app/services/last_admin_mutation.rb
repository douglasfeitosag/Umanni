class LastAdminMutation
  Result = Data.define(:success?, :user, :error) do
    def failure?
      !success?
    end
  end

  class << self
    def destroy(user)
      mutate(user) { user.destroy! }
    end

    def update(user, attributes)
      mutate(user, demoting: user.admin? && attributes[:role].to_s == "regular") do
        user.update!(attributes)
      end
    end

    private

    def mutate(user, demoting: user.admin?)
      User.transaction do
        admins = User.admin.order(:id).lock.to_a
        if demoting && admins.one? && admins.first.id == user.id
          next Result.new(success?: false, user:, error: "Ao menos um administrador deve permanecer.")
        end

        yield
        Result.new(success?: true, user:, error: nil)
      end
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotDestroyed => error
      Result.new(success?: false, user:, error: error.record.errors.full_messages.to_sentence)
    end
  end
end
