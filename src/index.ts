import express, { Express } from "express";
import * as dotenv from "dotenv";
import { prisma } from "./config/db";
import { codeSubmissionSchema } from "./utils/schema"
import { generateIdentifer } from  "./utils/helper"
const app: Express = express();

dotenv.config();

// Middleware for parsing request bodies
app.use(express.json());


app.get("/health-check", async (req, res) => {
  res.status(200).json({ success: true, data : { running: 'ok '} })
});

app.post("/submit", async (req, res) => {
  const payload = req?.body; // { username, lang, sourceCode, stdInput }
  try {
  const as = await codeSubmissionSchema.validateAsync(payload)  	
  } catch(err: any) {
  		console.log(123, 'validaiton err')
  		return res.status(400).json({success: false, error: err.message})
  }

  try {
  	  	const response  = await prisma.codeSubmission.create({ data: {...payload, id: generateIdentifer() } })

  	  	if(response) {
  	  		return res.status(200).json({success: true, data: { submissionId: response.id } })
  	  	}
  } catch (err : any) {
  		return res.status(400).json({success: false, error: err.message})
  }
});

app.get("/all", async (req, res) => {
  
  try {
  	  	const response  = await prisma.codeSubmission.findMany()
  	  	if(response) {
  	  		return res.status(200).json({success: true, data: { response } })
  	  	}
  } catch (err : any) {
  		return res.status(400).json({success: false, error: err.message})
  }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
