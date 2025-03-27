import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
}

const VIDEOS: Video[] = [
  {
    id: "6jV7WVyUpYA",
    title: "What is Mutual Fund? Mutual Fund Explained",
    thumbnail: "https://img.youtube.com/vi/6jV7WVyUpYA/mqdefault.jpg",
    duration: "12:20",
    category: "basics",
  },
  {
    id: "cBu9zXFpwB0",
    title: "How to Start SIP | Systematic Investment Plan | CA Rachana Ranade",
    thumbnail: "https://img.youtube.com/vi/cBu9zXFpwB0/mqdefault.jpg",
    duration: "16:45",
    category: "basics",
  },
  {
    id: "0IqAJh6FxZk",
    title: "Equity vs Debt | Investment Basics",
    thumbnail: "https://img.youtube.com/vi/0IqAJh6FxZk/mqdefault.jpg",
    duration: "8:30",
    category: "basics",
  },
  {
    id: "h5j-r_qkdB4",
    title: "Top 5 Mutual Fund Investment Strategies",
    thumbnail: "https://img.youtube.com/vi/h5j-r_qkdB4/mqdefault.jpg",
    duration: "14:15",
    category: "strategies",
  },
  {
    id: "Bv3JKx83Pzk",
    title: "Index Funds vs Actively Managed Funds",
    thumbnail: "https://img.youtube.com/vi/Bv3JKx83Pzk/mqdefault.jpg",
    duration: "10:30",
    category: "strategies",
  },
  {
    id: "8f9Bz9f3aLs",
    title: "How to Analyze a Mutual Fund Before Investing",
    thumbnail: "https://img.youtube.com/vi/8f9Bz9f3aLs/mqdefault.jpg",
    duration: "15:45",
    category: "advanced",
  },
  {
    id: "rvZKRWzuDGQ",
    title: "Understanding Mutual Fund Taxation",
    thumbnail: "https://img.youtube.com/vi/rvZKRWzuDGQ/mqdefault.jpg",
    duration: "11:20",
    category: "advanced",
  },
  {
    id: "XFWZw_t3Z14",
    title: "Building a Retirement Portfolio with Mutual Funds",
    thumbnail: "https://img.youtube.com/vi/XFWZw_t3Z14/mqdefault.jpg",
    duration: "18:25",
    category: "advanced",
  },
];

const LearningVideos: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="material-icons">play_circle</span>
          Learning Videos
        </h2>
        <p className="text-blue-50 text-sm mt-1">
          Watch educational videos to improve your investment knowledge
        </p>
      </div>

      <div className="p-5">
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {["basics", "strategies", "advanced"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VIDEOS.filter((video) => video.category === category).map((video) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  >
                    <CardContent className="p-0 relative">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-opacity">
                          <span className="material-icons text-white text-5xl">play_circle</span>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-0.5 text-xs rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm">{video.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl overflow-hidden max-w-4xl w-full">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="font-semibold">{selectedVideo.title}</h3>
              <button onClick={closeVideo} className="text-gray-500 hover:text-gray-700">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningVideos;