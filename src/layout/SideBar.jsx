import { Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { FormattedMessage } from 'react-intl'

const SideBar = () => {
  const scrollUp = () => {
    const scrollPosition = document.getElementById("scroll").scrollTop;
    document.getElementById("scroll").scrollTo(0, scrollPosition - 100);
  };
  const scrollDown = () => {
    const scrollPosition = document.getElementById("scroll").scrollTop;
    document
      .getElementById("scroll")
      .scrollTo(0, scrollPosition + 100);
  };

  return (
    <section className="h-sidebar sidebar-container ">
      <ul className="m-0 sidebar-list">
        <OverlayTrigger
          key="right"
          placement="right"
          overlay={
            <Tooltip className="custom-tooltip" id={`tooltip-right`}>
              Dashboard
            </Tooltip>
          }
        >
          <li className="mt-3">
            <Link to="/dashboard">
              <Image
                className="sidebar-icon"
                src="/icone/countdown to break 3.png"
                //  src="/icone/Dashboard.png"
              />
            </Link>
          </li>
        </OverlayTrigger>
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
                src="/icone/countdown to break 1.png"
              />
            </Link>
          </li>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Tooltip className="custom-tooltip" id={`tooltip-right`}>
                Moneypool
              </Tooltip>
            }
          >
            <li className="mt-3">
              <Link to="money-pool">
                <Image className="sidebar-icon" src="/icone/kittysplit 1.png" />
              </Link>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Tooltip className="custom-tooltip" id={`tooltip-right`}>
                <FormattedMessage
                  defaultMessage="Daypoints"
                  id="app.imToday"
                />
              </Tooltip>
            }
          >
            <li className="mt-3">
              <Link to="/dashboard/taskmanagement">
                <Image
                  className="sidebar-icon"
                  src="/icone/exclamation-mark.png"
                />
              </Link>
            </li>
          </OverlayTrigger>

          <li className="mt-3">
            <Link to="">
              <Image className="sidebar-icon2" src="/icone/Vector.png" />
            </Link>
          </li>
          <li className="mt-3">
            <Link to="">
              <Image className="sidebar-icon" src="/icone/eye 1.png" />
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
        <OverlayTrigger
          key="right"
          placement="right"
          overlay={
            <Tooltip className="custom-tooltip" id={`tooltip-right`}>
              <FormattedMessage
                defaultMessage="Settings"
                id="settings"
              />
            </Tooltip>
          }
        >
          <li className="mt-3">
            <Link to="/dashboard/setting">
              <Image className="sidebar-icon" src="/icone/blue-book 1.png" />
            </Link>
          </li>
        </OverlayTrigger>
      </ul>
    </section>
  );
};

export default SideBar;
