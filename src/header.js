import { h } from "/local_modules/hyperapp/src/index";
export const Header = ({ state }) => (
    <div class="container">
      <nav class="nav nav-primary">
          <li>
            <a href="#" class="btn btn-nav">Spesa</a>
          </li>
          <li>
            <a href="#" class="btn btn-nav">Altro</a>
          </li>
          <li>
            <a href="#" class="btn btn-primary">Logout</a>
          </li>
      </nav>
    </div>
)