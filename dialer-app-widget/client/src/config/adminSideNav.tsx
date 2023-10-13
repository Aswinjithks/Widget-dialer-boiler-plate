import React from "react";

import homeButton from "../assets/images/homeBtn.svg";
import callImage from "../assets/images/phoneImage.svg";
import contact from "../assets/images/contact.svg";
import knowledge from "../assets/images/knowledge.svg";
import report from "../assets/images/reportImage.svg";
import admin from "../assets/images/setting.svg";
import { PRIVATE } from "../routes/routes";

const AdminSubData = [
  {
    id: "adminWidgetNav",
    title: "Widget",
    link: PRIVATE.ADMIN.PAGES.WIDGET,
    icon: "",
    className: "",
  },
  {
    id: "adminAgentNav",
    title: "Agents",
    link: PRIVATE.ADMIN.PAGES.AGENTS,
    icon: "",
    className: "",
  },
  {
    id: "adminDepartmentNav",
    title: "Department",
    link: PRIVATE.ADMIN.PAGES.DEPARTMENT,
    icon: "",
    className: "",
  },
  {
    id: "adminEditWidgetNav",
    title: "Editwidget",
    link: PRIVATE.ADMIN.PAGES.EDIT_WIDGET,
    icon: "",
    className: "",
  },
];

const AdminSideNavData = [
  {
    id: "homeButtonNav",
    title: "Overview",
    link: PRIVATE.ADMIN.PAGES.DASHBOARD,
    icon: homeButton,
    className: "",
  },
  {
    id: "callImageNav",
    title: "Call Details",
    link: PRIVATE.ADMIN.PAGES.CALL_LOGS,
    icon: callImage,
    className: "",
  },
  {
    id: "contactNav",
    title: "Contacts",
    link: PRIVATE.ADMIN.PAGES.CONTACTS,
    icon: contact,
    className: "",
  },
  {
    id: "knowledgeNav",
    title: "Knowledge Base",
    link: PRIVATE.ADMIN.PAGES.KNOWLEDGE,
    icon: knowledge,
    className: "",
  },
  {
    id: "reportNav",
    title: "Reports",
    link: PRIVATE.ADMIN.PAGES.REPORTS,
    icon: report,
    className: "",
  },
  {
    id: "adminNav",
    title: "Admin View",
    icon: admin,
    className: "",
    subNav: AdminSubData,
  },
];

export const AgentSideNavData = [
  {
    id: "homeButtonNav",
    title: "Overview",
    link: PRIVATE.AGENT.PAGES.DASHBOARD,
    icon: homeButton,
    className: "",
  },
  {
    id: "callImageNav",
    title: "Call Details",
    link: PRIVATE.AGENT.PAGES.CALL_LOGS,
    icon: callImage,
    className: "",
  },
  {
    id: "contactNav",
    title: "Contacts",
    link: PRIVATE.AGENT.PAGES.CONTACTS,
    icon: contact,
    className: "",
  },
  {
    id: "knowledgeNav",
    title: "Knowledge Base",
    link: PRIVATE.AGENT.PAGES.KNOWLEDGE,
    icon: knowledge,
    className: "",
  },
  {
    id: "reportNav",
    title: "Reports",
    link: PRIVATE.AGENT.PAGES.REPORTS,
    icon: report,
    className: "",
  },
];

export default AdminSideNavData;
