defmodule PhoenixReactReduxStarterKit.FunPageTest do
  use PhoenixReactReduxStarterKit.IntegrationCase

  @tag :integration
  test "Should render the page properly" do
    user = create_user

    user_sign_in(%{user: user})

    navigate_to "/en/fun"

    assert page_title == "Hello Phoenix React Redux Starter Kit!"

    assert page_source =~ "Phoenix React Redux Starter Kit"

    assert inner_text(find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/div/div"))
      == "Write your text in the text input field\n"
    assert attribute_value(find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/div/div/input"), "value")
      == ""

    assert css_property({:class, "footer"}, "Phoenix React Redux Starter Kit. On Github by @rsilvestre")
  end

  @tag :integration
  test "Should change the text in the jumbotron area" do
    user = create_user

    user_sign_in(%{user: user})

    navigate_to "/en/fun"

    textElement = find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/div/div")
    inputFieldElement = find_element(:xpath, "//*[@id='root']/div/div/div[2]/div/div/div/div/div/input")

    fill_field(inputFieldElement, "Hello, my name is Celine")
    assert inner_text(textElement) == "Hello, my name is Celine\n"
    fill_field(inputFieldElement, "Hello, my name is Celine.")
    assert inner_text(textElement) == "Hello, my name is Celine.\n"
  end
end