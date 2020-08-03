import React,{useState, useEffect} from 'react'
import { useHistory, useParams, useLocation } from "react-router-dom";
/*import Row from './row';
import ReactLoader from './loader';
import service from '../service/service';
import Chart from './chart' ;*/

/*function useQuery() {
  return new URLSearchParams(useLocation().search);
}*/

function UserForm(props) {

  const [tableData, setTableData] = useState([{'name':'asdasd','ratings':123,'duration':12}]);

 /* const [pageNo, setPageNo] = useState(0);
  const [data, setData] = useState(null);
  const [error,setError]=useState(null);
  const history = useHistory();*/

  /*let query = useQuery();

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
*/

  useEffect(() => {

    //console.log(p);
   
    //service.get(p,setData,setError);

  },[]);

  const onSubmit= (e)=>{

    e.preventDefault();
    let name=document.querySelector("#name-input").value;
    let ratings=parseInt(document.querySelector("#ratings-input").value);
    let duration=parseInt(document.querySelector("#duration-input").value);

    setTableData([...tableData,{'name':name,'ratings':ratings,'duration':duration}]);
     
  }

  console.log(tableData)

  return (

    <div className="container">
      
       { tableData!=null &&  <div>
                                   <form onSubmit={onSubmit}>
                                     <label>Movie Name</label> <input type="text" id="name-input" /><br/>
                                     <label>Ratings</label> <input type="text" id="ratings-input" /><br/>
                                     <label>Duration</label> <input type="text" id="duration-input" /><br/>
                                     <button id='submit-button'>Submit</button>
                                   </form>
                                    <table>
                                       <thead><tr><th>Name</th><th>Ratings</th><th>Duration</th></tr></thead>
                                       <tbody>{  tableData.map( (item) =>{  
                                                                        return <tr><td>{item.name}</td><td>{item.ratings}</td><td>{item.duration}</td></tr>
                                                                        })
                                              }
                                       </tbody>
                                    </table>
                        </div>
       }

    </div>
  )
}

export default UserForm


