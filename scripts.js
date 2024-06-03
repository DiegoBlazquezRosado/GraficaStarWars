const filmsAPI = 'https://swapi.dev/api/films/';
const charsAPI = 'https://swapi.dev/api/people/';

arrFilmsTitle = [];
arrFilmsYear = [];

// arrCharsName = [];
// arrCharsCount = [];

const getFilms = async () => {
    try {
        const responseFilms = await fetch(filmsAPI);
        const dataFilms = await responseFilms.json();
        // console.log(dataFilms.results);
        dataFilms.results.forEach(element => {
            arrFilmsTitle.push(element.title);
            arrFilmsYear.push(parseInt(element.release_date.slice(0, 4)));
        });
        // console.log(arrFilmsTitle, arrFilmsYear);
        return paintFilms(arrFilmsTitle, arrFilmsYear);
    } catch (error) {
        throw error;
    }
}

const paintFilms = () => {
    // const options = {
    //     axisY: {
    //         onlyInteger: true,
    //         offset: 50
    //     }
    // }
    new Chartist.Line('#ex1', {
        labels: arrFilmsTitle,
        series: [arrFilmsYear]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        },
        axisY: {
            onlyInteger: true,
            offset: 50
        }
    });
}

const getChars = async () => {
    try {
        const responseChars = await fetch(charsAPI);
        const dataChars = await responseChars.json();
        // console.log(dataChars.results);
        arrCharsName = [];
        arrCharsCount = [];
        dataChars.results.forEach(element => {
            arrCharsName.push(element.name);
            arrCharsCount.push(element.films.length);
        });
        // console.log(arrCharsName, arrCharsCount);
        return paintChars(arrCharsName, arrCharsCount);
    } catch (error) {
        throw error;
    }
}

const paintChars = (arrCharsName, arrCharsCount) => {
    // new Chartist.Bar('#ex2', {
    //     labels: arrCharsName,
    //     series: [arrCharsCount]
    // }, {
    //     fullWidth: true,
    //     chartPadding: {
    //         right: 40
    //     }
    // });
    new Chartist.Bar('#ex2', {
        labels: arrCharsName,
        series: [arrCharsCount]
    }, {
        // Default mobile configuration
        stackBars: true,
        axisX: {
            labelInterpolationFnc: function (value) {
                return value.split(/\s+/).map(function (word) {
                    return word[0];
                }).join('');
            },
            onlyInteger: true
        },
        axisY: {
            onlyInteger: true,
            offset: 20
        }
    }, [
        // Options override for media > 400px
        ['screen and (min-width: 400px)', {
            reverseData: true,
            horizontalBars: true,
            axisX: {
                labelInterpolationFnc: Chartist.noop
            },
            axisY: {
                offset: 60
            }
        }],
        // Options override for media > 800px
        ['screen and (min-width: 800px)', {
            stackBars: false,
            seriesBarDistance: 10
        }],
        // Options override for media > 1000px
        ['screen and (min-width: 1000px)', {
            reverseData: false,
            horizontalBars: false,
            seriesBarDistance: 15
        }]
    ]);
}

getFilms();
getChars();