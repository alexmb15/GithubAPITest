import axios from "axios";

export let instance = axios.create({    
        baseURL: process.env.REACT_APP_GITHUB_BASE_URL,
        headers: {
            Authorization: process.env.REACT_APP_GITHUB_TOKEN
        }
    
});

/*
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

*/
