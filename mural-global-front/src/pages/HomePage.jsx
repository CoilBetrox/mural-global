import React from 'react';
import Layout from '../components/layout/Layout';
import TopicForm from '../components/topics/TopicForm';
import TopicList from '../components/topics/TopicList';
import useTopics from '../hooks/useTopics';

/**
 * Página principal que muestra el feed de temas.
 * @component
 */
function HomePage() {
  const { topics, loading, createTopic, addResponse } = useTopics();

  return (
    <Layout>
      <main className="w-full max-w-[800px] px-4 py-8 flex flex-col gap-8">
        {/* Área de creación */}
        <TopicForm onSubmit={createTopic} />
        
        {/* Feed de temas */}
        <TopicList 
          topics={topics} 
          loading={loading}
          onAddResponse={addResponse}
        />
      </main>
    </Layout>
  );
}

export default HomePage;