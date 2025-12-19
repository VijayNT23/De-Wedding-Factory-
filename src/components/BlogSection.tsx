import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Clock, Tag, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

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

const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchBlogs();
    fetchTags();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          titleRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          cardsRef.current?.children || [],
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [blogs]);

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const maxIndex = Math.max(0, blogs.length - 3);
      const nextIndex = Math.min(currentIndex + 1, maxIndex);
      setCurrentIndex(nextIndex);
      
      gsap.to(scrollContainerRef.current, {
        x: -nextIndex * 320, // 320px is the card width + gap
        duration: 0.8,
        ease: "power2.out"
      });
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const prevIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(prevIndex);
      
      gsap.to(scrollContainerRef.current, {
        x: -prevIndex * 320,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  };


  const fetchBlogs = async () => {
    try {
      const blogsQuery = query(
        collection(db, "blogs"),
        orderBy("date", "desc"),
        limit(6)
      );
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
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <section ref={sectionRef} className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-gray-300 font-light text-lg mt-4">Loading stories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section ref={sectionRef} className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="font-serif text-5xl md:text-7xl mb-6">
              Latest Stories & <span className="italic">Insights</span>
            </h2>
            <div className="w-24 h-px bg-white mx-auto mb-8" />
            
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
                We're working on bringing you amazing stories and insights about weddings, events, and celebrations. 
                Check back soon for our latest content!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/portfolio"
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-light tracking-widest overflow-hidden hover:text-white hover:tracking-wider transition-all duration-500"
                >
                  <span className="relative z-10 uppercase">View Our Portfolio</span>
                  <ArrowRight className="relative z-10 w-5 h-5" />
                  <div className="absolute inset-0 bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </Link>
                
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-4 px-8 py-4 border border-white text-white font-light tracking-widest overflow-hidden hover:bg-white hover:text-black transition-all duration-500"
                >
                  <span className="relative z-10 uppercase">Get In Touch</span>
                  <ArrowRight className="relative z-10 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-32 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-7xl mb-6">
            Latest Stories & <span className="italic">Insights</span>
          </h2>
        
        </div>

        <div ref={cardsRef} className="relative mb-16 overflow-hidden">
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden overflow-x-auto pb-4">
            <div className="flex gap-4 px-4">
              {blogs.map((blog) => {
                const blogTags = allTags.filter(tag => blog.tags?.includes(tag.id));
                
                return (
                  <div
                    key={blog.id}
                    onClick={() => setSelectedBlog(blog)}
                    className="group bg-gray-900 border border-gray-800 overflow-hidden hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105 flex-shrink-0 w-72 cursor-pointer"
                  >
                    {blog.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="font-serif text-xl mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                        {blog.title}
                      </h3>

                      <p className="text-gray-300 font-light leading-relaxed mb-4 line-clamp-2 text-sm">
                        {blog.excerpt}
                      </p>

                      {blogTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {blogTags.slice(0, 2).map((tag) => (
                            <span
                              key={tag.id}
                              className="flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-300 text-xs font-light tracking-wider rounded-full"
                            >
                              <Tag className="w-3 h-3" />
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span className="font-light">
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 text-gray-400 group-hover:text-yellow-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Carousel with navigation */}
          <div className="hidden md:flex justify-center">
            <div ref={scrollContainerRef} className="flex gap-8 justify-center">
              {blogs.map((blog) => {
              const blogTags = allTags.filter(tag => blog.tags?.includes(tag.id));
              
              return (
                <div
                  key={blog.id}
                  onClick={() => setSelectedBlog(blog)}
                  className="group bg-gray-900 border border-gray-800 overflow-hidden hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105 flex-shrink-0 w-80 cursor-pointer"
                >
                  {blog.imageUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="font-serif text-2xl mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                      {blog.title}
                    </h3>

                    <p className="text-gray-300 font-light leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {blogTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {blogTags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 text-xs font-light tracking-wider rounded-full"
                          >
                            <Tag className="w-3 h-3" />
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="font-light">
                          {new Date(blog.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 text-gray-400 group-hover:text-yellow-400" />
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
            
            {/* Navigation Buttons - Desktop Only */}
            <button
              onClick={scrollToPrev}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={scrollToNext}
              disabled={currentIndex >= Math.max(0, blogs.length - 3)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/portfolio"
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-light tracking-widest overflow-hidden hover:text-white hover:tracking-wider transition-all duration-500"
          >
            <span className="relative z-10 uppercase">View All Stories</span>
            <ArrowRight className="relative z-10 w-5 h-5" />
            <div className="absolute inset-0 bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </Link>
        </div>
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 z-[10000] p-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-full"
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
    </section>
  );
};

export default BlogSection;
