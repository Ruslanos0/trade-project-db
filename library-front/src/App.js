import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('books');
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'reader'
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:6868/api/book');
      setBooks(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке книг:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:6868/api/user');
      setUsers(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  };

  const fetchUserBooks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:6868/api/user-books/${userId}`);
      setUserBooks(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке книг пользователя:", error);
    }
  };

  const addBookToUser = async (userId, bookId, status = 'reading') => {
    try {
      await axios.post('http://localhost:6868/api/user-books', {
        userId: userId,
        bookId: bookId,
        status: status
      });
      alert('Книга успешно добавлена!');
      if (selectedUser && selectedUser.id === userId) {
        fetchUserBooks(userId);
      }
    } catch (error) {
      console.error("Ошибка при добавлении книги:", error);
      if (error.response?.status === 400) {
        alert('Эта книга уже добавлена к пользователю!');
      } else {
        alert('Ошибка при добавлении книги');
      }
    }
  };

  const removeBookFromUser = async (userId, bookId) => {
    try {
      await axios.delete(`http://localhost:6868/api/user-books/${userId}/${bookId}`);
      alert('Книга удалена из библиотеки!');
      if (selectedUser && selectedUser.id === userId) {
        fetchUserBooks(userId);
      }
    } catch (error) {
      console.error("Ошибка при удалении книги:", error);
      alert('Ошибка при удалении книги');
    }
  };

  const updateBookStatus = async (userId, bookId, status, rating = null) => {
    try {
      await axios.put(`http://localhost:6868/api/user-books/${userId}/${bookId}`, {
        status: status,
        rating: rating
      });
      alert('Статус книги обновлен!');
      if (selectedUser && selectedUser.id === userId) {
        fetchUserBooks(userId);
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
      alert('Ошибка при обновлении статуса');
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:6868/api/user', newUser);
      setNewUser({ username: '', email: '', password: '', role: 'reader' });
      fetchUsers(); // Обновляем список пользователей
      alert('Пользователь успешно создан!');
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
      alert('Ошибка при создании пользователя');
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchUsers();
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
    },
    form: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '30px',
      marginBottom: '30px',
      color: '#2d3436',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      marginBottom: '15px',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '12px 15px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      marginBottom: '15px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      boxSizing: 'border-box'
    },
    submitButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      width: '100%'
    },
    userCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '20px',
      color: '#2d3436',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease'
    },
    roleBadge: (role) => ({
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: role === 'admin' ? '#e74c3c' : '#3498db',
      color: '#fff',
      marginTop: '10px'
    }),
    statusBadge: (status) => ({
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: 
        status === 'reading' ? '#3498db' : 
        status === 'completed' ? '#27ae60' : 
        status === 'wishlist' ? '#f39c12' : '#95a5a6',
      color: '#fff',
      marginRight: '10px'
    }),
    actionButton: {
      padding: '8px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      margin: '5px',
      transition: 'all 0.2s ease'
    },
    addButton: {
      background: '#27ae60',
      color: '#fff'
    },
    removeButton: {
      background: '#e74c3c',
      color: '#fff'
    },
    statusButton: {
      background: '#3498db',
      color: '#fff'
    },
    userSelector: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '30px',
      color: '#2d3436',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
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
        <button style={styles.button('users')} onClick={() => setActiveTab('users')}>Пользователи</button>
        <button style={styles.button('library')} onClick={() => setActiveTab('library')}>Моя библиотека</button>
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

        {activeTab === 'users' && (
          <div>
            <h2 style={styles.sectionTitle}>👥 Управление пользователями</h2>

            {/* Форма создания пользователя */}
            <form onSubmit={createUser} style={styles.form}>
              <h3 style={{ marginTop: '0', marginBottom: '20px', color: '#2d3436' }}>Добавить нового пользователя</h3>

              <input
                type="text"
                placeholder="Имя пользователя"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                style={styles.input}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                style={styles.input}
                required
              />

              <input
                type="password"
                placeholder="Пароль"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                style={styles.input}
                required
              />

              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                style={styles.select}
              >
                <option value="reader">Читатель</option>
                <option value="admin">Администратор</option>
              </select>

              <button
                type="submit"
                style={styles.submitButton}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Создать пользователя
              </button>
            </form>

            {/* Список пользователей */}
            <h3 style={{ ...styles.sectionTitle, fontSize: '1.5rem' }}>Список пользователей ({users.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {users.map(user => (
                <div
                  key={user.id}
                  style={styles.userCard}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>
                    👤 {user.username}
                  </h4>
                  <p style={{ margin: '5px 0', color: '#636e72' }}>
                    📧 {user.email}
                  </p>
                  <div style={styles.roleBadge(user.role)}>
                    {user.role === 'admin' ? '👑 Администратор' : '📖 Читатель'}
                  </div>
                  {user.createdAt && (
                    <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#b2bec3' }}>
                      📅 Зарегистрирован: {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {users.length === 0 && (
              <div style={{ ...styles.card, textAlign: 'center', padding: '40px' }}>
                <p style={{ fontSize: '1.1rem', color: '#636e72' }}>
                  Пользователи не найдены. Создайте первого пользователя!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'library' && (
          <div>
            <h2 style={styles.sectionTitle}>📚 Моя библиотека</h2>

            {/* Выбор пользователя */}
            <div style={styles.userSelector}>
              <h3 style={{ marginTop: '0', marginBottom: '15px', color: '#2d3436' }}>Выберите пользователя</h3>
              <select
                value={selectedUser?.id || ''}
                onChange={(e) => {
                  const user = users.find(u => u.id === parseInt(e.target.value));
                  setSelectedUser(user);
                  if (user) {
                    fetchUserBooks(user.id);
                  } else {
                    setUserBooks([]);
                  }
                }}
                style={styles.select}
              >
                <option value="">-- Выберите пользователя --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <div>
                {/* Информация о выбранном пользователе */}
                <div style={styles.form}>
                  <h3 style={{ marginTop: '0', color: '#2d3436' }}>
                    📖 Библиотека пользователя: {selectedUser.username}
                  </h3>
                  <p style={{ color: '#636e72', margin: '10px 0' }}>
                    Всего книг: {userBooks.length}
                  </p>
                </div>

                {/* Добавление книг */}
                <div style={styles.form}>
                  <h4 style={{ marginTop: '0', color: '#2d3436' }}>Добавить книгу в библиотеку</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                    {books.filter(book => !userBooks.some(ub => ub.book_id === book.id)).map(book => (
                      <div key={book.id} style={{ ...styles.card, padding: '15px' }}>
                        <h5 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>{book.name}</h5>
                        <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#636e72' }}>
                          {book.author} • {book.year}
                        </p>
                        <div style={{ marginTop: '10px' }}>
                          <button
                            style={{ ...styles.actionButton, ...styles.addButton }}
                            onClick={() => addBookToUser(selectedUser.id, book.id, 'reading')}
                            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                          >
                            📖 Читаю
                          </button>
                          <button
                            style={{ ...styles.actionButton, ...styles.statusButton }}
                            onClick={() => addBookToUser(selectedUser.id, book.id, 'wishlist')}
                            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                          >
                            ⭐ В список желаний
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Книги пользователя */}
                {userBooks.length > 0 && (
                  <div>
                    <h4 style={{ ...styles.sectionTitle, fontSize: '1.5rem' }}>
                      Книги в библиотеке ({userBooks.length})
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                      {userBooks.map(userBook => (
                        <div
                          key={userBook.id}
                          style={styles.card}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          <div style={styles.statusBadge(userBook.status)}>
                            {userBook.status === 'reading' ? '📖 Читаю' : 
                             userBook.status === 'completed' ? '✅ Прочитано' : 
                             '⭐ В списке желаний'}
                          </div>
                          
                          <h4 style={{ margin: '10px 0', fontSize: '1.2rem' }}>
                            {userBook.book?.name}
                          </h4>
                          
                          <p style={{ margin: '5px 0', color: '#636e72' }}>
                            👤 {userBook.book?.author}
                          </p>
                          
                          <p style={{ margin: '5px 0', color: '#b2bec3', fontSize: '0.9rem' }}>
                            📅 {userBook.book?.year} • {userBook.book?.genre}
                          </p>

                          {userBook.rating && (
                            <p style={{ margin: '10px 0', color: '#f39c12' }}>
                              {'⭐'.repeat(userBook.rating)} ({userBook.rating}/5)
                            </p>
                          )}

                          <p style={{ margin: '10px 0', fontSize: '0.85rem', color: '#b2bec3' }}>
                            Добавлено: {new Date(userBook.added_at).toLocaleDateString('ru-RU')}
                          </p>

                          <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                            <button
                              style={{ ...styles.actionButton, ...styles.statusButton }}
                              onClick={() => updateBookStatus(selectedUser.id, userBook.book_id, 
                                userBook.status === 'reading' ? 'completed' : 'reading')}
                            >
                              {userBook.status === 'reading' ? '✅ Прочитано' : '📖 Читаю'}
                            </button>
                            
                            <button
                              style={{ ...styles.actionButton, ...styles.statusButton }}
                              onClick={() => updateBookStatus(selectedUser.id, userBook.book_id, 'wishlist')}
                            >
                              ⭐ В желания
                            </button>
                            
                            <button
                              style={{ ...styles.actionButton, ...styles.removeButton }}
                              onClick={() => removeBookFromUser(selectedUser.id, userBook.book_id)}
                              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                              onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                              🗑️ Удалить
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {userBooks.length === 0 && (
                  <div style={{ ...styles.card, textAlign: 'center', padding: '40px' }}>
                    <p style={{ fontSize: '1.1rem', color: '#636e72' }}>
                      У пользователя {selectedUser.username} пока нет книг в библиотеке.
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#b2bec3' }}>
                      Добавьте книги из списка выше!
                    </p>
                  </div>
                )}
              </div>
            )}

            {!selectedUser && (
              <div style={{ ...styles.card, textAlign: 'center', padding: '40px' }}>
                <p style={{ fontSize: '1.1rem', color: '#636e72' }}>
                  Выберите пользователя, чтобы управлять его библиотекой
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;