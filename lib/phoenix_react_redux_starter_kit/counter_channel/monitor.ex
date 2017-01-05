defmodule PhoenixReactReduxStarterKit.CounterChannel.Monitor do
  @moduledoc """
  Counter monitor that keep track of connected users
  """

  use GenServer

  #####
  # External API

  def create(user_id) do
    case GenServer.whereis(ref(user_id)) do
      nil ->
        Supervisor.start_child(PhoenixReactReduxStarterKit.CounterChannel.Supervisor, [user_id])
      _counter ->
        {:error, :counter_already_exist}
    end
  end

  def start_link(user_id) do
    GenServer.start_link(__MODULE__, [], name: ref(user_id))
  end

  def init(_args) do
    {:ok, 0}
  end

  def set_counter(user_id, value) do
    try_cast user_id, {:set_counter, value}
  end

  def get_counter(user_id) do
    try_call user_id, {:get_counter}
  end

  def reset_counter(user_id) do
    try_cast user_id, {:reset_counter}
  end

  #####
  # GenServer Implementation

  def handle_cast({:set_counter, value}, _counter) do
    {:noreply, value}
  end

  def handle_cast({:reset_counter}, _counter) do
    {:noreply, 0}
  end

  def handle_call({:get_counter}, _from, counter) do
    {:reply, counter, counter}
  end

  defp ref(user_id) do
    {:global, {:user, user_id}}
  end

  defp try_call(user_id, call_function) do
    case GenServer.whereis(ref(user_id)) do
      nil ->
        {:error, :invalid_user}
      user ->
        GenServer.call(user, call_function)
    end
  end

  defp try_cast(user_id, cast_function) do
    case GenServer.whereis(ref(user_id)) do
      nil ->
        {:error, :invalid_user}
      user ->
        GenServer.cast(user, cast_function)
    end
  end
end
