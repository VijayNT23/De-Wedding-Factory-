import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  X,
  Camera,
  Hotel,
  Utensils,
  Sparkles,
  ArrowRight,
  Clock,
  Thermometer,
  Plane,
} from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Destination {
  id: number;
  name: string;
  location: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  bestTime: string;
  duration: string;
  guestCapacity: string;
  rating: number;
  climate: string;
  highlights: string[];
  venues: {
    name: string;
    type: string;
    capacity: string;
  }[];
  accommodation: {
    name: string;
    type: string;
    rooms: string;
  }[];
  cuisine: string[];
  activities: string[];
  priceRange: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Udaipur",
    location: "Rajasthan, India",
    tagline: "City of Lakes & Royal Heritage",
    description:
      "Experience the epitome of royal luxury in the Venice of the East. Udaipur's majestic palaces, serene lakes, and rich cultural heritage create an enchanting backdrop for your dream wedding.",
    image: "https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg",
    gallery: [
      "https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg",
      "https://images.pexels.com/photos/12498906/pexels-photo-12498906.jpeg",
      "https://images.pexels.com/photos/14383421/pexels-photo-14383421.jpeg",
      "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg",
    ],
    bestTime: "October - March",
    duration: "3-5 Days",
    guestCapacity: "50-500",
    rating: 4.9,
    climate: "Warm & Pleasant",
    highlights: [
      "Lake Pichola boat ceremonies",
      "Historic palace venues",
      "Traditional Rajasthani performances",
      "Royal processions with elephants",
    ],
    venues: [
      { name: "City Palace", type: "Heritage Palace", capacity: "300-500" },
      { name: "Jagmandir Island", type: "Lake Palace", capacity: "150-250" },
      { name: "Oberoi Udaivilas", type: "Luxury Resort", capacity: "200-400" },
    ],
    accommodation: [
      { name: "Taj Lake Palace", type: "5-Star Heritage", rooms: "65" },
      { name: "Leela Palace", type: "Luxury Resort", rooms: "80" },
      { name: "Trident Udaipur", type: "Premium Hotel", rooms: "142" },
    ],
    cuisine: [
      "Traditional Rajasthani Thali",
      "Laal Maas",
      "Dal Baati Churma",
      "Contemporary Indian Fusion",
    ],
    activities: [
      "Vintage car city tours",
      "Private boat rides on Lake Pichola",
      "Cultural folk dance performances",
      "Royal spa experiences",
    ],
    priceRange: "$50,000 - $250,000",
  },
  {
    id: 2,
    name: "Goa",
    location: "Goa, India",
    tagline: "Tropical Beach Paradise",
    description:
      "Celebrate your love with sun, sand, and sea. Goa offers stunning beaches, Portuguese architecture, vibrant nightlife, and a perfect blend of relaxation and celebration.",
    image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg",
    gallery: [
      "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg",
      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
      "https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg",
      "https://images.pexels.com/photos/3155605/pexels-photo-3155605.jpeg",
    ],
    bestTime: "November - February",
    duration: "2-4 Days",
    guestCapacity: "30-300",
    rating: 4.8,
    climate: "Tropical Beach",
    highlights: [
      "Beachfront sunset ceremonies",
      "Portuguese chapel weddings",
      "Yacht parties and cruises",
      "Beach bonfire celebrations",
    ],
    venues: [
      { name: "Alila Diwa", type: "Beach Resort", capacity: "200-300" },
      { name: "Park Hyatt", type: "Luxury Resort", capacity: "150-250" },
      { name: "Three Kings Chapel", type: "Heritage Church", capacity: "100" },
    ],
    accommodation: [
      { name: "Taj Exotica", type: "5-Star Resort", rooms: "140" },
      { name: "W Goa", type: "Luxury Resort", rooms: "160" },
      { name: "Grand Hyatt", type: "Premium Resort", rooms: "314" },
    ],
    cuisine: [
      "Goan Seafood Delicacies",
      "Vindaloo & Xacuti",
      "Beach BBQ",
      "International Fusion",
    ],
    activities: [
      "Water sports adventures",
      "Sunset yacht cruises",
      "Beach parties with DJs",
      "Spice plantation tours",
    ],
    priceRange: "$30,000 - $150,000",
  },
  {
    id: 3,
    name: "Jaipur",
    location: "Rajasthan, India",
    tagline: "The Pink City's Royal Grandeur",
    description:
      "Step into a fairy tale in India's Pink City. Jaipur's magnificent forts, palaces, and vibrant culture offer an authentic royal wedding experience steeped in tradition.",
    image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg",
    gallery: [
      "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg",
      "https://images.pexels.com/photos/3679481/pexels-photo-3679481.jpeg",
      "https://images.pexels.com/photos/14511564/pexels-photo-14511564.jpeg",
      "https://images.pexels.com/photos/9207876/pexels-photo-9207876.jpeg",
    ],
    bestTime: "October - March",
    duration: "3-5 Days",
    guestCapacity: "100-800",
    rating: 4.9,
    climate: "Dry & Pleasant",
    highlights: [
      "Fort Amber grand entrances",
      "Elephant processions",
      "Traditional Rajasthani ceremonies",
      "Heritage palace venues",
    ],
    venues: [
      { name: "City Palace", type: "Royal Palace", capacity: "500-800" },
      { name: "Samode Palace", type: "Heritage Hotel", capacity: "200-300" },
      { name: "Rambagh Palace", type: "Luxury Palace", capacity: "300-500" },
    ],
    accommodation: [
      { name: "Taj Rambagh Palace", type: "Heritage Palace", rooms: "78" },
      { name: "Fairmont Jaipur", type: "5-Star Resort", rooms: "245" },
      { name: "ITC Rajputana", type: "Luxury Hotel", rooms: "218" },
    ],
    cuisine: [
      "Royal Rajasthani Cuisine",
      "Laal Maas & Gatte Ki Sabzi",
      "Traditional Thali",
      "Mughlai Delicacies",
    ],
    activities: [
      "Hot air balloon rides",
      "Heritage fort tours",
      "Traditional puppet shows",
      "Gem and jewelry shopping",
    ],
    priceRange: "$40,000 - $200,000",
  },
  {
    id: 4,
    name: "Kerala",
    location: "Kerala, India",
    tagline: "God's Own Country",
    description:
      "Immerse yourself in lush tropical beauty. Kerala's serene backwaters, pristine beaches, and verdant hill stations create an intimate, nature-embraced celebration.",
    image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg",
    gallery: [
      "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg",
      "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg",
      "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
      "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg",
    ],
    bestTime: "September - March",
    duration: "3-4 Days",
    guestCapacity: "30-250",
    rating: 4.7,
    climate: "Tropical & Humid",
    highlights: [
      "Houseboat wedding ceremonies",
      "Backwater venue settings",
      "Traditional Kerala Sadhya",
      "Kathakali performances",
    ],
    venues: [
      { name: "Kumarakom Lake Resort", type: "Backwater Resort", capacity: "150-200" },
      { name: "Taj Bekal", type: "Beach Resort", capacity: "100-150" },
      { name: "Coconut Lagoon", type: "Heritage Resort", capacity: "80-120" },
    ],
    accommodation: [
      { name: "Leela Kovalam", type: "5-Star Resort", rooms: "183" },
      { name: "Taj Malabar", type: "Heritage Hotel", rooms: "96" },
      { name: "Vivanta Bekal", type: "Luxury Resort", rooms: "71" },
    ],
    cuisine: [
      "Traditional Kerala Sadhya",
      "Seafood specialties",
      "Appam with Stew",
      "Coastal delicacies",
    ],
    activities: [
      "Houseboat cruises",
      "Ayurvedic spa treatments",
      "Tea plantation visits",
      "Elephant sanctuary tours",
    ],
    priceRange: "$25,000 - $120,000",
  },
  {
    id: 5,
    name: "Agra",
    location: "Uttar Pradesh, India",
    tagline: "City of Eternal Love",
    description:
      "Celebrate your love story in the shadow of the world's greatest monument to love. Agra offers Mughal grandeur and timeless romance for your special day.",
    image: "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg",
    gallery: [
      "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg",
      "https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg",
      "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg",
      "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg",
    ],
    bestTime: "October - March",
    duration: "2-3 Days",
    guestCapacity: "50-400",
    rating: 4.6,
    climate: "Moderate",
    highlights: [
      "Taj Mahal sunrise photoshoots",
      "Mughal-inspired ceremonies",
      "Heritage fort venues",
      "Royal garden settings",
    ],
    venues: [
      { name: "The Oberoi Amarvilas", type: "Luxury Hotel", capacity: "200-300" },
      { name: "ITC Mughal", type: "Heritage Hotel", capacity: "300-400" },
      { name: "Courtyard Marriott", type: "Premium Hotel", capacity: "150-250" },
    ],
    accommodation: [
      { name: "Oberoi Amarvilas", type: "5-Star Luxury", rooms: "102" },
      { name: "Taj Hotel & Convention", type: "Premium", rooms: "294" },
      { name: "Jaypee Palace", type: "Luxury Hotel", rooms: "341" },
    ],
    cuisine: [
      "Mughlai Specialties",
      "Tandoori Delicacies",
      "Petha & Sweet Dishes",
      "North Indian Cuisine",
    ],
    activities: [
      "Taj Mahal private tours",
      "Mehtab Bagh sunset views",
      "Agra Fort exploration",
      "Marble inlay workshops",
    ],
    priceRange: "$35,000 - $180,000",
  },
  {
    id: 6,
    name: "Rishikesh",
    location: "Uttarakhand, India",
    tagline: "Spiritual Serenity by the Ganges",
    description:
      "Exchange vows in the foothills of the Himalayas. Rishikesh offers a spiritual, serene setting with riverside ceremonies and adventure activities for a unique celebration.",
    image: "https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg",
    gallery: [
      "https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg",
      "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg",
      "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg",
      "https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg",
    ],
    bestTime: "September - November, March - May",
    duration: "2-3 Days",
    guestCapacity: "20-150",
    rating: 4.5,
    climate: "Cool Mountain",
    highlights: [
      "Riverside mandap ceremonies",
      "Mountain backdrop settings",
      "Ganga Aarti blessings",
      "Adventure activities for guests",
    ],
    venues: [
      { name: "Ananda in the Himalayas", type: "Wellness Resort", capacity: "100-150" },
      { name: "Aloha on the Ganges", type: "Boutique Resort", capacity: "80-100" },
      { name: "Taj Rishikesh", type: "Luxury Resort", capacity: "100-120" },
    ],
    accommodation: [
      { name: "Ananda Spa Resort", type: "Luxury Wellness", rooms: "75" },
      { name: "Taj Rishikesh", type: "Premium Resort", rooms: "79" },
      { name: "Aloha Resort", type: "Boutique", rooms: "58" },
    ],
    cuisine: [
      "Sattvic Vegetarian Cuisine",
      "North Indian Specialties",
      "Organic Farm-to-Table",
      "International Healthy Options",
    ],
    activities: [
      "White water rafting",
      "Yoga and meditation sessions",
      "Bungee jumping",
      "Temple visits and Aarti ceremonies",
    ],
    priceRange: "$20,000 - $100,000",
  },
  {
    id: 7,
    name: "Manali",
    location: "Himachal Pradesh, India",
    tagline: "Himalayan Wonderland",
    description:
      "Nestled in the mountains, Manali offers breathtaking views, adventure, and a serene atmosphere for a memorable wedding. Perfect for couples who love nature and cool climates.",
    image: "https://images.pexels.com/photos/3155661/pexels-photo-3155661.jpeg",
    gallery: [
      "https://images.pexels.com/photos/3155661/pexels-photo-3155661.jpeg",
      "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg",
      "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
      "https://images.pexels.com/photos/670111/pexels-photo-670111.jpeg"
    ],
    bestTime: "October - February",
    duration: "3-5 Days",
    guestCapacity: "30-200",
    rating: 4.6,
    climate: "Cool & Mountainous",
    highlights: [
      "Snowy mountain wedding backdrops",
      "Adventure activities for guests",
      "Riverside ceremonies in scenic valleys",
      "Traditional Himachali culture experiences"
    ],
    venues: [
      { name: "Manali Resorts", type: "Mountain Resort", capacity: "50-150" },
      { name: "Solang Valley Retreat", type: "Boutique Resort", capacity: "30-80" },
      { name: "The Himalayan Hotel", type: "Luxury Resort", capacity: "80-200" }
    ],
    accommodation: [
      { name: "The Himalayan Resort", type: "Luxury Resort", rooms: "72" },
      { name: "Manali Adventure Lodge", type: "Premium Hotel", rooms: "45" },
      { name: "Solang Valley Resort", type: "Boutique", rooms: "32" }
    ],
    cuisine: [
      "North Indian & Himachali Specialties",
      "Traditional Mountain Cuisine",
      "Continental & Fusion Options",
      "Organic Local Ingredients"
    ],
    activities: [
      "Skiing and snow adventures",
      "Paragliding and trekking",
      "Hot air balloon rides",
      "Village cultural tours"
    ],
    priceRange: "$15,000 - $80,000"
},
{
    id: 8,
    name: "Andaman Islands",
    location: "Andaman & Nicobar, India",
    tagline: "Tropical Island Paradise",
    description:
      "Celebrate your wedding surrounded by turquoise waters and pristine beaches. The Andaman Islands offer an intimate, exotic, and unforgettable wedding experience.",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    gallery: [
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg",
      "https://images.pexels.com/photos/236578/pexels-photo-236578.jpeg",
      "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg"
    ],
    bestTime: "November - March",
    duration: "2-4 Days",
    guestCapacity: "20-150",
    rating: 4.8,
    climate: "Tropical & Humid",
    highlights: [
      "Beachfront wedding ceremonies",
      "Snorkeling and scuba diving for guests",
      "Sunset cruises and yacht parties",
      "Exotic tropical landscapes"
    ],
    venues: [
      { name: "Havelock Beach Resort", type: "Beach Resort", capacity: "50-120" },
      { name: "Barefoot at Havelock", type: "Boutique Resort", capacity: "20-50" },
      { name: "SeaShell Port Blair", type: "Luxury Resort", capacity: "80-150" }
    ],
    accommodation: [
      { name: "Havelock Island Resort", type: "Luxury Beach Resort", rooms: "60" },
      { name: "SeaShell Port Blair", type: "Premium Hotel", rooms: "72" },
      { name: "Barefoot Resort", type: "Boutique", rooms: "35" }
    ],
    cuisine: [
      "Seafood specialties",
      "Indian & Continental Fusion",
      "Tropical fresh fruits",
      "Local Andaman delicacies"
    ],
    activities: [
      "Scuba diving & snorkeling",
      "Sunset cruises & yacht rides",
      "Island hopping tours",
      "Tropical beach games & bonfires"
    ],
    priceRange: "$25,000 - $120,000"
},
{
    id: 9,
    name: "Darjeeling",
    location: "West Bengal, India",
    tagline: "Queen of the Hills",
    description:
      "Exchange vows amidst the misty hills and tea gardens of Darjeeling. Perfect for couples seeking a peaceful, scenic, and charming hill station wedding.",
    image: "https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg",
    gallery: [
      "https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg",
      "https://images.pexels.com/photos/208746/pexels-photo-208746.jpeg",
      "https://images.pexels.com/photos/1470301/pexels-photo-1470301.jpeg",
      "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg"
    ],
    bestTime: "March - June, September - November",
    duration: "3-4 Days",
    guestCapacity: "20-150",
    rating: 4.6,
    climate: "Cool & Refreshing",
    highlights: [
      "Tea garden wedding ceremonies",
      "Kanchenjunga mountain views",
      "Toy train rides for guests",
      "Local cultural experiences"
    ],
    venues: [
      { name: "Mayfair Darjeeling", type: "Luxury Hotel", capacity: "80-120" },
      { name: "Windamere Estate", type: "Heritage Hotel", capacity: "30-60" },
      { name: "Elgin Darjeeling", type: "Boutique Hotel", capacity: "40-80" }
    ],
    accommodation: [
      { name: "Mayfair Darjeeling", type: "Luxury Hotel", rooms: "62" },
      { name: "Windamere Estate", type: "Heritage Hotel", rooms: "30" },
      { name: "Elgin Darjeeling", type: "Boutique", rooms: "45" }
    ],
    cuisine: [
      "Local Bengali Cuisine",
      "Continental Options",
      "Traditional Tea Snacks",
      "Fusion Delicacies"
    ],
    activities: [
      "Tea garden tours",
      "Mountain trekking",
      "Local handicraft shopping",
      "Toy train rides"
    ],
    priceRange: "$12,000 - $60,000"
},
{
    id: 10,
    name: "Shillong",
    location: "Meghalaya, India",
    tagline: "Scotland of the East",
    description:
      "Set in lush greenery and waterfalls, Shillong is ideal for couples seeking an intimate, romantic wedding surrounded by nature.",
    image: "https://images.pexels.com/photos/1587017/pexels-photo-1587017.jpeg",
    gallery: [
      "https://images.pexels.com/photos/1587017/pexels-photo-1587017.jpeg",
      "https://images.pexels.com/photos/1608506/pexels-photo-1608506.jpeg",
      "https://images.pexels.com/photos/1618772/pexels-photo-1618772.jpeg",
      "https://images.pexels.com/photos/1623476/pexels-photo-1623476.jpeg"
    ],
    bestTime: "October - April",
    duration: "2-3 Days",
    guestCapacity: "20-120",
    rating: 4.5,
    climate: "Cool & Misty",
    highlights: [
      "Waterfall wedding photoshoots",
      "Scenic hilltop venues",
      "Traditional Khasi culture",
      "Intimate garden ceremonies"
    ],
    venues: [
      { name: "Ri Kynjai", type: "Lake Resort", capacity: "50-100" },
      { name: "The Heritage Club", type: "Luxury Resort", capacity: "40-80" },
      { name: "The Polo Orchid", type: "Boutique Resort", capacity: "30-60" }
    ],
    accommodation: [
      { name: "Ri Kynjai", type: "Luxury Resort", rooms: "55" },
      { name: "The Heritage Club", type: "Premium Resort", rooms: "38" },
      { name: "The Polo Orchid", type: "Boutique", rooms: "32" }
    ],
    cuisine: [
      "Local Khasi Cuisine",
      "North Indian & Continental",
      "Fusion Options",
      "Fresh Local Produce"
    ],
    activities: [
      "Waterfall hikes",
      "Boating and lake tours",
      "Cultural performances",
      "Nature walks"
    ],
    priceRange: "$10,000 - $50,000"
},
{
    id: 11,
    name: "Mysore",
    location: "Karnataka, India",
    tagline: "City of Palaces",
    description:
      "A blend of royal heritage and modern luxury. Mysore offers grand palace venues and rich culture for a majestic wedding experience.",
    image: "https://images.pexels.com/photos/210022/pexels-photo-210022.jpeg",
    gallery: [
      "https://images.pexels.com/photos/210022/pexels-photo-210022.jpeg",
      "https://images.pexels.com/photos/209968/pexels-photo-209968.jpeg",
      "https://images.pexels.com/photos/209987/pexels-photo-209987.jpeg",
      "https://images.pexels.com/photos/210024/pexels-photo-210024.jpeg"
    ],
    bestTime: "October - March",
    duration: "2-4 Days",
    guestCapacity: "50-300",
    rating: 4.6,
    climate: "Moderate & Pleasant",
    highlights: [
      "Palace wedding venues",
      "Cultural dance performances",
      "Royal processions",
      "Lavish floral decorations"
    ],
    venues: [
      { name: "Lalitha Mahal Palace", type: "Heritage Palace", capacity: "200-300" },
      { name: "Royal Orchid Metropole", type: "Luxury Hotel", capacity: "150-250" },
      { name: "Radisson Blu", type: "Premium Hotel", capacity: "100-200" }
    ],
    accommodation: [
      { name: "Lalitha Mahal Palace", type: "Heritage Hotel", rooms: "60" },
      { name: "Royal Orchid Metropole", type: "Luxury Hotel", rooms: "72" },
      { name: "Radisson Blu", type: "Premium Hotel", rooms: "110" }
    ],
    cuisine: [
      "South Indian Royal Cuisine",
      "Mysore Pak & Sweets",
      "North Indian Options",
      "Continental & Fusion"
    ],
    activities: [
      "Palace tours",
      "Cultural performances",
      "Heritage walks",
      "Photography sessions"
    ],
    priceRange: "$20,000 - $100,000"
},
{
    id: 12,
    name: "Coorg",
    location: "Karnataka, India",
    tagline: "Scenic Coffee Land",
    description:
      "A lush green paradise ideal for nature-loving couples. Coorg offers coffee plantations, waterfalls, and intimate outdoor wedding experiences.",
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
    gallery: [
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
      "https://images.pexels.com/photos/417071/pexels-photo-417071.jpeg",
      "https://images.pexels.com/photos/417072/pexels-photo-417072.jpeg",
      "https://images.pexels.com/photos/417073/pexels-photo-417073.jpeg"
    ],
    bestTime: "September - March",
    duration: "3-4 Days",
    guestCapacity: "20-150",
    rating: 4.7,
    climate: "Cool & Pleasant",
    highlights: [
      "Coffee plantation ceremonies",
      "Waterfall photoshoots",
      "Outdoor garden weddings",
      "Nature trails for guests"
    ],
    venues: [
      { name: "Evolve Back Resort", type: "Luxury Resort", capacity: "50-120" },
      { name: "Taj Madikeri", type: "Premium Resort", capacity: "40-100" },
      { name: "Coorg Wilderness Resort", type: "Boutique Resort", capacity: "30-80" }
    ],
    accommodation: [
      { name: "Evolve Back Resort", type: "Luxury Resort", rooms: "55" },
      { name: "Taj Madikeri", type: "Premium Resort", rooms: "62" },
      { name: "Coorg Wilderness Resort", type: "Boutique", rooms: "40" }
    ],
    cuisine: [
      "Traditional Coorgi Cuisine",
      "South Indian Specialties",
      "Continental & Fusion",
      "Local Organic Dishes"
    ],
    activities: [
      "Coffee plantation tours",
      "Nature walks & trekking",
      "Waterfall visits",
      "Adventure activities like river rafting"
    ],
    priceRange: "$15,000 - $80,000"
}

];

