import { v4 as uuidv4 } from "uuid";

export const generateIdentifer = () => {
	const uuid = uuidv4();
	return uuid.replace(/-/g, "").substring(0, 5);
};

export const ONLINE_JUDGE_HEADERS = {
	"X-RapidAPI-Key": process.env.ONLINE_JUDGE_APIKEY,
	"X--RapidAPI-Host": process.env.ONLINE_JUDGE_HOST,
};
