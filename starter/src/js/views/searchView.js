class searchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();

    return query;
  }

  _clearInput() {
    // the simbol # means it is a pricate function. So, you can not use it out side of here
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault(); // to avoid the page reload. Do always this for forms
      handler();
    });
  }
}

export default new searchView();
