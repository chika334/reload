import { Config, CoralWebhookData } from "../types";
export declare const coralWebHook: (config: Config, data: CoralWebhookData, setStatus: any) => Promise<any>;
export declare const coralWebHookQuery: (config: Config, data: any, setStatus: any) => Promise<any>;
export declare const tokenConfig: (token: string) => {
    headers: {
        "Content-Type": string;
    };
};
