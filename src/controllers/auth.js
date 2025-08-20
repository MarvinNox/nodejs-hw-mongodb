import { date } from 'joi';
import {
    loginUser,
    logoutUser,
    refreshUserSession,
    registerUser,
} from '../services/auth.js'
import { FIFTEEN_DAYS } from '../constants/index.js';

export const registerUserController = async (req, res) => {
    const user = registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully register a User.',
        data: user,
    });
};

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken), {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    };

    res.cookie('sessionId', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    })

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const logoutUserController = async (req, res) => {
    await logoutUser(req.cookies.sessionId);

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + FIFTEEN_DAYS),
    });

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + FIFTEEN_DAYS),
    });
};

export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUserSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session',
        data: {
            accessToken: session.accessToken,
        },
    });
};