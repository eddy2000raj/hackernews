import axiosAuth from '../auth/auth' ;
import filterList from '../util/util' ;

let service={

		get:function(p,onSuccess,onError){

								axiosAuth.get("v1/search?page="+p)
							    .then((res) => {
							        let test=filterList(res.data.hits);
							        onSuccess({'hits':test});
							      
							    })
							    .catch(function (error) {
							        
							        onError({'message':error.message});

							    })

					}

}


export default service;