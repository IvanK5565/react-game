
export enum NodeStatus{
    Disable,
    Active,
    Inactive,
  }
  
class Cell{
  private status: NodeStatus;
  
  constructor(status:NodeStatus){
    this.status = status;
  }
  public click(){
    if(status == NodeStatus.Active)
      status = NodeStatus.Inactive;
    if(status == NodeStatus.Inactive)
      status = NodeStatus.Active;
  }
  public getStatus(){
    return this.status;
  }
}

export const squareSchema: number[][] = [
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,1,1,1]
]

export class Core{
  private cells:Cell[][];
  private W:number;
  private H:number;
  constructor(schema:number[][]){
    
    this.cells = schema.map(row => {
      return row.map(val => {
        return new Cell(val);
      })
    })
    this.W = schema[0].length;
    this.H = schema.length;
  }
  
  public click(x: number, y: number){
  console.log('core click', x, y)
  console.log('status: ', this.cells[y][x].getStatus())
    this.cells[y][x].click();
    console.log(this.cells[y][x].getStatus())
    if(x>0) this.cells[y][x-1].click();
    if(y>0) this.cells[y-1][x].click();
    if(x<this.W-1) this.cells[y][x+1].click();
    if(y<this.H-1) this.cells[y+1][x].click();
  }
  public render(){
    let res = this.cells.map(row => row.map(cell => cell.getStatus()));
    
    return res
  }
}