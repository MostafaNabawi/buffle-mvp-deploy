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
export { getaAllBreackPlan };