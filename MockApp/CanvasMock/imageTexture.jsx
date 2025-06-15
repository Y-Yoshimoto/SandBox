import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
// import { ImageTexture, LinearFilter RGBFormat }
// https://threejs.org/docs/#api/en/textures/Texture

// ToDo: 画像の読み込みができるようにする

export const useImageTexture = ({ convertTexture = (t) => (t), imageURL = '/src/Mock/MockApp/CanvasMock/sampleImage.jpg' }) => {
    // ImageTextureを作成
    const texture = useLoader(THREE.TextureLoader, imageURL);
    // const [imageTexture, setImageTexture] = React.useState();

    // 画像の読み込みが完了したらテクスチャを設定
    if (texture) {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        convertTexture(texture);
    }

    return { imageTexture: texture };
};

export const ImageTextureSource = ({ imageRef }) => {
    const imageURL = '/src/Mock/MockApp/CanvasMock/sampleImage.jpg'; // 画像のパスを指定

    return (
        <img
            crossOrigin="anonymous"
            ref={imageRef}
            src={imageURL}
            style={{ width: "100px", height: "100px" }}
            // style={{ display: "none" }}
            alt="Hidden Image"
        />
    );
};

export default useImageTexture;