defmodule PhoenixReactReduxStarterKit.CounterPageTest do
  use PhoenixReactReduxStarterKit.IntegrationCase

  alias PhoenixReactReduxStarterKit.CounterChannel.Monitor

  setup do
    user = create_user

    Monitor.create(user.id)
    Monitor.reset_counter(user.id)

    {:ok, %{user: user}}
  end

  @tag :integration
  test "Should render the page properly", %{user: user} do
    user_sign_in(%{user: user})

    navigate_to "/en/counter"

    assert page_title == "Hello Phoenix React Redux Starter Kit!"

    assert page_source =~ "Phoenix React Redux Starter Kit"

    assert inner_text(find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/h2")) == "Counter: 0"
    assert inner_text(find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/button[1]")) ==  "Increment"
    assert inner_text(find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/button[2]")) == "Double (Async)"
    assert inner_text(find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/button[3]")) == "Reset"

    assert css_property({:class, "footer"}, "Phoenix React Redux Starter Kit. On Github by @rsilvestre")
  end

  @tag :integration
  test "Should increment the counter correctly", %{user: user} do
    user_sign_in(%{user: user})

    navigate_to "/en/counter"

    incrementElement = find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/button[1]")
    doubleElement = find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/button[2]")
    resetElement = find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/button[3]")
    counterElement = find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/h2")

    assert inner_text(counterElement) == "Counter: 0"
    click(incrementElement)
    assert inner_text(counterElement) == "Counter: 1"
    click(doubleElement)
    assert wait_for(fn -> inner_text(counterElement) == "Counter: 2" end)
    click(doubleElement)
    assert wait_for(fn -> inner_text(counterElement) == "Counter: 4" end)
    click(doubleElement)
    assert wait_for(fn -> inner_text(counterElement) == "Counter: 8" end)
    click(incrementElement)
    assert inner_text(counterElement) == "Counter: 9"
    click(doubleElement)
    assert wait_for(fn -> inner_text(counterElement) == "Counter: 18" end)
    click(resetElement)
    assert wait_for(fn -> inner_text(counterElement) == "Counter: 0" end)
    click(incrementElement)
    assert inner_text(counterElement) == "Counter: 1"
  end
end