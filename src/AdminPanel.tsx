import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";
import { signOut } from "firebase/auth";

interface Blog {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  author: string;
  date: string;
  postNumber: number;
  published: boolean;
  slug: string;
  tags: string[];
}

interface Tag {
  id?: string;
  name: string;
  slug: string;
}

interface PortfolioItem {
  id?: string;
  image: string;
  title: string;
  couple: string;
  location: string;
  guests: string;
  date: string;
  category: "wedding" | "party";
  description: string;
  highlights: string[];
}

interface Brochure {
  id?: string;
  title: string;
  description: string;
  type: 'pdf' | 'image' | 'video';
  size: string;
  pages?: number;
  downloadUrl: string;
  previewUrl?: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

interface Toast {
  type: "success" | "error";
  message: string;
}

const AdminPanel: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  
  // Blog states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  
  // Portfolio states
  const [portfolioImage, setPortfolioImage] = useState("");
  const [portfolioImageFile, setPortfolioImageFile] = useState<File | null>(null);
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [portfolioCouple, setPortfolioCouple] = useState("");
  const [portfolioLocation, setPortfolioLocation] = useState("");
  
  // Brochure states
  const [brochureTitle, setBrochureTitle] = useState("");
  const [brochureDescription, setBrochureDescription] = useState("");
  const [brochureType, setBrochureType] = useState<'pdf' | 'image' | 'video'>('pdf');
  const [brochureCategory, setBrochureCategory] = useState("planning");
  const [brochureFeatured, setBrochureFeatured] = useState(false);
  const [brochureDownloadUrl, setBrochureDownloadUrl] = useState("");
  const [brochurePreviewFile, setBrochurePreviewFile] = useState<File | null>(null);
  const [portfolioGuests, setPortfolioGuests] = useState("");
  const [portfolioDate, setPortfolioDate] = useState("");
  const [portfolioCategory, setPortfolioCategory] = useState<"wedding" | "party">("wedding");
  const [portfolioDescription, setPortfolioDescription] = useState("");
  const [portfolioHighlights, setPortfolioHighlights] = useState<string[]>([""]);
  
