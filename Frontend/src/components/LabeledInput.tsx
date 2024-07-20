import { ChangeEvent } from "react";

interface labeledInputType {
    labelName: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    inputType: string
}

export default function LabeledInput({labelName, placeholder, onChange, inputType}: labeledInputType){
    return (
        <>
        <label className="m-2 font-semibold"> {labelName} </label>
            <div className="m-2">
                <input onChange={onChange} type = {inputType} className="border-2 p-2 rounded-md w-96" placeholder={placeholder}></input>
            </div>
        </>
    );
}