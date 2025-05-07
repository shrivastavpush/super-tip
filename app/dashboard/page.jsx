"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const metadata = {
  title: "Dashboard - View Your Tipping Data",
  description: "Dashboard page"
}

// Inlined: fetchYoutubeChannelData
async function fetchYoutubeChannelData() {
  try {
    const response = await fetch('/api/youtube', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching YouTube channel data:", error);
    throw new Error("Failed to fetch YouTube channel data");
  }
}

// Inlined: LoadingSpinner
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading your channel data...</p>
      </div>
    </div>
  );
}

// Inlined: ErrorMessage
function ErrorMessage({ error, onSignOut }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={onSignOut}
            className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// Inlined: UserProfile
function UserProfile({ image, name, onSignOut }) {
  return (
    <div className="flex items-center">
      {image && (
        <img
          src={image}
          alt={name || "User"}
          width={40}
          height={40}
          className="rounded-full mr-3"
          style={{ objectFit: 'cover' }}
        />
      )}
      <span className="text-sm text-gray-700 mr-4">{name}</span>
      <button
        onClick={onSignOut}
        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
}

// Inlined: ChannelCard
function ChannelCard({ thumbnailUrl, title, description }) {
  return (
    <div className="flex flex-col items-center">
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={title}
          width={120}
          height={120}
          className="rounded-full mb-4"
          style={{ objectFit: 'cover' }}
        />
      )}
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-2 text-sm text-center text-gray-600">{description}</div>
    </div>
  );
}

// Inlined: ChannelStats
function ChannelStats({ subscriberCount, viewCount, videoCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Subscribers</p>
        <p className="text-2xl font-bold">{subscriberCount}</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Total Views</p>
        <p className="text-2xl font-bold">{viewCount}</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Videos</p>
        <p className="text-2xl font-bold">{videoCount}</p>
      </div>
    </div>
  );
}

// Inlined: AnalyticsOverview
function AnalyticsOverview() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Analytics Overview</h3>
      <p className="text-gray-600">
        Additional analytics can be displayed here using YouTube Analytics API.
      </p>
      <div className="mt-4 p-6 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-center text-gray-500">
          Detailed analytics charts would appear here. This requires additional
          implementation using the YouTube Analytics API.
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [channelData, setChannelData] = useState(null);
  const [appStatus, setAppStatus] = useState('idle');
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
    if (status === "authenticated" && appStatus === 'idle') {
      setAppStatus('loading');
      fetchYoutubeChannelData()
        .then((data) => {
          setChannelData(data);
          setAppStatus('success');
        })
        .catch((err) => {
          if (err instanceof Error) {
            if (
              err.message.includes('Not authenticated') ||
              err.message.includes('Authentication error') ||
              err.message.includes('401')
            ) {
              setError("Authentication issue with YouTube. Please sign in again.");
              signOut({ callbackUrl: "/login" });
            } else {
              setError(`Failed to load your YouTube channel data: ${err.message}`);
            }
          } else {
            setError("Failed to load your YouTube channel data. Please try again.");
          }
          setAppStatus('error');
        });
    }
  }, [status, appStatus, router]);

  const handleSignOut = () => {
    setChannelData(null);
    setAppStatus('idle');
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading" || appStatus === 'loading') {
    return <LoadingSpinner />;
  }
  if (error || appStatus === 'error') {
    return <ErrorMessage error={error} onSignOut={handleSignOut} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">SuperTip Dashboard</h1>
          <UserProfile
            image={session?.user?.image || undefined}
            name={session?.user?.name || undefined}
            onSignOut={handleSignOut}
          />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {channelData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white shadow rounded-lg p-6">
              <ChannelCard
                thumbnailUrl={channelData.thumbnailUrl}
                title={channelData.title}
                description={channelData.description}
              />
            </div>
            <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Channel Statistics</h3>
              <ChannelStats
                subscriberCount={channelData.subscriberCount}
                viewCount={channelData.viewCount}
                videoCount={channelData.videoCount}
              />
            </div>
            <div className="lg:col-span-3">
              <AnalyticsOverview />
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p>No channel data available. Please check your YouTube channel access permissions.</p>
          </div>
        )}
      </main>
    </div>
  );
}