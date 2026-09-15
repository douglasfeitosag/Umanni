class LastAdminMutation
  Result = Data.define(:success?, :user, :errors) do
    def failure?
      !success?
    end

    def error
      errors.values.first
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
        invariant_failure = last_admin_failure(user, demoting)
        next invariant_failure if invariant_failure

        yield
        Result.new(success?: true, user:, errors: {})
      end
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotDestroyed => e
      errors = e.record.errors.to_hash(true).transform_values(&:to_sentence)
      Result.new(success?: false, user:, errors: errors.presence || { base: "A alteração não pôde ser concluída." })
    end

    def last_admin_failure(user, demoting)
      admins = User.admin.order(:id).lock.to_a
      return unless demoting && admins.one? && admins.first.id == user.id

      Result.new(success?: false, user:, errors: { role: "Ao menos um administrador deve permanecer." })
    end
  end
end
