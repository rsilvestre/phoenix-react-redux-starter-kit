FROM ubuntu:16.04

MAINTAINER Michael Silvestre <michael@kapaza.be>

# Set the locale, otherwise elixir will complain later on
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# wget for convenience, use curl if you want to
RUN apt-get update
RUN apt-get -y -q install wget curl

# add erlang otp
RUN wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
RUN dpkg -i erlang-solutions_1.0_all.deb
RUN apt-get update
RUN apt-get install -y -q imagemagick esl-erlang elixir
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install nodejs
ADD . /app
WORKDIR /app
RUN npm install node-sass
RUN npm install
RUN mix local.hex --force
RUN mix deps.get
RUN mix compile
EXPOSE 4001
CMD ["mix", "phoenix.server"]