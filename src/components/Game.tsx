import {NodeStatus, Core, squareSchema} from '../core/GameCore'
import {useState, useRef} from "react"
import { useEffect } from 'react';

function getNodeClass(status:NodeStatus){
    if(status == NodeStatus.Active) return "node active";
    if(status == NodeStatus.Inactive) return "node inactive";
    return "node disabled"
  }

function Row({row, y, onClick}:{row:number[], y:number, onClick:Function}){
  return <div className="flex">
    {row.map((node,i) => <div key={i} className={getNodeClass(node)} onClick={()=>onClick(i, y)}/>)}
    </div>
}

export default function Game () {
  const coreRef = useRef(new Core(squareSchema))
  const [board, setBoard] = useState(coreRef.current.render())
  const [coord, setcoord] = useState([0,0])
  
  useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/eruda';
      script.onload = () => {
        // Initialize Eruda
        window.eruda && window.eruda.init();
      };
      document.body.appendChild(script);
  }, []);
  
  function onClick(x:number, y:number){
    coreRef.current.click(x,y)
    setBoard(coreRef.current.render())
    setcoord([x,y])
    console.log(coreRef.current.render())
  }
  
  return <div className="">
    {board.map((row,i) => <div key={i} className='flex'>
      {
        row.map((node,j) => <div key={j} className={getNodeClass(node)} onClick={()=>onClick(j,i)}/>)
      }
    </div>)}
    <p>{coord[0]};{coord[1]}</p>
  </div>
}