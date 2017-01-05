defmodule PhoenixReactReduxStarterKit.CounterChannel.Supervisor do
  @moduledoc """
  let supervise monitor counter channel
  """

  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    children = [
      worker(PhoenixReactReduxStarterKit.CounterChannel.Monitor, [], restart: :temporary)
    ]

    supervise(children, strategy: :simple_one_for_one)
  end
end
