FROM ubuntu:16.04

MAINTAINER Michael Silvestre <michael@kapaza.be>

# Set the locale, otherwise elixir will complain later on
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# wget for convenience, use curl if you want to
RUN apt-get update
RUN apt-get -y -q install wget curl bzip2

# add erlang otp
RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
RUN dpkg -i erlang-solutions_1.0_all.deb
RUN apt-get update
RUN apt-get install -y -q imagemagick esl-erlang elixir
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install nodejs
RUN npm install -g yarn

# ADD . /app
ADD config /app/config
ADD lib /app/lib
ADD priv/gettext /app/priv/gettext
ADD web /app/web
ADD .buildpacks /app
ADD .travis.yml /app
ADD compile /app
ADD config.js /app
ADD elixir_buildpack.config /app
ADD environments.js /app
ADD mix.exs /app
ADD package.json /app
ADD phoenix_static_buildpack.config /app
ADD webpack.config.js /app
WORKDIR /app

# install deps
RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get
RUN yarn install
RUN mix compile

# expose ports
EXPOSE 4000
CMD ["mix", "phoenix.server"]