import { useEffect, useRef, useState } from "react";
// https://r3f.docs.pmnd.rs/getting-started/introduction
// npm install three @react-three/fiber @react-three/drei
// https://ics.media/tutorial-three/
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// テクスチャフック/コンポーネント
import { useImageTexture } from "./imageTexture";
import { useVideoTexture, VideoTextureSource } from "./videoTexture";

// 検証表示コンポーネント
export const Canvas_3D = () => {
    console.log(`Canvas_3D: ${new Date().toLocaleTimeString()}`);
    return (
        <>
            <h3>CanvasMock 3D</h3>
            <CanvasArea />
        </>
    );
};

// キャンバス描画エリア/設定変更コンポーネント描画
const CanvasArea = () => {
    // console.debug(`inversion: ${inversion}`);
    // デバック/検証用ステート
    const [isVideoTexture, setIsVideoTexture] = useState(false); // 動画テクスチャを使用するかどうか
    const [cameraFov, setCameraFov] = useState(30); // 初期カメラの視野角

    // 実カメラの設置方法とWebGL上のカメラ位置を管理するフック
    const [realCameraInstallation, actionCameraInstallation] = useRealCameraInstallation({ initialInstallation: "lookingDown", initCameraFov: cameraFov });

    const size = { width: 640, height: 360 };
    // const size = { width: 1280, height: 720 };

    // デバック用再レンダリングキー
    const keyCanvasScene = `video-${isVideoTexture}-${realCameraInstallation.key}-${cameraFov}`;

    return (
        <>
            <h4>表示設定/検証パラメータ</h4>
            <SettingComponent
                realCameraInstallation={realCameraInstallation}
                actionCameraInstallation={actionCameraInstallation}
                isVideoTexture={isVideoTexture}
                setIsVideoTexture={setIsVideoTexture}
                cameraFov={cameraFov}
                setCameraFov={setCameraFov}
            />
            <div key="hemisphere" style={{ ...size, border: '4px solid black' }}>
                <CanvasScene key={keyCanvasScene}
                    realCameraInstallation={realCameraInstallation}
                    isVideoTexture={isVideoTexture}
                    cameraFov={cameraFov}
                />
            </div>

        </>
    )
};



// --------------------------------------------------------------
// 表示設定変更コンポーネント
// 実カメラの設置方法とWebGL上のカメラ位置を管理するフック
const useRealCameraInstallation = ({ initialInstallation = "lookingDown" }) => {

    // minPolarAngle={0}   // 下方向の最小角（例: 45度）
    // maxPolarAngle={Math.PI / 2}   // 上方向の最大角（例: 90度）
    // // minAzimuthAngle={-Math.PI}  // 左方向の最小角（例: -90度）
    // // maxAzimuthAngle={Math.PI}   // 右方向の最大角（例: 90度）
    // ズームアウトの最大距離, ズームインの最小距離
    const zoomDistance = { minDistance: -1, maxDistance: 4 };

    // 実カメラの設置方法とWebGL上のカメラ位置の紐付け
    const INSTALLATION = {
        lookingDown: {
            key: "lookingDown",
            description: "天井から見下ろす視点",
            cameraPosition: [0, 1, 0], // カメラ位置
            meshRotation: [0, Math.PI / 2, - Math.PI], // 半球メッシュの回転
            orbitControlsParams: {
                minPolarAngle: 0,              // 下方向の最小角: 0度
                maxPolarAngle: (Math.PI / 2),   // 上方向の最大角: 90度
                ...zoomDistance // ズームインの最小距離, ズームアウトの最大距離
            }
        },
        lookingForward: {
            key: "lookingForward",
            description: "壁に取り付けられたカメラ",
            cameraPosition: [1, 0, 0], // カメラ位置
            meshRotation: [0, 0, Math.PI / 2], // 半球メッシュの回転
            orbitControlsParams: {
                minPolarAngle: -(Math.PI),              // 下方向の最小角: 0度
                maxPolarAngle: (Math.PI),   // 上方向の最大角: 90度
                minAzimuthAngle: 0, // 左方向の最小角: -90度
                maxAzimuthAngle: (Math.PI),  // 右方向の最大角: 90度
                ...zoomDistance // ズームインの最小距離, ズームアウトの最大距離
            }
        },
        lookingUp: {
            key: "lookingUp",
            description: "卓上に置かれたカメラ",
            cameraPosition: [0, -1, 0], // カメラ位置
            meshRotation: [0, - Math.PI / 2, 0], // 半球メッシュの回転
            orbitControlsParams: {
                minPolarAngle: (Math.PI / 2),              // 下方向の最小角: 0度
                maxPolarAngle: (Math.PI),   // 上方向の最大角: 90度
                ...zoomDistance // ズームインの最小距離, ズームアウトの最大距離
            }
        }
    };
    // 初期状態は見下ろし視点
    const [realCameraInstallation, setCameraInstallation] = useState(INSTALLATION[initialInstallation]);
    // console.debug(`SettingComponent: ${JSON.stringify(realCameraInstallation)}`);
    // 実カメラの設置方法を変更するアクション
    const actionCameraInstallation = (installation) => {
        console.debug(`actionCameraInstallation: ${installation}`);
        // 設置方法を更新
        setCameraInstallation(INSTALLATION[installation]);
    }
    return [realCameraInstallation, actionCameraInstallation];
};

