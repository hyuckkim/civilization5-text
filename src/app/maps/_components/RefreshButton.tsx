"use client";

import { useRouter } from "next/navigation";

export const RefreshButton = () => {
    const router = useRouter();

    const handleRevalidate = async () => {
        await fetch("/maps/refresh", {
            "method": "PUT"
        });
        router.push("/maps");
        
    }

    return (
        <button onClick={() => handleRevalidate()} className="m-2 px-2 py-1 rounded-md bg-sky-300">새로고침</button>
    );
}