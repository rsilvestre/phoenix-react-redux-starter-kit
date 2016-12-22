defmodule PhoenixReactReduxStarterKit do
  @moduledoc """
  The project is based on react-redux-starter-kit developed by David Zukowski. The main idea is to offer to
  the Phoenix developer one of the best react redux starter kit I ever seen before.
  A large part of the content of this README file could be the same than which on the react-redux-starter-kit page.

  """
  use Application
  alias PhoenixReactReduxStarterKit.Endpoint

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the endpoint when the application starts
      supervisor(Endpoint, []),
      # Start your own worker by calling: PhoenixReactReduxStarterKit.Worker.start_link(arg1, arg2, arg3)
      # worker(PhoenixReactReduxStarterKit.Worker, [arg1, arg2, arg3]),
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PhoenixReactReduxStarterKit.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Endpoint.config_change(changed, removed)
    :ok
  end
end
