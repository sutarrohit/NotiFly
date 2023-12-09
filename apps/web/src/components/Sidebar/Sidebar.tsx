import SidebarForm from "./SidebarForm";
import { cookies } from "next/headers";

const Sidebar = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("AuthToken")?.value || "";
  return (
    <div>
      <SidebarForm token={token} />
    </div>
  );
};

export default Sidebar;
