import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";


export const singlePageLoader = async ({ request, params }) => {
    const res = await apiRequest(`/post/${params.id}`);
    console.log(params.id)
    return res.data;
}

export const listPageLoader= async ({request, params})=>{
    const query = request.url.split("?")[1]
    const postPromise = await apiRequest("/post?" +params.id);
    return defer({
        postResponse: postPromise,
    });
}