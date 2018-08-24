import { h } from "/local_modules/hyperapp/src/index";
import { logout } from "./auth";

export const Header = ({ state }) => (
  <div class="container">
    <nav class="nav nav-primary">
      <li>
        <a href="#" class="btn btn-primary" onClick={logout}>
          <i class="fas fa-sign-out-alt" />
        </a>
      </li>
    </nav>
  </div>
);
