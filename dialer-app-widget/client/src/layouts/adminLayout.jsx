import React, { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import CallAudio from "../assets/incoming.mp3";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { requestMediaPermissions } from "mic-check";
import { stringify, parse } from "flatted";


import AdminSideNav from "../components/admin/sidenav";
import AdmindHeader from "../components/admin/header";
import CallPopup from "../pages/admin/call";
import ROLES from "../config/roles";
import { useAppSelector } from "../store/hooks";
import { AUTH, ERROR } from "../routes/routes";
import AdminService from "../services/admin.service";

const AdminLayout = () => {
  const location = useLocation();
  const ringtone = useRef(new Audio(CallAudio));
  const myPeerId = JSON.parse(localStorage?.getItem("user"));
  const { user, isAuthenticated } = useAppSelector((store) => store.user);

  const [status, setStatus] = useState();
  const [expanded, setExpanded] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isMicPermission, setisMicPermission] = useState(false);
  
  const agentPeerId = myPeerId?.peerId;
  const getUserMedia = navigator.mediaDevices.getUserMedia;
  const navigate = useNavigate();
  
  const timerId= useRef(null);
  const durationRef = useRef("00:00");
  const detailsIdRef = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peer = useRef(null);
  const currentCall = useRef(null);
  const conn = useRef(null);
  const startTime = useRef(null);
  const ticketId = useRef("");
  const name = useRef(null);
  const phone = useRef(null);
  const agentName = useRef(null);
  const agentDepartment = useRef(null);
  const isAnswered = useRef(false);
  const time = useRef(null);
  const date = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  useEffect(() => {
    if (user?.userType !== ROLES.ADMIN && user?.userType !== ROLES.AGENT) {
      navigate(isAuthenticated ? ERROR.ERROR_403 : AUTH.BASE_PATH);
    }
  }, [user?.userType, isAuthenticated]);

  const onCallStream = (stream) => {
    remoteStream.current = new Audio();
    remoteStream.current.srcObject = stream;
    remoteStream.current.play();
  };

  const onConnectionData = (data) => {
    if (data.type === "close_call") {
      conn.current.close();
      setStatus("");
      ringtone.current.pause();
    }
  };

  const onIncomingCall = (call) => {
    setStatus("ringing");
    name.current = call?.metadata?.name;
    phone.current = call?.metadata?.phone;
    agentName.current = myPeerId?.useName;
    agentDepartment.current = call?.metadata?.department;
    currentCall.current = call;
    startTime.current = moment().format("HH:mm:ss");
    ringtone.current.loop = true;
    time.current = new Date();
    ringtone.current.play();
    ticketId.current = uuidv4().split("-").shift().slice(0, 6);
    call.on("stream", onCallStream);

    call.on("close", () => {
      console.log("call ended");
    });
  };

  const onConnectionClose = async () => {
    date.current = new Date(); // Replace this with your Date object
    const day = date.current.getDate();
    const month = date.current.getMonth() + 1; // Adding 1 because months are zero-based (0-11)
    const year = date.current.getFullYear();
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    await AdminService.updateCallDetails(
      {
        duration: durationRef.current,
        callStatus: "available",
        date: formattedDate,
      },
      detailsIdRef.current
    )
      .then((response) => {
        durationRef.current = "00:00";
        navigate(`/auth/login`);
        ringtone.current.pause();
      })
      .catch((err) => {
        console.log("error in closing");
      });
  };

  const getDetailsId = async () => {
    const serializedCurrentCall = stringify(currentCall.current);
    try { 
      const data = await AdminService.saveCallDetails({
        from: name.current,
        to: myPeerId?.userName,
        callStatus: "calling",
        department: agentDepartment.current,
        time: startTime.current,
        ticket: ticketId.current,
        // details: {
        //   metadata,
        //   connectionId,
        //   options,
          
        // }
        details: serializedCurrentCall
      });
      detailsIdRef.current = data?.data?.id;
    } catch (error) {
      console.error(error);
    }
  };
  
  function onAcceptClick() {
    currentCall.current.answer(localStream.current);
    ringtone.current.pause();
    ringtone.current.currentTime = 0;
    const newTime = new Date();
    const timerInterval = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = new Date(currentTime - newTime);
      const minutes = elapsedTime.getUTCMinutes();
      const seconds = elapsedTime.getUTCSeconds();
      durationRef.current = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }, 1000);
    timerId.current=timerInterval;
    setExpanded(!expanded);
    setAccepted(!accepted);
  }

  function rejectCall() {
    currentCall.current.close();
    conn.current.close();
    setAccepted(false);
    setStatus("");
    navigate(`/auth/login`);
    ringtone.current.pause();
  }

  const checkMicPermission = async () => {
    try {
      const permission = await requestMediaPermissions({
        audio: true,
        video: false,
      });
      console.log("checkMicPermission", permission);
      setisMicPermission(true);
    } catch (error) {
      const { type, name, message } = error;
      setisMicPermission(false);
    }
  };

  function disconnectCall() {
    currentCall.current.close();
    conn.current.close();
    setStatus("");
    ringtone.current.pause();
    clearInterval(timerId);
    navigate(`/auth/login`);
  }

  useEffect(() => {
    if (status === "ringing") {
      getDetailsId();
      isAnswered.current = true;
    }
  }, [status, myPeerId?.userName]);

  useEffect(() => {
    peer.current = new Peer(agentPeerId, {
      host: "0.peerjs.com",
      port: 443,
      path: "/",
      pingInterval: 5000,
    });

    peer.current.on("open", (id) => {
      getUserMedia({ video: false, audio: true }).then((stream) => {
        localStream.current = stream;
        peer.current.on("connection", (connection) => {
          conn.current = connection;
          connection.on("data", onConnectionData);
          peer.current.on("call", onIncomingCall);
          connection.on("close", onConnectionClose);
        });
      });

      peer.current.on("close", () => {
        console.log("peer is closed");
        ringtone.current.pause();
      });
      peer.current.on("error", (error) => {
        console.log(
          "could not establish a peer connection successfully due to ",
          error
        );
      });
      peer.current.on("disconnected", () => {
        console.log("peer connection is disconnected");
      });
    });

    return () => {
      peer.current.disconnect();
      peer.current.destroy();
    };
  }, [agentPeerId]);


  useEffect(() => {
    checkMicPermission();
  }, []);


  if (location.pathname.split("/")?.[1] !== user.userType) {
    return <Navigate to={isAuthenticated ? ERROR.ERROR_403 : AUTH.BASE_PATH} />;
  }

  return (
    <>
      <section className="flex h-[100%] w-[100%] relative overflow-x-hidden">
        {status === "ringing" && (
          <CallPopup
            onAcceptClick={onAcceptClick}
            onRejectClick={rejectCall}
            disconnect={disconnectCall}
            expanded={expanded}
            accepted={accepted}
            setExpanded={setExpanded}
            setAccepted={setAccepted}
            ticket={ticketId.current}
            name={name.current}
            phone={phone.current}
          />
        )}
        <div className="left-panel bg-[#FFFFFF] w-[235px] ">
          <AdminSideNav />
        </div>
        <div className="right-panel w-full h-[100vh] max-h-[100vh] overflow-y-scroll">
          <div className="top-header">
            <AdmindHeader />
          </div>
          <div className="content-section relative">
            <Outlet />
          </div>
        </div>
      </section>
      {!isMicPermission && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-6 w-[200px]">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none justify-center items-center h-[100px]">
              Please allow mic
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
