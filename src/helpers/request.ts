import axios , {AxiosRequestConfig, CancelToken, AxiosRequestHeaders, AxiosResponse} from "axios";

//Required because window is added a new property
declare global {
    interface Window { Environment: any; }
}

interface RequestConfig {

    method: "get" | "post",
    url: string,
    data: { 
        email : string,
        password: string
    },
    baseURL? : string,
    headers? : AxiosRequestHeaders,
    params? : string,
    timeout? : number,
    cancelToken? : CancelToken,
    ignoreError? : boolean
}



export function makeRequest (config : RequestConfig) {
    return new Promise((resolve, reject) => {
        try {
            

            const requestConfig : AxiosRequestConfig = {
                method: config.method || "get",
                baseURL: config.baseURL ? config.baseURL : window.Environment.API_BASE,
                url: config.url,
                data: config.data,
                headers: config.headers ? config.headers : {},
                params: config.params,
                timeout: config.timeout ? config.timeout : 100000,
                cancelToken: config.cancelToken,
                validateStatus: () => false
            };

            axios(requestConfig).then((result) => {
                if (result && result.status >= 200 && result.status < 300) {
                    resolve(result);
                } else {
                    errorHandler(reject, result, config.ignoreError);
                }
            }).catch(error => {
                errorHandler(reject, error, config.ignoreError);
            });
        } catch (err) {
            reject(err);
        }
    });
}


export function errorHandler (reject : any, err : AxiosResponse | any,  ignoreError : boolean | undefined) {
    if (err.code === "ECONNABORTED") {
        console.log(JSON.stringify(err.data), 'Error Code:' + err.code, 5000);
        //  NotificationManager.error(JSON.stringify(err.data), 'Error Code:' + err.code, 5000);
        return reject(err);
    }

    if (err.message === 'message') {
        return reject('cannot connect to server');
    }

    let msg = JSON.stringify(err.data);

    switch (err.status) {
        case 401:
        case 503:
            //logout
            //AuthService.logout();
            window.location.href = "/";
            break;
        default:
            if (err && err.data && err.data.errors) {
                msg = "Input is invalid for " + Object.keys(err.data.errors).join(", ");
            } else if (err && err.data && err.data.error_message) {
                msg = err.data.error_message;
            }
            if (!ignoreError) {
                if (err && err.data && err.data.code) {
                   console.log(msg, 'Error Code:' + err.data.code, 5000);
                   // NotificationManager.error(msg, 'Error Code:' + err.data.code, 5000);
                }
            }
            return reject(err.data);
    }
    if (!ignoreError) {
        console.log(err.message, 'Error Occurred', 5000);
        //NotificationManager.error(err.message, 'Error Occurred', 5000);
    }
    return reject(err.message);
}