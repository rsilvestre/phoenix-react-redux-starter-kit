# assumes you can mock away your actual remote api calls
defmodule PhoenixReactReduxStarterKit.MonitorIntegrityTest do
  use ExUnit.Case, async: true

  alias PhoenixReactReduxStarterKit.CounterChannel.Monitor

  #these tests can run simultaneously
  test "set_counter changes state to 1" do
    {:noreply, new_state} = Monitor.handle_cast({:set_counter, 1}, 0)
    assert new_state == 1
  end

  test "clear_counter set the state to 0" do
    {:noreply, new_state} = Monitor.handle_cast({:reset_counter}, 1)
    assert new_state == 0
  end

  test "get_counter return the actual state" do
    state = 1
    {:reply, response, newstate} = Monitor.handle_call({:get_counter}, nil, state)
    assert newstate == state   # we aren't expecting changes
    assert response == 1
  end
end
