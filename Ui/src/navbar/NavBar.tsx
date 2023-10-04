import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import Picture from "../components/Picture";
import { useNavigate } from "react-router";
import { useScreen } from "../hooks/useScreen";

const NavBar: React.FC = () => {
  const { isTablet } = useScreen();
  const navigate = useNavigate();

  return (
    <nav className="tw-sticky tw-top-0 tw-p-1 tw-border-b tw-shadow-lg tw-bg-white">
      <div className="tw-flex tw-justify-between tw-items-center">
        {!isTablet && (
          <div onClick={() => navigate("/")}>
            <Button buttonType="tertiary" className="tw-bg-red-400">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mx-3">
                {/* <Picture src={logo} size="md" /> */}
                <span className="tw-text-2xl tw-font-semibold">YT Logger</span>
              </div>
            </Button>
          </div>
        )}

        <div>
          <div className="tw-mr-[20px]">
            <Dropdown left actions={[{ label: "Login", action: () => {} }]}>
              <button>
                <Picture
                  src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                  size="md"
                  imgClassName="hover:tw-shadow-md"
                />
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
