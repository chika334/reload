export declare type CoralWebhookData = {
    traceId: string;
    transactionType: string;
    amount: number;
    merchantId: string;
    channel: string;
    terminalId: string;
    subMerchantName: string;
    fullName?: string;
    email?: string;
};
export declare type CoralWebhookDataQuery = {
    transactionId: string;
    amount: number;
    merchantId: string;
    channel: string;
    terminalId: string;
};
export declare type Config = {
    jwtToken: string;
    url: string;
    fullName: string;
    email: string;
};
export declare type Response = {
    Reference: string;
    Amount: string;
    TransactionID: string;
    TraceID: string;
};
export declare type Bank = {
    bankName: string;
    code: string;
};
export declare type QueryProps = {
    Tnx: string;
    TraceID: string;
    TransactionID: string;
    UserID: string;
    amount: number;
    customer_mobile: string;
    institutionCode?: any;
    merchantId: string;
    reference: string;
    responseCode: string;
    responsemessage: any;
    retrievalReference: any;
    shortName: any;
    subMerchantName: string;
    terminalId: string;
};
