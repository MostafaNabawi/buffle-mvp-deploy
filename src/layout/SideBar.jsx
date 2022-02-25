import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const SideBar = () => {
  const scrollUp = () => {
    const scrollPosition = document.getElementById("scroll").scrollTop;
    document.getElementById("scroll").scrollTo(0, scrollPosition - 100);
  };
  const scrollDown = () => {
    const scrollPosition = document.getElementById("scroll").scrollTop;
    document
      .getElementById("scroll")
      .scrollTo(scrollPosition, scrollPosition + 100);
  };

  return (
    <section className="h-sidebar sidebar-container ">
      <ul className="m-0 sidebar-list">
        <li className="mt-3">
          <Link to="/dashboard">
            <Image
              className="sidebar-icon"
              src="/icone/countdown to break 3.svg"
            />
          </Link>
        </li>
      </ul>
      <div className="pt-3 container-list">
        <i
          onClick={() => {
            scrollUp();
          }}
          className="arror arror-up "
        >
          <Icon icon="eva:arrow-ios-upward-outline" />
        </i>
        <ul className="m-0 sidebar-list-scroll" id="scroll">
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/countdown to break 1.svg"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="money-pool">
              <Image className="sidebar-icon" src="/icone/kittysplit 1.svg" />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="/dashboard/taskmanagement">
              <Image className="sidebar-icon" src="/icone/task manager 1.svg" />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image className="sidebar-icon2" src="/icone/Vector.svg" />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image className="sidebar-icon" src="/icone/eye 1.svg" />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 7.svg"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 3.svg"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 4.svg"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 5.svg"
              />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image
                className="sidebar-icon"
                src="/icone/exclamation-mark 6.svg"
              />
            </Link>
          </li>
        </ul>
        <i
          onClick={() => {
            scrollDown();
          }}
          className="arror arror-down"
        >
          {" "}
          <Icon icon="eva:arrow-ios-downward-fill" />
        </i>
      </div>
      <ul className="m-0 sidebar-list">
        <li className="mt-3">
          <Link to="/dashboard/setting">
            <Image className="sidebar-icon" src="/icone/blue-book 1.svg" />
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default SideBar;
