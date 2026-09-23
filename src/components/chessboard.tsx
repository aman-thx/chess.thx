import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "chess.js";

function ChessBoared(){
     const [game,setGame]= useState(new Chess());
     const [style,setStyle]= useState();
     const [legalMoves,setLegalMoves] =useState([]);
     const [firstClick,setFirstClick] =useState();
     const [turn,setTurn]= useState("w");
     const [gemaeStarted, setGameStarted] = useState(false);
     const [whiteTime, setWhiteTime] = useState(300);
     const [blackTime, setBlackTime] = useState(300);

     //const [secClick,setSecClick] =useState();




    function startGame(){

        setGameStarted(true);
        setTurn('w');

    }

    function formatTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}


    function handlePiecedrop({sourceSquare,targetSquare}){

        if (!gemaeStarted){
            return false;
        }

        try{
                  game.move({
            from:sourceSquare,
            to:targetSquare
        } );

        setGame(new Chess(game.fen()));
        setStyle({})
        setLegalMoves([])
        setFirstClick(undefined)
        return true;

        }catch{
            return false;
        }

    }
    




     function getLegalMoves({square}){

        if(!gemaeStarted){
            return false;
        }
        setFirstClick(square)
        const moves = (game.moves({
            square:square,
            verbose:true
        }))
        setLegalMoves(moves)
        styleLegalMoves(moves)

   }

   function handleSquareClick({square}){
  
     if (!gemaeStarted){
        return false;
    }
   

    console.log("clicked:", square);
console.log("legal moves:", legalMoves);
console.log("first click:", firstClick);

    if(legalMoves.some(legalmoves => legalmoves.to === square )){
        game.move(
    {
        from:firstClick.toString(),
        to:square

    }
)
setGame(new Chess(game.fen()))
    setStyle({})
    setLegalMoves([])
    setFirstClick(undefined)
  
    }else if(firstClick !== undefined){
        setStyle({})
        setLegalMoves([])
        setFirstClick(undefined)
    }

   }



   function styleLegalMoves(legalMoves){
    console.log(legalMoves);

  setStyle(legalMoves.reduce((acc,legalMove) =>{

if (legalMove.captured !== undefined) {
    acc[legalMove.to] = {
        background: "radial-gradient(circle, transparent 55%, rgba(0, 0, 0, 0.35) 57%, rgba(0, 0, 0, 0.35) 64%, transparent 66%)"
    }
}else{
        acc[legalMove.to] = {
        background: "radial-gradient(circle, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 18%, transparent 20%)"
    }
}


    return acc;
  },{}))
   }

        
   



    return(
        <> 
        <div>Black: {formatTime(blackTime)}</div>
        <Chessboard
         options={{
            position: game.fen(),
            onPieceDrop: handlePiecedrop,
            onSquareClick: handleSquareClick,
            onPieceClick: getLegalMoves,
            onPieceDrag:getLegalMoves,
            squareStyles: style,  
         }
         }/>
         <div>White: {formatTime(whiteTime)}</div>
         <button onClick={startGame}>
            start game
         </button>
        </>
    )
}

export default ChessBoared;