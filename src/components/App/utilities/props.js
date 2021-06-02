import Logo from "../../Logo/Logo";
import Screen from "../../Screen/Screen";
import SideBar from "../../Bar/SideBar/SideBar";
import SystemDate from "../../SystemDate/SystemDate";
import TopBar from "../../Bar/TopBar/TopBar";

import sideBarData from "../../Bar/SideBar/utilities/data";

export const propsSideBar = {
  data: sideBarData
};

export const propsTopBar = {
  brandLogo: <Logo />,
  currentDate: <SystemDate />
};

export const propsLayout = {
  topBar: <TopBar {...propsTopBar} />,
  sideBar: <SideBar {...propsSideBar} />,
  screen: <Screen />
}