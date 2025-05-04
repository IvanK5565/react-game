import Cell from "./Life/Cell";

interface LifeProps{W:number, H:number};

export default function Life({W,H}:LifeProps) {
    
    return <div>
        {(new Array(H)).map(()=> <div>
            {(new Array(W).map(() => <Cell />))}
        </div>)}
    </div>
}