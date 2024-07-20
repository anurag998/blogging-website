import { Link } from "react-router-dom";
import { useState } from "react";
import { signinType } from "@fate007/blog-common";
import LabeledInput from "./LabeledInput";
import axios from "axios";

export default function SignInComp(){
    const [inputs, setInputs] = useState<signinType>({
        email: "",
        password: ""
    });

    return (
        <>
            {/* <div>  {inputs.email}  {inputs.password}</div> */}
            <div className="h-full flex flex-col justify-center"> 
                <div className="flex justify-center">
                    <div>

                            <div className="text-4xl font-bold m-2" > Sign In </div>

                        <div className="text-slate-500 text-lg m-2 mb-4"> Don't have an account? <u> <Link to='/signup'>Sign up for free </Link></u> </div>

                        <LabeledInput labelName="Email" placeholder="jon.doe@example.com" inputType="text" onChange={(e) => {
                            setInputs((c)=>{
                                return ({...c,
                                    email: e.target.value,
                                });
                            });
                        }}></LabeledInput>

                        <LabeledInput labelName="Password" placeholder="" inputType="password" onChange={(e) => {
                            setInputs((c)=>{
                                return ({...c,
                                    password: e.target.value,
                                });
                            });
                        }}></LabeledInput>
                        <div className="m-2 mt-4">
                            <button className="w-96 p-2 bg-black text-white rounded-lg" onClick={()=> {
                                const postResp = await axios.post("")
                            }}> Sign In</button>
                        </div>
                    </div>
                </div>
        
            </div>
        </>
    );
}


