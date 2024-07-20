import Avatar from "./Avatar";

interface BlogCardType{
    authorName: string;
    publishedDate: string;
    title: string;
    description: string;
}

export default function BlogCard({authorName, publishedDate, title, description}: BlogCardType){
    return (
        <>
            <div className="h-full flex flex-row justify-center ">
                <div className="flex flex-col justify-center max-w-lg p-3 border-b-2">
                    <div className="flex flex-row items-baseline">
                        <Avatar name={authorName}></Avatar>
                        <div className="text-xl m-2 text-slate-500"> {authorName} </div>
                        <div className="text-xl m-2 font-extralight text-slate-500"> {publishedDate} </div>
                        

                    </div>
                    <div className="text-4xl mb-2 font-bold">{title}</div>
                    <div className="text-xl">{description.substring(0,100) + "..."}</div>

                </div>
            </div>
        </>
    )
}