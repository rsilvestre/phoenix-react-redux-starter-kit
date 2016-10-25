defmodule PhoenixReactReduxStarterKit.PageController do
  use PhoenixReactReduxStarterKit.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
