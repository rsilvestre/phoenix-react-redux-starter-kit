defmodule PhoenixReactReduxStarterKit.InterfaceChannelTest do
  use PhoenixReactReduxStarterKit.ChannelCase

  alias PhoenixReactReduxStarterKit.{Presence, InterfaceChannel}

  setup do
    {:ok, _, socket} =
      socket("user_id", %{current_user: %{id: 2}})
      |> subscribe_and_join(InterfaceChannel, "interface:2")

    {:ok, socket: socket}
  end

  test "connect 1 time a user", %{socket: socket} do
    list = Presence.list(socket)

    assert %{"2" => %{metas: [%{online_at: _, phx_ref: _}]}} = list
  end

  test "connect 2 time the same user", %{socket: socket} do
      socket("user_id", %{current_user: %{id: 2}})
      |> subscribe_and_join(InterfaceChannel, "interface:2")

    list = Presence.list(socket)

    assert %{"2" => %{metas: [%{online_at: _, phx_ref: _}, %{online_at: _, phx_ref: _}]}} = list
  end

  test "connect 2 times the same user and one time an other user", %{socket: socket} do
    socket("user_id", %{current_user: %{id: 2}})
    |> subscribe_and_join(InterfaceChannel, "interface:2")

    list = Presence.list(socket)

    assert %{"2" => %{metas: [%{online_at: _, phx_ref: _}, %{online_at: _, phx_ref: _}]}} = list

    {:ok, _, socket} =
      socket("user_id", %{current_user: %{id: 3}})
      |> subscribe_and_join(InterfaceChannel, "interface:3")

    list = Presence.list(socket)

    assert %{"3" => %{metas: [%{online_at: _, phx_ref: _}]}} = list
  end
end