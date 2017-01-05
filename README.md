# PhoenixReactReduxStarterKit

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Build status by branch :

| branch                     | build status                             |
| -------------------------- | ---------------------------------------- |
| master                     | [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=master)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit) |
| language-support           | [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=language-support)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit) |
| ecto                       | [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=ecto)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit) |
| user_support               | [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=user_support)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit) |
| user-support-multilanguage | [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=user-support-multilanguage)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit) |
| demo                       | [![Build Status](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit.svg?branch=demo)](https://travis-ci.org/rsilvestre/phoenix-react-redux-starter-kit) |

The project is based on [`react-redux-starter-kit`](https://github.com/davezuko/react-redux-starter-kit) developed by [`David Zukowski`](https://github.com/davezuko).
The main idea is to offer to the Phoenix developer one of the best react redux starter kit I ever seen before.
A large part of the content of this README file could be the same than which on the [`react-redux-starter-kit`](https://github.com/davezuko/react-redux-starter-kit) page.

What are my motivates and what is the difference with the other starter kit. I wanted to follow a specialized react redux starter kit with the fractal approche. - The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. - [(Read more here)](https://github.com/davezuko/react-redux-starter-kit#application-structure). I also wanted to have several starter kit, according what you wanted to develop. The project is devided in several branches : _master_, _language-support_, _ecto_, _user_support_ and _user-support-multilanguage_.

If you want learn more about `elixir` and `phoenix`, i would suggest you to watch the webbinar made by `José Valim`, the creator of `elixir` : [https://youtu.be/Af-gTdlQoUM?t=1093](https://youtu.be/Af-gTdlQoUM?t=1093)

The demo website is accessible to this link : [https://phoenix-react-redux-starterkit.herokuapp.com](https://phoenix-react-redux-starterkit.herokuapp.com)



## Table of content

1. Features
2. Requirements
3. Branches
4. Start
5. Development
6. Test
7. Deployment
8. Demo
9. Learn more
10. Inspiraction

## Features

- react
- redux
- react-router
- webpack
- babel
- phoenix
- socket

## Requirements

- erlang `18.x`
- hex `0.14.1`
- elixir `1.3.4`
- phoenix `1.2.1`
- node `6.x.x`
- yarn `^0.17.0` or npm `^3.0.0`

### Install requirements

#### Elixir

follow the install instruction on the elixir-lang web page [http://elixir-lang.org/install.html#mac-os-x](http://elixir-lang.org/install.html#mac-os-x)

For OSX, you have to install erlang 18.x

```bash
$ brew install erlang-r18
$ brew install elixir
```

if you have several version of erlang installed, switch to version 18.x

to know which version of erlang is installed with brew, use : `$ brew info erlang`


```bash
$ brew switch erlang 18.x
```

#### Phoenix

Follow the instruction on the installation guide of phoenix framework [http://www.phoenixframework
.org/docs/installation](http://www.phoenixframework.org/docs/installation)

```bash
$ mix local.hex
$ mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez
```

#### Node

node come with `npm` installed

##### NVM

NVM mean _(node version manager)_. You can find it here : [https://github.com/creationix/nvm](https://github
.com/creationix/nvm)

with cURL:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
```

or with wget

```bash
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
```

add this in your `.profile` of `.bash_profile` or `.bashrc`, ...

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

reload your profile with `$ source ~/.profile`

install node :

```bash
$ nvm install node
```

##### Brew

you can use [homebrew](http://brew.sh)

```bash
$ brew install node
```

##### Others

[https://nodejs.org/en/download/current/](https://nodejs.org/en/download/current/)

[https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)

#### Yarn

`Yarn` is a **FAST, RELIABLE, AND SECURE DEPENDENCY MANAGEMENT.**

`Yarn` caches every package it downloads so it never needs to download it again. It also parallelizes operations to maximize resource utilization so install times are faster than ever.

It's x times faster than using `npm`

Once `npm` is installed

```bash
$ npm install -g yarn
```

## Branches

Like there are serveral way to start a project, I added some nice feature in sub-branches to help developpers to start faster there projects. May be in a futur I will move thoses branches in independant github project :

```
. master             # is a starter kit without Ecto support
├── language-support # include a multilanguage support using react-intl
└── ecto             # include ecto deps with postgrex
    └── user_support # include a user restricted area, a signup, a signin and a signout actions
        └── user-support-multilanguage # merge user_support with language-support
            └── demo # The demo of the starter kit
```

### master

The branch master contains the simpliest starter kit possible. The backend just render a static page including the canvas of the SPA. It handles the request to the css, the javascript, the favicon, etc...

### ecto

This branch contains the simple support to `ecto`. `Ecto` is the `elixir ORM` you can find more details, you can find information here : [https://hexdocs.pm/ecto/Ecto.html](https://hexdocs.pm/ecto/Ecto.html)

### language-support

I'm living in Beligum. We have three communities speaking different languages. Dutch, French and German. For that reason, language support looks important to me. [`juanda99`](https://github.com/juanda99) created first a language support for [`react redux starter kit`](https://github.com/davezuko/react-redux-starter-kit) and I helped him to maintain his repository. I reused what he did and included it in this project

### user_support

A lot of project start with a user connection. This branch includes a small user support.

It adds a restricted area, a user create, login and logout. It also add Websocket user connection. 

### user-support-multilanguage

This branch is a mix between `user_support` and `language-support`. You should be able to start a project really fast.

## Start

To start your Phoenix app:

### Install from source

```bash
$ git clone git@github.com:rsilvestre/phoenix-react-redux-starter-kit.git <my-project-name>
cd <my-project-name>
```

Then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
$ mix deps.get                      # Install dependencies
$ yarn install                      # Install node modules
$ mix do ecto.create, ecto.migrate  # If you use `Ecto`
$ mix phoenix.server                # Start Phoenix endpoint
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Development

#### Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn?t require installing any packages.

However, adding the DevTools components to your project is simple. First, grab the packages from npm:

```bash
$ npm i --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor
```

Then follow the [manual integration walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md).

### Routing
We use `react-router` [route definitions](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

### DevTools

The complete explaination about the [Redux DevTools](https://github.com/gaearon/redux-devtools) can be found on the github page of the project, and the usage of the extension can be fond on the [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) page. But basicaly, from the extension's context menu choose 'Open Remote DevTools' or press Alt+Shift+arrow up (or down, left, right) (Cmd+CTRL+arrow up on Mac) for remote monitoring.

## Test

The Elixir code is _linted_ with [**credo**](http://credo-ci.org) where the source code can be found on [github](https://github.com/rrrene/credo)

```bash
$ mix credo --strict
```

The Elixir code is unitTested (orchestration) with [**ExUnit**](https://hexdocs.pm/ex_unit/ExUnit.html) and the Integration tests is made with [**Hound**](https://hexdocs.pm/hound/readme.html)

```bash
$ mix test                          # integration tests included
```

```bash
$ mix test --exclude integration    # integration tests excluded
```

The JavaScript code is _linted_ with [**eslint**](http://eslint.org)

```bash
$ npm run lint
```

The JavaScript is unitTested (orchestred) with [**Karma**](https://karma-runner.github.io/1.0/index.html), [**Mocha**](https://mochajs.org), [**sinon**](http://sinonjs.org) and [**chai**](http://chaijs.com)

```bash
$ npm run test
```

## Deployment

### Compile production code with [distillery](https://hexdocs.pm/distillery/walkthrough.html)

You need to compile first the javascript and next phoenix. As proposed by [_Pete Corey_](https://twitter.com/petecorey) here : [Deploying elixir applications with distillery](http://www.east5th.co/blog/2016/12/26/deploying-elixir-applications-with-distillery/)

```bash
$ npm run deploy:prod
$ MIX_ENV=prod mix do compile, phoenix.digest, release --env=prod
```

To test it :

```bash
$ PORT=8080 ./_build/prod/rel/YOUR_APP/bin/YOUR_APP foreground
```

### Docker

1. build, check and push

   ```bash
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

   ```bash
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

## Demo

[https://phoenix-react-redux-starterkit.herokuapp.com](https://phoenix-react-redux-starterkit.herokuapp.com)

It support multi-language, user connection and websocket communication.

If you try it, when you open 2 browser and you are connecte on each browser with the same user, when you are on the counter page, if you increment the counter, this one is incremented on the page of each browsers. This is also a GenServer to memorise the counter state. The state of the counter is shared between each instance of the server.

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
- [Juanda99](https://github.com/juanda99) for the multi languages support
- [Nathan](https://github.com/terakilobyte) for [Phoenix Elixir React Redux Starter Kit](https://github.com/terakilobyte/phoenix-elixir-react-redux-starter-kit) that help me to start this project
- [Ben Smith](https://github.com/slashdotdash) for [Phoenix + React + Redux Example](https://github.com/slashdotdash/phoenix-react-redux-example)

Read those books : 

- [**Programming Elixir 1.3**](https://pragprog.com/book/elixir13/programming-elixir-1-3) by _Dave Thomas_
- [**Programming Phoenix Productive |> Reliable |> Fast**](https://pragprog.com/book/phoenix/programming-phoenix) by _Chris McCord_, _Bruce Tate_, and _José Valim_

