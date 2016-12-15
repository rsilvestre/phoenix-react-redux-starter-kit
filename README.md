# PhoenixReactReduxStarterKit

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

`master` [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=master)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit)

`language-support` [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=language-support)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit)

`ecto`  [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=ecto)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit)

`user_support` [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=user_support)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit)

`user-support-multilanguage` [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=user-support-multilanguage)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit)

The project is based on [`react-redux-starter-kit`](https://github.com/davezuko/react-redux-starter-kit) developed by [`David Zukowski`](https://github.com/davezuko).
The main idea is to offer to the Phoenix developer one of the best react redux starter kit I ever seen before.
A large part of the content of this README file could be the same than which on the [`react-redux-starter-kit`](https://github.com/davezuko/react-redux-starter-kit) page.

Actualy the project is devided in several branches : master, language-support, ecto, user_support, user-support-multilanguage

## Table of content

1. Features
2. Requirements
3. Branches
4. Start
5. Development
6. Deployment
7. Learn more
8. Inspiraction

## Features

- react
- redux
- react-router
- webpack
- babel
- phoenix
- socket

## Requirements

- hex `0.14.1`
- elixir `1.3.4`
- phoenix `1.2.1`
- node `4.5.0`
- yarn `^0.17.0` or npm `^3.0.0`

## Branches

Like there are serveral way to start a project, I added some nice feature in sub-branches to help developpers to start faster there projects. May be in a futur I will move thoses branches in independant github project :

- [master](https://github.com/rsilvestre/phoenix-react-redux-starter-kit/tree/master) : is a starter kit without Ecto support
  - [language-support](language-support) : include a multilanguage support using `react-intl`
  - [ecto](https://github.com/rsilvestre/phoenix-react-redux-starter-kit/tree/ecto) : include `ecto` deps with `postgrex`
    - [user_support](https://github.com/rsilvestre/phoenix-react-redux-starter-kit/tree/user_support) : include a small user support. Add a `restricted area`, a user `create`, `login` and `logout`. It also add `Websocket user connection`
      - [user-support-multilanguage](https://github.com/rsilvestre/phoenix-react-redux-starter-kit/tree/user-support-multilanguage) : merge `user_support` with `language-support

## Start

To start your Phoenix app:

### Install from source

```bash
git clone https://github.com/davezuko/react-redux-starter-kit.git <my-project-name>
cd <my-project-name>
```

Then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
mix deps.get					    # Install dependencies
yarn install						# Install node modules
mix do ecto.create, ecto.migrate	# If you use `Ecto`
mix phoenix.server					# Start Phoenix endpoint
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Development

#### Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn?t require installing any packages.

However, adding the DevTools components to your project is simple. First, grab the packages from npm:

```bash
npm i --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

### Routing
We use `react-router` [route definitions](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

### DevTools

The complete explaination about the [Redux DevTools](https://github.com/gaearon/redux-devtools) can be found on the github page of the project, and the usage of the extension can be fond on the [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) page. But basicaly, from the extension's context menu choose 'Open Remote DevTools' or press Alt+Shift+arrow up (or down, left, right) (Cmd+CTRL+arrow up on Mac) for remote monitoring.

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

I would like to thank you all the people in different opensource communities for there projects that help me to create this starter kit.

- [David Zukowski](https://github.com/davezuko) and friends for the [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit) Project
- [Ricardo García Vega](http://codeloveandboards.com) for this amasing project [Trello tribute with Phoenix and React](http://codeloveandboards.com/blog/2016/01/04/trello-tribute-with-phoenix-and-react-pt-1/) that you can also find on [github](https://github.com/bigardone/phoenix-trello)
- [Nathan](https://github.com/terakilobyte) for [Phoenix Elixir React Redux Starter Kit](https://github.com/terakilobyte/phoenix-elixir-react-redux-starter-kit) that help me to start this project
- [Ben Smith](https://github.com/slashdotdash) for [Phoenix + React + Redux Example](https://github.com/slashdotdash/phoenix-react-redux-example)

Read those books : 

- [**Programming Elixir 1.3**](https://pragprog.com/book/elixir13/programming-elixir-1-3) by _Dave Thomas_
- [**Programming Phoenix Productive |> Reliable |> Fast**](https://pragprog.com/book/phoenix/programming-phoenix) by _Chris McCord_, _Bruce Tate_, and _José Valim_

