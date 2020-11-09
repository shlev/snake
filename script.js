( function() {
    
    buildBoard();

    function buildBoard() {
        console.log("start build game board");
        
        const board = document.querySelector("#gameBoard");
        for ( let i=0; i<289; i++) {
            let cell = document.createElement("div")
            let bgClass = i%2 ? 'evenCell' : 'oddCell';
            cell.setAttribute('class', 'cell ' + bgClass);
            board.appendChild(cell);
        }
        

        

        console.log("board ready");
    }

   
})();

