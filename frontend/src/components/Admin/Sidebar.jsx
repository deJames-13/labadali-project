import PropTypes from "prop-types";
import Button from "../Button";
import Logo from "../Logo";

export default function Sidebar({ page, onLogout }) {
  return (
    <>
      <div className="h-screen drawer-side scrollbar-hide animate__animated animate__fadeInLeft ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-6 bg-base-200 min-h-full overflow-auto scrollbar-hide">
          <div className="h-screen nav flex flex-col space-y-20 items-center justify-between ">
            <div className="w-full flex flex-col space-y-3 items-center justify-start">
              <Logo />
              <div className="divider"></div>

              <Button
                text="Dashboard"
                icon={<i className="fas fa-compass"></i>}
                isLink={true}
                link={"/admin/dashboard"}
                isActive={page === "dashboard"}
              />
              <Button
                text="Manage Bookings"
                icon={<i className="fas fa-book"></i>}
                isLink={true}
                link={"/admin/manage/bookings"}
                isActive={page === "manage/bookings"}
              />
              <Button
                text="Manage Users"
                icon={<i className="fas fa-users"></i>}
                isLink={true}
                link={"/admin/manage/users"}
                isActive={page === "manage/users"}
              />
              {/* <Button
                text="Manage Inventory"
                icon={<i className="fas fa-boxes"></i>}
                isLink={true}
                link={"/admin/manage/inventories"}
                isActive={page === "manage/inventories"}
              /> */}
              <Button
                text="Manage Laundries"
                icon={<i className="fas fa-boxes"></i>}
                isLink={true}
                link={"/admin/manage/laundries"}
                isActive={page === "manage/laundries"}
              />
              <Button
                text="Charts"
                icon={<i className="fas fa-file-signature"></i>}
                isLink={true}
                link={"/admin/manage/reports"}
                isActive={page === "manage/reports"}
              />
              <Button
                text="Messages"
                icon={<i className="fas fa-message"></i>}
                isLink={true}
                link={"/admin/messages"}
                isActive={page === "messages"}
              />
            </div>

            <div className="w-full flex flex-col space-y-3 items-center">
              {/* <Button
                text="My Profile"
                icon={<i className="fas fa-user"></i>}
                isLink={true}
                link={"/profile"}
                isActive={page === "profile"}
              /> */}
              {/* <Button
                text="Settings"
                icon={<i className="fa fa-gear"></i>}
                isLink={true}
                link={"/settings"}
                isActive={page === "settings"}
              /> */}

              <Button
                onClick={onLogout}
                text="Logout"
                icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
                customClass={
                  "w-full btn btn-secondary text-cbrown font-bold flex justify-start items-center"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  onLogout: PropTypes.func,
  page: PropTypes.string,
};
