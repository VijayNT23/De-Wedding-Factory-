import React, { useState, useEffect } from "react";
import { Download, FileText, Image, Video, CheckCircle2 } from "lucide-react";
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface Brochure {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'image' | 'video';
  size: string;
  pages?: number;
  downloadUrl: string;
  previewUrl?: string;
  category: string;
  featured: boolean;
}

const DigitalBrochures: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloadStatus, setDownloadStatus] = useState<{[key: string]: 'idle' | 'downloading' | 'success'}>({});
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrochures();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: 'all', label: 'All Brochures', count: brochures.filter(b => !b.featured).length },
    { key: 'planning', label: 'Planning Guides', count: brochures.filter(b => b.category === 'planning' && !b.featured).length },
    { key: 'venues', label: 'Venues', count: brochures.filter(b => b.category === 'venues' && !b.featured).length },
    { key: 'traditions', label: 'Traditions', count: brochures.filter(b => b.category === 'traditions' && !b.featured).length },
    { key: 'inspiration', label: 'Inspiration', count: brochures.filter(b => b.category === 'inspiration' && !b.featured).length }
  ];

  const filteredBrochures = selectedCategory === 'all' 
    ? brochures.filter(brochure => !brochure.featured) // Exclude featured brochures from main list
    : brochures.filter(brochure => brochure.category === selectedCategory && !brochure.featured); // Exclude featured from category lists too

  const handleDownload = async (brochure: Brochure) => {
    setDownloadStatus(prev => ({ ...prev, [brochure.id]: 'downloading' }));
    
    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Convert Google Drive view URL to download URL
      let downloadUrl = brochure.downloadUrl;
      if (downloadUrl.includes('drive.google.com/file/d/')) {
        // Extract file ID from Google Drive URL
        const fileId = downloadUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (fileId) {
          downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
      }
      
      // Open in new tab for download
      window.open(downloadUrl, '_blank');
      
      setDownloadStatus(prev => ({ ...prev, [brochure.id]: 'success' }));
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [brochure.id]: 'idle' }));
      }, 3000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus(prev => ({ ...prev, [brochure.id]: 'idle' }));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-50';
      case 'image': return 'text-blue-600 bg-blue-50';
      case 'video': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl mb-6">
            Digital Brochures & Resources
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Download our comprehensive wedding planning resources, venue guides, and inspiration materials. 
            Everything you need to plan your wedding.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Brochures */}
        {selectedCategory === 'all' && (
          <div className="mb-16">
            <h3 className="font-serif text-3xl mb-8 text-center">Featured Resources</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brochures.filter(b => b.featured).slice(0, 1).map((brochure) => (
                <div key={brochure.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {brochure.previewUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={brochure.previewUrl}
                        alt={brochure.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeColor(brochure.type)}`}>
                          {getTypeIcon(brochure.type)}
                          {brochure.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h4 className="font-serif text-xl mb-3 group-hover:text-gray-600 transition-colors">
                      {brochure.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {brochure.description}
                    </p>
                    
                    

                    <button
                      onClick={() => handleDownload(brochure)}
                      disabled={downloadStatus[brochure.id] === 'downloading'}
                      className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {downloadStatus[brochure.id] === 'downloading' ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Downloading...
                        </>
                      ) : downloadStatus[brochure.id] === 'success' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Downloaded!
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            {/* All Brochures Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBrochures.map((brochure) => (
            <div key={brochure.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {brochure.previewUrl && (
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={brochure.previewUrl}
                    alt={brochure.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeColor(brochure.type)}`}>
                      {getTypeIcon(brochure.type)}
                      {brochure.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h4 className="font-serif text-lg mb-2 group-hover:text-gray-600 transition-colors">
                  {brochure.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {brochure.description}
                </p>
                
             

                <button
                  onClick={() => handleDownload(brochure)}
                  disabled={downloadStatus[brochure.id] === 'downloading'}
                  className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {downloadStatus[brochure.id] === 'downloading' ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                      Downloading...
                    </>
                  ) : downloadStatus[brochure.id] === 'success' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DigitalBrochures;
