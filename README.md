# PhoenixReactReduxStarterKit

The project is based on [`react-redux-starter-kit`](https://github.com/davezuko/react-redux-starter-kit) developed by [`David Zukowski`](https://github.com/davezuko).
The main idea is to offer to the Phoenix developer one of the best react redux starter kit I ever seen before.
A large part of the content of this README file could be the same than which on the [`react-redux-starter-kit`](https://github.com/davezuko/react-redux-starter-kit) page.

Actualy the project is devided in several branches : master, language-support, ecto, user_support, user-support-multilanguage

## Table of content

1. Features
2. Requirements
3. Branches
4. Start
5. Deployment
6. Learn more
7. Inspiraction

## Features

- react
- redux
- react-router
- webpack
- babel
- phoenix
- socket

## Requirements

- elixir
- phoenix
- node
- npm

## Branches

Like there are serveral way to start a project, I added some nice feature in sub-branches to help developpers to start faster there projects. May be in a futur I will move thoses branches in independant github project :

- master : is a starter kit without Ecto support
  - language-support : include a multilanguage support using `react-intl`
  - ecto : include `ecto` deps with `postgrex`
    - user_support : include a small user support. Add a `restricted area`, a user `create`, `login` and `logout`. It also add `Websocket user connection`
      - user-support-multilanguage : merge `user_support` with `language-support`

## Start

To start your Phoenix app:

* Install dependencies with `mix deps.get`
* Install node modules with `npm install` 
    * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Deployment

1. build, check and push

   ```shell
   docker login dockerhub.net -u root -p PASSWORD
   export TAG=$(git rev-parse --short HEAD)
   docker build -t dockerhub.net/phoenix-react-redux-starter-kit:${TAG} .
   docker stop messaging_center_widget
   docker rm messaging_center_widget
   docker run --name=messaging_center_widget --restart=always \
      -p 127.0.0.1:4000:4000 -d dockerhub.net/phoenix-react-redux-starter-kit:${TAG}
   docker push dockerhub.net/widget-prototype:${TAG}
   export dockerToDelete=$(docker images | \
      grep dockerhub.net/widget-prototype | \
      grep -v "IMAGE ID" | grep -v ${TAG} | awk '{print $3}' | sed '$d')
   if [ ! -z "$dockerToDelete" ]; then docker rmi $dockerToDelete; fi
   echo export TAG=${TAG}
   ```

2. pull, run and clean

   ```shell
   docker login dockerhub.net -u root -p PASSWORD
   export TAG=TAG
   docker pull dockerhub.net/phoenix-react-redux-starter-kit:${TAG}
   docker stop messaging_center_widget
   docker rm messaging_center_widget
   docker run --name=messaging_center_widget --restart=always -p 0.0.0.0:4000:4000 \
      -d dockerhub.net/phoenix-react-redux-starter-kit:${TAG}
   docker rm $(docker ps -a | grep Exited | awk '{print $1}')
   docker rmi $(docker images | grep -v "IMAGE ID" | grep -v ${TAG} | awk '{print $3}')
   ```

## Learn more

* Official website: http://www.phoenixframework.org/
* Guides: http://phoenixframework.org/docs/overview
    * Docs: https://hexdocs.pm/phoenix
    * Mailing list: http://groups.google.com/group/phoenix-talk
    * Source: https://github.com/phoenixframework/phoenix

## Inspiraction
- [https://github.com/terakilobyte/phoenix-elixir-react-redux-starter-kit](https://github.com/terakilobyte/phoenix-elixir-react-redux-starter-kit)
- [https://github.com/bigardone/phoenix-trello](https://github.com/bigardone/phoenix-trello)
- [https://github.com/davezuko/react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)

Read this tutorial [https://blog.diacode.com/page-specific-javascript-in-phoenix-framework-pt-2](https://blog.diacode.com/page-specific-javascript-in-phoenix-framework-pt-2)
