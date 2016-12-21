defmodule PhoenixReactReduxStarterKit.UserChannel do
  @moduledoc """
    This channel will allow us to broadcast any user related message from anywhere, handling it from the front-end.
    In our particular case we'll use it to broadcast a board in which a user has been added as a member so we can add
    that new board to the user's boards list. We could also use it for displaying notifications about other boards
    he owns, or whatever you can imagine.
  """

  use PhoenixReactReduxStarterKit.Web, :channel

  def join("users:" <> user_id, _params, socket) do
    current_user = socket.assigns.current_user

    if String.to_integer(user_id) == current_user.id do
      {:ok, socket}
    else
      {:error, %{reason: "Invalid user"}}
    end
  end
end
