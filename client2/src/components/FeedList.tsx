// "use client";

// import { useEffect, useState } from "react";

// import API from "../lib/api";
// import { socket } from "../lib/socket";

// import { Feed } from "../types/feed";

// import FeedCard from "./FeedCard";

// const FeedList = () => {
//   const [feeds, setFeeds] = useState<Feed[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchFeeds();

//     socket.connect();

//     socket.on("connect", () => {
//       console.log("✅ Socket connected");
//     });

//     socket.on("new-feed", (newFeed: Feed) => {
//       setFeeds((prevFeeds) => {
//         // Prevent duplicate events
//         const exists = prevFeeds.some(
//           (feed) => feed._id === newFeed._id
//         );

//         if (exists) return prevFeeds;

//         return [newFeed, ...prevFeeds];
//       });
//     });

//     return () => {
//       socket.off("new-feed");
//     };
//   }, []);

//   const fetchFeeds = async () => {
//     try {
//       setLoading(true);

//       const response = await API.get("/feed");

//       setFeeds(response.data.data);
//     } catch (err) {
//       console.error(err);

//       setError("Failed to load feeds");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center mt-10">
//         Loading feeds...
//       </p>
//     );
//   }

//   if (error) {
//     return (
//       <p className="text-center text-red-500 mt-10">
//         {error}
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {feeds.length === 0 ? (
//         <p>No feeds available</p>
//       ) : (
//         feeds.map((feed) => (
//           <FeedCard
//             key={feed._id}
//             feed={feed}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default FeedList;
"use client";

import { useEffect, useState } from "react";

import API from "../lib/api";
import { socket } from "../lib/socket";

import { Feed } from "../types/feed";

import FeedCard from "./FeedCard";

const FeedList = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    fetchFeeds();

    socket.connect();

    const onConnect = () => {
      console.log("✅ Socket connected");
      setConnected(true);
    };

    const onDisconnect = () => {
      console.log("❌ Socket disconnected");
      setConnected(false);
    };

    const onNewFeed = (newFeed: Feed) => {
      setFeeds((prevFeeds) => {
        // Prevent duplicate feeds
        const exists = prevFeeds.some(
          (feed) => feed._id === newFeed._id
        );

        if (exists) return prevFeeds;

        return [newFeed, ...prevFeeds];
      });
    };

    socket.on("connect", onConnect);

    socket.on("disconnect", onDisconnect);

    socket.on("new-feed", onNewFeed);

    return () => {
      socket.off("connect", onConnect);

      socket.off("disconnect", onDisconnect);

      socket.off("new-feed", onNewFeed);
    };
  }, []);

  const fetchFeeds = async () => {
    try {
      setLoading(true);

      const response = await API.get("/feed");

      setFeeds(response.data.data);
    } catch (err) {
      console.error(err);

      setError("Failed to load feeds");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading feeds...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        {error}
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-3 h-3 rounded-full ${
            connected
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />

        <p className="text-sm text-gray-600">
          {connected
            ? "Realtime Connected"
            : "Realtime Disconnected"}
        </p>
      </div>

      <div className="space-y-4">
        {feeds.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            No feeds available yet
          </div>
        ) : (
          feeds.map((feed) => (
            <FeedCard
              key={feed._id}
              feed={feed}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FeedList;