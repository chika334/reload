import Axios from "axios";
var URL = "https://www.poplarconnect.com";
export var firstRequest = function (body, setResponse) {
    Axios.post(URL + "/CoralUssd/api/webhooks/", body).then(function (res) {
        setResponse(res.data.ResponseDetails);
    });
};
export var queryRequest = function (body, setResult) {
    Axios.post(URL + "/CoralUssd/api/webhooks/query", body).then(function (res) {
        setResult(res.data);
    });
};
/* const tokenConfig = (token: any) => {
    var config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    if (token) {
        //config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}; */
//# sourceMappingURL=apis.js.map