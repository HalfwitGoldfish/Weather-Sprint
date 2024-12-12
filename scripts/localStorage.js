function saveToLocalStorage(location){
    let searchedArr = getFromLocalStorage();

    if(!searchedArr.includes(location)){
        searchedArr.push(location);
    }

    localStorage.setItem("PreviousSearch", JSON.stringify(searchedArr));
}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem("PreviousSearch");

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(location){
    let localStorageData = getFromLocalStorage();

    let locationIndex = localStorageData.indexOf(location);

    localStorageData.splice(locationIndex, 1);

    localStorage.setItem("PreviousSearch", JSON.stringify(localStorageData));
}

export {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage};