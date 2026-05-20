import FeedList from "../components/FeedList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            SyncUp Feed
          </h1>

          <a
            href="/admin"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Admin
          </a>
        </div>

        <FeedList />
      </div>
    </main>
  );
}