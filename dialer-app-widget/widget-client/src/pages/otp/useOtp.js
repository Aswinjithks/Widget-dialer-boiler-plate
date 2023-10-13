import React, { useEffect } from "react";
import service from "../../utils/service";
import API from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";
import Peer from "peerjs";
import { toast } from "react-toastify";

const useOtp = () => {
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");
  const [blur, setBlur] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const otpHandler = async () => {
    if (!otp) {
      setBlur(true);
      return;
    }
    try {
      const peer = new Peer();
      await new Promise((resolve) => {
        peer.on("open", (id) => resolve(id));
      });
      const peerId = peer.id;
      const response = await service.post(API.OTP_SEND, {
        otp,
        phoneNumber: `+91${location.state.phone}`,
        peerId,
      });

      if (response.data?.statusCode === 200) {
        navigate(`${AUTH.BASE_PATH}/${AUTH.PAGES.DEPARTMENT}`, {
          state: {
            phone: location.state.phone,
            name: location.state.name,
            otp,
            peerId,
          },
        });
      } else {
        setError(response.data?.message);
        toast.error(response.data?.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!location.state?.phone) {
      navigate(`/${AUTH.BASE_PATH}/${AUTH.PAGES.MOBILE}`);
    }
  });
  return { otp, setOtp, blur, setBlur, otpHandler, error };
};

export default useOtp;
