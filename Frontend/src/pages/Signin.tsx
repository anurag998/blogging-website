import QuoteSpace from "../components/Quote"
import SignInComp from "../components/SignInComp"

export default function SignUp(){
    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
                <div> 
                    <SignInComp />
                </div>
                <div className="hidden lg:block">
                    <QuoteSpace></QuoteSpace>
                </div>
            </div>

    )
}