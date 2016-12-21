defmodule PhoenixReactReduxStarterKit.Session do
  alias PhoenixReactReduxStarterKit.{Repo, User}
  alias Comeonin.Bcrypt

  @moduledoc false

  def authenticate(%{"email" => email, "password" => password}) do
    user = Repo.get_by(User, email: String.downcase(email))

    case check_password(user, password) do
      true -> {:ok, user}
      _ -> :error
    end
  end

  defp check_password(user, password) do
    case user do
      nil -> Bcrypt.dummy_checkpw()
      _ -> Bcrypt.checkpw(password, user.encrypted_password)
    end
  end
end
