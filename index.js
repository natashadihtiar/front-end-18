/*eslint-disable no-inner-declarations*/

const data = fetch('https://swapi.dev/api/films/');
const list = document.querySelector('ul');

data.then(responce => responce.json())
    .catch(err => (err))
    .then(resFilms => {
        for (let i = 0; i < resFilms.results.length; i++ ) {
            const listTitle = document.createElement('ul');
            list.append(listTitle);
            listTitle.append(resFilms.results[i].title);

            function getNamesOfShips() {
                const dataSecond = fetch('https://swapi.dev/api/films/');
                dataSecond.then(responce => responce.json())
                    .catch(err => (err))
                    .then(resShips => {
                        for (let j = 0; j < resShips.results[i].starships.length; j++ ) { 
                            const listName = document.createElement('li');
                            listTitle.append(listName);

                            const resData = resShips.results[i].starships[j];

                            const dataThird = fetch(resData);
                            dataThird.then(responce => responce.json())
                                .then(result => listName.append(result.name));
                        }
                    });
            }
            listTitle.addEventListener('click', getNamesOfShips);
        }
    });
