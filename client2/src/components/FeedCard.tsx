// import { Feed } from "../types/feed";

// interface Props {
//   feed: Feed;
// }

// const FeedCard = ({ feed }: Props) => {
//   return (
//     <div className="border rounded-lg p-4 shadow-sm bg-white">
//       <p className="text-gray-800">{feed.content}</p>

//       <p className="text-sm text-gray-500 mt-2">
//         {new Date(feed.createdAt).toLocaleString()}
//       </p>
//     </div>
//   );
// };

// export default FeedCard;
import { Feed } from "../types/feed";

interface Props {
  feed: Feed;
}

const FeedCard = ({ feed }: Props) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition">
      <p className="text-gray-800 text-lg">
        {feed.content}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {new Date(
            feed.createdAt
          ).toLocaleString()}
        </p>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          Live
        </span>
      </div>
    </div>
  );
};

export default FeedCard;