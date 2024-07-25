
const DestinationDetails = ({tour}) => {
  console.log(tour);
  const {title, description, stops} = tour;
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-semibold mb-4">{title}</h1>
      <h1 className="leading-relaxed mb-6">{description}</h1>
      <ul>
        {stops.map((stop) => {
          return (
            <li
              key={stop}
              className="mb-4 bg-base-100 p-4 rounded-xl"
            >
              <p>&#129517; {stop}</p>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default DestinationDetails
