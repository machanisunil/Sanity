import { sanityClient, urlFor } from "../sanity"
const Home=({properties})=> {
  console.log(properties)
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Delicious one</h1>
            <div className="feed">
              {properties.map((property) => (
                  <div key={property._id} className="card">
                    <img src={urlFor(property.mainimage)} />
                    <p>
                      {property.reviews.length} review
                      {/* {isMultiple(property.reviews.length)} */}
                    </p>
                    <h3>{property.title}</h3>
                    <h3>
                      ₹{property.price}
                    </h3>
                  </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps=async()=>{
  const query='*[_type == "property"]'
  const properties= await sanityClient.fetch(query)
 

  if(!properties.length){
    return{
      props:{
        properties:[],
      },
    }
  }else{
    return{
      props:{
        properties
      }
    }
  }


}
export default Home
