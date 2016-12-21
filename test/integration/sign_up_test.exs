defmodule PhoenixReactReduxStarterKit.SignUpTest do
  use PhoenixReactReduxStarterKit.IntegrationCase

  @valid_attrs %{
    encrypted_password: "some content",
    email: "john@doe.com",
    first_name: "some content",
    last_name: "some content",
    password: "123456"
  }

  @tag :integration
  test "GET /sign_up" do
    navigate_to "/sign_up"

    assert page_title == "Sign up | Phoenix React Redux Starter Kit"
    assert element_displayed?({:id, "sign_up_form"})
  end

  @tag :integration
  test "Sign up with correct data" do
    sign_up_form = fill_user_information

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
    assert page_source =~ "Welcome to the Phoenix React Redux Starter Kit"
  end

  @tag :integration
  test "Sign up without correct confirmation password" do
    sign_up_form = fill_user_information

    sign_up_form
    |> find_within_element(:id, "password")
    |> fill_field("12345678")

    sign_up_form
    |> find_within_element(:id, "password_confirmation")
    |> fill_field("87654321")

    sign_up_form
    |> find_within_element(:css, "button")
    |> click

    assert element_displayed?({:class, "error"})

    assert page_source =~ "Password does not match"
  end

  @tag :integration
  test "Sign up with too short password" do
    sign_up_form = fill_user_information

    sign_up_form
    |> find_within_element(:id, "password")
    |> fill_field("123")

    sign_up_form
    |> find_within_element(:id, "password_confirmation")
    |> fill_field("123")

    sign_up_form
    |> find_within_element(:css, "button")
    |> click

    assert element_displayed?({:class, "error"})

    assert page_source =~ "should be at least 5 character(s)"
  end

  @tag :integration
  test "Sign up with too short password and confirmation not match" do
    sign_up_form = fill_user_information

    sign_up_form
    |> find_within_element(:id, "password")
    |> fill_field("123")

    sign_up_form
    |> find_within_element(:id, "password_confirmation")
    |> fill_field("321")

    sign_up_form
    |> find_within_element(:css, "button")
    |> click

    assert element_displayed?({:class, "error"})

    assert page_source =~ "should be at least 5 character(s)"
    assert page_source =~ "Password does not match"
  end

  @tag :integration
  test "Should return Email already taken when we try to registrer with an existig email" do
    alias PhoenixReactReduxStarterKit.{Repo, User}
    %User{}
    |> User.changeset(@valid_attrs)
    |> Repo.insert!

    sign_up_form = fill_user_information

    sign_up_form
    |> find_within_element(:id, "password")
    |> fill_field("123456")

    sign_up_form
    |> find_within_element(:id, "password_confirmation")
    |> fill_field("123456")

    sign_up_form
    |> find_within_element(:css, "button")
    |> click

    assert element_displayed?({:class, "error"})

    assert page_source =~ "Email already taken"
  end

  defp fill_user_information do
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
  end
end
