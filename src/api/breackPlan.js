import { API_URL } from "../config";

// get all breack plan for user
const getaAllBreackPlan = async () => {
    try {
        const req = await fetch(`${API_URL}/breakPlan/get`)
        return req;
    } catch (error) {
        console.log("Error get Plan", error)
    }
}
// Create new plan 
const CreateNewPlan = async (data) => {
    try {
        const req = await fetch(`${API_URL}/breakPlan/new`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                time: data.createIime,
                name: data.title
            })
        })
        return req
    } catch (error) {
        return console.log(error);
    }
}
export { getaAllBreackPlan, CreateNewPlan };