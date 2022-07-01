import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import receipeView from './views/receipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// import icons from '../img/icons.svg'; // import images, using parcel version 1
// import icons from 'url:../img/icons.svg'; // import images, using parcel version 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Parcel allow us to do this, to avoid reload the page
// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Show the spinner "Loading..."
// const renderSpinner = function (parentEl) {
//   const markup = `
//     <div class="spinner">

//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div>
//   `;

//   parentEl.innerHTML = ''; // clean the containner
//   parentEl.insertAdjacentHTML('afterbegin', markup);
// };

// Get one recipe:
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //obtener URL y eliminar el primer elemento de #123456  => 123456
    console.log(id);

    if (!id) return; // If there is not id entonces return (salirse del cliclo)
    // renderSpinner(recipeContainer);
    receipeView.renderSpinner();

    // 0. Update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1. Loading recipe
    await model.loadRecipe(id);

    // const res = await fetch(
    //   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    // );

    // const res = await fetch(
    //   // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcfb2'
    //   `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    // );

    // const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // console.log(res, data);

    // let { recipe } = data.data; //destructuring {}
    // recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };

    // console.log(recipe);

    // 2.Rendering recipe
    receipeView.render(model.state.recipe);

    // 3. Updating bookmarks view
    // debugger;
    bookmarksView.update(model.state.bookmarks);

    //   const markup = `<figure class="recipe__fig">
    //   <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    //   <h1 class="recipe__title">
    //     <span>${recipe.title}</span>
    //   </h1>
    // </figure>

    // <div class="recipe__details">
    //   <div class="recipe__info">
    //     <svg class="recipe__info-icon">
    //       <use href="${icons}#icon-clock"></use>
    //     </svg>
    //     <span class="recipe__info-data recipe__info-data--minutes">${
    //       recipe.cookingTime
    //     }</span>
    //     <span class="recipe__info-text">minutes</span>
    //   </div>
    //   <div class="recipe__info">
    //     <svg class="recipe__info-icon">
    //       <use href="${icons}#icon-users"></use>
    //     </svg>
    //     <span class="recipe__info-data recipe__info-data--people">${
    //       recipe.servings
    //     }</span>
    //     <span class="recipe__info-text">servings</span>

    //     <div class="recipe__info-buttons">
    //       <button class="btn--tiny btn--increase-servings">
    //         <svg>
    //           <use href="${icons}#icon-minus-circle"></use>
    //         </svg>
    //       </button>
    //       <button class="btn--tiny btn--increase-servings">
    //         <svg>
    //           <use href="${icons}#icon-plus-circle"></use>
    //         </svg>
    //       </button>
    //     </div>
    //   </div>

    //   <div class="recipe__user-generated">
    //     <svg>
    //       <use href="${icons}#icon-user"></use>
    //     </svg>
    //   </div>
    //   <button class="btn--round">
    //     <svg class="">
    //       <use href="${icons}#icon-bookmark-fill"></use>
    //     </svg>
    //   </button>
    // </div>

    // <div class="recipe__ingredients">
    //   <h2 class="heading--2">Recipe ingredients</h2>
    //   <ul class="recipe__ingredient-list">

    //   ${recipe.ingredients
    //     .map(ingredient => {
    //       return `
    //     <li class="recipe__ingredient">
    //       <svg class="recipe__icon">
    //         <use href="${icons}#icon-check"></use>
    //       </svg>
    //       <div class="recipe__quantity">${ingredient.quantity}</div>
    //       <div class="recipe__description">
    //         <span class="recipe__unit">${ingredient.unit}</span>
    //         ${ingredient.description}
    //       </div>
    //     </li>
    //     `;
    //     })
    //     .join('')}

    //   </ul>
    // </div>

    // <div class="recipe__directions">
    //   <h2 class="heading--2">How to cook it</h2>
    //   <p class="recipe__directions-text">
    //     This recipe was carefully designed and tested by
    //     <span class="recipe__publisher">${
    //       recipe.publisher
    //     }</span>. Please check out
    //     directions at their website.
    //   </p>
    //   <a
    //     class="btn--small recipe__btn"
    //     href="${recipe.sourceUrl}"
    //     target="_blank"
    //   >
    //     <span>Directions</span>
    //     <svg class="search__icon">
    //       <use href="${icons}#icon-arrow-right"></use>
    //     </svg>
    //   </a>
    // </div>`;
    //   recipeContainer.innerHTML = '';
    //   recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    receipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 0. Load the spinner
    resultsView.renderSpinner();
    console.log(resultsView);

    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return; // if there is no query termina el ciclo y ya no ejecuta las demas lineas

    // 2. Load search results
    await model.loadSearchResult(query);

    // 3. Rendering results
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results); // It renders all the results
    resultsView.render(model.getSearchResultsPage());

    // 4. Render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1. Rendering new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1. Update the recipe servings (in state)
  model.updateServings(newServings);

  // 2. Update the recipe view
  // receipeView.render(model.state.recipe);
  receipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add or remove bookmark
  if (model.state.recipe.bookmarked === false) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2. Update recipe view
  receipeView.update(model.state.recipe);

  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlAddBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loadinng spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    console.log(model.state.recipe);

    // Render recipe
    receipeView.render(model.state.recipe);

    // Display Success message
    addRecipeView.renderMessage();

    // Rennder bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL without refreshing the page
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back(); //To come back to the last page you were in the browsers
    window
      // Close form window
      .setTimeout(function () {
        addRecipeView.toogleWindow();
      }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('😔', err);
    addRecipeView.renderError(err.message);
  }
};

const newFeature = function () {
  console.log('Welcome to the application Forkify! :)');
};

const init = function () {
  bookmarksView.addHandlerRender(controlAddBookmarks);
  receipeView.addHandlerRender(controlRecipes);
  receipeView.addHandlerUpdateServings(controlServings);
  receipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);

  newFeature();
};

init();