// MUI コンポーネント
import { Checkbox, ToggleButton, ToggleButtonGroup, Slider } from "@mui/material";
//// アイコン
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
//// 設定変更コンポーネント
// ステートは上位コンポーネントに設置
const SettingComponent = ({ realCameraInstallation, actionCameraInstallation, isVideoTexture, setIsVideoTexture, cameraFov, setCameraFov }) => {

    const installationOptions = [
        { label: "天井", value: "lookingDown", icon: <ArrowDownwardIcon /> },
        { label: "壁付", value: "lookingForward", icon: <ArrowForwardIcon /> },
        { label: "卓上", value: "lookingUp", icon: <ArrowUpwardIcon /> },
    ];
    const control = {
        value: realCameraInstallation.key,
        onChange: (e, newValue) => {
            if (newValue !== null) {
                actionCameraInstallation(newValue);
            }
        },
        exclusive: true,
    };

    return (
        <>
            {/* 実カメラの設置方法を選択 */}
            <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
                {installationOptions.map((option) => (
                    <ToggleButton key={option.value} value={option.value}>
                        {option.icon}
                        {option.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <Checkbox
                checked={isVideoTexture}
                onChange={(e) => setIsVideoTexture(e.target.checked)}
            />動画テクスチャ
            {/* カメラの視野角(FOV)を調整するスライダー */}
            <p>レンダリングカメラの初期視野角(FOV)</p>
            <Slider
                value={cameraFov}
                onChange={(e, newValue) => setCameraFov(newValue)}
                min={10} max={90} step={5}
                valueLabelDisplay="auto"
                aria-labelledby="camera-fov-slider"
                sx={{ width: 300 }}
                marks={[15, 30, 60, 90].map((value) => ({
                    value: value,
                    label: `${value}°`,
                }))}
            />
        </>
    )
};


// WebGL キャンバス ----------------------------------------------------------------
const CanvasScene = (props) => {
    // 動画/画像テクスチャのフックを使用
    const { videoRef, videoTexture: videoTexture } = useVideoTexture({ convertTexture: convertTexture });
    const { imageTexture: imagetexture } = useImageTexture({ convertTexture: convertTexture });
    const texture = props.isVideoTexture ? videoTexture : imagetexture;
    // console.debug(texture);

    // 実カメラ設置情報/視野角の取り出し
    const { realCameraInstallation, cameraFov } = props;
    // orbitControlsParams
    // ToDo: カメラの操作制御<OrbitControls />
    // https://threejs.org/docs/#examples/en/controls/OrbitControls

    return (
        <>
            {/* texture &&  */}
            {(<Canvas camera={{ position: realCameraInstallation.cameraPosition, fov: cameraFov }}>
                <ambientLight intensity={2} /> {/* 環境光 */}
                {/* 指向性光源 */}
                <directionalLight position={[2, 2, 2]} intensity={1} />
                <Hemisphere {...{ ...props, texture }} />
                {/* <BallSphere texture={texture} /> */}
                <OrbitControls {...realCameraInstallation.orbitControlsParams} />
            </Canvas>)}
            {props.isVideoTexture && <VideoTextureSource videoRef={videoRef} />}
        </>
    );
}

// 半球のジオメトリ定義(半径1, セグメント数32)
const generateSphereGeometry = ({ segment = 32 }) => {
    return (
        [
            1,            // 半径
            segment,      // 横方向のセグメント数
            segment,      // 縦方向のセグメント数
            - Math.PI / 2,            // φ(緯度)開始角(0度)
            Math.PI * 2,      // φ(緯度)長さ(180度)
            0,      // θ(経度)開始角
            Math.PI / 2,      // θ(経度)長さ（半球）
        ]
    )
};

// 半球コンポーネント(内側/外側の半球を描画)
const Hemisphere = ({ texture, realCameraInstallation }) => {
    const meshRef = useRef();
    // テクスチャのUVマッピングをフィッシュアイに変換
    useEffect(() => {
        if (meshRef.current) {
            remapUVToFisheyeHemisphere(meshRef.current.geometry);
        }
    }, []);

    return (
        <>
            <group scale={[1, 1, 1]}>
                {/* 内側 */}
                <mesh ref={meshRef} rotation={realCameraInstallation.meshRotation}>
                    {/* 半球ジオメトリ（thetaLength: 緯度方向の長さを半分に） */}
                    <sphereGeometry args={generateSphereGeometry({ segment: 32 })} />
                    <meshStandardMaterial
                        map={texture}
                        side={THREE.BackSide} />
                </mesh>
                {/* 外側 確認用 */}
                <mesh rotation={realCameraInstallation.meshRotation}>
                    <sphereGeometry args={generateSphereGeometry({ segment: 32 })} />
                    <meshStandardMaterial
                        color="skyblue"
                        // map={texture}
                        side={THREE.FrontSide} />
                </mesh>
            </group >
        </>
    );
}

// テクスチャ初期変換関数
const convertTexture = (t) => {
    // t.flipY = true;
    // t.flipY = false;
    // t.center.set(0.5, 0.5); // テクスチャの中心を設定

    return t;
};

// フィッシュアイ画像のUVマッピング関数
const remapUVToFisheyeHemisphere = (geometry) => {
    // ジオメトリの属性から位置とUVを取得
    const pos = geometry.attributes.position; // pos.getX,Y,Z(i)で位置座標を取得を取得できるインスタンス
    const uv = geometry.attributes.uv;
    // uv.setXY(i, u, v)でUV座標を設定, uv.countで頂点数を取得, ucv.needsUpdateで更新を通知できるインスタンス

    // UV属性を更新(成功した場合はtrueを返す)
    const _uvUpdated = in_remapUVToFisheyeHemisphere(pos, uv);
    uv.needsUpdate = true; // UV属性の更新を通知
}

// posとuvを受け取って、座標変換をする関数
const in_remapUVToFisheyeHemisphere = (pos, uv) => {
    // 半球の角度(π/2)
    const PI_half = Math.PI / 2;

    // 位置座標から球面座標を取得する関数
    const posGetXYZR = (_pos) => (i) => {
        const [x, y, z] = [_pos.getX(i), _pos.getY(i), _pos.getZ(i)];
        const r = Math.sqrt(x * x + y * y + z * z);
        return { x, y, z, r };
    };
    // フィッシュアイ画像のUV座標計算
    const fisheyeUV = ({ x, y, z, r }) => {
        if (r === 0) return { u: 0.5, v: 0.5 }; // [0.5, 0.5]球面座標の原点からの距離が0の場合は中心に設定
        // θ: 天頂からの角度 [0, π/2]（y軸が上), φ: 方位角 [0, 2π]
        const [theta, phi] = [Math.acos(y / r), Math.atan2(z, x)];
        // フィッシュアイ画像の極座標→UV, r_fish = θ / (π/2) ... θ=0で中心, θ=π/2で外周
        const r_fish = theta / (PI_half);
        // フィッシュアイ画像のUV座標計算(画像中心(0.5,0.5)からのオフセット)
        return {
            u: 0.5 + r_fish * Math.cos(phi) * 0.5,
            v: 0.5 + r_fish * Math.sin(phi) * 0.5
        };
    };

    // 平面展開位置座標からUV座標に変換する関数
    const convertUV = (_p_posGetXYZR) => (i) => {
        // 位置座標を取得
        const { x, y, z, r } = _p_posGetXYZR(i);
        return fisheyeUV({ x, y, z, r });
    };
    // posを部分適応したUV変換関数
    const p_convertUV = convertUV(posGetXYZR(pos));

    // UV座標を設定する関数
    const uvSetXY = (_uv) => ({ i, u, v }) => _uv.setXY(i, u, v);
    // uvを部分適応したUV座標設定関数
    const p_uvSetXY = uvSetXY(uv);

    // UV座標を順番に変換(ToDo: forEach化)
    for (let i = 0; i < uv.count; i++) {
        p_uvSetXY({ i, ...p_convertUV(i) });
    }
    return true; // trueを返すことで、UV属性の更新を通知
};

// フィッシュアイ画像のUVマッピング関数逐次バージョン
// const remapUVToFisheyeHemisphere_V1 = (geometry) => {
//     // ジオメトリの属性から位置とUVを取得
//     const pos = geometry.attributes.position;
//     const uv = geometry.attributes.uv;

//     for (let i = 0; i < uv.count; i++) {
//         // ToDo: 球面座標変換を関数化
//         // 位置座標を取得
//         const [x, y, z] = [pos.getX(i), pos.getY(i), pos.getZ(i)];
//         // 球面座標（半径1前提）
//         const r = Math.sqrt(x * x + y * y + z * z);

//         // 球面座標の原点からの距離が0の場合は中心に設定
//         if (r === 0) {
//             uv.setXY(i, 0.5, 0.5);
//             continue;
//         }
//         // θ: 天頂からの角度 [0, π/2]（y軸が上)
//         // φ: 方位角 [0, 2π]
//         const [theta, phi] = [Math.acos(y / r), Math.atan2(z, x)];

//         // ToDo: フィッシュアイ画像の極座標→UV変換
//         // フィッシュアイ画像の極座標→UV
//         // r_fish = θ / (π/2) ... θ=0で中心, θ=π/2で外周
//         const r_fish = theta / (Math.PI / 2);
//         // 画像中心(0.5,0.5)からのオフセット
//         const u = 0.5 + r_fish * Math.cos(phi) * 0.5;
//         const v = 0.5 + r_fish * Math.sin(phi) * 0.5;

//         uv.setXY(i, u, v);
//     }
//     uv.needsUpdate = true;
// }


// --------------------------------------------------------------


export default Canvas_3D;