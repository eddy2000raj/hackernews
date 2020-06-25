import React,{useState,useEffect} from 'react'
import { useHistory,useParams } from "react-router-dom";
import Row from './row';
import axios from 'axios';
import ReactLoader from './loader';

function App(props) {

  const [pageNo, setPageNo] = useState(0);
  const [data, setData] = useState(null);
  const history = useHistory();

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


  const filterList=(data)=>{

    let items = window.localStorage.getItem("hiddenItemskeys") ;
    items= items !=null ? JSON.parse(items) : [];

    const res = data.filter(d => {

      return items.every(item => {
        return item!=d.objectID;
      });

  });

   return res.length === 0 ? data : res;

  }


  useEffect(() => {

    console.log(p);
   
    axios.get('https://hn.algolia.com/api/v1/search?page='+p).then((res) => {
        let test=filterList(res.data.hits);
        setData({'hits':test});
      
    })

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
                     <button onClick={prev} className="btn btn-default">Prev</button>
                 </div> 
       }

       {data==null && <ReactLoader/>}

    </div>
  )
}

export default App


