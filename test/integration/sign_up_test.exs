defmodule PhoenixReactReduxStarterKit.SignUpTest do
  use PhoenixReactReduxStarterKit.IntegrationCase

  @tag :integration
  test "GET /sign_up" do
    navigate_to "/sign_up"

    assert page_title == "Sign up | Phoenix React Redux Starter Kit"
    assert element_displayed?({:id, "sign_up_form"})
  end

  @tag :integration
  test "Siginig up with correct data" do
    navigate_to "/sign_up"

    assert element_displayed?({:id, "sign_up_form"})

    sign_up_form = find_element(:id, "sign_up_form")

    sign_up_form
    |> find_within_element(:id, "first_name")
    |> fill_field("John")

    sign_up_form
    |> find_within_element(:id, "last_name")
    |> fill_field("Doe")

    sign_up_form
    |> find_within_element(:id, "email")
    |> fill_field("john@doe.com")

    sign_up_form
    |> find_within_element(:id, "password")
    |> fill_field("12345678")

    sign_up_form
    |> find_within_element(:id, "password_confirmation")
    |> fill_field("12345678")

    sign_up_form
    |> find_within_element(:css, "button")
    |> click

    assert element_displayed?({:class, "current-user"})

    assert page_source =~ "John Doe"
    assert page_source =~ "Welcome!"
  end
end
