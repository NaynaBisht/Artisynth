import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if(form.prompt){
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
      });
       const data = await response.json();
       setForm({...form, photo:`data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false);
      }
    } else{
      alert('Please enter a prompt')
    }
  }

  const handleSubmit = async (e) => {};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = async (e) => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section>
      <div>
        <h1 className="font-extrabold text-black text-[32px]">Create</h1>
        <p className=" mt-2 text-gray-400 text-[16px] max-w-[500px] ">
          Create imaginative and visually stunning images and share them with
          the community
        </p>
      </div>
      <form action="" className="mt-16 max-w-3xl " onSubmit={handleSubmit}>
        <div>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className=" relative mt-5 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-500 text-gray-900 focus:border-500 w-64 p-3 h-64 justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40 "
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg ">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating Image..." : "Generate Image"}
          </button>
        </div>

        <div className="mt-10">
          <p className=" mt-2 text-[#666e75] ">
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6449ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {
              loading ? 'Sharing...' : 'Share with the community'
            }
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
