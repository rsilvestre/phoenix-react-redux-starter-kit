defmodule PhoenixReactReduxStarterKit.HomePageTest do
  use PhoenixReactReduxStarterKit.IntegrationCase

  @tag :integration
  test "should display the home page properly" do
    user = create_user

    user_sign_in(%{user: user})

    navigate_to "/en/home"

    assert page_title == "Hello Phoenix React Redux Starter Kit!"

    assert page_source =~ "Phoenix React Redux Starter Kit"
    assert page_source =~ "Welcome to the Phoenix React Redux Starter Kit"

    assert element_displayed?({:class, "duck"})

    assert css_property({:class, "footer"}, "Phoenix React Redux Starter Kit. On Github by @rsilvestre")
  end
end