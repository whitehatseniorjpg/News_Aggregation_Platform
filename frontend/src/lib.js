export const apibaseurl = "http://localhost:8000";

export const imgurl = "";

export function callApi(reqMethod, apiUrl, jsonData, formData, responseHandler, jwtToken = "") {

    console.log("FINAL URL =", apiUrl);

    const headers = {};

    if (jsonData)
        headers["Content-Type"] = "application/json";

    if (jwtToken)
        headers["Token"] = jwtToken;

    const options = {
        method: reqMethod,
        headers: headers,
        body: jsonData
            ? JSON.stringify(jsonData)
            : formData
            ? formData
            : undefined
    };

    fetch(apiUrl, options)
        .then((res) => {
            console.log("STATUS =", res.status);
            return res.json();
        })
        .then((data) => {
            console.log("RESPONSE =", data);
            responseHandler(data);
        })
        .catch((err) => {
            console.log("ERROR =", err);
            alert(err);
        });
}