defmodule PhoenixReactReduxStarterKit.CounterChannel do
  @moduledoc """
    This channel will allow the counter to be shared between all the users
  """

  use PhoenixReactReduxStarterKit.Web, :channel

  alias PhoenixReactReduxStarterKit.CounterChannel.Monitor

  def join("counter:" <> user_id, _payload, socket) do
    if authorized?(socket, user_id) do
      current_user = socket.assigns.current_user

      Monitor.create(current_user.id)

      send(self, {:after_join, Monitor.get_counter(current_user.id)})

      {:ok, socket}
    else
      {:error, %{reason: "unauthorized, user_id: #{user_id}, socket_user_id: #{socket.assigns.current_user.id}"}}
    end
  end

  def handle_info({:after_join, counter}, socket) do
    push socket, "counter_state", %{counter: counter}

    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("counter:updated", %{"value" => value}, socket) do
    if is_integer(value) do
      broadcast! socket, "counter:updated", %{"value": value}
      Monitor.set_counter(socket.assigns.current_user.id, value)
      {:noreply, socket}
    else
      {:reply, {:error, %{error: "bad value type"}}, socket}
    end
  end

  def handle_in("counter:reset", %{}, socket) do
    broadcast! socket, "counter:updated", %{"value": 0}
    Monitor.reset_counter(socket.assigns.current_user.id)

    {:noreply, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (counter:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(socket, user_id) do
    Integer.to_string(socket.assigns.current_user.id) == user_id
  end
end
