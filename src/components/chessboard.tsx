import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "chess.js";

function ChessBoared(){
     const [game,setGame]= useState(new Chess());
     const [style,setStyle]= useState();
     const [legalMoves,setLegalMoves] =useState([]);
     const [firstClick,setFirstClick] =useState();
     //const [secClick,setSecClick] =useState();



    function handlePiecedrop({sourceSquare,targetSquare}){
        try{
                  game.move({
            from:sourceSquare,
            to:targetSquare
        } );

        setGame(new Chess(game.fen()));
        setStyle({})
        return true;

        }catch{
            return false;
        }

    }
    




     function getLegalMoves({square}){
        setFirstClick(square)
        const moves = (game.moves({
            square:square,
            verbose:true
        }))
        setLegalMoves(moves)
        styleLegalMoves(moves)

   }

   function handleSquareClick({square}){

    if(legalMoves.some(legalmoves => legalmoves.to === square )){
        game.move(
    {
        from:firstClick.toString(),
        to:square

    }
)
setGame(new Chess(game.fen()))
    setStyle({})
  
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
        </>
    )
}

export default ChessBoared;