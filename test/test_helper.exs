Application.ensure_all_started(:hound)

ExUnit.start

Mix.Task.run "ecto.create", ~w(-r PhoenixReactReduxStarterKit.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r PhoenixReactReduxStarterKit.Repo --quiet)
Ecto.Adapters.SQL.Sandbox.mode(PhoenixReactReduxStarterKit.Repo, :manual)
