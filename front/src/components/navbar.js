import { BrowserRouter as Router } from "react-router-dom";
import jwt from "jwt-decode";
import "./navbar.css";

const decodeJwt = () => {
  let token = window.sessionStorage.getItem("token");

  if (!token) {
    return false;
  } else {
    let role = jwt(token).role;
    return role === "ROLE_ADMIN";
  }
};

export const Navbar = () => {
  return (
    <Router>
      <div className="navbar">
        <a href={`/`}>
          <h1>API ODM Exo</h1>
        </a>
        <nav>
          <ul>
            {decodeJwt() === false ? (
              <></>
            ) : (
              <>
                <li>
                  <a href={`/post`}>Create a Post</a>
                </li>
              </>
            )}
            <li>
              <a href={`/posts`}>Posts</a>
            </li>
            <li>
              {window.sessionStorage.length > 0 ? (
                <>
                  <a href={`/logout`}>Se déconnecter</a>
                </>
              ) : (
                <>
                  <a href={`/login`}>Se connecter</a>
                </>
              )}
            </li>
            <li>
              <a href={`/register`}>S'inscrire</a>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
};
