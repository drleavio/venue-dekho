// client/src/pages/Home.tsx
import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchVenues } from '../api';

interface Coordinates {
  lat: number;
  lng: number;
}

export default function Home() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [venues, setVenues] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [radius,setRadius]=useState(10000)

  // 1. Setup Intersection Observer to detect scroll end
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      // If the last item is visible and backend says there is more data
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // 2. Get Initial Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error("Location Error:", err)
      );
    }
  }, []);

  // 3. Fetch Data when Coords or Page change
  useEffect(() => {
    if (!coords) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchVenues(coords.lng, coords.lat, radius, page);
        if (res.data.success) {
          // Append new data to the existing list
          setVenues(prev => [...prev, ...res.data.data]);
          // Sync hasMore state with backend response
          setHasMore(res.data.hasMore); 
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [coords, page]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {venues.map((venue, index) => {
          const isLastItem = venues.length === index + 1;
          return (
            <div 
              key={venue._id} 
              ref={isLastItem ? lastElementRef : null}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="font-bold text-lg">{venue.name}</h2>
              <p className="text-gray-600">{venue.address?.city}</p>
              <a 
                href={`/venue/${venue._id}`} 
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                View Details
              </a>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="text-center py-10">
          <p className="animate-pulse">Loading more venues...</p>
        </div>
      )}

      {!hasMore && venues.length > 0 && (
        <p className="text-center text-gray-500 mt-8">No more venues found in your area.</p>
      )}
    </div>
  );
}