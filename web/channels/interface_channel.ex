defmodule PhoenixReactReduxStarterKit.InterfaceChannel do
  @moduledoc """
    Channel to track user when they are connected.
  """

  use PhoenixReactReduxStarterKit.Web, :channel

  alias PhoenixReactReduxStarterKit.Presence

  def join("interface:" <> _interface, _params, socket) do
    send self, :after_join
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    Presence.track(socket, socket.assigns.current_user.id, %{
      online_at: :os.system_time(:milli_seconds)
    })
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end
end
