import crypto from "crypto";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/time.js";
import { Session } from "../models/session.js";

/**
 * Створює нову сесію для користувача
 * @param {String} userId - ID користувача
 * @returns {Promise<Session>}
 */
export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(30).toString("base64");
  const refreshToken = crypto.randomBytes(30).toString("base64");

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

/**
 * Встановлює кукі для сесії користувача
 * @param {Response} res - об’єкт відповіді Express
 * @param {Session} session - об’єкт сесії
 */
export const setSessionCookies = (res, session) => {
  const cookieOptionsAccess = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: FIFTEEN_MINUTES,
  };

  const cookieOptionsRefresh = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: ONE_DAY,
  };

  res.cookie("accessToken", session.accessToken, cookieOptionsAccess);
  res.cookie("refreshToken", session.refreshToken, cookieOptionsRefresh);
  res.cookie("sessionId", session._id, cookieOptionsRefresh);
};
