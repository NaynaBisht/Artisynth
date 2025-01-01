import React, { useState } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  return (
    <section className="max-w-7xl sm:max-w-5xl mx-auto">
      <div>
        <h1 className="font-extrabold text-black text-[32px]">
          The Community Showcase
        </h1>
        <p className=" mt-2 text-gray-400 text-[16px] max-w-[500px] ">
          Browse Through a collection of imaginative and visually stunning
          images
        </p>
      </div>
      <div className="mt-16">
        <FormField />
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-gray-400 text-xl mb-3 ">
                Showing results for{" "}
                <span className="text-gray-700"> {searchText} </span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:gridcols-3 xs:grid-cols-2 grid-cols-1 gap-3 ">
              {searchText ? (
                <RenderCards data={[]} title="No results found" />
              ) : (
                <RenderCards data={[]} title="No posts to display" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
