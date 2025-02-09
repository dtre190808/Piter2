import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAttractions } from '../api/attractions';
import AttractionCard from '../components/AttractionCard';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import Loader from '../components/Loader';
import Error from '../components/Error';

function HomePage() {
  const [page, setPage] = useState(1);
  const limit = 5; 
  const [sortBy, setSortBy] = useState('name');
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['attractions', sortBy, search],
    queryFn: () => fetchAttractions({ sortBy, search }),
    keepPreviousData: true,
  });

  if (isError) return <Error message="Не удалось загрузить данные" />;

  const totalAttractions = data ? data.length : 0;
  const totalPages = Math.ceil(totalAttractions / limit);

  const paginatedData = data ? data.slice((page - 1) * limit, page * limit) : [];

  return (
    <div>
      <div className="header">
        <h1>Достопримечательности Санкт-Петербурга</h1>
        <Search search={search} onSearch={setSearch} />
        <Filter onFilterChange={setSortBy} />
      </div>

      <div className="attractions-list">
        {isLoading ? (
          <Loader /> 
        ) : (
          paginatedData.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              slug={attraction.slug}
              {...attraction}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default HomePage;