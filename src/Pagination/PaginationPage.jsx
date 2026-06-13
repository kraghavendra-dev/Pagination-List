import React, { useState, useEffect } from 'react'
import './PaginationPage.css'
import axios from "axios";

const PaginationPage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [input, setInput] = useState("");

    useEffect(()=>{
       const fetchData = async () =>{
        try {
            setLoading(true);
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
       }
       fetchData();
    }, []); 

    const filteredData = data.filter((item)=> 
     item.userId.toString().includes(input)
    );

    const itemsPerPage = 5;

    const startIndex = (page-1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    const itemsData = filteredData.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  return (
    <>
      <div className='page'>
         <h1 className='heading'>Pagination</h1>
         <div className='searchBox'>
            <input
               type="text"
               placeholder='Search by userIds.. 1 to 10'
               value={input}
               onChange={(e)=>setInput(e.target.value)}
            
            />
         </div>
         <hr/>
         <div className='cardContainer'>
            {loading && <p>Loading....</p>}
            {error && <p>{error}</p>}
            {
                itemsData.map((item)=>{
                    const {userId, id, title, body} = item;
                    return (
                       <div key={id} className='card'>
                          <p><strong>UserId:</strong>{userId}</p>
                          <p><strong>Title:</strong>{title}</p>
                          <p><strong>Body:</strong>{body}</p>
                       </div>
                    )
                })
            }
         </div>
         <hr/>
         <div style={{display:"flex"}} className='pagination'>
            <button onClick={()=>setPage(prev=>prev-1)} disabled={page === 1}>Prev</button>
            <span className='pageNumber'>{page}</span>
            <button onClick={()=>setPage(prev=>prev+1)} disabled={page === totalPages}>Next</button>
        </div>
      </div>
    
    </>
  )
}

export default PaginationPage