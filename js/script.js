// const URL_REPO = new URL("https://api.github.com/search/repositories");

// const inputSearch = document.querySelector(".search-repo");
// const listSearchRepo = document.querySelector(".auto-com__list");
// const listRepo = document.querySelector(".added-repo");
// let searchRepoArr;

// //Предотвращает слишком частое отправление заросов
// const debounce = (fn, debounceTime) => {
//   let timeout;
//   return function () {
//     const fnCall = () => {
//       fn.apply(this, arguments);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(fnCall, debounceTime);
//   };
// };

// //Запрос на получение репозиториев
// const getRepo = async (url, pageLimit, nameRepo) => {
//   url.searchParams.set("q", nameRepo);
//   url.searchParams.set("per_page", `${pageLimit}`);

//   const response = await fetch(url);
//   const data = await response.json();
//   return data.items;
// };

// //Создаёт список найденых репозиториев
// const createItemListSearch = (repo) => {
//   const repoListItem = document.createElement("li");
//   repoListItem.textContent = repo.name;
//   repoListItem.classList.add("auto-com__item");
//   repoListItem.dataset.repoId = repo.id;
//   listSearchRepo.appendChild(repoListItem);
// };

// //Создаёт список найденых репозиториев по ключ словам
// const createListSearch = (repos) => {
//   if (!repos) listSearchRepo.innerHTML = "";
//   repos.forEach((el) => {
//     createItemListSearch(el);
//   });
// };

// //Добавление найденого репозитория в список
// const addRepo = (event) => {
//   if (event.target.classList.value === "auto-com__item") {
//     let repo = searchRepoArr.find((el) => el.id == event.target.dataset.repoId);
//     createElementInListRepo(repo);
//   }
// };

// //Создание карточики репозитория
// const createElementInListRepo = (repo) => {
//   const repoCard = `
// 		<div class="added-repo__item">
// 			<div class="added-repo__item-info">
// 				<p>Name: ${repo.name}</p>
// 				<p>Owner: ${repo.owner.login}</p>
// 				<p>Stars: ${repo.stargazers_count}</p>
// 			</div>
// 			<button class="delete-repo">
// 				<span
// 					class="delete-repo__span-left"
// 				></span>
// 				<span
// 				class="delete-repo__span-right"
// 				></span>
// 			</button>
// 		</div>
// 	`;
//   listRepo.insertAdjacentHTML('afterbegin', repoCard);
// };

// //Удаление добавленного репозитория
// const deleteRepo = (event) => {
//   event.target.closest("div").remove();
// }

// //Поиск репозитория
// function search(event) {
//   if (event.target.value.trim()) {
//     getRepo(URL_REPO, 5, event.target.value).then((response) => {
//       searchRepoArr = response;
//       createListSearch(response);
//     });
//     listSearchRepo.innerHTML = "";
//   } else {
//     listSearchRepo.innerHTML = "";
//   }
// }

// search = debounce(search, 500);

// inputSearch.addEventListener("input", search);
// listSearchRepo.addEventListener("click", addRepo);
// listRepo.addEventListener("click", deleteRepo);









const URL_REPO = new URL("https://api.github.com/search/repositories");

const inputSearch = document.querySelector(".search-repo");
const listSearchRepo = document.querySelector(".auto-com__list");
const listRepo = document.querySelector(".added-repo");
let searchRepoArr;

//Предотвращает слишком частое отправление запросов
const debounce = (fn, debounceTime) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, debounceTime);
  };
};

//Запрос на получение репозиториев
const getRepo = async (url, pageLimit, nameRepo) => {
  url.searchParams.set("q", nameRepo);
  url.searchParams.set("per_page", `${pageLimit}`);

  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

//Создаёт список найденных репозиториев
const createItemListSearch = (repo) => {
  const repoListItem = document.createElement("li");
  repoListItem.textContent = repo.name;
  repoListItem.classList.add("auto-com__item");
  repoListItem.dataset.repoId = repo.id;
  listSearchRepo.appendChild(repoListItem);
};

//Создаёт список найденных репозиториев по ключевым словам
const createListSearch = (repos) => {
  if (!repos) listSearchRepo.innerHTML = "";
  repos.forEach((el) => {
    createItemListSearch(el);
  });
};

//Добавление найденного репозитория в список
const addRepo = (event) => {
  if (event.target.classList.value === "auto-com__item") {
    let repo = searchRepoArr.find((el) => el.id == event.target.dataset.repoId);
    createElementInListRepo(repo);
  }
};

//Создание карточки репозитория
const createElementInListRepo = (repo) => {
  const repoCard = `
		<div class="added-repo__item">
			<div class="added-repo__item-info">
				<p>Name: ${repo.name}</p>
				<p>Owner: ${repo.owner.login}</p>
				<p>Stars: ${repo.stargazers_count}</p>
			</div>
			<button class="delete-repo">
				<span
					class="delete-repo__span-left"
				></span>
				<span
				class="delete-repo__span-right"
				></span>
			</button>
		</div>
	`;
  listRepo.insertAdjacentHTML('afterbegin', repoCard);
};

//Удаление добавленного репозитория
const deleteRepo = (event) => {
  event.target.closest("div").remove();
}

//Поиск репозитория
function search(event) {
  if (event.target.value.trim()) {
    getRepo(URL_REPO, 5, event.target.value).then((response) => {
      searchRepoArr = response;
      createListSearch(response);
    });
    listSearchRepo.innerHTML = "";
  } else {
    listSearchRepo.innerHTML = "";
  }
}

search = debounce(search, 500);

inputSearch.addEventListener("input", search);
listRepo.addEventListener("click", deleteRepo);

listSearchRepo.addEventListener("click", function addRepoEventListener(event) {
  if (event.target.classList.value === "auto-com__item") {
    let repo = searchRepoArr.find((el) => el.id == event.target.dataset.repoId);
    createElementInListRepo(repo);
  }
});

// Удаление прослушки события click с listSearchRepo
inputSearch.addEventListener("blur", function () {
  listSearchRepo.removeEventListener("click", addRepoEventListener);
});










