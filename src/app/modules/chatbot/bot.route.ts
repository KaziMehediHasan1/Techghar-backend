import { botController } from "@/app/modules/chatbot/bot.controller.js";
import express from "express";

const route = express.Router();
route.post("/chat/:threadId", botController.handleBotChat);

const botRoute = route;
export default botRoute;
