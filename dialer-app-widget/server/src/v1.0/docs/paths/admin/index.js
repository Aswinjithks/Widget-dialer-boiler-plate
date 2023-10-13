module.exports = ({ makeWrapper }) => ({
  "/admin/create-dpt": makeWrapper(require("./create-dpt")),
  "/admin/get-department": makeWrapper(require("./get-department")),
  "/admin/admin-signIn": makeWrapper(require("./admin-signIn")),
  "/admin/save_admin": makeWrapper(require("./save-admin")),
  "/admin/edit-dpt": makeWrapper(require("./edit-dpt")),
  "/admin/create-agent": makeWrapper(require("./create-Agent")),
  "/admin/get-agent": makeWrapper(require("./get-agent")),
  "/admin/agent-set-pwd-and-name": makeWrapper(
    require("./agent-set-pwd-and-name")
  ),
  "/admin/delete-agent": makeWrapper(require("./delete-agent")),
});
  