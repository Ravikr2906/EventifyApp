import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useFetch from './useFetch';




function App() {
  const [filterEvent, setFilterEvent] = useState("All");
  const [search, setSearch] = useState('');
  const { data, loading, error } = useFetch("https://eventify-app-server.vercel.app/events");

  if (!data) {
    return <p>Loading...</p>;   }

  //Drop down filter
  const filteredByEventType = filterEvent === "All"
    ? data
    : data.filter((item) => item.eventType === filterEvent);

    //search filter
    const filteredEvents = filteredByEventType.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())))
    );
  return (
    <div className=" bg-light pb-3">
 
 {/* header */}
<nav className=" container navbar bg-body-tertiary">
  <div className="container-fluid">
    <Link to={"/"} class="navbar-brand" style={{
       background: "linear-gradient(to right, red, pink)", 
       WebkitBackgroundClip: "text", 
       WebkitTextFillColor: "transparent", 
       fontFamily: "'Luminari fantasy', cursive ", 
       fontSize: "2rem"
    }}>Eventify</Link>

    {/* //search box */}
    <div className="d-flex">
  <div className=" input-group">
    <span className="input-group-text">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
      </svg>
    </span>
    <input
      className="form-control search mb-0"    
      type="search"
      placeholder="Search by title..."
      onChange={(event) => setSearch(event.target.value)}
    />
  </div>
</div>
</div> 
</nav>
{/* // body */}
<main className='container'>
      <hr />
      
        <div className="row">
          <div className="col-md-9">
            <h1>Meetup Events</h1>
          </div>

          <div className="col d-flex flex-row-reverse my-3">
            {/* Drop down serch */}
            <select
              className="form-select"
              onChange={(event) =>  {setFilterEvent(event.target.value); }} >
              <option value="All">Select Event Type</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>

        <div className="row my-4">
          {loading ? <p>Loading...</p> : ""}          
          {/* Rendaring */}
          {filteredEvents && filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div className="col-md-4 mt-3" key={event._id}>
                  <Link to={`/eventDetail/${event._id}`}>
                    <div className="image-container" style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          top: "20px",
                          left: "20px",
                          backgroundColor: "white",
                          color: "black",
                          padding: "10px 15px",
                          borderRadius: "10px",
                          fontSize: "16px",
                        }}
                      >
                        {`${event.eventType} Event`} 
                      </span>
                      <img src={event.thumbnail} 
                      
                      alt="event-thumbnail" className="card-img-top img-fluid rounded"  />
                    </div>
                  </Link>
                
                  <p >{event.eventSession.start} IST <h5>{event.title}</h5></p>
                    
              </div>
            ))
          ) : (
            <p>No Events Found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
export default App