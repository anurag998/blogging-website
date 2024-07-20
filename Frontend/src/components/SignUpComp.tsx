import { Link } from "react-router-dom";
import { useState } from "react";
import { signupType } from "@fate007/blog-common";
import LabeledInput from "./LabeledInput";

interface pageType{
    page: string
}

export default function SignupComp(){
    const [inputs, setInputs] = useState<signupType>({
        name: "",
        email: "",
        password: ""
    });

    return (
        <>
            {/* <div>{inputs.name}  {inputs.email}  {inputs.password}</div> */}
            <div className="h-full flex flex-col justify-center"> 
                <div className="flex justify-center">
                    <div>
                        <div className="text-4xl font-bold m-2" > Create an account </div>
                        <div className="text-slate-500 text-lg m-2 mb-4"> Already have an account? <u> <Link to='/signin'>Sign In </Link></u> </div>
                        <LabeledInput labelName="Name" placeholder="Enter your name" inputType="text" onChange={(e) => {
                            setInputs((c)=>{
                                return ({...c,
                                    name: e.target.value,
                                });
                            });
                        }}></LabeledInput>

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
                            <button className="w-96 p-2 bg-black text-white rounded-lg"> Sign Up</button>
                        </div>
                    </div>
                </div>
        
            </div>
        </>
    );
}

