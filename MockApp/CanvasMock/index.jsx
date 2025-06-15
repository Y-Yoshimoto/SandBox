// モックアプリケーション
// モックコンポーネント読み込み
import { useState } from "react";
import { MockLayout } from "../../Components";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";

import Canvas_3D from './Canvas_3D'

// キャンパスを使用したモック
export const CanvasMock = () => {
    const options = ['Canvas_3D', 'Canvas_2D'];
    const [value, setValue] = useState(options[0]);


    return (
        <MockLayout>
            <h1>CanvasMock</h1>
            <ControlledRadioButtonsGroup value={value} setValue={setValue} options={options} />
            {value === 'Canvas_3D' && <Canvas_3D />}
        </MockLayout>
    )
};

// オプション選択
export const ControlledRadioButtonsGroup = ({ value, setValue, options }) => {
    return (
        <FormControl>
            <FormLabel id="controlled-radio-buttons-group">Mock</FormLabel>
            <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={e => setValue(e.target.value)}
            >
                {options.map(option => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

export default CanvasMock;