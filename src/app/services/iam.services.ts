import axios from "axios";
import { Request } from "express";
const blockServiceAPI = "http://misterloo.seliselocal.com";

const headers = {
    "Host": "misterloo.seliselocal.com",
    "Origin": `${blockServiceAPI}`,
    "Referer": `${blockServiceAPI}/login`
};

export const IAMService = async (req: Request) => {
    try {
        const params = new URLSearchParams(req.body);
        const formData = params.toString();

        const response = await axios.post(`${blockServiceAPI}/api/identity/v20/identity/token`, formData, {
            headers: {
                ...headers,
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response;
    } catch (error) {
        console.log("error throw from **IAMService IAM services**");
        throw error;
    }
}


export const loggedInUserData = async (req: Request) => {
    try {
        const response = await axios.get(`${blockServiceAPI}/api/identity/v20/identity/Authentication/GetLoggedInUser`, {
            headers: {
                ...headers,
                "Authorization": req.headers.authorization
            }
        });

        // console.log(response);
        return response.data;

    } catch (error: any) {
        console.log("error throw from **loggedInUserData IAM services**");
        return error;
    }
}