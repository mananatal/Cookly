'use client';
import avgRating from '@/helper/avgRating';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

function Rating() {
  const [givenRating,setGivenRating]=useState(0);
  const[recentRatings,setRecentRatings]=useState([]);
  const [averageRating,setAverageRating]=useState(0);
  const [totalRatings,setTotalRatings]=useState(0);

  const {recipeId}=useParams();
  const {toast}=useToast();

  const fetchRecentRatings=async ()=>{
    try {
      const response=await axios.get(`/api/recent-ratings?recipeId=${recipeId}`);

      if(response.data.success){
        setRecentRatings(response.data.recentRatings);
        setAverageRating(response.data.avgRating);
        setTotalRatings(response.data.totalRatings)
      }
    } catch (error) {
      console.error("Error while fetching recent ratings: ",error)
    }
  }

  const fetchUserRecipeRating=async ()=>{
    try {
      const response=await axios.get(`/api/user-recipe-rating?recipeId=${recipeId}`);

      if(response.data.success){
        setGivenRating(response.data.rating)
      }
    } catch (error) {
      console.error("Error while fetching recent ratings: ",error)
    }
  }

  useEffect(()=>{
    fetchUserRecipeRating();
  },[recipeId])


  useEffect(() => {
    fetchRecentRatings();
  }, [recipeId,givenRating]);

  const handleRatingChange =async  (newRating) => {
    
    try {
      const result=await axios.post("/api/create-rating",{rating:newRating,recipeId});

      if(result?.data.success){
        toast({
          variant:"success",
          title:"Recipe Rated Successfully"
        });
        setGivenRating(newRating)
      }

    } catch (error) {
        console.error("Error While Rating the product: ",error);
        toast({
          variant:"destructive",
          title:"Oops Something Went wrong"
        });
    }
  }

  return (
    <div>
      {/* Total Rating Component */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Overall Rating</h2>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold text-purple-700">{averageRating}</span>
            <span className="text-2xl text-gray-500">/ 5</span>
          </div>
          <span className="text-gray-600 text-lg">({totalRatings} Rating)</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Based on feedback from our community.
        </p>
      </div>

      {/* Rate Recipe Component */}
      <div className="p-6  border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Loved This Recipe?</h2>
        <p className="text-sm text-gray-500 mt-1">
          Show your appreciation by leaving a rating!
        </p>
        <div className="mt-4">
          <ReactStars
            size={42}
            half={false}
            color2="#F59E0B"
            onChange={handleRatingChange}
            value={givenRating}
            className='-mt-4'
          />
        </div>
      </div>

      {/* User Ratings Section */}
      <div className="p-6 flex-grow">
        <h2 className="text-xl font-bold text-gray-800">Recent Ratings</h2>
        {recentRatings.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {recentRatings.map((rating) => (
              <li
                key={rating._id}
                className="flex flex-col gap-4 border-b last:border-none pb-4"
              >
                {/* User Image and Name */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={rating.userId.image}
                      alt={rating.userId.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-gray-800 font-semibold">
                    <p>{rating.userId.name}</p>
                    <ReactStars
                      count={5}
                      value={rating.rating}
                      size={24}
                      edit={false}
                      color2="#F59E0B"
                      className="-mt-2"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-600 ">
            Be the first one to rate this recipe!
          </p>
        )}
      </div>


    </div>
  );
}

export default Rating;
