import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Peer from "peerjs";
import initialCallIcon from "../../assets/callInitial.svg";
import disconnectIcon from "../../assets/disconnect.svg";
import dialtone from "../../assets/audio/Dial-tone-sound.mp3";
import busyTone from "../../assets/audio/busy-tone.mp3";
import internalService from "../../services/internal.service";
import { AUTH } from "../../routes/routes";

const useCall = () => {
  const [status, setStatus] = useState("initial");
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const [dataConnection, setDataConnection] = useState(null);
  const audioRef = useRef(new Audio(dialtone));
  const busyRef = useRef(new Audio(busyTone));
  const peerRef = useRef(null);
  const timerId = useRef(null);

  const timerRef = useRef(9);

  const location = useLocation();
  const navigate = useNavigate();
  const localAgentPeerId = localStorage.getItem("agentPeerId");
  const localAgentName = location.state?.agentName;
  const [agentPeerId, setAgentPeerId] = useState(localAgentPeerId);
  const [agentName, setAgentName] = useState(localAgentName);

  const options = {
    metadata: {
      phone: location?.state?.phone,
      name: location?.state?.name,
      department: location?.state?.department,
    },
  };

  const callInitialHandler = async (_agentPeerId) => {
    if (_agentPeerId === "undefined") {
      busyRef.current.loop = true;
      busyRef.current.play().catch((err) => {
        console.log("error in playing the audio ", err);
      });
      console.log("just befor freeAgentTimer");
      await freeAgentTimer();
      return;
    }
    try {
      peerRef.current = new Peer({
        host: "0.peerjs.com",
        port: 443,
        path: "/",
        pingInterval: 5000,
      });

      const peerId = await new Promise((resolve) => {
        peerRef.current.on("open", (id) => resolve(id));
      });

      if (isAnswered === false) {
        console.log("I am working ", audioRef);
        audioRef.current.loop = true;
        audioRef.current.play().catch((err) => {
          console.log("error in playing the audio ", err);
        });
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      setLocalStream(stream);

      const dataConnection = peerRef.current.connect(_agentPeerId);
      setDataConnection(dataConnection);

      dataConnection.on("close", () => {
        navigate(`${AUTH.BASE_PATH}/${AUTH.PAGES.DEPARTMENT}`, {
          state: location?.state,
        });
        setIsAnswered(true);
        audioRef.current.pause();
      });

      const call = peerRef.current.call(_agentPeerId, stream, options);
      setCurrentCall(call);

      call.on("stream", (remoteStream) => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsAnswered(true);
        setRemoteStream(remoteStream);
      });

      call.on("close", () => {
        console.log("User ends the call");
        dataConnection.close();
        audioRef.current.pause();
        setIsAnswered(false);
        navigate(`${AUTH.BASE_PATH}/${AUTH.PAGES.DEPARTMENT}`, {
          state: location?.state,
        });
      });
    } catch (error) {
      console.error("Error initializing the call:", error);
    }
  };

  const setLocalStream = (stream) => {
    // audioRef.current.srcObject = stream;
    const audio = new Audio();
    audio.autoplay = false;
    audio.srcObject = stream;
  };

  const setRemoteStream = (stream) => {
    const audio = new Audio();
    audio.autoplay = false;
    audio.srcObject = stream;
    audio.play();
  };

  const callDeclineHandler = () => {
    try {
      if (currentCall !== null) {
        console.log("Disconnect function is triggered");
        currentCall.close();
        audioRef.current.pause();
        setCurrentCall(null);
        setIsAnswered(false);

        if (dataConnection !== null) {
          dataConnection.send({ type: "close_call" });
        }
      }
      busyRef.current.pause();
      navigate(`${AUTH.BASE_PATH}/${AUTH.PAGES.DEPARTMENT}`, {
        state: location?.state,
      });
    } catch (err) {
      console.log("Error in disconnecting the call", err);
    }
  };

  const statusList = [
    {
      status: "calling",
      title: "Calling",
      icon: initialCallIcon,
      handler: callDeclineHandler,
    },
    {
      status: "initial",
      title: "Initial",
      icon: disconnectIcon,
      handler: callInitialHandler,
    },
  ];

  useEffect(() => {
    callInitialHandler(agentPeerId);
  }, [agentPeerId]);

  useEffect(() => {
    if (isAnswered) {
      audioRef.current.pause();
    }
  }, [isAnswered]);

  const getFreeAgent = async () => {
    try {
      const response = await internalService.getAgents(
        location.state.department
      );
      console.log("getFreeAgent", response);
      const tmpAgent = response?.data?.data?.result;
      if (tmpAgent && tmpAgent.length > 0) {
        console.log("tmpAgent", tmpAgent);
        clearInterval(timerId.current);
        console.log("clear tmpAgent", tmpAgent);
        setAgentPeerId(tmpAgent[0]?.peerId);
        setAgentName(tmpAgent[0]?.username);
        localStorage.setItem("agentPeerId", tmpAgent[0]?.peerId);
        busyRef.current.pause();

        // await callInitialHandler()
        return response;
      }
    } catch (err) {
      console.log("error in fetching agents", err);
      return err;
    }
  };

  const freeAgentTimer = async () => {
    console.log("freeAgentTimer");
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    timerId.current = setInterval(async () => {
      timerRef.current -= 1;
      console.log("setInterval");
      await getFreeAgent();
      if (timerRef.current < 0) {
        clearInterval(timerId.current);
        await callDeclineHandler();
      }
    }, 5000);
  };
  // useEffect(() => {

  //   return () => {};
  // }, []);

  // const timerRef = useRef(
  //   parseInt(props.route.params?.duration, 10) * 60 || 60,
  // );
  // const timerId = useRef<any>(null);
  // const startTimer = () => {
  //   if (timerId.current) {
  //     clearInterval(timerId.current);
  //   }
  //   timerId.current = setInterval(() => {
  //     timerRef.current -= 1;
  //     setTime(timerRef.current);
  //     if (timerRef.current < 0) {
  //       clearInterval(timerId.current);
  //       setShowNotification(true);
  //       // onFinish();
  //     }
  //   }, 1000);
  // };
  // s={moment.duration(time, 'seconds')}
  // {props.s.minutes().toString().padStart(2, '0')}:
  //       {props.s.seconds().toString().padStart(2, '0')}
  return {
    status,
    setStatus,
    statusList,
    location,
    callDeclineHandler,
    agentPeerId,
    agentName,
  };
};

export default useCall;
