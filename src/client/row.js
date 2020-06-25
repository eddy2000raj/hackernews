import React,{useState,useEffect} from 'react';

export default props => {

  //const [name, setName] = useLocalStorage('name', 'Bob');

  const [item,setItem]=useState({'item':props.item});
  const [vote,setVote]=useState({'vote':props.item.points});

  const hide=(e)=>{
    e.preventDefault();
  	let items = window.localStorage.getItem("hiddenItemskeys") ;
  	items= items !=null ? JSON.parse(items) : [];
  	items.push(item.item["objectID"]);
  	window.localStorage.setItem("hiddenItemskeys",JSON.stringify(items))
  	props.parentCallback(props.pageNo);
  }

  const Upvote=(e)=>{
    let items = window.localStorage.getItem("UpvoteItems") ; 

    items= items !=null ? JSON.parse(items) : [];

    //remove the element
    items=items.filter((element) =>{

         return (element.key!=item.item["objectID"]);

    });

  
    items.push({"key":item.item["objectID"],"value":parseInt(vote.vote)+1})
      
    
    //items.push({"key":item.item["objectID"],"value":parseInt(vote.vote)+1});

    window.localStorage.setItem("UpvoteItems",JSON.stringify(items))

    setVote({"vote":parseInt(vote.vote)+1})
  }

  const filterVote=(data)=>{

    let items = window.localStorage.getItem("UpvoteItems") ;
    items= items !=null ? JSON.parse(items) : [];



    const res = items.filter(item => {
                return item.key==data.objectID 
      });

    return res.length==0? data["points"]:res[0].value;

  }


  useEffect(() => {

    //console.log(p);

    let v=filterVote(props.item)
   // setVote({v.points)
     setVote({"vote":parseInt(v)})
   

  },[props]);

  
 
    console.log(vote.vote);

    return (<div className="row">
              <div className="col-md-1" >{props.item.num_comments}</div>
              <div className="col-md-1" >{vote.vote}</div>
              <div className="col-md-1" ><button className="btn btn-info" onClick={Upvote}>Upvote</button></div>
              <div className="col-md-8" dangerouslySetInnerHTML={{ __html: props.item.title }}></div>
              <div className="col-md-1" ><a  onClick={hide} >[hide]</a></div>
          </div>)

 

};


/*// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}*/