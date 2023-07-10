import type { Express } from "express";

import { auth } from './auth'

export const routes = (app: Express) => {
  auth(app)
}