const API_URL = 'https://679fa0ed24322f8329c438cb.mockapi.io/APiPiter';
const COMMENTS_URL = 'https://679fa0ed24322f8329c438cb.mockapi.io/comments'; // Новый URL для комментариев

const fetchData = async (url, errorMessage) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(errorMessage);
  return response.json();
};

export const fetchAttractions = async ({ page = 1, limit = 10, sortBy = 'name', search = '' }) => {
  return fetchData(
    `${API_URL}?page=${page}&limit=${limit}&sortBy=${sortBy}&search=${search}`,
    'Не удалось загрузить данные'
  );
};

export const fetchAttractionBySlug = async (slug) => {
  const data = await fetchData(`${API_URL}?slug=${slug}`, 'Достопримечательность не найдена');
  if (data.length === 0) throw new Error('Достопримечательность не найдена');
  return data[0];
};

// Функция для получения комментариев по slug достопримечательности
export const fetchCommentsBySlug = async (slug) => {
  return fetchData(
    `${COMMENTS_URL}?attractionSlug=${slug}`,
    'Ошибка загрузки комментариев'
  );
};

// Функция для отправки нового комментария
export const postComment = async (comment) => {
  const response = await fetch(COMMENTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) throw new Error('Ошибка отправки комментария');
  return response.json();
};