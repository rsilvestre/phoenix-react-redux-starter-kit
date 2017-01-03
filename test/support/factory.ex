defmodule PhoenixReactReduxStarterKit.Factory do
  use ExMachina.Ecto, repo: PhoenixReactReduxStarterKit.Repo

  alias PhoenixReactReduxStarterKit.User

  def factory(:user) do
    %User{
      id: 1,
      first_name: sequence(:first_name, &"First #{&1}"),
      last_name: sequence(:last_name, &"Last #{&1}"),
      email: sequence(:email, &"email-#{&1}@foo.com"),
      encrypted_password: "12345678"
    }
  end

  def factory(:user2) do
    %User{
      id: 2,
      first_name: sequence(:first_name, &"First #{&1}"),
      last_name: sequence(:last_name, &"Last #{&1}"),
      email: sequence(:email, &"email-#{&1}@foo.com"),
      encrypted_password: "12345678"
    }
  end
end