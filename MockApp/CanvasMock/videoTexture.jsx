import React, { useRef, useEffect } from "react";
import * as THREE from "three";

// VideoTextureを作成するカスタムフック
export const useVideoTexture = ({ convertTexture = (t) => (t) }) => {
    const videoRef = useRef();
    // VideoTextureを作成
    const [videoTexture, setVideoTexture] = React.useState();

    useEffect(() => {
        if (videoRef.current) {
            const texture = new THREE.VideoTexture(videoRef.current);
            // texture.minFilter = THREE.LinearFilter;
            // texture.magFilter = THREE.LinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.format = THREE.RGBFormat;
            // 画像と生合成
            // texture.center.set(0.5, 0.5);
            // setVideoTexture(texture);
            setVideoTexture(convertTexture(texture));
        }
    }, []);

    return { videoRef, videoTexture };
};


export const VideoTextureSource = ({ videoRef }) => {
    const videoURL = 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'; // 動画のパスを指定

    return (
        <video
            crossOrigin="anonymous"
            ref={videoRef}
            src={videoURL}
            style={{ width: "200px", height: "100px", margin: "10px" }}
            // style={{ display: "none" }}
            controls
            autoPlay
            loop
            muted
            playsInline

        />
    );
};