defmodule PhoenixReactReduxStarterKit.SignOutTest do
  use PhoenixReactReduxStarterKit.IntegrationCase

  @tag :integration
  test "Should be redirected to sign in page on sign out" do
    user = create_user

    user_sign_in(%{user: user})

    find_element(:class, "signout-user")
    |> click

    assert element_displayed?({:id, "sign_in_form"})
  end
end