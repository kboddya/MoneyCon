export const errorDescription = (error: string) => {
    if (error.includes("401")) {
        return "Invalid API key. Please try again.";
    } else if (error.includes("404")) {
        return "The requested resource does not exist.";
    } else if (error.includes("101")) {
        return "No API Key was specified or an invalid API Key was specified.";
    } else if (error.includes("103")) {
        return "The requested API endpoint does not exist.";
    } else if (error.includes("104")) {
        return "The maximum allowed API amount of monthly API requests has been reached.";
    } else if (error.includes("105")) {
        return "The current subscription plan does not support this API endpoint.";
    } else if (error.includes("106")) {
        return "The current request did not return any results.";
    } else if (error.includes("102")) {
        return "The account this API request is coming from is inactive.";
    } else if (error.includes("201")) {
        return "An invalid base currency has been entered.";
    } else if (error.includes("202")) {
        return "One or more invalid symbols have been specified.";
    } else if (error.includes("301")) {
        return "No date has been specified.";
    } else if (error.includes("302")) {
        return "An invalid date has been specified.";
    } else if (error.includes("403")) {
        return "No or an invalid amount has been specified.";
    } else if (error.includes("501")) {
        return "No or an invalid timeframe has been specified.";
    } else if (error.includes("502")) {
        return "No or an invalid \"start_date\" has been specified.";
    } else if (error.includes("503")) {
        return "No or an invalid \"end_date\" has been specified.";
    } else if (error.includes("504")) {
        return "An invalid timeframe has been specified.";
    } else if (error.includes("505")) {
        return "The specified timeframe is too long, exceeding 365 days.";
    } else if (error.includes("429")) {
        return "The maximum allowed API amount of requests per minute has been reached.";
    } else {
        console.log("Unknown error:", error);
        return "An unknown error occurred. Please try again.";
    }
}