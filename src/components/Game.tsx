import {NodeStatus, Core, squareSchema, rombSchema} from '../core/GameCore'
import {useState} from "react"
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
  const [core, setcore] = useState(new Core())
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
    const newCore = new Core()
    newCore.copy(core)
    console.log(core.render())
    console.log("on click ", x, y)
    newCore.click(x,y)
    setcore(newCore)
    console.log(newCore.render()[0][0])
    setcoord([x,y])
  }
  
  function onChange(value:string){
    if(value === "square"){
      core.setSchema(squareSchema)
    }
    else if(value === "romb"){
      core.setSchema(rombSchema)
    }
  }
  
  return <div className="">
    {core.render().map((row,i) => <Row row={row} key={i} y={i} onClick={onClick}/>)}
    <select onChange={ e => onChange(e.target.value) }>
      <option value="square">Square</option>
      <option value="romb">Romb</option>
    </select>
    <p>{coord[0]};{coord[1]}</p>
  </div>
}