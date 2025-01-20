import { useParams } from "react-router-dom" 
import useFetch from "../useFetch"
import { Link } from "react-router-dom";


const EventDetails = () => {
  
  const eventID = useParams()
  const {data, loading, error} = useFetch("https://eventify-app-server.vercel.app/events")
  
  const eventData = data ? data.find((event) => event._id == eventID.Id) : null;

  
  // console.log(eventData)
  return(
<body className="container bg-light">

  
<nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
  <Link to={"/"} class="navbar-brand" style={{
       background: "linear-gradient(to right, red, pink)", 
       WebkitBackgroundClip: "text", 
       WebkitTextFillColor: "transparent", 
       fontFamily: "'Luminari fantasy', cursive ", 
       fontSize: "2rem"
    }}>Eventify</Link>

  </div> 
</nav>
{/* <Header/> */}
<hr/>
<main className="py-3 mb-5">
  {loading && <p>Loading..</p>}
  {eventData ? (
    <>
    <div  className="row">
      <div className="col-md-8 ">
      <h1>{eventData.title}</h1>
      <div className="pt-3">
    <p className="fs-5">Hosted By: <br/><h3>{eventData.hostedBy}</h3></p>
    </div>
     <img src={eventData.thumbnail} alt="thumbnail" className="py-3 img-fluid"/>

     <div className="mt-3">
     <h3>Details: </h3>
     <p>{eventData.details}</p>
     </div>
     
     <div className="pt-3">
     <h3>Additional Information: </h3>
     <p><strong>Dress Code: </strong>{eventData.additionalInfo.dressCode}<br/>
     <strong>Age Restrictions: </strong>{eventData.additionalInfo.ageRestrictions}</p>
      </div>

      <div className="pt-3">
     <h3>Event Tags: </h3>
     {eventData.tags.map((tag) => (
      <button className="me-3 my-2 btn btn-danger btn-round">{tag}</button>
      
     ))}
     </div>

      </div>
      {/* second part */}
      <div  className="mt-3 col-md-4 ">
        <div className="card mt-2" >
          <div className="card-body bg-white">
            <div className="d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock mt-3 me-3" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"></path>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"></path>
</svg>
             <p>{eventData.eventSession.start} - <br/>
            {eventData.eventSession.end}</p>
            </div>
            
            <div className="d-flex ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt mt-3 me-3" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"></path>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
</svg>
<p>{eventData.venue.place} <br/>
            {eventData.venue.city}</p>
            </div>
            
            <div className="d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee mt-1 me-3" viewBox="0 0 16 16">
  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"></path>
</svg>
<p>{eventData.price}</p>
            </div>
            
          </div>
        </div>
        <div className="my-3">
        <h3>Speakers: {eventData.speakers.length}</h3>
        <div className="row">
          {eventData.speakers.map((person) => (
            // <div className="col-lg-8">
              <div className="mt-2 card">                
                <div className="card-body text-center">
                <img src={person.image} className="img-fluid rounded-circle"/>
                  <h5>{person.name}</h5>
                  <p>{person.designation}</p>
                </div>
              </div>
            //  </div> 
          ))}
        </div>
        </div>
      </div>
    </div>
   
    </>
  ) : (!loading && <p>Event details not found.</p>)}
  
</main>
</body>
  )
}
export default EventDetails
