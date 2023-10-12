import Dropdown, { DropdownAction } from "../common/Dropdown";

import Button from "../common/Button";
import Picture from "../components/Picture";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useScreen } from "../hooks/useScreen";
import useUserContext from "../auth/UserContext";

const NavBar: React.FC = () => {
  const { isTablet } = useScreen();
  const navigate = useNavigate();
  const { sessionUser } = useUserContext();

  const items = useMemo<DropdownAction[]>(
    () =>
      sessionUser
        ? [
            {
              label: `${sessionUser.email}`,
              action: () => navigate("/profile"),
            },
          ]
        : [
            {
              label: "Login",
              action: () => navigate("/login"),
            },
          ],
    [sessionUser]
  );

  return (
    <nav className="tw-sticky tw-top-0 tw-p-1 tw-border-b tw-shadow-lg tw-bg-white">
      <div className="tw-flex tw-justify-between tw-items-center">
        {!isTablet && (
          <div onClick={() => navigate("/")}>
            <Button buttonType="tertiary" className="tw-bg-red-400">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mx-3">
                <span className="tw-text-2xl tw-font-semibold">YLogger</span>
              </div>
            </Button>
          </div>
        )}

        <div>
          <div className="md:tw-mr-[20px]">
            <Dropdown actionsContainerClassName="tw-mt-1" actions={items}>
              <Picture
                src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                size="md"
                className="tw-cursor-pointer"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
