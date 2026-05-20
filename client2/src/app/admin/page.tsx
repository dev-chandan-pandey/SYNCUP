import FeedForm from "../../components/FeedForm";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Admin Panel
          </h1>

          <a
            href="/"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Home
          </a>
        </div>

        <FeedForm />
      </div>
    </main>
  );
}