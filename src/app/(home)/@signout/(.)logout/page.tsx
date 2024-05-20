import ConfirmDialog from "./ConfirmDialog";
import LogoutButton from "@/app/logout/LogoutButton";

const ConfirmLogout = () => {
  return (
    <ConfirmDialog>
      <LogoutButton />
    </ConfirmDialog>
  );
};

export default ConfirmLogout;
