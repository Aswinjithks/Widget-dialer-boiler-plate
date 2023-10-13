import ROLES from "../config/roles";
import { PRIVATE } from "../routes/routes";
import { store } from "../store/store";

const getUserPath = (path: string) => {
  const user = store.getState().user.user;
  if (user?.userType === ROLES.SUPER_ADMIN) {

    return `/${PRIVATE.ADMIN.SUPER_ADMIN_BASE_PATH}/${path}`;
  } else if (user?.userType === ROLES.ADMIN) {
    return `/${PRIVATE.ADMIN.ADMIN_BASE_PATH}/${path}`;
  } else if (user?.userType === ROLES.AGENT) {
    return `/${PRIVATE.AGENT.AGENT_BASE_PATH}/${path}`;
  } else {
    return `/${PRIVATE.ADMIN.SUPER_ADMIN_BASE_PATH}/${path}`;
  }
};

export { getUserPath };