const Destinations: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Get destination name from URL path or query parameter
  const getDestinationFromPath = (pathname: string): string | null => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    if (pathSegments.length > 0 && pathSegments[0] !== 'destinations') {
      return pathSegments[0];
    }
    return null;
  };

  const getDestinationFromQuery = (): string | null => {
    return searchParams.get('destination');
  };

  // Auto-select destination based on URL path or query parameter
  useEffect(() => {
    const destinationName = getDestinationFromPath(location.pathname) || getDestinationFromQuery();
    if (destinationName) {
      const destination = destinations.find(d => 
        d.name.toLowerCase() === destinationName.toLowerCase()
      );
      if (destination) {
        setSelectedDestination(destination);
      }
    }
  }, [location.pathname, searchParams]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      );

      gsap.to(".hero-bg", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.2,
        y: 200,
      });

      const cards = gsap.utils.toArray(".destination-card");
      cards.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            rotateY: -15,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1.5,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedDestination && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(
        ".modal-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      );

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedDestination]);

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setSelectedDestination(null),
      });
    }
  };

  return (
    <div className="bg-white">
      <SEO
        title="Wedding Destinations India | Luxury Destination Weddings | De Wedding Factory"
        description="Discover stunning wedding destinations across India. From royal palaces in Rajasthan to beach resorts in Goa, plan your dream destination wedding with De Wedding Factory."
        keywords="destination weddings India, wedding destinations, luxury wedding venues India, palace weddings, beach weddings, mountain weddings"
        canonical="https://deweddingfactory.com/destinations"
      />
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        <div className="hero-bg absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg"
            alt="Destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="hero-content relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
     
          </div>

          <h1 className="font-serif text-5xl md:text-8xl mb-8 leading-tight">
            Discover Your Perfect
            <br />
            <span className="italic ">Wedding Destination</span>
          </h1>

        
        </div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-serif mb-6">
              Popular Destinations
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8" />
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Each destination offers unique experiences, venues, and cultural
              richness for your celebration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="destination-card group cursor-pointer"
                onClick={() => setSelectedDestination(destination)}
                style={{ perspective: "1000px" }}
              >
                <div className="relative overflow-hidden w-full bg-black aspect-[3/4]">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    style={{ 
                      objectFit: 'cover !important',
                      objectPosition: 'center',
                      width: '100%',
                      height: '100%',
                      minWidth: '100%',
                      minHeight: '100%',
                      maxWidth: 'none',
                      maxHeight: 'none',
                      display: 'block'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-light tracking-wider">
                        {destination.location}
                      </span>
                    </div>

                    <h3 className="text-4xl font-serif mb-3 group-hover:translate-x-2 transition-transform duration-500">
                      {destination.name}
                    </h3>

                    <p className="text-sm font-light text-gray-300 mb-4 line-clamp-1">
                      {destination.tagline}
                    </p>

                    <div className="flex items-center gap-6 text-sm font-light">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{destination.bestTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{destination.guestCapacity}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-light">{destination.rating}</span>
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 flex items-center gap-2">
                      <span className="text-sm font-light text-black tracking-wider">
                        VIEW DETAILS
                      </span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-6xl md:text-8xl font-serif mb-12">
              Need Help
              <br />
              <span className="italic text-gray-600">Choosing?</span>
            </h3>

            <motion.div
              className="w-24 h-px bg-black mx-auto mb-12"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="text-xl text-gray-600 font-light mb-16 max-w-2xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Our destination experts will help you find the perfect location based on your preferences, budget, and guest requirements
            </motion.p>

            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-black text-white font-light tracking-widest overflow-hidden hover:tracking-wider transition-all duration-500"
            >
              <span className="relative z-10 uppercase">Start Planning</span>
              <div className="relative z-10 w-12 h-px bg-white group-hover:w-16 transition-all duration-300" />
              <ArrowRight className="relative z-10 w-5 h-5" />
              <div className="absolute inset-0 bg-gray-900 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>

      {selectedDestination && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="relative bg-white w-full max-w-6xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 p-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-[500px] lg:h-[600px]">
                <img
                  src={selectedDestination.gallery[activeGalleryImage]}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover object-center"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedDestination.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveGalleryImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeGalleryImage === index
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-8 lg:p-12 overflow-y-auto max-h-[600px]">
                <div className="modal-content">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600 tracking-wider">
                      {selectedDestination.location}
                    </span>
                  </div>

                  <h2 className="text-5xl font-serif mb-4">
                    {selectedDestination.name}
                  </h2>

                  <p className="text-xl italic text-gray-600 mb-6 font-light">
                    {selectedDestination.tagline}
                  </p>

                  <div className="flex items-center gap-2 mb-8">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-light">
                      {selectedDestination.rating} Rating
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-8 font-light">
                    {selectedDestination.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Best Time</div>
                        <div className="font-light">{selectedDestination.bestTime}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Duration</div>
                        <div className="font-light">{selectedDestination.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Guest Capacity</div>
                        <div className="font-light">{selectedDestination.guestCapacity}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Thermometer className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Climate</div>
                        <div className="font-light">{selectedDestination.climate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5" />
                      <h3 className="text-2xl font-serif">Highlights</h3>
                    </div>
                    <ul className="space-y-3">
                      {selectedDestination.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3 font-light text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Hotel className="w-5 h-5" />
                      <h3 className="text-2xl font-serif">Premium Venues</h3>
                    </div>
                    <div className="space-y-3">
                      {selectedDestination.venues.map((venue, index) => (
                        <div key={index} className="bg-gray-50 p-4">
                          <div className="font-light mb-1">{venue.name}</div>
                          <div className="text-sm text-gray-600 flex items-center justify-between">
                            <span>{venue.type}</span>
                            <span>Capacity: {venue.capacity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Utensils className="w-5 h-5" />
                      <h3 className="text-2xl font-serif">Signature Cuisine</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedDestination.cuisine.map((dish, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gray-100 text-sm font-light"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Camera className="w-5 h-5" />
                      <h3 className="text-2xl font-serif">Guest Activities</h3>
                    </div>
                    <ul className="grid grid-cols-2 gap-3">
                      {selectedDestination.activities.map((activity, index) => (
                        <li key={index} className="flex items-center gap-2 font-light text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                          <span className="text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Price Range</div>
                        <div className="text-2xl font-serif">{selectedDestination.priceRange}</div>
                      </div>
                    </div>
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-light tracking-widest hover:bg-gray-800 transition-colors"
                    >
                      <Plane className="w-5 h-5" />
                      <span>PLAN YOUR WEDDING HERE</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;
