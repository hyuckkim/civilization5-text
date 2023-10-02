import { check_icons, imageFileExistedInfo } from "@/check_icons";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps = (async (context) => {
    const dat = check_icons();
    return { props: { data: dat} };
}) satisfies GetStaticProps<{
    data: imageFileExistedInfo
}>;

export default function Page({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <div className="m-28 border border-black">
        <div className="border p-2">✅ success: {data.success}</div>
        <div className="border p-2">⚠️ fail: {data.fail}</div>
        <div className="border p-2">
            {data.log.map((e, key) => {
                return <div key={key}>{e}</div>
            })}
            </div>
    </div>;
}