require "rails_helper"
require "base64"

RSpec.describe "Avatar uploads", type: :request do
  around do |example|
    previous = ActionController::Base.allow_forgery_protection
    ActionController::Base.allow_forgery_protection = false
    example.run
  ensure
    ActionController::Base.allow_forgery_protection = previous
  end

  before do
    ActiveStorage::Attachment.delete_all
    ActiveStorage::Blob.delete_all
    Session.delete_all
    User.delete_all
  end

  it "US5.1 accepts detected JPEG, PNG and WebP files up to 5 MiB" do
    user = create_user
    sign_in(user)

    valid_images.each do |filename, content_type, bytes|
      profile = { full_name: user.full_name, email: user.email, avatar: upload(filename, content_type, bytes) }
      patch "/profile",
            params: { profile: }, headers: inertia_headers
      expect(response).to redirect_to("/profile")
      expect(user.reload.avatar).to be_attached
      expect(user.avatar.filename.to_s).to eq(filename)
    end
  end

  it "US5.2 rejects SVG, spoofed, malformed and oversized files while preserving the previous avatar" do
    user = create_user
    user.avatar.attach(upload("avatar.png", "image/png", valid_images.fetch(1).last))
    original_blob_id = user.avatar.blob.id
    sign_in(user)

    invalid_files = [
      upload("avatar.svg", "image/svg+xml", "<svg><script>alert(1)</script></svg>"),
      upload("avatar.png", "image/png", "not an image"),
      upload("avatar.jpg", "image/jpeg", "malformed"),
      upload("large.png", "image/png", "\x89PNG\r\n\x1A\n#{'a' * (5.megabytes + 1)}")
    ]

    invalid_files.each do |file|
      patch "/profile", params: { profile: { full_name: user.full_name, email: user.email, avatar: file } },
                        headers: inertia_headers
      expect(response).to have_http_status(:unprocessable_content)
      expect(user.reload.avatar.blob.id).to eq(original_blob_id)
    end
  end

  it "rejects ambiguous upload and removal while preserving the previous avatar" do
    user = create_user
    user.avatar.attach(upload("avatar.png", "image/png", valid_images.fetch(1).last))
    original_blob_id = user.avatar.blob.id
    sign_in(user)

    profile = { full_name: user.full_name, email: user.email,
                avatar: upload("new.png", "image/png", valid_images.fetch(1).last), remove_avatar: "1" }
    patch "/profile", params: { profile: }, headers: inertia_headers

    expect(response).to have_http_status(:unprocessable_content)
    expect(user.reload.avatar.blob.id).to eq(original_blob_id)
  end

  private

  def valid_images
    [
      ["avatar.jpg", "image/jpeg", "\xFF\xD8\xFF\xE0\x00\x10JFIF\x00\x01\xFF\xD9".b],
      ["avatar.png", "image/png",
       Base64.decode64("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nWQAAAAASUVORK5CYII=")],
      ["avatar.webp", "image/webp", "RIFF\x16\x00\x00\x00WEBPVP8 \x0A\x00\x00\x00\x2F\x00\x00\x00\x00\x00\x00\x00".b]
    ]
  end

  def upload(filename, content_type, bytes)
    Rack::Test::UploadedFile.new(StringIO.new(bytes), content_type, original_filename: filename)
  end

  def create_user
    User.create!(full_name: "Ana Silva", email: "ana@example.com", password: "uma frase segura")
  end

  def sign_in(user)
    post "/session", params: { session: { email: user.email, password: "uma frase segura" } }, headers: inertia_headers
  end

  def inertia_headers
    { "X-Inertia" => "true", "X-Inertia-Version" => ViteRuby.digest }
  end
end
