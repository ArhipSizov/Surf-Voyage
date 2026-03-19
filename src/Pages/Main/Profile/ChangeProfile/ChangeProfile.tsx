import "./ChangeProfile.scss";

type type = {
  setShowChangeProfile: (boolean: boolean) => void;
};

export default function ChangeProfile(
  {setShowChangeProfile}: type
) {
  return (
    <div
      onClick={() => setShowChangeProfile(false)}
      className="change_profile gray"
    >
      wfwfwef
    </div>
  );
}
