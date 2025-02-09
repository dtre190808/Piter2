import { Link } from 'react-router-dom';
import '../css/visit.css'

function VisitPage() {
  
  return (
    <header>
        <h1>Твой гид онлайн</h1>
        <p>Выбирай маршрут и исследуй город мечты - Санкт-Питербург</p>
        <Link to={`/HomePage`} className='link-button'>Узнать больше</Link>
    </header>
  );
}

export default VisitPage;