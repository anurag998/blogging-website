import QuoteSpace from "../components/Quote"
import SignupComp from "../components/SignUpComp"

export default function SignUp(){
    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
                <div> 
                    <SignupComp />
                </div>
                <div className="hidden lg:block">
                    <QuoteSpace></QuoteSpace>
                </div>
            </div>

    )
}