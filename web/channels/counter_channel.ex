defmodule PhoenixReactReduxStarterKit.CounterChannel do
  @moduledoc """
    This channel will allow the counter to be shared between all the users
  """

  use PhoenixReactReduxStarterKit.Web, :channel

  def join("counter:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("counter:updated", %{"value" => value}, socket) do
    broadcast! socket, "counter:updated", %{"value": value}
    {:noreply, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (counter:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
