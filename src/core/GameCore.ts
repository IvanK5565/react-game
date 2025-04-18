
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
    if(this.status == NodeStatus.Active)
      this.status = NodeStatus.Inactive;
    else if(this.status == NodeStatus.Inactive)
      this.status = NodeStatus.Active;
  }
  public getStatus(){
    return this.status;
  }
}

export const squareSchema: number[][] = [
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,1,1,1]
]
export const rombSchema: number[][] = [
  [0,0,1,0,0],
  [0,1,1,1,0],
  [1,1,1,1,1],
  [0,1,1,1,0],
  [0,0,1,0,0]
  ]

export class Core{
  private nodes:Cell[][];
  private W:number;
  private H:number;
  constructor(){
    this.nodes = []
    this.W = 0;
    this.H = 0;
    this.setSchema(squareSchema)
  }
  public setSchema(schema:number[][]){
    this.nodes = schema.map(row => {
      return row.map(val => {
        return new Cell(val);
      })
    })
    this.W = schema[0].length;
    this.H = schema.length;
  }
  public copy(core:Core){
    this.nodes = core.nodes;
    this.W = core.W
    this.H = core.H
  }
  
  public click(x: number, y: number){
    console.log("on Core Click", x, y)
    this.nodes[y][x].click();
    if(x>0) this.nodes[y][x-1].click();
    if(y>0) this.nodes[y-1][x].click();
    if(x<this.W-1) this.nodes[y][x+1].click();
    if(y<this.H-1) this.nodes[y+1][x].click();
  }
  public render(){
    let res = this.nodes.map(row => row.map(node => node.getStatus()));
    
    return res
  }
}