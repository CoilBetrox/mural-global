import React from 'react';
import Layout from '../components/layout/Layout';
import TopicDetail from '../components/topics/TopicDetail';

/**
 * Página de tema individual.
 * @component
 */
function TopicPage() {
  return (
    <Layout>
      <TopicDetail />
    </Layout>
  );
}

export default TopicPage;