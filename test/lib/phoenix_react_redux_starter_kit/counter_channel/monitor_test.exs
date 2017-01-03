# assumes you can mock away your actual remote api calls
defmodule PhoenixReactReduxStarterKit.MonitorTest do
  use ExUnit.Case, async: false

  import PhoenixReactReduxStarterKit.Factory

  alias PhoenixReactReduxStarterKit.CounterChannel.Monitor

  setup do
    users = %{
      first_user: build(:user),
      second_user: build(:user2)
    }

    Monitor.create(users.first_user.id)
    Monitor.reset_counter(users.first_user.id)

    {:ok, %{users: users}}
  end

  #these tests can run simultaneously
  test "it set the counter calling :set_counter", %{users: users} do
    Monitor.set_counter(users.first_user.id, 1)
    Monitor.set_counter(users.first_user.id, 2)
    new_state = Monitor.set_counter(users.first_user.id, 4)

    assert new_state == :ok
  end

  test "it get the initial counter state calling :get_counter the first time", %{users: users} do
    new_state = Monitor.get_counter(users.first_user.id)

    assert new_state == 0
  end

  test "it get the counter calling :get_counter", %{users: users} do
    Monitor.set_counter(users.first_user.id, 1)
    Monitor.set_counter(users.first_user.id, 2)
    Monitor.set_counter(users.first_user.id, 4)
    new_state = Monitor.get_counter(users.first_user.id)

    assert new_state == 4
  end

  test "it get the counter to zero after a reset", %{users: users} do
    Monitor.set_counter(users.first_user.id, 1)
    Monitor.set_counter(users.first_user.id, 2)
    Monitor.set_counter(users.first_user.id, 4)
    new_state = Monitor.get_counter(users.first_user.id)

    assert new_state == 4

    new_state = Monitor.reset_counter(users.first_user.id)

    assert new_state == :ok

    new_state = Monitor.get_counter(users.first_user.id)

    assert new_state == 0
  end

  test "test multi monitor", %{users: users} do
    Monitor.create(users.second_user.id)
    Monitor.set_counter(users.first_user.id, 4)
    Monitor.set_counter(users.second_user.id, 8)

    assert 4 == Monitor.get_counter(users.first_user.id)
    assert 8 == Monitor.get_counter(users.second_user.id)
  end
end
