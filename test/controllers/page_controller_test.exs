defmodule PhoenixReactReduxStarterKit.PageControllerTest do
  use PhoenixReactReduxStarterKit.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Phoenix React Redux Starter Kit"
  end
end
