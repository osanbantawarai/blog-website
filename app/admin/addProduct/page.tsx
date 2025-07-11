"use client";

import { assets } from "@/public/asset/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [image, setImage] = useState(false);
  const [author_img, setAuthor_img] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "",
    author_img: "",
  });

  const onChangeHandler = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("author_img", author_img as any);
    formData.append("image", image as any);
    console.log(formData);
    const response = await axios.post("/api/blog", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setAuthor_img(false);
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "",
        author_img: "",
      });
    } else {
      toast.error("Error: " + response.data.msg);
    }
  };

  const handleChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAuthorChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setAuthor_img(e.target.files[0]);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={
              !image ? assets.upload_area : URL.createObjectURL(image as any)
            }
            alt="upload"
            width={140}
            height={70}
          />
        </label>
        <input onChange={handleChange} type="file" id="image" hidden required />
        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />
        <p className="text-xl mt-4">Blog description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="write content here"
          rows={6}
          required
        />
        <p className="text-xl mt-4">Blog category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <p className="text-xl mt-4">Author Name</p>
        <input
          name="author"
          onChange={onChangeHandler}
          value={data.author}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />
        <br />
        <br />
        <p className="text-xl">Upload Author Image</p>
        <label htmlFor="author_img">
          <Image
            className="mt-4 mb-10"
            src={
              !author_img
                ? assets.upload_area
                : URL.createObjectURL(author_img as any)
            }
            alt="upload"
            width={140}
            height={70}
          />
        </label>
        <input
          onChange={handleAuthorChange}
          type="file"
          id="author_img"
          hidden
          required
        />
        <button type="submit" className=" w-40 h-12 bg-black text-white">
          Add
        </button>
      </form>
    </div>
  );
};
export default page;
