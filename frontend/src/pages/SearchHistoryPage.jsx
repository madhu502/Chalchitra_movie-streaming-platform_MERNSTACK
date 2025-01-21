import axios from "axios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";

function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility state
  const [selectedEntry, setSelectedEntry] = useState(null); // Entry to be deleted

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        setSearchHistory(res.data.content);
      } catch (error) {
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/v1/search/history/${selectedEntry.id}`);
      setSearchHistory(
        searchHistory.filter((item) => item.id !== selectedEntry.id)
      );
      toast.success("Search item deleted successfully");
      setIsDialogOpen(false); // Close the dialog
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  const openDeleteDialog = (entry) => {
    setSelectedEntry(entry);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
    setSelectedEntry(null);
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {searchHistory?.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 p-4 rounded flex items-start"
            >
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History image"
                className="size-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-white text-lg">{entry.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatDate(entry.createdAt)}
                </span>
              </div>

              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
                  entry.searchType === "movie"
                    ? "bg-orange-600"
                    : entry.searchType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-orange-600 hover:text-orange-600"
                onClick={() => openDeleteDialog(entry)} // Open delete confirmation dialog
              />
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-orange-500">
              Confirm Delete
            </h2>
            <p className="text-blue-950 mb-6">
              Are you sure you want to delete "{selectedEntry?.title}" from your
              search history?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDeleteConfirm} // Confirm deletion
              >
                Delete
              </button>
              <button
                className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500"
                onClick={closeDeleteDialog} // Cancel deletion
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHistoryPage;
