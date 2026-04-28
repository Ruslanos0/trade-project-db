import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState('books');

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:6868/api/book');
      setBooks(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Функция для умной навигации между вкладками
  const navigateToTab = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const groupBy = (array, key) => {
    return array.reduce((acc, obj) => {
      const value = obj[key] || 'Не указано';
      if (!acc[value]) acc[value] = [];
      acc[value].push(obj);
      return acc;
    }, {});
  };

  const groupedData = {
    authors: groupBy(books, 'author'),
    genres: groupBy(books, 'genre'),
    years: groupBy(books, 'year')
  };

  const styles = {
    container: {
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: '#fff'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      fontSize: '3rem',
      textShadow: '2px 4px 10px rgba(0,0,0,0.2)'
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '40px'
    },
    button: (tabName) => ({
      padding: '12px 25px',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      background: activeTab === tabName ? '#fff' : 'rgba(255, 255, 255, 0.2)',
      color: activeTab === tabName ? '#764ba2' : '#fff',
      boxShadow: activeTab === tabName ? '0 4px 15px rgba(0,0,0,0.2)' : 'none',
      backdropFilter: 'blur(10px)'
    }),
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '25px',
      color: '#2d3436',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    badge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: '#e17055',
      color: '#fff',
      marginBottom: '10px',
      cursor: 'pointer',
      transition: 'opacity 0.2s'
    },
    clickableText: {
      cursor: 'pointer',
      transition: 'color 0.2s',
      display: 'inline-block'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      marginBottom: '20px',
      paddingLeft: '15px',
      borderLeft: '5px solid #fab1a0'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📖 Digital Library</h1>

      <div style={styles.nav}>
        <button style={styles.button('books')} onClick={() => setActiveTab('books')}>Все книги</button>
        <button style={styles.button('authors')} onClick={() => setActiveTab('authors')}>По авторам</button>
        <button style={styles.button('genres')} onClick={() => setActiveTab('genres')}>По жанрам</button>
        <button style={styles.button('years')} onClick={() => setActiveTab('years')}>По годам</button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'books' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {books.map(book => (
              <div 
                key={book.id} 
                style={styles.card} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} 
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Ссылка на жанры */}
                <div 
                  style={styles.badge} 
                  onClick={() => navigateToTab('genres')}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {book.genre || 'Жанр'}
                </div>

                <h3 style={{ fontSize: '1.4rem', margin: '10px 0' }}>{book.name}</h3>

                {/* Ссылка на авторов */}
                <p 
                  style={{ ...styles.clickableText, color: '#636e72', fontWeight: '600' }}
                  onClick={() => navigateToTab('authors')}
                  onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                  onMouseLeave={(e) => e.target.style.color = '#636e72'}
                >
                  👤 {book.author}
                </p>

                {/* Ссылка на годы */}
                <p 
                  style={{ ...styles.clickableText, color: '#b2bec3', fontSize: '0.9rem', marginLeft: '10px' }}
                  onClick={() => navigateToTab('years')}
                  onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                  onMouseLeave={(e) => e.target.style.color = '#b2bec3'}
                >
                  📅 {book.year || '—'}
                </p>

                <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{book.description}</p>
              </div>
            ))}
          </div>
        )}

        {['authors', 'genres', 'years'].includes(activeTab) && (
          <div>
            {Object.keys(groupedData[activeTab]).map(group => (
              <div key={group} style={{ marginBottom: '50px' }}>
                <h2 style={styles.sectionTitle}>
                  {activeTab === 'authors' ? '👤' : activeTab === 'genres' ? '🎭' : '📅'} {group}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {groupedData[activeTab][group].map(book => (
                    <div key={book.id} style={{ ...styles.card, padding: '15px' }}>
                      <h4 style={{ margin: '0' }}>{book.name}</h4>
                      <small style={{ color: '#636e72' }}>{book.author} | {book.year}</small>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;