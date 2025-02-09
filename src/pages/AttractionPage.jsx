import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAttractionBySlug, fetchCommentsBySlug, postComment } from '../api/attractions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import '../css/detail.css';
import { useState } from 'react';

function AttractionPage() {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  // Загрузка данных о достопримечательности
  const { data: attraction, isLoading, isError, error } = useQuery({
    queryKey: ['attraction', slug],
    queryFn: () => fetchAttractionBySlug(slug),
  });

  // Загрузка комментариев
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery({
    queryKey: ['comments', slug],
    queryFn: () => fetchCommentsBySlug(slug),
  });

  // Мутация для отправки комментария
  const mutation = useMutation({
    mutationFn: (newComment) => postComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', slug]); 
      setAuthor('');
      setText('');
    },
  });

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      attractionSlug: slug,
      author,
      text,
      createdAt: new Date().toISOString(),
    };
    mutation.mutate(newComment);
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error message={error.message} />;

  if (!attraction) {
    return <Error message="Достопримечательность не найдена" />;
  }

  return (
    <div className='attraction-page'>
      <div className="attraction-info">
        <h1>{attraction.name}</h1>
        <p>{attraction.description}</p>
        <img src={attraction.imageUrl} alt={attraction.name} />
      </div>
      <Link to={`/HomePage`} className='link-button-exit'>Назад</Link>

      <div className="comments-section">
        <h2>Комментарии</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ваше имя"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <textarea
            placeholder="Ваш комментарий"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button type="submit">Отправить</button>
        </form>

        {commentsError ? (
          <p>Комментариев пока нет. Будьте первым!</p>
        ) : commentsLoading ? (
          <Loader />
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <strong>{comment.author}</strong>
              <p>{comment.text}</p>
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>Ошибка загрузки!</p>
        )}
      </div>
    </div>
  );
}

export default AttractionPage;