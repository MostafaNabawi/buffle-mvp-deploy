import { React } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <section className="h-sidebar sidebar-container ">
      <div className="pt-3">
        <ul className="m-0 sidebar-list">
          <li className="mt-3">
            <Link to="/dashboard">
              <Image
                className="sidebar-icon"
                src="/icone/countdown to break 3.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/countdown to break 1.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="money-pool">
              <Image className="sidebar-icon" src="/icone/kittysplit 1.png" />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="/dashboard/taskmanagement">
              <Image className="sidebar-icon" src="/icone/task manager 1.png" />
            </Link>
          </li>
          {/* <li className="mt-3">
               <Link to=""><Image className="sidebar-icon" src="/icone/Vector.png" /></Link>
            </li> */}
          <li className="mt-3">
            <Link to="">
              <Image className="sidebar-icon" src="/icone/eye 1.png" />
            </Link>
          </li>
          {/* <li className="mt-3">
               <Link to=""><Image className="sidebar-icon" src="/icone/task manager 1.png" /></Link>
            </li> */}
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 7.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 3.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 4.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 5.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 6.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image className="sidebar-icon" src="/icone/blue-book 1.png" />
            </Link>
          </li>

          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 7.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 3.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 4.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 5.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 6.png"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="/dashboard/setting">
              <Image className="sidebar-icon" src="/icone/blue-book 1.png" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
