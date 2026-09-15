class UserPolicy
  def initialize(actor)
    @actor = actor
  end

  def administer?
    actor&.admin?
  end

  def update_profile?(user)
    actor == user
  end

  def destroy_profile?(user)
    update_profile?(user)
  end

  private

  attr_reader :actor
end
