defmodule PhoenixReactReduxStarterKit.CurrentUserController do
  use PhoenixReactReduxStarterKit.Web, :controller
  alias Guardian.Plug

  plug Plug.EnsureAuthenticated, handler: PhoenixReactReduxStarterKit.SessionController

  def show(conn, _) do
    user = Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end
end
