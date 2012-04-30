var ChessHTMLDB = {};
ChessHTMLDB.indexedDB = {};
ChessHTMLDB.indexedDB.db = null;
var indexedDB = window.indexedDB || window.webkitIndexedDB ||
                window.mozIndexedDB;



(function () {
    ChessHTMLDB.indexedDB.open = function (versionnumber) {
        var requestDB = indexedDB.open("ChessGame", versionnumber);
        requestDB.onsuccess = function (e) {
            ChessHTMLDB.indexedDB.db = e.target.result
            var db = e.target.result;
        }
        requestDB.onerror = function (e) {
            alert(e);
            alert("Error while processing the request");
        }

        requestDB.onupgradeneeded = function (e) {
            alert("upgrade is required");
            var db = e.target.result;
            ChessHTMLDB.indexedDB.db = db;
            if (db.objectStoreNames.contains("playermovement")) {
                db.deleteObjectStore("playermovement");
            }
            if (db.objectStoreNames.contains("playercut")) {
                db.deleteObjectStore("playercut");
            }
            var objectStore = db.createObjectStore("playermovement", { keyPath: "id" });
            var objectStore1 = db.createObjectStore("playercut", { keyPath: "id" });
        }
    }

    ChessHTMLDB.indexedDB.returnValue = function (keyValue) {
        var returnedObj = null;
        var transaction = ChessHTMLDB.indexedDB.db.transaction(["playermovement"]);
        var objectStore = transaction.objectStore("playermovement");
        var request = objectStore.get("one");
        request.onerror = function (event) {
            alert("error has been recived");
        };
        request.onsuccess = function (event) {
            if (typeof(request.result) != 'undefined') {
                returnedObj = request.result;
            }
            
        };
        alert("Pls wait while data is being loaded from local storage pls click ok after one second");
        return returnedObj;
    }

    ChessHTMLDB.indexedDB.returnCutValue = function (keyValue) {
        var returnedObj = null;
        var transaction = ChessHTMLDB.indexedDB.db.transaction(["playercut"]);
        var objectStore = transaction.objectStore("playercut");
        var request = objectStore.get("one");
        request.onerror = function (event) {
            alert("error has been recived");
        };
        request.onsuccess = function (event) {
            if (typeof(request.result) != 'undefined') {
                returnedObj = request.result;
            }

        };
        alert("Pls wait while data is being loaded from local storage pls click ok after one second");
        return returnedObj;
    }

   
    ChessHTMLDB.indexedDB.insertValue = function (data) {
        var transaction = ChessHTMLDB.indexedDB.db.transaction(["playermovement"], IDBTransaction.READ_WRITE);
        transaction.oncomplete = function (event) {
            alert("Offline Storage is complete!");
        };
        transaction.onerror = function (event) {
            alert("error recieved on the client side");
        };
        var objectStore = transaction.objectStore("playermovement");
        var request = objectStore.put(data);
        request.onsuccess = function (event) {
            alert("recieved the sucess value on the data");
        };
        request.onerror = function (event) {
            alert("error has been recived");
        };
    }

    ChessHTMLDB.indexedDB.insertObjectCut = function (data) {
        var transaction = ChessHTMLDB.indexedDB.db.transaction(["playercut"], IDBTransaction.READ_WRITE);
        transaction.oncomplete = function (event) {
            alert("Offline Storage is complete!");
        };
        transaction.onerror = function (event) {
            alert("error recieved on the client side");
        };
        var objectStore = transaction.objectStore("playercut");
        var request = objectStore.put(data);
        
        request.onsuccess = function (event) {
            alert("recieved the sucess value on the data");
        };
        request.onerror = function (event) {
            alert("error has been recived");
        };
    }




})();