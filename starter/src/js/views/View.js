import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render =true] if false, create markup string innstetad of renndering to the DOM
   * @returns {undefinned | string} A markup string is returned if render=false
   * @author Veronica Vedia
   * @todo Finish the implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // si no hay datos, si esta vacio "data" o es undefined || o si data es un arreglo y si ese arreglo es vacio

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError(); // si no hay datos, si esta vacio "data" o es undefined || o si data es un arreglo y si ese arreglo es vacio

    this._data = data;
    const newMarkup = this._generateMarkup();

    // To convert the string markup to DOM object elements
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    // To compare old markup  with new markup in order to update only the dom elements have changed
    // Update changes TEXT
    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' //si el contenido del elemento ha sido cambiado
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changes ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // Array.from(newEl.attributes) // to convert in an array
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
      <div class="spinner">
      
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    // this._parentElement.innerHTML = ''; // clean the containner
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
            <svg>
            <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
            <svg>
            <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
