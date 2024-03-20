import express, { Express } from "express";
import * as dotenv from "dotenv";
import { prisma } from "./config/db";
import { codeSubmissionSchema } from "./utils/schema";
import { ONLINE_JUDGE_HEADERS, generateIdentifer } from "./utils/helper";
import axios from "axios";
const app: Express = express();
import cors from "cors";

dotenv.config();

// Middleware for parsing request bodies
app.use(express.json());
app.use(cors());

app.get("/health-check", async (req, res) => {
	res.status(200).json({ success: true, data: { running: "ok " } });
});

app.post("/submit", async (req, res) => {
	const payload = req?.body; // { username, lang, sourceCode, stdInput }
	try {
		const as = await codeSubmissionSchema.validateAsync(payload);
		console.log(4, payload);
	} catch (err: any) {
		console.log(123, "validaiton err");
		return res.status(400).json({ success: false, error: err.message });
	}

	try {
		const response = await prisma.codeSubmission.create({
			data: {
				...payload,
				id: generateIdentifer(),
				language_id: parseInt(payload.language_id, 10),
			},
		});

		if (response) {
			return res
				.status(200)
				.json({ success: true, data: { submissionId: response.id } });
		}
	} catch (err: any) {
		return res.status(400).json({ success: false, error: err.message });
	}
});

// get all submissions
app.get("/all", async (req, res) => {
	try {
		const response = await prisma.codeSubmission.findMany();
		if (response) {
			return res.status(200).json({ success: true, data: { response } });
		}
	} catch (err: any) {
		return res.status(400).json({ success: false, error: err.message });
	}
});

// createAsubmission
app.post("/run/:code_id", async (req, res) => {
	const { code_id } = req?.params;
	if (!code_id) {
		return res
			.json(400)
			.json({ success: false, error: "code_id not valid" });
	}

	try {
		const submission = await prisma.codeSubmission.findUnique({
			where: {
				id: code_id,
			},
		});

		console.log(1, { submission });

		const response = await axios.post(
			`${process.env.ONLINE_JUDGE_URL}/submissions`,
			{
				source_code: submission?.sourceCode,
				language_id: submission?.language_id,
				stdin: submission?.stdInput || "",
			},
			{
				headers: ONLINE_JUDGE_HEADERS,
			}
		);

		if (response) {
			const submissionToken = response.data.token;
			console.log(1, { submissionToken });
			const updateSubmission = await prisma.codeSubmission.updateMany({
				where: {
					id: code_id,
				},
				data: {
					submission_id: submissionToken,
				},
			});

			if (updateSubmission) {
				return res.status(200).json({
					success: true,
					data: {
						message: "Code running by Online Judge, Check Status",
					},
				});
			}
		}
	} catch (error) {
		console.log((error as Error).message);
		return res.json(400).json({ success: false, error: "Code not found" });
	}
});

// check_status
app.post("/status/:code_id", async (req, res) => {
	const { code_id } = req?.params;
	if (!code_id) {
		return res
			.json(400)
			.json({ success: false, error: "code_id not valid" });
	}

	try {
		const submission = await prisma.codeSubmission.findUnique({
			where: {
				id: code_id,
			},
		});

		const response = await axios.get(
			`${process.env.ONLINE_JUDGE_URL}/submissions/${submission?.submission_id}`,
			{
				headers: ONLINE_JUDGE_HEADERS,
			}
		);

		if (response) {
			console.log(23, response);
			return res.status(200).json({ success: true, data: response.data });
		}
	} catch (error) {
		console.log((error as Error).message);
		return res.status(400).json({
			success: false,
			error: (error as Error).message,
		});
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
