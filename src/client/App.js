import React,{useState, useEffect} from 'react'
import { useHistory, useParams, useLocation } from "react-router-dom";
import Row from './row';
import ReactLoader from './loader';
import service from '../service/service';
import Chart from './chart' ;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App(props) {

  const [pageNo, setPageNo] = useState(0);
  const [data, setData] = useState(null);
  const [error,setError]=useState(null);
  const history = useHistory();

  let query = useQuery();

  console.log(useLocation().search + " query param name :::>>> "+query.get("name"));

  //let { page } = useParams();
  const { page } = useParams(); // get the 'page' router param

  let p = parseInt(page, 10); // comes in as a string, convert to int

  if(isNaN(p))
  p=0;
  

  const next= ()=>{
     //setPageNo(pageNo+1)
     history.push("/news/"+(parseInt(p)+1));
  }

  const prev= ()=>{
    
    //setPageNo(pageNo-1)
     if(p>0)
     history.push("/news/"+ (parseInt(p)-1));
  }

  const callback = (pp) => {
        // do something with value in parent component, like save to state
        //setPageNo(p);
         history.push("/news/"+p);
  }


  useEffect(() => {

    console.log(p);
   
    service.get(p,setData,setError);

  },[]);

  

  return (
    <div className="container">
      
       { data!=null && <div>
                     <div className="row">
                        <div className="col-md-1" >Comments</div>
                        <div className="col-md-1" >Vote Count</div>
                        <div className="col-md-1" >Upvote</div>
                        <div className="col-md-8" >News Details</div>
                      </div>
                       {
                          data.hits.map(item => (
                            item.title!=null? <Row pageNo={p} parentCallback={callback} item={item}  keys={item.objectID}/> :""
                          ))
                        }
                     <button className="btn btn-info" onClick={next}>Next</button>
                     <button className="btn btn-default" onClick={prev}>Prev</button>
                     <div className="row">
                        <Chart data={data.hits} ></Chart>
                      </div>
                 </div> 
       }

       {error!=null &&  <div className="row">{error.message}</div>}

    </div>
  )
}

export default App


