import Notiflix from 'notiflix';
import templateCard from './template/template-card.hbs';
import getRefs from './js/refs';
import './sass/main.scss';
import NewQueryService from './js/query-service';
const refs = getRefs();

refs.form.addEventListener('submit', onSubmit);

window.addEventListener('scroll', onScroll);
const queryService = new NewQueryService();


async function onSubmit(e) {
    e.preventDefault();
    if (e.currentTarget.elements.searchQuery.value === '') {
        return Notiflix.Notify.warning('oops! Nothing is entered!'); 
    }
    
     queryService.query = e.currentTarget.elements.searchQuery.value;
    queryService.resetPage();
   await queryService.fetchDate().then(({ hits, totalHits })=> {
        clearGallery();
       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        renderGallery(hits);
    });
  
}


async function onScroll() {
    
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    
    if (scrollTop + clientHeight > scrollHeight - 10) {
       
        try {
        
            await queryService.fetchDate().then(({ hits }) => {
        
                if (hits.length === 0) {
                    
                }
                renderGallery(hits);
            });
        }
        
        catch (error) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                   
        }
        return;
    }
    return;
}



function renderGallery(t) {
    refs.gallery.insertAdjacentHTML('beforeend', templateCard(t));

}

function clearGallery() {
    refs.gallery.innerHTML = '';
}