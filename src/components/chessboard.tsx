import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "chess.js";

function ChessBoared(){
     const [game,setGame]= useState(new Chess());
     const [style,setStyle]= useState();



     function handlePiecedrop({sourceSquare,targetSquare}){
        try{
                  game.move({
            from:sourceSquare,
            to:targetSquare
        } );

        setGame(new Chess(game.fen()));
        return true;

        }catch{
            return false;
        }

    }
     function showLegalMoves({square}){

       const moves = game.moves({
            square:square,
            verbose:true
        }).map(move => move.to )
       setStyle(moves.reduce((acc,legalmove)=>{
         acc[legalmove] = {background: "green"}
        
         return acc;

        },{}))
        

   }

        
   



    return(
        <>
        <Chessboard
         options={{
            position: game.fen(),
            onPieceDrop: handlePiecedrop,
            onPieceClick: showLegalMoves,
            squareStyles: style
         }
         }/>
        </>
    )
}

export default ChessBoared;