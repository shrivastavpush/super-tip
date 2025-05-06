import { google } from "googleapis";
import { NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/route";

// Format numbers for display (e.g., 1000 -> 1K)
function formatNumber(numStr) {
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return "0";

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }

    return num.toString();
}

// This is a server-side API route that will handle YouTube API calls
export async function GET() {
    try {
        // Get the session and check if the user is authenticated
        const session = await auth();

        // Log the session for debugging
        console.log("Session in YouTube API route:", {
            hasSession: !!session,
            hasAccessToken: !!session?.accessToken,
        });

        if (!session || !session.accessToken) {
            return NextResponse.json(
                { error: "Not authenticated or missing access token" },
                { status: 401 }
            );
        }

        // Initialize the YouTube API client with proper error handling
        const accessToken = session.accessToken;
        console.log("Using access token for YouTube API");

        const youtube = google.youtube({
            version: "v3",
            auth: new google.auth.OAuth2({
                credentials: { access_token: accessToken }
            }),
        });

        // Fetch the authenticated user's channel data
        const response = await youtube.channels.list({
            part: ["snippet", "statistics", "contentDetails"],
            mine: true,
        });

        const channel = response.data.items?.[0];

        if (!channel) {
            return NextResponse.json(
                { error: "No channel found for this user" },
                { status: 404 }
            );
        }

        // Return formatted channel data
        return NextResponse.json({
            title: channel.snippet?.title || "",
            description: channel.snippet?.description || "",
            subscriberCount: formatNumber(channel.statistics?.subscriberCount || "0"),
            viewCount: formatNumber(channel.statistics?.viewCount || "0"),
            videoCount: formatNumber(channel.statistics?.videoCount || "0"),
            thumbnailUrl: channel.snippet?.thumbnails?.high?.url || "",
        });
    } catch (error) {
        // Type guard for Google API errors
        const googleApiError = error;
        // Detailed error logging
        console.error("Error fetching YouTube channel data:", error);

        // Handle Google API specific errors
        if (googleApiError.response?.data?.error) {
            const apiError = googleApiError.response.data.error;
            console.error("Google API Error:", apiError);

            // Check if it's an API not enabled error
            if (apiError.status === 403 && apiError.message?.includes('has not been used')) {
                return NextResponse.json({
                    error: "YouTube API not enabled. Please enable the YouTube Data API v3 in your Google Cloud Console.",
                    details: apiError.message
                }
                );
            }
        }
    };
    // Detailed error logging
    console.error("Error fetching YouTube channel data:", error);

    // Handle Google API specific errors
    if (googleApiError.response?.data?.error) {
        const apiError = googleApiError.response.data.error;
        console.error("Google API Error:", apiError);

        // Check if it's an API not enabled error
        if (apiError.status === 403 && apiError.message?.includes('has not been used')) {
            return NextResponse.json({
                error: "YouTube API not enabled. Please enable the YouTube Data API v3 in your Google Cloud Console.",
                details: apiError.message
            }, { status: 403 });
        }

        // Other Google API errors
        return NextResponse.json({
            error: "YouTube API error: " + apiError.message,
            code: apiError.code || 500
        }, { status: apiError.code || 500 });
    }

    // Check if it's an authentication error
    if (error instanceof Error &&
        (error.message.includes('auth') || error.message.includes('token'))) {
        return NextResponse.json(
            { error: "Authentication error with YouTube API" },
            { status: 401 }
        );
    }

    return NextResponse.json(
        { error: "Failed to fetch YouTube channel data" },
        { status: 500 }
    );
}
