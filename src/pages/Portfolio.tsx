import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import portfolioHeroImage from "../assets/images/portfolio-hero.jpg";
import beachWeddingImage from "../assets/images/beach-wedding.jpg";
import sangeetNightImage from "../assets/images/sangeet-night.jpg";
import anniversaryCelebrationImage from "../assets/images/anniversary-celebration.jpg";
import {
  ExternalLink,
  MapPin,
  Users,
  Calendar,
  Heart,
  ArrowRight,
  Tag,
  Clock,
  X,
} from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  author: string;
  slug: string;
  published: boolean;
  date: string;
  postNumber: number;
  tags?: string[];
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface PortfolioItem {
  id: string;
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

const Portfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchData();
    fetchPortfolioItems();
  }, []);

  useEffect(() => {
    if (blogs.length > 0 || portfolioItems.length > 0) {
      const ctx = gsap.context(() => {
        const blogCards = gsap.utils.toArray(".blog-card");
        
        const portfolioCards = gsap.utils.toArray(".portfolio-card");
        
        blogCards.forEach((card: any, index) => {
          gsap.fromTo(
            card,
            {
              y: 80,
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
              delay: index * 0.1,
            }
          );
        });

        portfolioCards.forEach((card: any, index) => {
          gsap.fromTo(
            card,
            {
              y: 80,
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
              delay: index * 0.1,
            }
          );
        });
      }, blogsRef);

      return () => ctx.revert();
    }
  }, [blogs, portfolioItems]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchBlogs(), fetchTags()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
          image: data.image || portfolioHeroImage,
          title: data.title || "Untitled Event",
          couple: data.couple || "Couple Name",
          location: data.location || "Location",
          guests: data.guests || "0 guests",
          date: data.date || "2024",
          category: data.category || "wedding",
          description: data.description || "No description available",
          highlights: data.highlights || []
        } as PortfolioItem);
      });

      // Combine database items with static sample items
      const combinedItems = [...itemsData, ...samplePortfolioItems];
      setPortfolioItems(combinedItems);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      setPortfolioItems(samplePortfolioItems);
    }
  };

  const fetchBlogs = async () => {
    try {
      const blogsQuery = query(collection(db, "blogs"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(blogsQuery);
      
      const blogsData: Blog[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        blogsData.push({ 
          id: doc.id, 
          title: data.title || "Untitled",
          content: data.content || "",
          excerpt: data.excerpt || (data.content ? data.content.substring(0, 150) + "..." : "No excerpt available"),
          imageUrl: data.imageUrl || data.image_url,
          author: data.author || "Admin",
          slug: data.slug || generateSlug(data.title || "untitled"),
          published: data.published !== undefined ? data.published : true,
          date: data.date || new Date().toISOString(),
          postNumber: data.postNumber || 1,
          tags: data.tags || []
        } as Blog);
      });

      const publishedBlogs = blogsData.filter(blog => blog.published === true);
      setBlogs(publishedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  const fetchTags = async () => {
    try {
      const tagsQuery = query(collection(db, "tags"), orderBy("name"));
      const querySnapshot = await getDocs(tagsQuery);
      const tagsData: Tag[] = [];
      
      querySnapshot.forEach((doc) => {
        tagsData.push({ id: doc.id, ...doc.data() } as Tag);
      });

      setAllTags(tagsData);
    } catch (error) {
      console.error("Error fetching tags:", error);
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

  const filteredBlogs = selectedTag
    ? blogs.filter((blog) => blog.tags && blog.tags.includes(selectedTag))
    : blogs;

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const samplePortfolioItems: PortfolioItem[] = [
    {
      id: "1",
      image: portfolioHeroImage,
      title: "Traditional Rajasthani Wedding",
      couple: "Sarah & James Mitchell",
      location: "City Palace, Jaipur",
      guests: "300 guests",
      date: "March 2024",
      category: "wedding",
      description: "A magnificent 3-day celebration for an American-British couple featuring traditional Rajasthani ceremonies in the stunning City Palace of Jaipur.",
      highlights: [
        "Traditional Baraat procession",
        "Mandap ceremony in marble courtyard",
        "Royal feast for 300 guests",
        "Classical dance performances",
      ],
    },
    {
      id: "2",
      image: beachWeddingImage,
      title: "Beachside Paradise Wedding",
      couple: "Emma & Raj Patel",
      location: "Taj Exotica, Goa",
      guests: "150 guests",
      date: "January 2024",
      category: "wedding",
      description: "Intimate beachside ceremony for a Canadian couple with sunset vows and tropical elegance.",
      highlights: [
        "Sunset beach ceremony",
        "Tropical floral arrangements",
        "Beachfront reception",
        "Fire dance performances",
      ],
    },
    {
      id: "3",
      image: sangeetNightImage,
      title: "Bollywood Sangeet Night",
      couple: "Priya & Arjun Sharma",
      location: "The Taj Mahal Palace",
      guests: "200 guests",
      date: "February 2024",
      category: "party",
      description: "Vibrant Sangeet celebration with Bollywood theme and professional choreography.",
      highlights: [
        "Bollywood choreography",
        "Live music performances",
        "Traditional costumes",
        "Dance competitions",
      ],
    },
    {
      id: "4",
      image: anniversaryCelebrationImage,
      title: "Lake Palace Dream Wedding",
      couple: "Sophie & Michael Brown",
      location: "Lake Palace, Udaipur",
      guests: "250 guests",
      date: "December 2023",
      category: "wedding",
      description: "Fairy-tale wedding for an Australian couple in the romantic Lake Palace of Udaipur.",
      highlights: [
        "Lake Palace venue",
        "Boat procession",
        "Fireworks display",
        "Royal dining experience",
      ],
    },
  ];

  const filters = [
    { key: "all", label: "All Events" },
    { key: "wedding", label: "Weddings" },
    { key: "party", label: "Parties" },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="Wedding Portfolio Vizag | Luxury Event Gallery | International Couples"
        description="Explore our stunning wedding portfolio featuring luxury celebrations for international couples in Vizag and across India. See our work with traditional Indian weddings, destination ceremonies, and bespoke events."
        keywords="wedding portfolio vizag, event gallery india, luxury wedding photos, international couples portfolio, destination wedding gallery, indian wedding showcase, wedding planners portfolio, event planning gallery"
        canonical="https://deweddingfactory.com/portfolio"
      />
      {/* Hero Section with Scroll Animation */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img
            src={portfolioHeroImage}
            alt="Portfolio"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center text-white px-6">
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center justify-center gap-4 mb-8">
             
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl mb-6 lg:mb-8">
              Portfolio &<br />
              <span className="italic text-gray-300">Stories</span>
            </h1>
          </motion.div>

          <motion.div className="w-24 h-px bg-white mx-auto mb-6 lg:mb-8" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 1, delay: 0.5 }} />

          <motion.p className="text-lg md:text-xl lg:text-2xl font-light text-gray-200 tracking-wide max-w-2xl mx-auto" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
            Discover the magic we've created for couples from around the world
          </motion.p>
        </motion.div>
      </section>

      <section ref={sectionRef} className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-7xl mb-6">
                Celebrating Love Stories
              </h2>
              <div className="w-24 h-px bg-black mx-auto mb-8" />
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Each celebration tells a unique story of love, culture, and joy
              </p>
            </div>

            <div className="flex justify-center mb-16 flex-wrap gap-4">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-8 py-3 font-light tracking-wider transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-black text-white"
                      : "border border-black text-black hover:bg-gray-100"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-32">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group cursor-pointer portfolio-card"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="relative overflow-hidden mb-6 h-[500px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{item.couple}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-8 right-8">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-serif text-3xl mb-3 group-hover:translate-x-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={blogsRef} className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-7xl mb-6">
              All Stories & Insights
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Complete collection of wedding inspiration, planning tips, and destination guides
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              <p className="text-gray-500 font-light text-lg mt-4">Loading blogs...</p>
            </div>
          ) : (
            <>
              {allTags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-6 py-2 border font-light tracking-wider transition-all duration-300 ${
                      !selectedTag
                        ? "bg-black text-white border-black"
                        : "border-black/20 text-gray-600 hover:border-black"
                    }`}
                  >
                    All
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => setSelectedTag(tag.id)}
                      className={`px-6 py-2 border font-light tracking-wider transition-all duration-300 ${
                        selectedTag === tag.id
                          ? "bg-black text-white border-black"
                          : "border-black/20 text-gray-600 hover:border-black"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              )}

              {filteredBlogs.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 font-light text-lg mb-4">
                    {blogs.length === 0 ? "No blog posts found." : "No blog posts match the selected tag."}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-10">
                  {filteredBlogs.map((blog) => {
                    const blogTags = allTags.filter(tag => blog.tags?.includes(tag.id));
                    
                    return (
                      <div
                        key={blog.id}
                        className="blog-card bg-white border border-black/10 overflow-hidden hover:border-black transition-all duration-300 group cursor-pointer"
                        onClick={() => setSelectedBlog(blog)}
                      >
                        {blog.imageUrl && (
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={blog.imageUrl}
                              alt={blog.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                          </div>
                        )}
                        <div className="p-8">
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span className="font-light">
                                {new Date(blog.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <span className="font-light">#{blog.postNumber}</span>
                          </div>

                          <h3 className="font-serif text-2xl mb-4 group-hover:translate-x-1 transition-transform duration-300">
                            {blog.title}
                          </h3>

                          <p className="text-gray-600 font-light leading-relaxed mb-6">
                            {blog.excerpt}
                          </p>

                          {blogTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {blogTags.map((tag) => (
                                <span
                                  key={tag.id}
                                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-xs font-light tracking-wider"
                                >
                                  <Tag className="w-3 h-3" />
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 font-light">
                              By {blog.author}
                            </span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            Create Your Own Story
          </h3>
          <div className="w-24 h-px bg-white mx-auto mb-8" />
          <p className="text-xl font-light mb-12 text-gray-300 leading-relaxed">
            Ready to join our portfolio of extraordinary celebrations? Let us
            create an unforgettable experience that reflects your unique love
            story.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-light tracking-widest hover:bg-gray-200 transition-colors"
          >
            <span>START YOUR JOURNEY</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Portfolio Item Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-6xl w-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 z-10 p-3 bg-black text-white hover:bg-gray-800 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="grid md:grid-cols-2">
              <img
                src={filteredItems[selectedImage].image}
                alt={filteredItems[selectedImage].title}
                className="w-full h-96 md:h-full object-cover"
              />
              <div className="p-12">
                <h3 className="font-serif text-4xl mb-6">
                  {filteredItems[selectedImage].title}
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 flex-shrink-0" />
                    <span className="font-light">
                      {filteredItems[selectedImage].couple}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span className="font-light">
                      {filteredItems[selectedImage].location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 flex-shrink-0" />
                    <span className="font-light">
                      {filteredItems[selectedImage].date}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-8 font-light leading-relaxed">
                  {filteredItems[selectedImage].description}
                </p>
                <div>
                  <h4 className="font-serif text-2xl mb-4">Event Highlights</h4>
                  <ul className="space-y-3">
                    {filteredItems[selectedImage].highlights.map(
                      (highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 flex-shrink-0"></div>
                          <span className="font-light text-gray-700">
                            {highlight}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 z-10 p-3 bg-black text-white hover:bg-gray-800 transition-colors"
              onClick={() => setSelectedBlog(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            {selectedBlog.imageUrl && (
              <img
                src={selectedBlog.imageUrl}
                alt={selectedBlog.title}
                className="w-full h-96 object-cover"
              />
            )}
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-light">
                    {new Date(selectedBlog.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span className="font-light">#{selectedBlog.postNumber}</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl mb-6">
                {selectedBlog.title}
              </h1>

              <div className="flex items-center gap-4 mb-8 text-sm text-gray-600">
                <span className="font-light">By {selectedBlog.author}</span>
              </div>

              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed text-lg font-light"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedBlog.content.replace(/\n/g, '<br/>') 
                  }}
                />
              </div>

              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-serif text-xl mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map(tagId => {
                      const tag = allTags.find(t => t.id === tagId);
                      return tag ? (
                        <span
                          key={tagId}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm font-light tracking-wider"
                        >
                          <Tag className="w-3 h-3" />
                          {tag.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;