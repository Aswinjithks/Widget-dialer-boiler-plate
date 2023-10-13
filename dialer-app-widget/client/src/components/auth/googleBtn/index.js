import { GoogleLogin } from "@react-oauth/google";
import Peer from "peerjs";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../store/hooks";
import { googleAuth } from "../../../store/slices/user";

const GoogleBtn = () => {
  const dispatch = useAppDispatch();
  async function handleSuccess(credentialResponse) {
    const peer = new Peer();
    await new Promise((resolve) => {
      peer.on("open", (id) => resolve(id));
    });
    const token = credentialResponse.credential;
    const peerId = await peer.id;
    if (token && peerId) {
      dispatch(googleAuth({ token, peerId }));
    } else {
      toast.error("Something went wrong");
    }
  }

  const handleError = (error) => {
    console.log(error);
  };

  return (
    <GoogleLogin
      size="large"
      text="signup_with"
      width="364px"
      theme="outline"
      logo_alignment="center"
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
    />
  );
};

export default GoogleBtn;
