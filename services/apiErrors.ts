const API_ERROR_CODES = {
    NETWORK_ERROR: "NETWORK_ERROR",
    INVALID_RESPONSE: "INVALID_RESPONSE",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    NOT_FOUND: "NOT_FOUND",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    TIMEOUT: "TIMEOUT",
    CONFLICT: "CONFLICT",
    SERVER_ERROR: "SERVER_ERROR"
} as const;

type ApiErrorCodes = typeof API_ERROR_CODES[keyof typeof API_ERROR_CODES];

const ErrorCodeResolver: Record<ApiErrorCodes, { title: string; message: string }> = {
    [API_ERROR_CODES.NETWORK_ERROR]: {
        title: "Network Error",
        message: "Please check your internet connection and try again."
    },
    [API_ERROR_CODES.INVALID_RESPONSE]: {
        title: "Invalid Response",
        message: "The server returned an unexpected response. Please try again later."
    },
    [API_ERROR_CODES.UNKNOWN_ERROR]: {
        title: "Unknown Error",
        message: "An unknown error occurred. Please try again later."
    },
    [API_ERROR_CODES.NOT_FOUND]: {
        title: "Not Found",
        message: "The requested resource was not found. Please contact support if you believe this is an error."
    },
    [API_ERROR_CODES.UNAUTHORIZED]: {
        title: "Unauthorized",
        message: "You are not authorized to access this resource. Please contact support if you believe this is an error."
    },
    [API_ERROR_CODES.FORBIDDEN]: {
        title: "Forbidden",
        message: "You do not have permission to access this resource. Please contact support if you believe this is an error."
    },
    [API_ERROR_CODES.TIMEOUT]: {
        title: "Request Timeout",
        message: "The request took too long to complete. Please try again later."
    },
    [API_ERROR_CODES.CONFLICT]: {
        title: "Conflict",
        message: "There was a conflict with your request. Please check your data and try again."
    },
    [API_ERROR_CODES.SERVER_ERROR]: {
        title: "Server Error",
        message: "The server encountered an error. Please try again later."
    }
}

const getErrorCode = (error: number): ApiErrorCodes => {
    switch (error) {
        case 400:
            return API_ERROR_CODES.INVALID_RESPONSE;
        case 401:
            return API_ERROR_CODES.UNAUTHORIZED;
        case 403:
            return API_ERROR_CODES.FORBIDDEN;
        case 404:
            return API_ERROR_CODES.NOT_FOUND;
        case 408:
            return API_ERROR_CODES.TIMEOUT;
        case 409:
            return API_ERROR_CODES.CONFLICT;
        case 500:
            return API_ERROR_CODES.SERVER_ERROR;
        case 0:
            return API_ERROR_CODES.NETWORK_ERROR;
        default:
            return API_ERROR_CODES.UNKNOWN_ERROR;
    }
}

class ApiError extends Error {
    constructor(code: ApiErrorCodes, title: string, message: string) {
        super(message);
        this.name = "ApiError";
        this.code = code;
        this.title = title || ErrorCodeResolver[code].title;
    }

    code: ApiErrorCodes;
    title: string;
}

const createApiError = (error: number | string): ApiError => {
    if (typeof error === "number") {
        const errorCode = getErrorCode(error);
        return new ApiError(errorCode, ErrorCodeResolver[errorCode].title, ErrorCodeResolver[errorCode].message);
    } else {
        return new ApiError(API_ERROR_CODES.UNKNOWN_ERROR,
            ErrorCodeResolver[API_ERROR_CODES.UNKNOWN_ERROR].title,
            ErrorCodeResolver[API_ERROR_CODES.UNKNOWN_ERROR].message);
    }
}

export { ApiError, createApiError, ApiErrorCodes, API_ERROR_CODES };