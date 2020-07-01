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

