import axios from "axios";
import { Request } from "express";

export const IAMService = async (req: Request) => {
    try {
        const params = new URLSearchParams(req.body);
        const formData = params.toString();

        const response = await axios.post("http://misterloo.seliselocal.com/api/identity/v20/identity/token", formData, {
            headers: {
                'Origin': 'http://misterloo.seliselocal.com',
                'Referer': 'http://misterloo.seliselocal.com/login',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                "Host": "misterloo.seliselocal.com"
            },
        });

        return response;
    } catch (error) {
        throw error;
    }
}