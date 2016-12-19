defmodule PhoenixReactReduxStarterKit.CounterPageTest do
  use PhoenixReactReduxStarterKit.IntegrationCase

  @tag :integration
  test "Should render the page properly" do
    user = create_user

    user_sign_in(%{user: user})

    navigate_to "/counter"

    assert page_title == "Hello PhoenixReactReduxStarterKit!"

    assert page_source =~ "Phoenix React Redux Starter Kit"

    assert inner_text(find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/h2")) == "Counter: 0"
    assert inner_text(find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/button[1]")) ==  "Increment"
    assert inner_text(find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/button[2]")) == "Double (Async)"

    assert css_property({:class, "footer"}, "Phoenix React Redux Starter Kit. On Github by @rsilvestre")
  end

  @tag :integration
  test "Should increment the counter correctly" do
    user = create_user

    user_sign_in(%{user: user})

    navigate_to "/counter"

    incrementElement = find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/button[1]")
    doubleElement = find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/button[2]")
    counterElement = find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/h2")

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
  end

  defp wait_for(func, time \\ 220) do
    :timer.sleep(time)
    case func.() do
      true -> true
      _ -> false
    end
  end
end