  const [newTagName, setNewTagName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"blogs" | "portfolio" | "tags" | "brochures">("blogs");

  // Fetch data
  const fetchBlogs = async () => {
    try {
      const blogsQuery = query(collection(db, "blogs"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(blogsQuery);
      const blogData: Blog[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        blogData.push({ 
          id: doc.id, 
          title: data.title || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          imageUrl: data.imageUrl,
          author: data.author || "Admin",
          date: data.date || "",
          postNumber: data.postNumber || 1,
          published: data.published !== undefined ? data.published : true,
          slug: data.slug || "",
          tags: data.tags || []
        } as Blog);
      });

      setBlogs(blogData);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setToast({ type: "error", message: "Failed to fetch blogs" });
    }
  };

  const fetchPortfolioItems = async () => {
    try {
      const portfolioQuery = query(collection(db, "portfolioItems"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(portfolioQuery);
      const itemsData: PortfolioItem[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        itemsData.push({ 
          id: doc.id,
          image: data.image || "",
          title: data.title || "",
          couple: data.couple || "",
          location: data.location || "",
          guests: data.guests || "",
          date: data.date || "",
          category: data.category || "wedding",
          description: data.description || "",
          highlights: data.highlights || []
        } as PortfolioItem);
      });

      // For admin panel, only show database items (not static samples)
      setPortfolioItems(itemsData);
    } catch (err) {
      console.error("Error fetching portfolio items:", err);
      setToast({ type: "error", message: "Failed to fetch portfolio items" });
    }
  };

  const fetchTags = async () => {
    try {
      const tagsQuery = query(collection(db, "tags"), orderBy("name"));
      const querySnapshot = await getDocs(tagsQuery);
      const tagData: Tag[] = [];
      
      querySnapshot.forEach((doc) => {
        tagData.push({ id: doc.id, ...doc.data() } as Tag);
      });

      setTags(tagData);
    } catch (err) {
      console.error("Error fetching tags:", err);
      setToast({ type: "error", message: "Failed to fetch tags" });
    }
  };

  const fetchBrochures = async () => {
    try {
      const brochuresQuery = query(collection(db, "brochures"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(brochuresQuery);
      const brochuresData: Brochure[] = [];
      
      querySnapshot.forEach((doc) => {
        brochuresData.push({ id: doc.id, ...doc.data() } as Brochure);
      });

      setBrochures(brochuresData);
    } catch (err) {
      console.error("Error fetching brochures:", err);
      setToast({ type: "error", message: "Failed to fetch brochures" });
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchPortfolioItems();
    fetchTags();
    fetchBrochures();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "deweddingfactory");

      const cloudName = "dzxphkhxg";
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error(data.error?.message || "Image upload failed");
      }
      
      return data.secure_url;
    } catch (error: any) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading || isSubmitting) {
      return;
    }
    
    setLoading(true);
    setIsSubmitting(true);
    
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setIsSubmitting(false);
      setToast({ type: "error", message: "Submission timed out. Please try again." });
    }, 30000);

    try {
      if (!title.trim()) {
        throw new Error("Title is required");
      }
      if (!content.trim()) {
        throw new Error("Content is required");
      }

      let imageUrl = "";

      if (blogImageFile) {
        try {
          imageUrl = await uploadImage(blogImageFile);
        } catch (uploadError: any) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      }

      const slug = generateSlug(title);
      const blogData: any = {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || content.substring(0, 150) + "...",
        author: author.trim() || "Admin",
        published: true,
        slug,
        tags: selectedTags,
        date: new Date().toISOString(),
      };

      if (imageUrl) {
        blogData.imageUrl = imageUrl;
      }

      if (editingBlogId) {
        await updateDoc(doc(db, "blogs", editingBlogId), blogData);
        setToast({ type: "success", message: "Blog updated successfully!" });
      } else {
        const nextPostNumber = blogs.length > 0 
          ? Math.max(...blogs.map(b => b.postNumber || 0)) + 1 
          : 1;

        blogData.postNumber = nextPostNumber;
        await addDoc(collection(db, "blogs"), blogData);
        setToast({ type: "success", message: "Blog added successfully!" });
      }

      resetBlogForm();
      
      if (!editingBlogId) {
        await fetchBlogs();
      }
    } catch (err: any) {
      const errorMessage = err.message || (editingBlogId ? "Failed to update blog" : "Failed to add blog");
      setToast({ type: "error", message: errorMessage });
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const resetBlogForm = () => {
    setTitle("");
    setContent("");
    setExcerpt("");
    setAuthor("Admin");
    setSelectedTags([]);
    setBlogImageFile(null);
    setEditingBlogId(null);
  };

  const handleEditBlog = (blog: Blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setExcerpt(blog.excerpt || "");
    setAuthor(blog.author || "Admin");
    setSelectedTags(blog.tags || []);
    setEditingBlogId(blog.id || null);
    setBlogImageFile(null);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteDoc(doc(db, "blogs", id));
      setToast({ type: "success", message: "Blog deleted successfully!" });
      fetchBlogs();
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to delete blog" });
    }
  };

  const handleBrochureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!brochureTitle.trim()) {
        throw new Error("Title is required");
      }
      if (!brochureDownloadUrl.trim()) {
        throw new Error("Download URL is required");
      }

      if (brochureFeatured) {
        const existingFeatured = brochures.find(b => b.featured);
        if (existingFeatured) {
          throw new Error("Only one brochure can be featured at a time. Please unfeature the existing one first.");
        }
      }

      let previewUrl = "";
      if (brochurePreviewFile) {
        try {
          previewUrl = await uploadImage(brochurePreviewFile);
        } catch (uploadError: any) {
          throw new Error(`Preview image upload failed: ${uploadError.message}`);
        }
      }

      const brochureData: any = {
        title: brochureTitle.trim(),
        description: brochureDescription.trim(),
        type: brochureType,
        size: "",
        downloadUrl: brochureDownloadUrl.trim(),
        category: brochureCategory,
        featured: brochureFeatured,
        createdAt: new Date().toISOString()
      };

      if (previewUrl) {
        brochureData.previewUrl = previewUrl;
      }
      if (brochureType === 'pdf') {
        brochureData.pages = 0;
      }

