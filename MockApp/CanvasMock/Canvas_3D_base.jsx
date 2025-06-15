import React, { useEffect, useRef, FC, useState } from "react";
// npm install three @react-three/fiber @react-three/drei

export const Canvas_3D = () => {

    return (
        <>
            <h3>CanvasMock 3D</h3>
            <CanvasOn />
        </>
    )
};

const CanvasOn = () => {
    const canvasRef = useRef(null);//canvas要素取得


    useEffect(() => {
        // キャンバス要素の取得
        const canvas = canvasRef.current;
        // GL コンテキストを取得
        const gl = getGLContext(canvas);

        // クリアカラーを黒に設定し、完全に不透明する
        gl.clearColor(0, 0, 0, 1);
        // 指定されたクリアカラーでカラーバッファーをクリアする
        gl.clear(gl.COLOR_BUFFER_BIT);
        // 立方体を表示する


    }, []);

    return (
        <div style={{ border: '4px solid black' }}>
            <canvas ref={canvasRef}
                width={400}
                height={400}
            // onMouseDown={StartMove}
            // onMouseUp={EndMove}
            // onMouseMove={Move}
            />
        </div>
    )
};

const getGLContext = (canvas) => {
    // WebGL コンテキストを取得
    const gl = canvas?.getContext("webgl");
    if (!gl) {
        console.error("WebGL コンテキストを取得できません。");
        return null;
    }
    console.debug("WebGL コンテキストを取得しました。", gl);
    return gl;
};






export default Canvas_3D;