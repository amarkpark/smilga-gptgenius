"use client"

const Explore = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // const formData = new FormData(event.target);
    // const city = formData.get("city");
    // const country = formData.get("country");
    // console.log(city, country);
    const formData = new FormData(event.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    console.log(destination);
  }
  return (
    <>
      <h2 className="text-3xl m-4 flex gap-2 items-center">
        Explore a Destination
        <span className="text-4xl m-4">
          &#128373; &#129517; &#128506;
        </span>
      </h2>
      <form onSubmit={handleSubmit} className="w-full container mx-auto">
        <div className="join w-full">
          <input
            className="input input-bordered w-full join-item"
            name="city"
            placeholder="city"
            required
            type="text"
            // value={text}
            // onChange={(event) => setText(event.target.value)}
          />
          <input
            className="input input-bordered w-full join-item"
            name="country"
            placeholder="country"
            required
            type="text"
            // value={text}
            // onChange={(event) => setText(event.target.value)}
          />
          <button
            className="btn btn-primary join-item"
            // disabled={isPending}
            type="submit"
          >
            Generate Tour
          </button>
        </div>
      </form>
    </>
  )
}

export default Explore
