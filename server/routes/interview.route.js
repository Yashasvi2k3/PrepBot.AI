import express from 'express';
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { analyzeResume } from "../controllers/interview.controller.js"
import { finishInterview, generateQuestion, submitAnswer, getInterviewReport, getMyInterviews } from "../controllers/interview.controller.js"


const interviewRouter = express.Router()



interviewRouter.post("/resume",isAuth,upload.single("resume"),analyzeResume)
interviewRouter.post("/generate-question",isAuth,generateQuestion)
interviewRouter.post("/submit-answer/:interviewId/:questionId",isAuth,submitAnswer)
interviewRouter.post("/finish-interview/:interviewId",isAuth,finishInterview)
interviewRouter.get("/get-interview",isAuth,getMyInterviews)
interviewRouter.get("/report/:id", isAuth,getInterviewReport)

export default interviewRouter;