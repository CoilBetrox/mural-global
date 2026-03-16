import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import TopicList from '../components/topics/TopicList';
import { getPopularTopics } from '../services/topicsApi';

/**
 * Página de exploración con temas populares.
 * @component
 */
function ExplorePage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadPopularTopics();
  }, []);
  
  /**
   * Carga temas populares.
   */
  const loadPopularTopics = async () => {
    try {
      setLoading(true);
      // Asumiendo que el backend soporta filtro de populares
      const data = await getPopularTopics();
      setTopics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <main className="w-full max-w-[800px] px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Explorar</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Descubre temas populares y conversaciones interesantes
          </p>
        </div>
        
        <TopicList 
          topics={topics}
          loading={loading}
          error={error}
          onAddResponse={() => {}}
          onRetry={loadPopularTopics}
        />
      </main>
    </Layout>
  );
}

export default ExplorePage;