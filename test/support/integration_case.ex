defmodule PhoenixReactReduxStarterKit.IntegrationCase do
  use ExUnit.CaseTemplate
  use Hound.Helpers
  import PhoenixReactReduxStarterKit.Factory

  alias PhoenixReactReduxStarterKit.{Repo, User}

  using do
    quote do
      use Hound.Helpers

      import Ecto, only: [build_assoc: 2]
      import Ecto.Model
      import Ecto.Query, only: [from: 2]
      import PhoenixReactReduxStarterKit.Router.Helpers
      import PhoenixReactReduxStarterKit.Factory
      import PhoenixReactReduxStarterKit.IntegrationCase

      alias PhoenixReactReduxStarterKit.Repo

      # The default endpoint for testing
      @endpoint PhoenixReactReduxStarterKit.Endpoint

      hound_session
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(PhoenixReactReduxStarterKit.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(PhoenixReactReduxStarterKit.Repo, {:shared, self()})
    end

    :ok
  end

  def create_user do
    build(:user)
    |> User.changeset(%{password: "12345678"})
    |> Repo.insert!
  end

  def user_sign_in(%{user: user}) do
    navigate_to "/"

    sign_in_form = find_element(:id, "sign_in_form")

    sign_in_form
    |> find_within_element(:id, "email")
    |> fill_field(user.email)

    sign_in_form
    |> find_within_element(:id, "password")
    |> fill_field(user.password)

    sign_in_form
    |> find_within_element(:css, "button")
    |> click

    assert element_displayed?({:class, "current-user"})
  end

  def wait_for(func, time \\ 220) do
    :timer.sleep(time)
    case func.() do
      true -> true
      _ -> false
    end
  end
end
