import API from './api';
import renderMovieCollection from './renderMovieCollection';
import Pagination from 'tui-pagination';

export const renderPagination = ({ page, total_pages }) => {
  const options = {
    totalItems: total_pages,
    itemsPerPage: 1,
    visiblePages: 5,
    page: page,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="pagination tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="pagination tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton: function ({ type }) {
        let icon;
        if (type === 'prev') {
          icon = '<svg class="icon"><use href="#icon-arrow-left2"></use></svg>';
        } else if (type === 'next') {
          icon = '<svg class="icon"><use href="#icon-arrow-right2"></use></svg>';
        } else if (type === 'first') {
          icon = '<svg class="icon"><use href="#icon-left-end"></use></svg>';
        } else if (type === 'last') {
          icon = '<svg class="icon"><use href="#icon-right-end"></use></svg>';
        }
        return `<a href="#" class="pagination tui-page-btn tui-${type}">${icon}</a>`;
      },
      disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}"></span>' +
        '</span>',
      moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(document.getElementById('pagination'), options);
  console.log('Pagination instance created:', pagination);

  pagination.on('beforeMove', async function (eventData) {
    const { page } = eventData;
    try {
      const data = await API.getTrending(page);
      renderMovieCollection(data.results);
    } catch (error) {
      console.error(error.message);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
};

API.getTrending(1)
  .then(data => {
    renderMovieCollection(data.results);
    renderPagination({
      page: data.page,
      total_pages: data.total_pages,
    });
  })
  .catch(error => console.error(error.message));