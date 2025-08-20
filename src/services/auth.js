import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js'
import { FIFTEEN_DAYS, FIFTEEN_MINUTES } from '../constants/index.js'
import createHttpError from 'http-errors';
import e from 'express';

export const registerUser = async (payload) => {
    const user = await UsersCollection.findOne({
        email: payload.email,
    });

    if (user) {
        throw createHttpError(409, 'Email allready registed.');
    };

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await UsersCollection.create({
        ...payload, password: encryptedPassword,
    });
};

export const loginUser = async ({ email, password }) => {
    const user = await UsersCollection.findOne({ email: email });

    if (!user) {
        throw createHttpError(401, 'User with given credentials does not exist!');
    };

    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual) {
        throw createHttpError(401, 'User with given credentials does not exist!');
    };

    await SessionCollection.deleteOne({ userId: user._id });

    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    const session = await SessionCollection.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + FIFTEEN_DAYS),
    });

    return session;
};

export const logoutUser = async (sessionId) => {
    await SessionCollection.findByIdAndDelete(sessionId);
};

export const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    const session = {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + FIFTEEN_DAYS),
    };

    return session;
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
    const session = await SessionCollection.findOne({ _id: sessionId });

    if (!session) {
        throw createHttpError(401, 'Session not found.');
    }

    const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

    if (isSessionTokenExpired) {
        throw createHttpError(401, 'Session token expired.')
    };

    await SessionCollection.deleteOne({
        _id: sessionId,
        refreshToken,
    });

    const newSession = createSession();

    return await SessionCollection.create({
        userId: session.userId,
        ...newSession,
    });
};