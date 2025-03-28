import { useState } from "react";
import { motion } from "framer-motion";

export default function LostAndFound() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    type: "lost",
    title: "",
    description: "",
    location: "",
    contact: "",
    date: "",
  });
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.description ||
      !form.location ||
      !form.contact ||
      !form.date
    ) {
      alert("All fields are required.");
      return;
    }
    setItems([...items, { ...form, id: Date.now() }]);
    setForm({
      type: "lost",
      title: "",
      description: "",
      location: "",
      contact: "",
      date: "",
    });
    alert("Item reported successfully!");
  };

  const filteredItems = items.filter(
    (item) =>
      (item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())) &&
      (filterLocation
        ? item.location.toLowerCase() === filterLocation.toLowerCase()
        : true)
  );

  return (
    <div className="bg-gradient-to-r from-indigo-300 to-blue-400 min-h-screen flex flex-col">
      <motion.header
        className="bg-purple-700 text-white p-6 text-center text-3xl font-extrabold shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🎯 Welcome to the Lost & Found Portal 🎯
      </motion.header>

      <nav className="bg-yellow-400 p-4 text-white flex justify-between shadow-md">
        <h1 className="text-xl font-extrabold text-gray-800">
          🔍 Lost & Found
        </h1>
        <ul className="flex gap-6 font-semibold">
          <li>
            <a href="#" className="hover:text-gray-900">
              🏠 Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900">
              📝 Report
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-900">
              🔎 Search
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📦 Lost and Found Items
        </h1>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="🔍 Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />
          <input
            placeholder="📍 Filter by location..."
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <motion.div
          className="border p-6 bg-white shadow-lg rounded-lg mb-8"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-3">📢 Report an Item</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="border p-3 rounded-lg w-full"
            >
              <option value="lost">🚨 Lost</option>
              <option value="found">🎉 Found</option>
            </select>
            <input
              placeholder="✍️ Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border p-3 rounded-lg w-full"
            />
            <textarea
              placeholder="📝 Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-3 rounded-lg w-full"
            />
            <input
              placeholder="📍 Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="border p-3 rounded-lg w-full"
            />
            <input
              placeholder="📞 Contact Info"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className="border p-3 rounded-lg w-full"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-4 p-3 bg-blue-500 text-white rounded-lg w-full font-bold"
              type="submit"
            >
              🚀 Report
            </motion.button>
          </form>
        </motion.div>

        <div className="grid gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="border p-6 bg-white shadow-md rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold">
                {item.title} ({item.type === "lost" ? "🚨 Lost" : "🎉 Found"})
              </h3>
              <p>{item.description}</p>
              <p className="text-sm text-gray-500">
                📍 Location: {item.location} | 📅 Date: {item.date}
              </p>
              <p className="text-sm font-semibold">
                📞 Contact: {item.contact}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.footer
        className="bg-purple-700 text-white p-6 text-center mt-10 font-bold shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        © 2025 Lost & Found Portal. Built with ❤️ & 🚀
      </motion.footer>
    </div>
  );
}
