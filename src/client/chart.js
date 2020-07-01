import React,{useState,useEffect} from 'react';
import {VictoryChart,VictoryLine,VictoryScatter} from 'victory' ;
/*import { LineChart } from 'chartkick';
import 'chart.js'

export default props => {

  const [item,setItem]=useState({'d3':[
  {"name":"Workout", "data": {"2017-01-01": 3, "2017-01-02": 4}},
  {"name":"Call parents", "data": {"2017-01-01": 5, "2017-01-02": 3}}
]});


 
    return (<div className="col-md-12">
					<LineChart data={item.d3} />
           </div>)

 

};*/

const data = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 4 },
  { x: 4, y: 3 },
  { x: 5, y: 5 }
];



export default class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
  	const d=this.props.data.map((item)=>{ 
          return {"x":item.objectID,"y":item.points}
  	}) ;
  	console.log(d) ;
  	this.setState({data:d});
  }


  render() {

  	

    return (
      <div>
        <VictoryChart  height={200}>
          <VictoryLine
            interpolation="linear" style={{ angle: 45 }} data={this.state.data}
            style={{ data: { stroke: "#c43a31" } }}
          />
          <VictoryScatter style={{ angle: 45 }} data={this.state.data}
            size={5}
            style={{ data: { fill: "#c43a31" } }}
          />
        </VictoryChart>
      </div>
    );
  }
}