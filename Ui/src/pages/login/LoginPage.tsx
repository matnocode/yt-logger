import { FC, useState } from "react";
import { login, register } from "../../api/auth";

import BaseContainer from "../../common/BaseContainer";
import Button from "../../common/Button";
import FaqSection from "../home/FaqSection";
import Input from "../../common/Input";
import classNames from "classnames";
import { faqSectionContainerClassName } from "../home/HomePage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useUserContext from "../../auth/UserContext";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { loginSuccess } = useUserContext();

  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const submit = async () => {
    let method = isLogin ? login : register;
    let a = await method(email, password);
    if (a.ok) {
      toast.success(isLogin ? "Logged in" : "Registered");
      if (isLogin) {
        loginSuccess();
        navigate("/");
      }
    } else toast.error("Something went wrong");
  };

  return (
    <div
      className={classNames(
        faqSectionContainerClassName,
        "tw-bg-slate-50 tw-h-screen"
      )}
    >
      <div className="tw-pb-4">
        <div className="tw-text-center tw-text-4xl tw-pb-4 md:tw-pb-0">
          Login
        </div>
        <BaseContainer className="tw-bg-white tw-w-10/12 tw-mx-auto tw-py-4 md:tw-mt-9">
          <form
            className="tw-w-11/12 md:tw-w-8/12 tw-mx-auto tw-space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <Input
              placeholder="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              id="loginEmail"
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              buttonType="primary"
              className="tw-flex tw-w-full tw-justify-center tw-p-1.5"
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            {/* <Button
              buttonType="tertiary"
              className="tw-font-normal tw-text-slate-600 hover:tw-text-slate-800"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Dont have an account?" : "Already have an account?"}
            </Button> */}
            <Button
              buttonType="tertiary"
              className="tw-font-normal tw-text-slate-600 hover:tw-text-slate-800 tw-text-left"
            >
              We do not accept new accounts at the moment
            </Button>
          </form>
        </BaseContainer>
      </div>
      <FaqSection />
    </div>
  );
};
export default LoginPage;
