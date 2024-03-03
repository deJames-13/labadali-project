import PropTypes from "prop-types";
import Button from "./Button";
import Logo from "./Logo";

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
                text="Book Laundry"
                icon={<i className="fas fa-box"></i>}
                isLink={true}
                link={"/booking"}
                isActive={page === "booking"}
              />

              <Button
                text="View History"
                icon={<i className="fas fa-clock-rotate-left"></i>}
                isLink={true}
                link={"/history"}
                isActive={page === "history"}
              />

              <Button
                text="Message"
                icon={<i className="fas fa-message"></i>}
                isLink={true}
                link={"/message"}
                isActive={page === "message"}
              />
            </div>

            <div className="w-full flex flex-col space-y-3 items-center">
              <Button
                text="My Profile"
                icon={<i className="fas fa-user"></i>}
                isLink={true}
                link={"/profile"}
                isActive={page === "profile"}
              />
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
