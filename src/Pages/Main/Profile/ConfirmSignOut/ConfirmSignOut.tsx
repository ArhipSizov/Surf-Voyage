import "./ConfirmSignOut.scss";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type type = {
  setConfirmSignOutUser: (boolean: boolean) => void;
};

import T from "../../../../Language/Text";

export default function ConfirmSignOut({ setConfirmSignOutUser }: type) {
  const auth = getAuth();
  const navigate = useNavigate();

  function signOutUser() {
    setConfirmSignOutUser(false);
    signOut(auth).then(() => {
      document.cookie = `isLogin=; max-age=604800`;
      navigate("/login");
    });
  }

  return (
    <div
      onClick={() => setConfirmSignOutUser(false)}
      className="confirm_sign_out"
    >
      <div className="main_block gray">
        <h1>{T("Are you want to change account?")}</h1>
        <div>
        <p onClick={() => signOutUser()} className="main_color">{T("Yes")}</p>
        <p onClick={() => setConfirmSignOutUser(false)} className="main_blue_color">{T("No")}</p>
        </div>
      </div>
    </div>
  );
}
