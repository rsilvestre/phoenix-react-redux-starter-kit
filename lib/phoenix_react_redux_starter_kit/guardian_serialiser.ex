defmodule PhoenixReactReduxStarterKit.GuardianSerializer do
  @moduledoc """
  This module is suppose to receive guardian request should be able to serialize and unserialize the user token
  """

  @behaviour Guardian.Serializer

  alias PhoenixReactReduxStarterKit.{Repo, User}

  def for_token(user = %User{}), do: {:ok, "User:#{user.id}"}
  def for_token(_), do: {:error, "Unknown resource type"}

  def from_token("User:" <> id), do: {:ok, Repo.get(User, String.to_integer(id))}
  def from_token(_), do: {:error, "unknown resource type"}
end
