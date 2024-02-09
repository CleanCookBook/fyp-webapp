// pages/news/[id].js
"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NewsDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    // Fetch the specific news item based on the ID
    const fetchNewsItem = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/news/${id}`);
        const data = await response.json();
        setNewsItem(data);
      } catch (error) {
        console.error('Error fetching news item:', error.message);
      }
    };

    if (id) {
      fetchNewsItem();
    }
  }, [id]);

  if (!newsItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{newsItem.title}</h1>
      <p>{newsItem.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default NewsDetail;
