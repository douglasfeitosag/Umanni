# syntax=docker/dockerfile:1@sha256:ecfaec9ed6d810b56388c508f4121597bfbba70d41a6dfeee4d8cad5f295fc32
FROM node:24.21.0-bookworm-slim@sha256:2fe369e969550cde8e867afc3fe370b260140cab4a23d467074295b42163d553 AS node
FROM ruby:4.0.6-slim-bookworm@sha256:749a0f614abbe145f6f29c7d099ddcc010fcf92a531a3500b40a78ea85af75ce AS base
WORKDIR /rails
RUN apt-get update && apt-get install -y --no-install-recommends libpq5 libyaml-0-2 && rm -rf /var/lib/apt/lists/*
RUN gem install bundler -v 4.0.20 --no-document
ENV BUNDLE_PATH=/usr/local/bundle BUNDLE_FROZEN=true

FROM base AS dependencies
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm && ln -s ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx
RUN apt-get update && apt-get install -y --no-install-recommends build-essential libpq-dev libyaml-dev git pkg-config && rm -rf /var/lib/apt/lists/*
COPY Gemfile Gemfile.lock package.json package-lock.json .npmrc ./

FROM dependencies AS tooling
RUN bundle install && npm ci
RUN npm exec playwright -- install --with-deps chromium firefox webkit
COPY . .
ARG VERIFICATION_SHA
ENV VERIFICATION_SHA=${VERIFICATION_SHA}
CMD ["bin/check"]

FROM dependencies AS build
ENV BUNDLE_WITHOUT=development:test RAILS_ENV=production
RUN bundle install && npm ci
COPY . .
RUN SECRET_KEY_BASE_DUMMY=1 bundle exec vite build && bundle exec ruby -rvite_ruby -e 'File.write("config/vite-digest", ViteRuby.digest)'

FROM base AS production
ENV RAILS_ENV=production BUNDLE_WITHOUT=development:test THRUSTER_HTTP_PORT=3000 THRUSTER_TARGET_PORT=3001
RUN groupadd --gid 1000 rails && useradd --uid 1000 --gid 1000 --create-home --shell /bin/bash rails
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails/Gemfile /rails/Gemfile.lock /rails/Rakefile /rails/config.ru ./
COPY --from=build /rails/app/controllers ./app/controllers
COPY --from=build /rails/app/models ./app/models
COPY --from=build /rails/app/views ./app/views
COPY --from=build /rails/config ./config
COPY --from=build /rails/db ./db
COPY --from=build /rails/public ./public
COPY --from=build /rails/bin/rails /rails/bin/rake /rails/bin/thrust /rails/bin/docker-entrypoint ./bin/
RUN mkdir -p tmp/pids log lib && chown -R rails:rails tmp log
USER 1000:1000
EXPOSE 3000
ENTRYPOINT ["/rails/bin/docker-entrypoint"]
CMD ["./bin/thrust", "./bin/rails", "server"]
