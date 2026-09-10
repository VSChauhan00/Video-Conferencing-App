import React, { useRef, useState } from "react";
import "../styles/videoComponent.css";


const server_url = "https://localhost:8000";

let connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com.19302" }
    ]
}

export default function VideoMeetComponent() {

    // let connections = useRef({});
    // connections.current
    let socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoRef = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [cideo, setVideo] = useState();

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModel, setShowModel] = useState();

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([]);

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(0);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    let [videos, setVideos] = useState([]);

    const videoRef = useRef([]);



    return (
        <div>
            {
                askForUsername === true ?

                <div>


                </div> : <></>

            }
        </div>
    )
}