      await addDoc(collection(db, "brochures"), brochureData);
      setToast({ type: "success", message: "Brochure added successfully!" });
      resetBrochureForm();
      fetchBrochures();
    } catch (err: any) {
      const errorMessage = err.message || "Failed to add brochure";
      setToast({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const resetBrochureForm = () => {
    setBrochureTitle("");
    setBrochureDescription("");
    setBrochureType("pdf");
    setBrochureCategory("planning");
    setBrochureFeatured(false);
    setBrochureDownloadUrl("");
    setBrochurePreviewFile(null);
  };

  const handleDeleteBrochure = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this brochure?")) return;
    try {
      await deleteDoc(doc(db, "brochures", id));
      setToast({ type: "success", message: "Brochure deleted successfully!" });
      fetchBrochures();
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to delete brochure" });
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      if (currentFeatured) {
        // Unfeature this brochure
        await updateDoc(doc(db, "brochures", id), { featured: false });
        setToast({ type: "success", message: "Brochure unfeatured successfully!" });
      } else {
        // Check if another brochure is already featured
        const existingFeatured = brochures.find(b => b.featured && b.id !== id);
        if (existingFeatured) {
          setToast({ type: "error", message: "Only one brochure can be featured at a time. Please unfeature the existing one first." });
          return;
        }
        // Feature this brochure
        await updateDoc(doc(db, "brochures", id), { featured: true });
        setToast({ type: "success", message: "Brochure featured successfully!" });
      }
      fetchBrochures();
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to update brochure" });
    }
  };

  // Portfolio Functions
  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = portfolioImage; // Keep existing image if editing

      // Upload new image if provided
      if (portfolioImageFile) {
        console.log("Uploading portfolio image to Cloudinary...");
        try {
          imageUrl = await uploadImage(portfolioImageFile);
          console.log("Portfolio image uploaded successfully:", imageUrl);
        } catch (uploadError: any) {
          console.error("Portfolio image upload failed:", uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      }

      const portfolioData: PortfolioItem = {
        image: imageUrl,
        title: portfolioTitle,
        couple: portfolioCouple,
        location: portfolioLocation,
        guests: portfolioGuests,
        date: portfolioDate,
        category: portfolioCategory,
        description: portfolioDescription,
        highlights: portfolioHighlights.filter(h => h.trim() !== "")
      };

      if (editingPortfolioId) {
        const { id, ...portfolioUpdateData } = portfolioData as any;
        await updateDoc(doc(db, "portfolioItems", editingPortfolioId), portfolioUpdateData);
        setToast({ type: "success", message: "Portfolio item updated successfully!" });
      } else {
        await addDoc(collection(db, "portfolioItems"), portfolioData);
        setToast({ type: "success", message: "Portfolio item added successfully!" });
      }

      resetPortfolioForm();
      await fetchPortfolioItems();
    } catch (err) {
      console.error("Error saving portfolio item:", err);
      setToast({ type: "error", message: editingPortfolioId ? "Failed to update portfolio item" : "Failed to add portfolio item" });
    } finally {
      setLoading(false);
    }
  };

  const resetPortfolioForm = () => {
    setPortfolioImage("");
    setPortfolioImageFile(null);
    setPortfolioTitle("");
    setPortfolioCouple("");
    setPortfolioLocation("");
    setPortfolioGuests("");
    setPortfolioDate("");
    setPortfolioCategory("wedding");
    setPortfolioDescription("");
    setPortfolioHighlights([""]);
    setEditingPortfolioId(null);
  };

  const handleEditPortfolio = (item: PortfolioItem) => {
    setPortfolioImage(item.image);
    setPortfolioTitle(item.title);
    setPortfolioCouple(item.couple);
    setPortfolioLocation(item.location);
    setPortfolioGuests(item.guests);
    setPortfolioDate(item.date);
    setPortfolioCategory(item.category);
    setPortfolioDescription(item.description);
    setPortfolioHighlights(item.highlights.length > 0 ? item.highlights : [""]);
    setEditingPortfolioId(item.id || null);
  };

  const handleDeletePortfolio = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this portfolio item?")) return;
    try {
      await deleteDoc(doc(db, "portfolioItems", id));
      setToast({ type: "success", message: "Portfolio item deleted successfully!" });
      fetchPortfolioItems();
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to delete portfolio item" });
    }
  };

  const addHighlight = () => {
    setPortfolioHighlights([...portfolioHighlights, ""]);
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...portfolioHighlights];
    newHighlights[index] = value;
    setPortfolioHighlights(newHighlights);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = portfolioHighlights.filter((_, i) => i !== index);
    setPortfolioHighlights(newHighlights.length > 0 ? newHighlights : [""]);
  };

  // Tag Functions
  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    try {
      const slug = generateSlug(newTagName);
      
      const existingTag = tags.find(tag => tag.slug === slug);
      if (existingTag) {
        setToast({ type: "error", message: "Tag already exists" });
        return;
      }

      await addDoc(collection(db, "tags"), {
        name: newTagName.trim(),
        slug: slug,
      });

      setNewTagName("");
      setToast({ type: "success", message: "Tag added successfully!" });
      fetchTags();
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to add tag" });
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) return;
    try {
      await deleteDoc(doc(db, "tags", id));
      setToast({ type: "success", message: "Tag deleted successfully!" });
      fetchTags();
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to delete tag" });
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/admin-login";
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {toast && (
        <div
          className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } animate-fade-in`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-serif italic">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("blogs")}
          className={`px-4 py-2 font-medium ${
            activeTab === "blogs" 
              ? "border-b-2 border-black text-black" 
              : "text-gray-500"
          }`}
        >
          Blogs ({blogs.length})
        </button>
        <button
          onClick={() => setActiveTab("portfolio")}
          className={`px-4 py-2 font-medium ${
            activeTab === "portfolio" 
              ? "border-b-2 border-black text-black" 
              : "text-gray-500"
          }`}
        >
          Portfolio ({portfolioItems.length})
        </button>
        <button
          onClick={() => setActiveTab("tags")}
          className={`px-4 py-2 font-medium ${
            activeTab === "tags" 
              ? "border-b-2 border-black text-black" 
              : "text-gray-500"
          }`}
        >
          Tags ({tags.length})
        </button>
        <button
          onClick={() => setActiveTab("brochures")}
          className={`px-4 py-2 font-medium ${
            activeTab === "brochures" 
              ? "border-b-2 border-black text-black" 
              : "text-gray-500"
          }`}
        >
          Brochures ({brochures.length})
        </button>
      </div>

      {activeTab === "blogs" ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-serif mb-4">
              {editingBlogId ? "Edit Blog" : "Add New Blog"}
            </h2>
            <form onSubmit={handleBlogSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
              <input
                type="text"
                placeholder="Blog Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              
              <textarea
                placeholder="Blog Excerpt (optional)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                rows={3}
              />
              
              <textarea
                placeholder="Blog Content *"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                rows={6}
                required
              />

              <input
                type="text"
                placeholder="Author *"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              {tags.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Tags:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id!)}
                        className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                          selectedTags.includes(tag.id!)
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-black"
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Image (optional):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBlogImageFile(e.target.files?.[0] || null)}
                  className="w-full"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex justify-center items-center ${
                    (loading || isSubmitting) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {(loading || isSubmitting) ? (
                    <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                  ) : null}
                  {(loading || isSubmitting) 
                    ? (editingBlogId ? "Updating..." : "Adding...") 
                    : (editingBlogId ? "Update Blog" : "Add Blog")
                  }
                </button>

                {editingBlogId && (
                  <button
                    type="button"
                    onClick={resetBlogForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:border-black transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="border rounded overflow-hidden shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in bg-white"
              >
                {blog.imageUrl && (
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-400">#{blog.postNumber}</span>
                  <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{blog.excerpt}</p>
                  
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {blog.tags.map(tagId => {
                        const tag = tags.find(t => t.id === tagId);
                        return tag ? (
                          <span key={tagId} className="px-2 py-1 bg-gray-100 text-xs rounded">
                            {tag.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-400 mb-2">
                    By {blog.author} • {blog.date ? new Date(blog.date).toLocaleDateString() : ""}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="bg-black hover:bg-gray-700 text-white px-2 py-1 rounded transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => blog.id && handleDeleteBlog(blog.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : activeTab === "portfolio" ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-serif mb-4">
              {editingPortfolioId ? "Edit Portfolio Item" : "Add New Portfolio Item"}
            </h2>
            <form onSubmit={handlePortfolioSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPortfolioImageFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              
              <input
                type="text"
                placeholder="Event Title *"
                value={portfolioTitle}
                onChange={(e) => setPortfolioTitle(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              <input
                type="text"
                placeholder="Couple Names *"
                value={portfolioCouple}
                onChange={(e) => setPortfolioCouple(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              <input
                type="text"
                placeholder="Location *"
                value={portfolioLocation}
                onChange={(e) => setPortfolioLocation(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              <input
                type="text"
                placeholder="Number of Guests *"
                value={portfolioGuests}
                onChange={(e) => setPortfolioGuests(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              <input
                type="text"
                placeholder="Date (e.g., March 2024) *"
                value={portfolioDate}
                onChange={(e) => setPortfolioDate(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              <select
                value={portfolioCategory}
                onChange={(e) => setPortfolioCategory(e.target.value as "wedding" | "party")}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="wedding">Wedding</option>
                <option value="party">Party</option>
              </select>

              <textarea
                placeholder="Event Description *"
                value={portfolioDescription}
                onChange={(e) => setPortfolioDescription(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                rows={4}
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Highlights:
                </label>
                {portfolioHighlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Highlight ${index + 1}`}
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {portfolioHighlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="bg-red-500 text-white px-3 rounded hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addHighlight}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors text-sm"
                >
                  + Add Highlight
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex justify-center items-center ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                  ) : null}
                  {loading 
                    ? (editingPortfolioId ? "Updating..." : "Adding...") 
                    : (editingPortfolioId ? "Update Portfolio Item" : "Add Portfolio Item")
                  }
                </button>

                {editingPortfolioId && (
                  <button
                    type="button"
                    onClick={resetPortfolioForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:border-black transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="border rounded overflow-hidden shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in bg-white"
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.category === 'wedding' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-lg mb-2 mt-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{item.couple}</p>
                  <p className="text-gray-500 text-xs mb-2">{item.location} • {item.date}</p>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPortfolio(item)}
                      className="bg-black hover:bg-gray-700 text-white px-2 py-1 rounded transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => item.id && handleDeletePortfolio(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : activeTab === "brochures" ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-serif mb-4">Add New Brochure</h2>
            <form onSubmit={handleBrochureSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
              <input
                type="text"
                placeholder="Brochure Title *"
                value={brochureTitle}
                onChange={(e) => setBrochureTitle(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              
              <textarea
                placeholder="Brochure Description *"
                value={brochureDescription}
                onChange={(e) => setBrochureDescription(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                rows={3}
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={brochureType}
                  onChange={(e) => setBrochureType(e.target.value as 'pdf' | 'image' | 'video')}
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="image">Image Gallery</option>
                  <option value="video">Video</option>
                </select>

                <select
                  value={brochureCategory}
                  onChange={(e) => setBrochureCategory(e.target.value)}
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="planning">Planning Guides</option>
                  <option value="venues">Venues</option>
                  <option value="traditions">Traditions</option>
                  <option value="inspiration">Inspiration</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={brochureFeatured}
                    onChange={(e) => setBrochureFeatured(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Featured Brochure</span>
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Download URL * (Google Drive, Dropbox, etc.)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view"
                    value={brochureDownloadUrl}
                    onChange={(e) => setBrochureDownloadUrl(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload your file to Google Drive, then copy the shareable link here
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => setBrochurePreviewFile(e.target.files?.[0] || null)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: Upload a preview image (will be optimized via Cloudinary)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex justify-center items-center ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                  ) : null}
                  {loading ? "Adding..." : "Add Brochure"}
                </button>

                <button
                  type="button"
                  onClick={resetBrochureForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:border-black transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brochures.map((brochure) => (
              <div
                key={brochure.id}
                className="border rounded overflow-hidden shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in bg-white"
              >
                {brochure.previewUrl && (
                  <img src={brochure.previewUrl} alt={brochure.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      brochure.category === 'planning' ? 'bg-blue-100 text-blue-800' : 
                      brochure.category === 'venues' ? 'bg-green-100 text-green-800' :
                      brochure.category === 'traditions' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {brochure.category}
                    </span>
                    {brochure.featured && (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{brochure.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{brochure.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="uppercase font-medium">{brochure.type}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">{brochure.category}</span>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    <a
                      href={brochure.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors text-sm"
                    >
                      Download
                    </a>
                    <button
                      onClick={() => brochure.id && handleToggleFeatured(brochure.id, brochure.featured)}
                      className={`px-2 py-1 rounded transition-colors text-sm ${
                        brochure.featured 
                          ? 'bg-yellow-500 hover:bg-yellow-700 text-white' 
                          : 'bg-gray-500 hover:bg-gray-700 text-white'
                      }`}
                    >
                      {brochure.featured ? 'Unfeature' : 'Feature'}
                    </button>
                    <button
                      onClick={() => brochure.id && handleDeleteBrochure(brochure.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* Add Tag Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-serif mb-4">Add New Tag</h2>
            <form onSubmit={handleAddTag} className="flex gap-4">
              <input
                type="text"
                placeholder="Tag Name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Add Tag
              </button>
            </form>
          </div>

          {/* Tags List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-serif mb-4">All Tags ({tags.length})</h2>
            {tags.length === 0 ? (
              <p className="text-gray-500">No tags yet. Create your first tag above.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="border rounded p-4 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{tag.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({tag.slug})</span>
                    </div>
                    <button
                      onClick={() => tag.id && handleDeleteTag(tag.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;