import { h } from "/local_modules/hyperapp/src/index"
import { Logout } from "./login"

export const Header = ({ state }) => (
    <div class="container">
      <nav class="nav nav-primary">
          <li>
            <a href="#" class="btn btn-primary" onClick={Logout}><i class="fas fa-sign-out-alt"></i></a>
          </li>
      </nav>
    </div>
)