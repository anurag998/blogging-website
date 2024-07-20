import Avatar from "./Avatar";


export default function Appbar(){
    return (
        <>
        <div className="flex justify-between px-20 border-b-2 py-2">
            <div className="font-extrabold text-4xl"> Blogging Website </div>
            <div className="flex flex-col justify-center">
            <Avatar name = "Anurag"></Avatar>
            </div>
            

        </div>
        </>
    )
}