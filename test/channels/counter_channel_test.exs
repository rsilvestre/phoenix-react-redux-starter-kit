defmodule PhoenixReactReduxStarterKit.CounterChannelTest do
  use PhoenixReactReduxStarterKit.ChannelCase

  alias PhoenixReactReduxStarterKit.CounterChannel

  @max_value round(1.0e20)

  setup do
    {:ok, _, socket} =
      socket("user_id", %{current_user: %{id: 1}})
      |> subscribe_and_join(CounterChannel, "counter:1")

    {:ok, socket: socket}
  end

  test "ping replies with status ok", %{socket: socket} do
    ref = push socket, "ping", %{"hello" => "there"}
    assert_reply ref, :ok, %{"hello" => "there"}
  end

  test "shout broadcasts to counter:1", %{socket: socket} do
    push socket, "shout", %{"hello" => "all"}
    assert_broadcast "shout", %{"hello" => "all"}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"some" => "data"}
    assert_push "broadcast", %{"some" => "data"}
  end

  test "counter:updated should broadcast to the clients", %{socket: socket} do
    push socket, "counter:updated", %{"value": 3}
    assert_broadcast "counter:updated", %{"value": 3}
  end

  test "counter:updated should broadcast 0 to the clients if the value is negative", %{socket: socket} do
    push socket, "counter:updated", %{"value": -4}
    assert_broadcast "counter:updated", %{"value": 0}
  end

  test "counter:updated should broadcast 1.0e20 to the clients if the value is bigger than 1.0e20", %{socket: socket} do
    push socket, "counter:updated", %{"value": @max_value + 1}
    assert_broadcast "counter:updated", %{"value": @max_value}
  end

  test "counter:updated should not broadcast to the clients when receive other type than integer", %{socket: socket} do
    ref = push socket, "counter:updated", %{"value": "3"}
    assert_reply ref, :error
  end

  test "counter:reset should broadcat 0 to the clients", %{socket: socket} do
    push socket, "counter:reset", %{}
    assert_broadcast "counter:updated", %{"value": 0}
  end
end
