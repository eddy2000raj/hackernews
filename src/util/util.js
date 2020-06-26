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

export default filterList;